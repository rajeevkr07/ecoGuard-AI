from typing import Generator
from app.database.connection import SessionLocal

def get_db() -> Generator:
    """
    FastAPI dependency that provides a local database session
    and ensures it is closed after the request is finished.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
