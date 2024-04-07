from pdfminer.high_level import extract_text

def convert_pdf_to_string(file_path):
    """
    Converts PDF file to string

    Args:
    file (PDF file): File retrieved in the HTTP request formData body

    Returns:
    text (str): PDF file in text format
    """
    try:
        # Replace ' to prevent errors with PostGreSQL queries
        return extract_text(file_path).replace("'", "")
    except Exception as e:
        print(f"Error converting PDF to string: {e}")
        return ""
