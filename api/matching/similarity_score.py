
import json
import os
import pickle
import sys
import numpy as np
import nltk
from gensim.models import KeyedVectors
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Constants for file paths
MODEL_PATH = 'matching/pickled_word2vec.pkl'
BASE_DIRECTORY = "../data"
RESUME_FILENAME = "user_data.txt"
JOB_DESCRIPTIONS_FILENAME = "test_jobs.json"
RESUME_FILE_PATH = os.path.join(BASE_DIRECTORY, RESUME_FILENAME)
JOB_DESCRIPTIONS_FILE_PATH = os.path.join(BASE_DIRECTORY, JOB_DESCRIPTIONS_FILENAME)

# Load the pickled model and initialize pre-processing tools
with open(MODEL_PATH, 'rb') as f:
    word2vec_model = pickle.load(f)
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Utility function for loading file contents
def get_file_contents(file_path):
    """Loads the contents of a text file."""
    with open(file_path, 'r', encoding='utf-8') as opened_file:
        return opened_file.read()


# Convert tags
def nltk_pos_tag_to_wordnet_tag(nltk_pos_tag):
    """Converts NLTK POS tags to WordNet POS tags."""
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


def preprocess_text(text):
    """Preprocesses text with tokenization, lemmatization, and stop word removal.
    Args:
        text: The input text.

    Returns:
        A preprocessed string.
    """
    tokens = word_tokenize(text.lower())
    nltk_pos_tags = nltk.pos_tag(tokens)
    lemmatized_tokens = []
    for token, tag in nltk_pos_tags:
        wordnet_tag = nltk_pos_tag_to_wordnet_tag(tag)
        if wordnet_tag is None:
            lemmatized_tokens.append(token)
        else:
            (lemmatized_tokens.append(lemmatizer.lemmatize(token, wordnet_tag)))
    lemmatized_tokens = [token for token in lemmatized_tokens if token.isalpha() and token not in stop_words]
    preprocessed_text = " ".join(lemmatized_tokens)
    return preprocessed_text


def calculate_word2vec_similarity(resume_text, job_description_text):
    """Calculates Word2Vec similarity between two texts.

    Args:
        resume_text: The first text.
        job_description_text: The second text.

    Returns:
        The cosine similarity (or 0.0 if no common words are found).
    """

    # Preprocess
    resume_tokens = preprocess_text(resume_text).split()
    job_desc_tokens = preprocess_text(job_description_text).split()

    # Get word vectors
    resume_vectors = [
        word2vec_model.get_vector(word) for word in resume_tokens if word in word2vec_model
    ]
    job_desc_vectors = [
        word2vec_model.get_vector(word) for word in job_desc_tokens if word in word2vec_model
    ]

    # Handle cases where no word vectors are found
    if not resume_vectors or not job_desc_vectors:
        return 0.0

    # Average word vectors to get document vectors
    resume_vector = np.mean(resume_vectors, axis=0)
    job_desc_vector = np.mean(job_desc_vectors, axis=0)

    # Cosine similarity
    similarity = cosine_similarity([resume_vector], [job_desc_vector])[0][0]
    return similarity


def calculate_tfidf_similarity(resume: str, job_descriptions: list):
    """Calculates the similarity between a resume and job descriptions using TF-IDF and Word2Vec."""

    resume_preprocessed = preprocess_text(resume)

    job_matches = []

    for entry in job_descriptions:
        job_snippet = entry.get("snippet", "")
        job_preprocessed = preprocess_text(job_snippet)

        # TF-IDF Similarity
        vectorizer = TfidfVectorizer(ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([resume_preprocessed, job_preprocessed])
        resume_tfidf = tfidf_matrix[0]
        job_tfidf = tfidf_matrix[1]
        tfidf_similarity = (resume_tfidf * job_tfidf.T).toarray()[0, 0]

        # Word2Vec Similarity
        word2vec_similarity = calculate_word2vec_similarity(resume, job_snippet)

        # Combine similarities
        combined_similarity = (tfidf_similarity + word2vec_similarity) / 2

        job_matches.append((entry, combined_similarity))

    # Sort jobs by combined similarity score from best to worst
    job_matches.sort(key=lambda x: x[1], reverse=True)

    return job_matches


if __name__ == '__main__':

    if not os.path.isfile(RESUME_FILE_PATH) or not os.path.isfile(JOB_DESCRIPTIONS_FILE_PATH):
        print("Error with file path. Resume or description file not found.")
        sys.exit()

    with open(JOB_DESCRIPTIONS_FILE_PATH, 'r', encoding='utf-8') as file:
        job_descriptions = json.load(file)

    job_matches_sorted = calculate_tfidf_similarity(RESUME_FILE_PATH, job_descriptions)

    print("\nJob matches sorted from best to worst match:\n")
    for job, score in job_matches_sorted:
        for key, value in job.items():
            print(f"{key}: {value}")
        print(f"Similarity score: {round(score, 4)}\n")
