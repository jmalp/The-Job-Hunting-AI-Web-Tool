import requests
import json

JOOBLE_RESPONSE_PATH = "web_scraping/jobs/jooble_response.json"
USA_JOBS_RESPONSE_PATH = "web_scraping/jobs/usajobs_response.json"

with open("web_scraping/api_keys.json", 'r') as file:
    KEYS = json.load(file)


def get_jobs(keywords: str, location: str, salary: str = "0", radius: str = "20") -> None:
    """
    Get's jobs from all sources the app provides
    Jobs are stored into JSON files separated by sources
    keywords: str | job search query
    location: str | location search query
    salary:   str | minimum desired salary
    radius:   str | radius from given location to search for job
    """
    get_jooble(keywords, location, salary, radius)
    get_usajobs(keywords)


def get_jooble(keywords: str, location: str, salary: str = "0", radius: str = "20") -> None:
    """
    HTTP GET Request from Jooble's API
    keywords: str | job search query
    location: str | location search query
    salary:   str | minimum desired salary
    radius:   str | radius from given location to search for job
    """
    jobs = []
    
    # Create Request
    host = "jooble.org"
    key = KEYS["JOOBLE_KEY"]
    print("JOOBLE_KEY: ", key)
    url = f"https://{host}/api/{key}"
    headers = {"Content-type": "application/json"} 
    body = '{' + f'"keywords": "{keywords}", "location": "{location}", "salary": "{salary}", "radius": "{radius}", "ResultOnPage": 100' + '}'

    # Send Request
    response = requests.post(url, data=body, headers=headers)

    # Parse Request
    path = JOOBLE_RESPONSE_PATH
    
    if response.status_code == 200:
        # If successful, store data
        data = response.json()
        jobs += data['jobs']
        with open(path, 'w') as json_file:
            json.dump(jobs, json_file, indent=2)
    else:
        # If unsuccessful, print error response
        print(f" Jooble request failed with status code {response.status_code}")
        print(response.text) 
        
    return


def get_usajobs(keywords: str) -> None:
    """
    HTTP GET Request from USA Jobs's API
    keywords: str | job search query
    location: str | location search query
    """
    # Create Request
    url = f'https://data.usajobs.gov/api/search?Keyword={keywords}'
    host = 'data.usajobs.gov'
    user_agent = KEYS["USAJOBS_USERAGENT"]
    auth_key = KEYS["USAJOBS_KEY"]
    headers = {
        'Host': host,
        'User-Agent': user_agent,
        'Authorization-Key': auth_key
    }

    # Send Request
    response = requests.get(url, headers=headers)

    # Parse Request
    path = USA_JOBS_RESPONSE_PATH

    if response.status_code == 200:
        # If successful, store data
        data = response.json()
        jobs = data['SearchResult']['SearchResultItems']
        with open(path, 'w') as json_file:
            json.dump(jobs, json_file, indent=2)
    else:
        # If unsuccessful, print error response
        print(f"USA Jobs request failed with status code {response.status_code}")
        print(response.text) 
    return


if __name__ == "__main__":
    """
    Driver code for testing purposes
    """
    get_jobs("teacher", "san francisco", "25")
