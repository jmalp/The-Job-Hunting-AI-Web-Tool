from flask import Flask, jsonify
from flask_cors import CORS
import json

from web_scraping.web_scraper import get_jobs
from matching.similarity_score import calculate_tfidf_similarity

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# File Paths
resume_file_path = 'api/data/user_data.txt'


@app.route('/', methods=['GET'])
def test():
    return jsonify({'test': 'success'})


@app.route('/search', methods=['GET'])
def search_jobs():
    """
    Login
    """
    get_jobs("software engineer", "san francisco")
    job_descriptions_file_path = 'api/web_scraping/jobs/jooble_response.json'
    with open(job_descriptions_file_path, 'r', encoding='utf-8') as file:
        job_descriptions = json.load(file)

    jobs = calculate_tfidf_similarity(resume_file_path, job_descriptions)
    result = []
    for job in jobs:
        result.append(job[0])
    return result


if __name__ == '__main__':
    app.run(debug=False)
