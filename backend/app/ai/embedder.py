import numpy as np
import requests
import os
from loguru import logger
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/BAAI/bge-base-en-v1.5"
BGE_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "

headers = {"Authorization": f"Bearer {HF_TOKEN}"}


def query_embedding(text: str) -> np.ndarray:
    """Call HF Inference API to get embeddings."""
    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json={"inputs": text},
            timeout=30
        )
        response.raise_for_status()
        embedding = np.array(response.json())
        
        # Normalize
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
            
        return embedding
    except Exception as e:
        logger.error(f"HF API error: {e}")
        raise


def load_model():
    """No local model needed — using HF API."""
    logger.info("Using HF Inference API for embeddings")
    return True


def embed_resume(text: str) -> np.ndarray:
    """Embed resume text via HF API."""
    return query_embedding(text)


def embed_job_description(text: str) -> np.ndarray:
    """Embed JD text with BGE prefix via HF API."""
    prefixed = BGE_QUERY_PREFIX + text
    return query_embedding(prefixed)


def calculate_semantic_similarity(
    resume_embedding: np.ndarray,
    jd_embedding: np.ndarray
) -> float:
    """Calculate cosine similarity."""
    from sklearn.metrics.pairwise import cosine_similarity
    
    similarity = cosine_similarity(
        resume_embedding.reshape(1, -1),
        jd_embedding.reshape(1, -1)
    )[0][0]
    
    score = float(similarity) * 100
    return max(0.0, min(100.0, score))