from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import farms, agents, telemetry
from app.core.config import settings

app = FastAPI(
    title="EcoGuard AI API",
    description="Precision Agriculture Multi-Agent System Backend API",
    version="1.0.0",
)

# Set up CORS middleware for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(farms.router, prefix="/api/v1/farms", tags=["Farms"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["Agents"])
app.include_router(telemetry.router, prefix="/api/v1/telemetry", tags=["Telemetry"])

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "healthy",
        "service": "EcoGuard AI API",
        "version": "1.0.0"
    }
