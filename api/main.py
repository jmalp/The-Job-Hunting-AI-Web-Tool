from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

from authentication.authentication import generate_token, token_required
from data.pdf_handler import extract_pdf, convert_pdf_to_string
from data.hash_password import hash_password
from data_prepping.data_cleaning import clean_data
from database.db_connection import read_db, update_db
from matching.similarity_score import calculate_tfidf_similarity
from web_scraping.web_scraper import get_jobs

# Initialize Flask App
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def test():
    return jsonify({'test': 'success'})


@app.route('/get-account', methods=['GET'])
@token_required
def get_user_info(user_id: int):
    """
    Gets all user info stored in database

    Requirements:
    Authorization header with value "Bearer *token*"

    Returns:
    JSON object representing user
    {
        first_name: str,
        last_name: str,
        username: str,
        email: str,
        city: str,
        state: str,
        phone_number: str
    }
    """
    try:
        user = read_db(f"SELECT first_name, last_name, username, email FROM users WHERE user_id = {user_id};")[0]
        profile_info = read_db(f"SELECT city, state, phone_number FROM profile_info WHERE user_id = {user_id};")[0]
        response = {
            "first_name": user[0],
            "last_name": user[1],
            "username": user[2],
            "email": user[3],
            "city": profile_info[0],
            "state": profile_info[1],
            "phone_number": profile_info[2]
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/update-account', methods=['PUT'])
@token_required
def update_account(user_id: int):
    """
    Updates any of the user's attributes in the database

    Requirements:
    Authorization header with value "Bearer *token*"

    Args:
    username:      str | OPTIONAL
    email:         str | OPTIONAL
    first_name:    str | OPTIONAL
    last_name:     str | OPTIONAL
    city:          str | OPTIONAL
    state:         str | OPTIONAL
    phone_number:  str | OPTIONAL

    Returns:
    Status message
    """
    try:
        # Get default values
        default_user = read_db(f"SELECT username, password_hash, email, first_name, last_name FROM users WHERE user_id = {user_id};")[0]
        default_profile_info = read_db(f"SELECT city, state, phone_number, resume FROM profile_info WHERE user_id = {user_id};")[0]

        # Extract values from request
        username = request.form.get('username') or default_user[0]
        password_hash = hash_password(request.form.get('password')) or default_user[1]
        email = request.form.get('email') or default_user[2]
        first_name = request.form.get('first_name') or default_user[3]
        last_name = request.form.get('last_name') or default_user[4]
        city = request.form.get('city') or default_profile_info[0]
        state = request.form.get('state') or default_profile_info[1]
        phone_number = request.form.get('phone_number') or default_profile_info[2]
        resume = extract_pdf(default_profile_info[3])

        # Construct and execute UPDATE users query
        update_users_query = f"UPDATE users SET username = '{username}', password_hash = '{password_hash}', email = '{email}', first_name = '{first_name}', last_name = '{last_name}' WHERE user_id = {user_id};"
        response = update_db(update_users_query)

        # Return error ir error raised during Update
        if response[0] == 'A':
            return jsonify({"error": response}), 500

        # Construct and execute UPDATE profile_info query
        update_profile_info_query = f"UPDATE profile_info SET city = '{city}', state = '{state}', phone_number = '{phone_number}', resume = '{resume}' WHERE user_id = {user_id};"
        response = update_db(update_profile_info_query)

        # Return error ir error raised during Update
        if response[0] == 'A':
            return jsonify({"error": response}), 500
        
        # Return Success message
        return jsonify({"message": "table updated successfully"}), 200
    
    # Return any other exception messages
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/create-account', methods=['POST'])
def create_account():
    """
    Create account by adding user's credentials to the database 
    and generate a token to grant access to the rest of the website

    Requirements:
    testing: str ('True' or 'False') | If set to True, user/profile_info created will be deleted on completion of the function

    Args:
    *Args to be included in formData in the body of the request*

    username:      str  | REQUIRED
    email:         str  | REQUIRED
    password:      str  | REQUIRED
    first_name:    str  | REQUIRED
    last_name:     str  | REQUIRED
    city:          str  | OPTIONAL
    state:         str  | OPTIONAL
    phone_number:  str  | OPTIONAL
    resume:        FILE | OPTIONAL

    Returns:
    JSON response with session token
    """
    try:
        # Extract user information from HTTP Post form
        username = request.form.get('username')
        email = request.form.get('email')
        password_hash = hash_password(request.form.get('password'))
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        city = request.form.get('city') or ""
        state = request.form.get('state') or ""
        phone_number = request.form.get('phone_number') or ""
        
        # Handle the file upload
        resume = extract_pdf()

        # Construct and execute INSERT query for users
        users_sql = f"INSERT INTO users (username, email, password_hash, first_name, last_name) \
            VALUES ('{username}', '{email}', '{password_hash}', '{first_name}', '{last_name}') RETURNING user_id;"
        response = update_db(users_sql)

        # Return error ir error raised during Insert
        if response[0] == 'A':
            return jsonify({"error": response}), 500

        # Get generated user_id from response
        user_id = response[0]

        # Construct and execute INSERT query for profile_info
        profile_info_sql = f"INSERT INTO profile_info (user_id, city, state, phone_number, resume) \
            VALUES ({user_id}, '{city}', '{state}', '{phone_number}', '{resume}') RETURNING profileinfo_id;"

        # Execute profile_info query query
        response = update_db(profile_info_sql)

        # Return error ir error raised during Insert
        if response[0] == 'A':
            return jsonify({"error": response}), 500

        # ! Delete rows if testing is True
        testing_header_value = request.headers.get('Testing')
        if testing_header_value == 'True':
            delete_sql = f"DELETE FROM users WHERE user_id = {user_id}"
            response = update_db(delete_sql)
        # ! Delete rows if testing is True

        # Generate and return token
        token = generate_token(user_id)
        return jsonify({"token": token}), 200

    # Return any other exception messages
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    """
    Validate user email and password to generate a session token to grant access to the rest of the website

    Args:
    *Args to be included in the json object in the body of the request*
    email:    str | user email
    password: str | user's password

    Returns:
    JSON response with session token
    """
    try:
        # Extract email and password from HTTP Post form
        user = request.get_json()
        email = user['email']
        password = hash_password(user['password'])

        # Generate and execute database query
        sql = f"SELECT user_id FROM users WHERE email = '{email}' AND password_hash = '{password}';"
        query_result = read_db(sql)
        print(query_result)

        # ERROR no matches for username and password in database
        if len(query_result) != 1:
            return jsonify({"error": "Invalid login credential"}), 500
        
        # Query result should give a list of tuples ex. [(1,)]
        # Double array index 0 to ensure we get the first and only value of the first and only tuple, our user_id
        user_id = query_result[0][0]

        # Generate and return token with our user_id
        token = generate_token(user_id)
        return jsonify({"token": token}), 200
    
    # Return any other exception messages
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/search', methods=['POST'])
@token_required
def search_jobs(user_id: int):
    """
    Search Jobs

    Requirements:
    Authorization header with value "Bearer *token*"

    Args:
    *Args to be included in the json object in the body of the request*
    keywords:    str | Keywords for search query
    location:    str | Desired location of job
    salary:      str | Desired minimum salary
    radius:      str | Desired radius (in miles) from location

    Returns:
    List of JSON objects representing job postings
    {
        title: str,
        location: str,
        snippet: str,
        salary: str,
        source: str,
        type: str,
        link: str,
        company: str,
        job posted: str,
        id: int
    }
    """
    # Scrape Jobs
    search_query = request.get_json()
    keywords = search_query['keywords']
    location = search_query['location']
    salary = search_query['salary']
    radius = search_query['radius']
    get_jobs(keywords, location, salary, radius)

    # Clean Data
    job_descriptions_file_path = 'web_scraping/jobs/jooble_response.json'
    job_results_file_path = 'data/job_results.json'
    clean_data(job_descriptions_file_path, job_results_file_path)

    with open(job_results_file_path, 'r', encoding='utf-8') as file:
        job_descriptions = json.load(file)

    # Retrieve User Resume
    query = f"SELECT resume FROM profile_info WHERE user_id = {user_id}"
    result = read_db(query)
    try:
        resume = result[0][0]
    except Exception as e:
        resume = ""

    # Sort Jobs by Similarity Score
    jobs = calculate_tfidf_similarity(resume, job_descriptions)
    result = []
    for job in jobs:
        result.append(job[0])

    # Return List
    return result


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
