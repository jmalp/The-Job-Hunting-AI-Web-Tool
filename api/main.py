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


@app.route('/create-acocunt', methods=['POST'])
def create_account():
    """
    Create account
    """
    try:
        # Extract user information from HTTP Post form
        user = request.get_json()
        email = user['email']
        password = user['password']
        city = user['city']
        state = user['state']
        
        # Create account
        sql = f"INSERT INTO users (email, password, city, state) \
                VALUES ('{email}', '{password}', '{city}', '{state}')"
        response = update_db(sql)

        # Generate token

    # Return any other exception messages
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    """
    Validate user email and password to generate a session token to allow access to the rest of the website

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
        password = user['password']

        # TODO: password hashing function

        # Generate and execute database query
        sql = f"SELECT user_id FROM users WHERE email = '{email}' AND password_hash = '{password}';"
        query_result = read_db(sql)

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
