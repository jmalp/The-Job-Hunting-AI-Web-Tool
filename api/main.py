from flask import Flask, jsonify

from web_scraping.web_scraper import get_jobs
from matching.similarity_score import calculate_tfidf_similarity

app = Flask(__name__)

# File Paths
resume_file_path = 'data/user_data.txt'
job_descriptions_file_path = 'data/test_jobs.json'

@app.route('/search', methods=['GET'])
def search_jobs():
    """
    Login
    """
    get_jobs("software engineer", "san francisco")
    jobs = calculate_tfidf_similarity(resume_file_path, job_descriptions_file_path)
    return jobs


if __name__ == '__main__':
    app.run(debug=False)