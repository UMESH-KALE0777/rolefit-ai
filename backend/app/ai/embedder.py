from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from loguru import logger

# ── BGE prefix for query (job description) ──────────
BGE_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "

# Global model instance (loaded once at startup)
_model = None


def load_model() -> SentenceTransformer:
    """Load BGE model once at startup."""
    global _model
    if _model is None:
        logger.info("Loading BAAI/bge-base-en-v1.5 model...")
        _model = SentenceTransformer("BAAI/bge-base-en-v1.5")
        logger.info("BGE model loaded successfully")
    return _model


def embed_resume(text: str) -> np.ndarray:
    """
    Embed resume text.
    No prefix needed for documents.
    """
    model = load_model()
    embedding = model.encode(text, normalize_embeddings=True)
    return embedding


def embed_job_description(text: str) -> np.ndarray:
    """
    Embed job description text.
    BGE requires query prefix for better accuracy.
    """
    model = load_model()
    prefixed_text = BGE_QUERY_PREFIX + text
    embedding = model.encode(
        prefixed_text,
        normalize_embeddings=True
    )
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