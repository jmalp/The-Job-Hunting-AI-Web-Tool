import pandas as pd

with open('test_jobs.json', encoding ='utf-8') as inputfile:
    df = pd.read_json(inputfile)

df.to_csv('test_jobs.csv', encoding ='utf-8', index = False)