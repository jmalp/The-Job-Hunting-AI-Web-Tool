import fitz

def convert_pdf_to_string(file) -> str:
    """
    Converts PDF file to string

    Args:
    file (PDF file): File retrieved in the HTTP request formData body

    Returns:
    text (str): PDF file in text format
    """
    # Initialize result text and open file
    text = ""
    document = fitz.open(stream=file.read(), filetype="pdf")

    # Iterate through PDF pages, add text to result
    for page_num in range(document.page_count):
        page = document[page_num]
        text += page.get_text()

    document.close()

    # Replace ' to prevent errors with PostGreSQL queries
    return text.replace("'", "")
