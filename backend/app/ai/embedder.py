import numpy as np
from loguru import logger
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Global model instance (loaded lazily on first request)
_model = None


def load_model() -> SentenceTransformer:
    """Load MiniLM model lazily on first request."""
    global _model
    if _model is None:
        logger.info("Loading all-MiniLM-L6-v2 model...")
        _model = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("MiniLM model loaded successfully")
    return _model


def embed_resume(text: str) -> np.ndarray:
    """Embed resume text."""
    model = load_model()
    embedding = model.encode(text, normalize_embeddings=True)
    return embedding


def embed_job_description(text: str) -> np.ndarray:
    """Embed job description text."""
    model = load_model()
    embedding = model.encode(text, normalize_embeddings=True)
    return embedding


def calculate_semantic_similarity(
    resume_embedding: np.ndarray,
    jd_embedding: np.ndarray
) -> float:
    """
    Calculate cosine similarity between
    resume and job description embeddings.
    Returns score 0-100.
    """
    similarity = cosine_similarity(
        resume_embedding.reshape(1, -1),
        jd_embedding.reshape(1, -1)
    )[0][0]
    
    # Convert to 0-100 scale
    score = float(similarity) * 100
    
    # Clamp between 0 and 100
    return max(0.0, min(100.0, score))