from mcp.server.fastmcp import FastMCP

# Initialize the MCP Server (EcoGuard local tools server)
mcp = FastMCP("EcoGuard Tools Server")

@mcp.tool()
async def read_soil_moisture(farm_id: int) -> str:
    """
    Retrieves the latest physical soil moisture percentage for a given farm.
    """
    # Placeholder returning mocked IoT sensor reading
    return f"Soil moisture for farm {farm_id} is currently 32.5% (Optimal)."

@mcp.tool()
async def dispatch_spray_drone(farm_id: int, volume_liters: float, coordinates: str) -> str:
    """
    Commands a physical precision spray drone to dispatch to the designated GPS coordinates
    and apply the target pesticide volume.
    """
    # Placeholder returning flight command status
    return f"Drone dispatched to farm {farm_id} at {coordinates}. Applying {volume_liters}L of pesticide."

# Expose Starlette app for ASGI runners (e.g. uvicorn)
app = mcp.sse_app()
