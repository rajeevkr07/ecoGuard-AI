from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db

router = APIRouter()

@router.get("/")
async def list_farms(db: Session = Depends(get_db)):
    """
    Placeholder endpoint for listing farms.
    """
    return {"message": "List of farms placeholder"}

@router.post("/")
async def create_farm(farm_data: dict, db: Session = Depends(get_db)):
    """
    Placeholder endpoint for creating a new farm.
    """
    return {"message": "Create farm placeholder", "data": farm_data}
