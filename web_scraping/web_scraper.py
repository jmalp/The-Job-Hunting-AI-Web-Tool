import requests
import json
import os


def get_jobs(keywords: str, location: str) -> None:
    """
    Get's jobs from all sources the app provides
    Jobs are stored into JSON files separated by sources
    keywords: str | job search query
    location: str | location search query
    """
    get_jooble(keywords, location)
    get_usajobs(keywords)


def get_jooble(keywords: str, location: str) -> None:
    """
    HTTP GET Request from Jooble's API
    keywords: str | job search query
    location: str | location search query
    """
    # Create Request
    host = "jooble.org"
    key = os.getenv("JOOBLE_KEY")
    url = f"https://{host}/api/{key}"
    headers = {"Content-type": "application/json"} 
    body = '{"keywords": "' + keywords + '", "location": "' + location + '"}'

    # Send Request
    response = requests.post(url, data=body, headers=headers)

    # Parse Request
    path = "web_scraping/jobs/jooble_response.json"
    parse_data(response, path)
    return


def get_usajobs(keywords: str, location: str) -> None:
    """
    HTTP GET Request from USA Jobs's API
    keywords: str | job search query
    location: str | location search query
    """
    # Create Request
    url = f'https://data.usajobs.gov/api/search?Keyword={keywords}'
    host = 'data.usajobs.gov'
    user_agent = os.getenv("USAJOBS_USERAGENT")
    auth_key = os.getenv("USAJOBS_KEY")
    headers = {
        'Host': host,
        'User-Agent': user_agent,
        'Authorization-Key': auth_key
    }

    # Send Request
    response = requests.get(url, headers=headers)

    # Parse Request
    path = "web_scraping/jobs/usajobs_response.json"
    parse_data(response, path)
    return


def parse_data(response, path: str) -> None:
    """
    Parses response from HTTP GET request
    If successful, stores data into path
    If unsuccessful, print error response
    response: response from HTTP GET
    path: str | path to json file to store data
    """
    if response.status_code == 200:
        # If successful, store data
        data = response.json()
        with open(path, 'w') as json_file:
            json.dump(data, json_file, indent=2)
    else:
        # If unsuccessful, print error response
        print(f"Request failed with status code {response.status_code}")
        print(response.text) 
    return


if __name__ == "__main__":
    """
    Driver code for testing purposes
    """
    get_jooble("teacher", "denver")
    get_usajobs("python", "corvallis")
