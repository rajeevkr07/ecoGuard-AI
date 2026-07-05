from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "EcoGuard AI"
    APP_ENV: str = "development"
    
    # Database Configuration (defaults to postgres localhost for development)
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ecoguard"
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # Google Gemini / ADK Configuration
    GEMINI_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
