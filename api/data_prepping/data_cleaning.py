import pandas as pd
from html import unescape
import re

def clean_data(input_file: str, output_file: str):
    """
    Cleans and preprocess job data from a CSV file.

    This function performs several data cleaning operations on a job listings dataset:
    - Drops the 'salary' column due to its lack of data.
    - Fills missing values in the 'type' column with "Not Specified".
    - Pre-processes the 'updated' column to keep only the date part.
    - Converts the 'updated' column to a date format and renames it to 'job posted'.
    - Saves the cleaned data in a new CSV file.

    ARGS:
    input_file: str | path to json file with jobs to clean
    output_file: str | path to json file where jobs will be stored
    """
    
    df = pd.read_json(input_file)

    # Fill missing values in the 'type' column with "Not Specified"
    df['type'] = df['type'].fillna('Not Specified')

    # Pre-process the 'updated' column to remove everything after the "T"
    df['updated'] = df['updated'].str.split('T').str[0]

    # Rename the 'updated' column to 'job posted'
    df.rename(columns={'updated': 'job posted'}, inplace=True)
    
    # Apply the cleaning function to the 'snippet' column
    df['snippet'] = df['snippet'].apply(clean_html)
    
    # Saves the cleaned data to a new CSV file
    df.to_csv('cleaned_test_jobs.csv', encoding ='utf-8', index = False)


# Clean HTML content from the 'snippet' column
def clean_html(text: str) -> str:
    """
    Clean HTML content from a text string.

    This function decodes HTML entities, removes HTML tags, and replaces newline 
    (\r and \n) characters with spaces. It also consolidates multiple consecutive 
    spaces into a single space for cleaner text presentation.

    Args:
    text (str): The text string containing HTML content to be cleaned.

    Returns:
    str: The cleaned text string without HTML tags, newline characters, and extra spaces.
    """
         
    # Decode HTML entities
    text = unescape(text)
    
    # Remove HTML tags
    text = re.sub('<[^<]+?>', '', text)
    
    # Remove \r and \n characters
    text = text.replace('\r', ' ').replace('\n', ' ')
    
    # Remove extra spaces caused by replacements
    text = re.sub(' +', ' ', text)
    
    return text
