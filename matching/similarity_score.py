import os
import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

# NLTK provided stopwords
stop_words = set(stopwords.words('english'))

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Convert tags
def nltk_pos_tag_to_wordnet_tag(nltk_pos_tag):
    if nltk_pos_tag.startswith('J'):
        return wordnet.ADJ
    elif nltk_pos_tag.startswith('V'):
        return wordnet.VERB
    elif nltk_pos_tag.startswith('N'):
        return wordnet.NOUN
    elif nltk_pos_tag.startswith('R'):
        return wordnet.ADV
    else:
        return None

# File Paths
resume_file_path = '../data/user_data.txt'
job_descriptions_file_path = '../data/test_jobs.json'

if not os.path.isfile(resume_file_path) or not os.path.isfile(job_descriptions_file_path):
    print("Error with file path. Resume or description file not found.")
    exit()

def preprocess_text_with_lemmatization(text):
    tokens = word_tokenize(text.lower())
    nltk_pos_tags = nltk.pos_tag(tokens)
    lemmatized_tokens = []
    for token, tag in nltk_pos_tags:
        wordnet_tag = nltk_pos_tag_to_wordnet_tag(tag)
        if wordnet_tag is None:
            lemmatized_tokens.append(token)
        else:
            lemmatized_tokens.append(lemmatizer.lemmatize(token, wordnet_tag))
    lemmatized_tokens = [token for token in lemmatized_tokens if token.isalpha() and token not in stop_words]
    preprocessed_text = " ".join(lemmatized_tokens)
    return preprocessed_text

# Function to calculate TF-IDF similarity for each job description
# returns sorted list of job descriptions with similarity score
def calculate_tfidf_similarity(resume_path, job_descriptions):
    with open(resume_path, 'r', encoding='utf-8') as resume_file:
        resume_contents = resume_file.read()
        resume_preprocessed = preprocess_text_with_lemmatization(resume_contents)

        job_matches = []

        for job in job_descriptions:
            job_snippet = job.get("snippet", "")
            job_preprocessed = preprocess_text_with_lemmatization(job_snippet)

            vectorizer = TfidfVectorizer(ngram_range=(1, 2))
            tfidf_matrix = vectorizer.fit_transform([resume_preprocessed, job_preprocessed])

            resume_tfidf = tfidf_matrix[0]
            job_tfidf = tfidf_matrix[1]

            similarity = (resume_tfidf * job_tfidf.T).toarray()[0, 0]

            job_matches.append((job, similarity))

        # Sort jobs by similarity score from best to least
        job_matches.sort(key=lambda x: x[1], reverse=True)

        return job_matches

# print sorted job matches
with open(job_descriptions_file_path, 'r', encoding='utf-8') as file:
    job_descriptions = json.load(file)

job_matches_sorted = calculate_tfidf_similarity(resume_file_path, job_descriptions)

print("\nJob matches sorted from best to worst match:\n")
for job, score in job_matches_sorted:
    for key, value in job.items():
        print(f"{key}: {value}")
    print(f"Similarity score: {round(score, 2)}\n")