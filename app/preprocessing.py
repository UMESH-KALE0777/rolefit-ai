import re
import nltk
import spacy
import streamlit as st
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

@st.cache_resource
def load_nlp_resources():
    """
    Loads spaCy model and NLTK resources once.
    Note: nltk resources should be pre-downloaded in a real production environment.
    """
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        # Fallback for local development if not installed
        import os
        os.system("python -m spacy download en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")
        
    stop_words = set(stopwords.words("english"))
    return nlp, stop_words

def clean_text(text):
    nlp, stop_words = load_nlp_resources()
    
    # Lowercase
    text = text.lower()

    # Remove emails
    text = re.sub(r'\S+@\S+', '', text)

    # Remove URLs
    text = re.sub(r'http\S+', '', text)

    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Tokenize
    tokens = word_tokenize(text)

    # Remove stopwords
    tokens = [word for word in tokens if word not in stop_words]

    # Lemmatization
    doc = nlp(" ".join(tokens))
    lemmatized = [token.lemma_ for token in doc]

    return " ".join(lemmatized)
