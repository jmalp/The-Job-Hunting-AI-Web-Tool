from flask import request
from pdfminer.high_level import extract_text
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESUME_FOLDER = os.path.join(BASE_DIR, 'resumes')
os.makedirs(RESUME_FOLDER, exist_ok=True)

def extract_pdf(default_val: str = "") -> str:
    """
    Extracts PDF file from request and returns it as a string

    Args:
    default_val (str): Default resume string to return, empty string if no parameter provided

    Returns:
    resume (str)
    """
    # Handle the file upload
    if 'resume' in request.files:
        print("Resume file found")
        file = request.files['resume']

        if file.filename != '':
            # Secure the filename and save the file within the 'data' folder
            secure_filename = os.path.join(RESUME_FOLDER, file.filename)
            file.save(secure_filename)
            print("File saved")
            resume = convert_pdf_to_string(secure_filename)[:6000]
            print(secure_filename)
            os.remove(secure_filename)

        return resume
    
    else:
        return default_val


def convert_pdf_to_string(file_path: str) -> str:
    """
    Converts PDF file to string

    Args:
    file_path (str): Path to file retrieved in the HTTP request formData body

    Returns:
    text (str): PDF file in text format
    """
    try:
        # Replace ' to prevent errors with PostGreSQL queries
        return extract_text(file_path).replace("'", "")
    except Exception as e:
        print(f"Error converting PDF to string: {e}")
        return ""
