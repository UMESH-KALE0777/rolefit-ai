from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # App
    environment: str = "development"
    
    # AI
    gemini_api_key: str = ""
    
    # Upload
    max_file_size_mb: int = 5
    
    # Rate limiting
    rate_limit_per_minute: int = 10
    
    # CORS
    allowed_origins: str = "http://localhost:5173"
    
    class Config:
        env_file = "backend/.env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()