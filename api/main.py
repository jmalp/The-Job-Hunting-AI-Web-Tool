from flask import Flask, jsonify
from flask_cors import CORS
import json

from authentication.authentication import generate_token, validate_token, read_key, write_key, token_required
from web_scraping.web_scraper import get_jobs
from matching.similarity_score import calculate_tfidf_similarity

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
def test_token_required(user_id):
    """
    Test endpoint to verify functionality of @token_required() and validate_token()
    """
    return jsonify({'user_id': user_id})


@app.route('/test-generate-token', methods=['GET'])
def test_generate_token():
    """
    Test endpoint to verify functionality of generate_token()
    """
    user_id = 1092346
    token = {
        'token': generate_token(user_id, key_location="authentication/key.json")
    }
    with open("test_token.json", 'w') as json_file:
        json.dump(token, json_file, indent=4)
    return token


@app.route('/search', methods=['GET'])
def search_jobs():
    """
    Search Jobs
    """
    get_jobs("software engineer", "Santa Clara", "60000", "100")
    job_descriptions_file_path = 'web_scraping/jobs/jooble_response.json'
    with open(job_descriptions_file_path, 'r', encoding='utf-8') as file:
        job_descriptions = json.load(file)

    jobs = calculate_tfidf_similarity(resume_file_path, job_descriptions)
    result = []
    for job in jobs:
        result.append(job[0])
    return result


if __name__ == '__main__':
    app.run(debug=False)
