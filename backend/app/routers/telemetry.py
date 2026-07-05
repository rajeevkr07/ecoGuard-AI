from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db

router = APIRouter()

@router.get("/{farm_id}")
async def get_farm_telemetry(farm_id: int, db: Session = Depends(get_db)):
    """
    Placeholder endpoint for fetching farm telemetry historical data.
    """
    return {"message": f"Telemetry history for farm {farm_id} placeholder"}

@router.post("/")
async def record_telemetry(payload: dict, db: Session = Depends(get_db)):
    """
    Placeholder endpoint for recording telemetry readings from IoT sensors.
    """
    return {"message": "Recorded telemetry reading placeholder", "data": payload}
