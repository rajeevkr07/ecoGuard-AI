# EcoGuard AI - Project Architecture 🏛️

EcoGuard AI is a Multi-Agent Precision Agriculture platform designed to reduce pesticide volume and protect crops using coordinate-specific drone orchestration. 

This document outlines the system modules and how components interact.

---

## ⚙️ High-Level System Architecture

```mermaid
graph TD
    %% Nodes
    User[Farm Administrator] -->|1. Uploads leaf photo / triggers scan| FE[Next.js 15 Web Client]
    FE -->|8. Visualizes results, logs & metrics| User
    
    FE -->|2. POST /api/v1/agents/diagnose| BE[FastAPI Backend Server]
    BE -->|7. Returns JSON payload & logs| FE
    
    subgraph backend [FastAPI App & Orchestrator]
        direction TB
        BE -->|Runs calculations| PesticideSvc[Pesticide Optimization Service]
        BE -->|Fetches forecast| WeatherSvc[Weather Service]
        Database[(PostgreSQL Database)] <-->|Read/Write session state| BE
    end

    subgraph agents [Multi-Agent Reasoning Loop - Google ADK & Gemini 2.5 Flash]
        direction TB
        BE <-->|Coordinates sub-tasks| CoordAgent[Coordinator Agent]
        CoordAgent <-->|Image analysis| VisionAgent[Vision Agent]
        CoordAgent <-->|Pathological classification| DiagAgent[Diagnosis Agent]
        CoordAgent <-->|Pesticide volume & mapping| TreatAgent[Treatment Agent]
        CoordAgent <-->|Runoff & financial savings| ImpactAgent[Impact Agent]
    end

    subgraph mcp [Decoupled Hardware Access Layer]
        BE -->|3. Requests sensor reading / commands drone| FastMCP[FastMCP Server]
        FastMCP -->|6. Reports command status & telemetry| BE
    end

    subgraph hardware [IoT Canopy & Drone Actuation]
        FastMCP -->|4. read_soil_moisture| Sensors[Canopy & Soil Sensors]
        FastMCP -->|5. dispatch_spray_drone| Drone[IoT Spray Drone]
    end

    %% Styling
    classDef frontend fill:#047857,stroke:#065f46,stroke-width:2px,color:#fff;
    classDef backend fill:#1e3a8a,stroke:#172554,stroke-width:2px,color:#fff;
    classDef agent fill:#7f1d1d,stroke:#450a0a,stroke-width:2px,color:#fff;
    classDef mcp fill:#7c2d12,stroke:#431407,stroke-width:2px,color:#fff;
    classDef hw fill:#1e293b,stroke:#0f172a,stroke-width:2px,color:#fff;

    class FE frontend;
    class BE,PesticideSvc,WeatherSvc,Database backend;
    class CoordAgent,VisionAgent,DiagAgent,TreatAgent,ImpactAgent agent;
    class FastMCP mcp;
    class Sensors,Drone hw;
```

---

## 🔄 Multi-Agent System Data Flow

The platform relies on a decoupled multi-agent loop coordinates real-time visual assessment, spatial telemetry analysis, and target drone sprays:

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farm Admin
    participant FE as Next.js Dashboard
    participant BE as FastAPI Backend
    participant Gemini as Gemini 2.5 Flash Agent
    participant MCP as FastMCP Server
    participant Drone as IoT Spray Drone

    Farmer->>FE: Upload Crop leaf photo (e.g. Leaf Blight)
    FE->>BE: POST /api/v1/agents/diagnose (image payload)
    
    rect rgb(240, 253, 244)
        note over BE, Gemini: AI Diagnostic & Optimization Loop
        BE->>Gemini: Classify disease anomalies (Google ADK)
        Gemini-->>BE: Disease Identified: Leaf Blight (Confidence 95.6%)
        BE->>BE: Calculate Optimized Dosage & Cost Savings ($420 saved)
    end

    rect rgb(239, 246, 255)
        note over BE, Drone: Hardware Telemetry & Actuation via MCP
        BE->>MCP: Query soil parameters & drone GPS coords
        MCP-->>BE: Coordinates: Zone-04 (GPS: -34.82, 138.60)
        BE->>MCP: Call tool: dispatch_spray_drone(Zone-04, 1.45L/ha)
        MCP->>Drone: Take off & Execute spot-spraying mission
        Drone-->>MCP: Mission SUCCESS
        MCP-->>BE: Log: Spray cycle completed successfully
    end

    BE-->>FE: Return JSON (Disease, Savings, Drone log feeds)
    FE-->>Farmer: Render stats, progress grid updates, & logs
```

---

## 📂 Core Repository Modules

Instead of monolithic models, EcoGuard AI splits presentation, orchestration, domain calculation, and device tools into clean layers:

### 1. Frontend Web Client (`/frontend`)
Powered by Next.js 15, styled with vanilla Tailwind CSS and shadcn/ui.
* **`/app/dashboard/`**: File-system routes mapping directly to Dashboard pages:
  - `page.tsx`: General statistics, and active zone status lists.
  - `upload/`: Visual capture area with simulator triggers and log monitors.
  - `analytics/`: Main Recharts visualization suite (distribution, comparisons, and timelines).
  - `settings/`: Host configuration controls.
* **`/components/`**: Divided into layout components (Sidebar, Navbar) and interactive charts (HealthPieChart, SprayComparisonChart, HealthGauge, TreatmentTimeline, and the 10x10 SprayGrid).

### 2. Backend Orchestration Server (`/backend`)
Powered by FastAPI, SQLAlchemy, and Google ADK.
* **`app/routers/`**: Standard REST controllers:
  - `agents.py`: Dispatches images to Gemini visual reasoning models.
  - `farms.py`: Core CRUD endpoint operations for fields and crops.
  - `telemetry.py`: Ingestion endpoints for IoT sensors.
* **`app/agents/`**: Core multi-agent logic scripts powered by Gemini 2.5 Flash:
  - `crop_agent.py`: Identifies crop disease types.
  - `spray_agent.py`: Computes spatial target schedules.
* **`app/services/`**: Core mathematical calculations:
  - `pesticide.py`: Spot-spraying formula constraints.
  - `weather.py`: Local coordinates forecasting via Open-Meteo.
* **`app/database/`**: Configures PostgreSQL schema entities (`models.py`) and connection sessions (`session.py`, `connection.py`).

### 3. Model Context Protocol Server (`/backend/mcp_server`)
* Exposes domain-specific APIs (soil telemetry retrieval, real-time drone battery levels, drone navigation triggers) as standard MCP tools.
* Operates as a FastMCP instance (`server.py`), decoupling core LLM logic from hardware driver libraries.
