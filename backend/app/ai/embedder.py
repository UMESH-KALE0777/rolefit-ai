import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from loguru import logger


def load_model():
    """No model needed — using TF-IDF."""
    logger.info("Using TF-IDF for semantic similarity")
    return True


def embed_resume(text: str) -> np.ndarray:
    """Return text as-is for TF-IDF processing."""
    return text


def embed_job_description(text: str) -> np.ndarray:
    """Return text as-is for TF-IDF processing."""
    return text


def calculate_semantic_similarity(
    resume_text: str,
    jd_text: str
) -> float:
    """
    Calculate similarity using TF-IDF + cosine similarity.
    Works completely locally — no external API needed.
    """
    try:
        vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),
            max_features=5000
        )
        
        tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])
        similarity = cosine_similarity(
            tfidf_matrix[0:1],
            tfidf_matrix[1:2]
        )[0][0]
        
        score = float(similarity) * 100
        logger.info(f"TF-IDF similarity score: {score:.2f}")
        return max(0.0, min(100.0, score))
        
    except Exception as e:
        logger.error(f"TF-IDF error: {e}")
        return 50.0