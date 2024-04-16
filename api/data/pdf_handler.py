import pdfplumber

def pdf_to_str(file) -> str:
    """
    Converts PDF file to string

    Args:
    file (str): PDF file retrieved in the HTTP request formData body

    Returns:
    text (str): PDF file in text format
    """
    with pdfplumber.open(file) as pdf:
        resume = ""
        for page in pdf.pages:
            resume += page.extract_text(strip_control=False, x_tolerance=2, y_tolerance=2)
        resume = ''.join([c for c in resume if c != "'"])
        return resume
