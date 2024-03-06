from flask import Flask, jsonify, request
from flask_cors import CORS
import json

from authentication.authentication import generate_token, token_required
from data_prepping.data_cleaning import clean_data
from database.db_connection import read_db, update_db
from matching.similarity_score import calculate_tfidf_similarity
from web_scraping.web_scraper import get_jobs

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# File Paths
resume_file_path = 'data/user_data.txt'


@app.route('/', methods=['GET'])
def test():
    return jsonify({'test': 'success'})


@app.route('/test-token-required', methods=['GET'])
@token_required
def test_token_required(user_id: int):
    """
    Test endpoint to verify functionality of @token_required() and validate_token()
    """
    return jsonify({'user_id': user_id}), 200


@app.route('/create-account', methods=['POST'])
def create_account():
    """
    Create account by adding user's credentials to the database 
    and generate a token to grant access to the rest of the website

    Headers:
    testing: str ('True' or 'False') | If set to True, user/profile_info created will be deleted on completion of the function

    Args:
    *Args to be included in the json object in the body of the request*
    username:      str | REQUIRED
    email:         str | REQUIRED
    password_hash: str | REQUIRED
    first_name:    str | REQUIRED
    last_name:     str | REQUIRED
    city:          str | OPTIONAL
    state:         str | OPTIONAL
    phone_number:  str | OPTIONAL
    resume:        str | OPTIONAL

    Returns:
    JSON response with session token
    """
    try:
        # Extract user information from HTTP Post form
        user = request.get_json()
        
        # TODO: password hashing function

        # Raise error for any missing required field
        if 'username' not in user:
            return jsonify({"error": "missing username"}), 500
        if 'email' not in user:
            return jsonify({"error": "missing email"}), 500
        if 'password_hash' not in user:
            return jsonify({"error": "missing password_hash"}), 500
        if 'first_name' not in user:
            return jsonify({"error": "missing first_name"}), 500
        if 'last_name' not in user:
            return jsonify({"error": "missing last_name"}), 500

        # Construct and execute INSERT query for users
        users_sql = f"INSERT INTO users (username, email, password_hash, first_name, last_name) \
            VALUES ('{user['username']}', '{user['email']}', '{user['password_hash']}', '{user['first_name']}', '{user['last_name']}') RETURNING user_id;"
        print(users_sql)
        response = update_db(users_sql)
        print(response)

        # Get generated user_id from response
        user_id = response[0]

        # Construct and execute INSERT query for profile_info with optionals given
        profile_info_keys = ['user_id']
        profile_info_vals = [user_id]
        excluded_keys = ['username', 'email', 'password_hash', 'first_name', 'last_name']

        for key, val in user.items():
            if key not in excluded_keys:
                profile_info_keys.append(key)
                profile_info_vals.append(val)

        # Add lists to query strings in correct SQL syntax 
        profile_info_keys = str(tuple(profile_info_keys)).replace("'", "")
        profile_info_vals = tuple(profile_info_vals)
        profile_info_sql = f"INSERT INTO profile_info {profile_info_keys} VALUES {profile_info_vals};"

        # Execute profile_info query query
        print(profile_info_sql)
        response = update_db(profile_info_sql)
        print(response)

        # Delete rows if testing is true
        testing_header_value = request.headers.get('Testing')
        if testing_header_value == 'True':
            delete_sql = f"DELETE FROM users WHERE user_id = {user_id}"
            response = update_db(delete_sql)
            print(response)

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
    print(request.get_json())
    try:
        # Extract email and password from HTTP Post form
        user = request.get_json()
        email = user['email']
        password = user['password']

        # TODO: password hashing function

        # Generate and execute database query
        sql = f"SELECT user_id FROM users WHERE email = '{email}' AND password_hash = '{password}';"
        print(sql)
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
def search_jobs():
    """
    Search Jobs

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
    # TODO: Retrieve User Resume

    # Sort Jobs by Similarity Score
    jobs = calculate_tfidf_similarity(resume_file_path, job_descriptions)
    result = []
    for job in jobs:
        result.append(job[0])

    # Return List
    return result


if __name__ == '__main__':
    app.run(debug=True)
