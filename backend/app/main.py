from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager
from loguru import logger
import os

from app.routers import analyze
from app.core.config import get_settings
from app.core.logging import setup_logging
from app.ai.embedder import load_model

# ── Setup ────────────────────────────────────────────
setup_logging()
settings = get_settings()

# ── Rate Limiter ─────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)


# ── Lifespan (runs on startup) ───────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load BGE model once at startup
    logger.info("Starting RoleFit AI backend...")
    load_model()
    logger.info("Backend ready.")
    yield
    logger.info("Shutting down...")


# ── App ──────────────────────────────────────────────
app = FastAPI(
    title="RoleFit AI",
    description="AI-powered resume screening API",
    version="1.0.0",
    lifespan=lifespan
)

# ── Rate limiting ────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ─────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────
app.include_router(
    analyze.router,
    prefix="/api",
    tags=["analyze"]
)


# ── Health Check ─────────────────────────────────────
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "version": "1.0.0",
        "model": "BAAI/bge-base-en-v1.5"
    }


# ── Root ─────────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "message": "RoleFit AI API",
        "docs": "/docs",
        "health": "/health"
    }