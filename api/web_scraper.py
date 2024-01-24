import http.client 
from pprint import pprint
import requests
import json

def scrape_jooble():
    """
    Scrapes 
    """
    host = 'jooble.org' 
    key = '0653066b-0c67-4996-8502-47bc1f6f923b' 
    connection = http.client.HTTPConnection(host)
    #request headers 
    headers = {"Content-type": "application/json"} 
    #json query 
    body = '{ "keywords": "", "location": ""}'
    connection.request('POST','/api/' + key, body, headers) 
    response = connection.getresponse() 
    data = json.loads(response.read().decode('utf-8'))
    with open("api/jobs/jooble.json", 'w') as json_file:
        json.dump(data, json_file, indent=2)

def get_link():
    url = "https://jooble.org/desc/-1729057608212417843"
    response = requests.get(url)
    print(response.text)

if __name__ == "__main__":
    #scrape_jooble()
    get_link()