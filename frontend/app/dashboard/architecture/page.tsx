"use client"

import React, { useState } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { 
  Server, 
  Cpu, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Workflow, 
  Code,
  Compass,
  FileText
} from "lucide-react"

interface Step {
  number: number
  sender: string
  receiver: string
  action: string
  details: string
  type: "ui" | "ai" | "mcp" | "hardware"
}

export default function ArchitecturePage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps: Step[] = [
    {
      number: 1,
      sender: "Farm Admin",
      receiver: "Next.js Dashboard",
      action: "Upload Crop Photo",
      details: "The farmer uploads a leaf photo (e.g. displaying Leaf Blight rust) or clicks 'Run Demo' on the Next.js Dashboard.",
      type: "ui"
    },
    {
      number: 2,
      sender: "Next.js Dashboard",
      receiver: "FastAPI Backend",
      action: "POST /api/v1/agents/diagnose",
      details: "The client-side app forwards the image binary payload to the FastAPI backend REST API controller.",
      type: "ui"
    },
    {
      number: 3,
      sender: "FastAPI Backend",
      receiver: "Gemini 2.5 Flash",
      action: "Image Diagnostics Reasoning",
      details: "The backend dispatches the leaf image using the Google GenAI SDK (ADK) to identify anomalies, disease types, and severity metrics.",
      type: "ai"
    },
    {
      number: 4,
      sender: "Gemini 2.5 Flash",
      receiver: "FastAPI Backend",
      action: "Diagnosis Label Response",
      details: "Gemini returns the classified disease (e.g. Leaf Blight) with a confidence score (e.g. 95.6%) and severity parameters.",
      type: "ai"
    },
    {
      number: 5,
      sender: "FastAPI Backend",
      receiver: "Pesticide Service",
      action: "Optimize Dosage Calculations",
      details: "The custom algorithm runs pesticide/herbicide equations using NDVI and moisture telemetry, reducing chemical runoff by up to 81%.",
      type: "ai"
    },
    {
      number: 6,
      sender: "FastAPI Backend",
      receiver: "FastMCP Server",
      action: "Query Sensors & Coordinates",
      details: "The backend calls the local FastMCP tool server over the Model Context Protocol to fetch coordinates and IoT soil parameters.",
      type: "mcp"
    },
    {
      number: 7,
      sender: "FastMCP Server",
      receiver: "IoT Spray Drone",
      action: "dispatch_spray_drone(Zone-04, 1.45L/ha)",
      details: "FastMCP tool initiates physical actuation, dispatching the precision spray drone to the targeted GPS coordinates to execute the spot-spraying mission.",
      type: "hardware"
    },
    {
      number: 8,
      sender: "IoT Spray Drone",
      receiver: "Next.js Dashboard",
      action: "Success Logs & Metrics Feed",
      details: "The mission logs, environmental saving stats, and cost reduction analytics are returned to the client and updated on the dashboard.",
      type: "ui"
    }
  ]

  const components = [
    {
      name: "Frontend Client (/frontend)",
      tech: "Next.js 15 (App Router), React 19, Tailwind CSS, Recharts",
      desc: "Delivers the user dashboard, metrics visualizations, live event feeds, and the interactive 10x10 spray grid controller.",
      icon: Layers,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "Orchestration Backend (/backend)",
      tech: "FastAPI, Google GenAI SDK (ADK), Pydantic v2, SQLAlchemy",
      desc: "Handles incoming API requests, manages the SQLite/PostgreSQL telemetry session states, runs local weather optimization services, and invokes Gemini agents.",
      icon: Server,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      name: "FastMCP Tool Server (/backend/mcp_server)",
      tech: "FastMCP Python SDK, SSE Transports, Stdio Protocol",
      desc: "Exposes critical hardware hooks (sensor readers, GPS navigation, drone flight controller triggers) as Standard MCP Tools, decoupling LLMs from raw IoT drivers.",
      icon: Terminal,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      name: "Multi-Agent AI Layer",
      tech: "Gemini 2.5 Flash, Google GenAI Client",
      desc: "Specialized agent reasoning loop coordinating crop vision diagnosis, environmental severity assessment, and spot spray volume calculations.",
      icon: Cpu,
      color: "text-red-500 bg-red-500/10 border-red-500/20"
    }
  ]

  const codeStructure = [
    {
      dir: "frontend/app",
      files: [
        { name: "page.tsx", desc: "Vercel-style landing page showing product feature highlights." },
        { name: "dashboard/page.tsx", desc: "Overview dashboard displaying active zones and recent telemetry logs." },
        { name: "dashboard/upload/page.tsx", desc: "Image drag-drop upload area with precision simulator and logs." },
        { name: "dashboard/analytics/page.tsx", desc: "Analytics suite including Recharts health charts and the 10x10 SprayGrid." }
      ]
    },
    {
      dir: "backend/app",
      files: [
        { name: "main.py", desc: "Entry point for FastAPI backend server, loading CORS and router sub-systems." },
        { name: "agents/crop_agent.py", desc: "Google ADK Gemini client performing leaf diagnostics classification." },
        { name: "agents/spray_agent.py", desc: "Combines diagnostic findings with telemetry thresholds to recommend spray actions." },
        { name: "services/pesticide.py", desc: "Pesticide minimization and cost savings optimization algorithm." },
        { name: "services/weather.py", desc: "Fetches local weather telemetry via the free Open-Meteo API." }
      ]
    },
    {
      dir: "backend/mcp_server",
      files: [
        { name: "server.py", desc: "Initializes the FastMCP server, defining tools like read_soil_moisture and dispatch_spray_drone." }
      ]
    }
  ]

  return (
    <>
      <PageHeader
        title="Project Architecture"
        description="Detailed specification of EcoGuard AI's multi-agent loop, data flows, and codebase modules."
      />

      <div className="space-y-8">
        {/* Quick Intro */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <Workflow className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold">Multi-Agent Decoupled Orchestration</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
            EcoGuard AI leverages a multi-agent control loop to bridge cloud-based visual recognition with localized physical hardware actuation. By deploying specialized agents using the **Google ADK &amp; Gemini 2.5 Flash** alongside **Model Context Protocol (MCP)** tool abstractions, we ensure that crop diagnostics remain completely decoupled from IoT device drivers.
          </p>
        </div>

        {/* Multi-Agent Data Flow Timeline */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6">
            <h2 className="text-sm font-bold">Interactive Telemetry &amp; Actuation Data Flow</h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Click any step in the sequence below to inspect the details of the orchestration loop.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps List */}
            <div className="lg:col-span-1 space-y-2">
              {steps.map((step) => {
                const colors = {
                  ui: "border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5",
                  ai: "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5",
                  mcp: "border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/5",
                  hardware: "border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/5",
                }
                const activeColors = {
                  ui: "border-emerald-500 bg-emerald-500/10",
                  ai: "border-red-500 bg-red-500/10",
                  mcp: "border-amber-500 bg-amber-500/10",
                  hardware: "border-blue-500 bg-blue-500/10",
                }
                const isActive = activeStep === step.number
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(isActive ? null : step.number)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all duration-200 ${
                      isActive ? activeColors[step.type] : colors[step.type]
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-extrabold text-muted-foreground">Step 0{step.number}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                        step.type === "ui" ? "bg-emerald-500/10 text-emerald-500" :
                        step.type === "ai" ? "bg-red-500/10 text-red-500" :
                        step.type === "mcp" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {step.type}
                      </span>
                    </div>
                    <div className="font-bold flex items-center gap-1 font-sans">
                      {step.action}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 truncate">
                      {step.sender} → {step.receiver}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-2 flex flex-col justify-between rounded-xl bg-muted/30 border border-border p-6 min-h-[300px]">
              {activeStep !== null ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-muted-foreground">Detailed View — Step {activeStep}</span>
                      <h3 className="text-base font-bold mt-1 text-emerald-500">
                        {steps[activeStep - 1].action}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full">
                      {steps[activeStep - 1].type.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Sender Node</p>
                      <p className="font-bold text-foreground mt-0.5">{steps[activeStep - 1].sender}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Receiver Node</p>
                      <p className="font-bold text-foreground mt-0.5">{steps[activeStep - 1].receiver}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Execution Summary</p>
                    <p className="text-xs leading-relaxed text-zinc-300">
                      {steps[activeStep - 1].details}
                    </p>
                  </div>

                  {activeStep === 3 && (
                    <div className="bg-black/45 border border-border/50 rounded-lg p-3 font-mono text-[9px] text-zinc-300">
                      <p className="text-emerald-500 mb-1">{"// Google GenAI ADK Invocations"}</p>
                      <p>response = client.models.generate_content(</p>
                      <p className="pl-4">model=&apos;gemini-2.5-flash&apos;,</p>
                      <p className="pl-4">contents=[leaf_photo, &quot;Identify crop status...&quot;]</p>
                      <p>)</p>
                    </div>
                  )}

                  {activeStep === 7 && (
                    <div className="bg-black/45 border border-border/50 rounded-lg p-3 font-mono text-[9px] text-zinc-300">
                      <p className="text-emerald-500 mb-1">{"// FastMCP Tool Actuation"}</p>
                      <p>{"@mcp.tool()"}</p>
                      <p>{"async def dispatch_spray_drone(farm_id: int, volume_liters: float, coordinates: str):"}</p>
                      <p className="pl-4">{"# Command drone flight board ..."}</p>
                      <p className="pl-4">return f&quot;Drone dispatched to farm...&quot;</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground space-y-3">
                  <Workflow className="w-10 h-10 text-muted-foreground/30 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Select a step in the pipeline</p>
                    <p className="text-[10px] mt-1">Click on any pipeline block to trace parameters, variables, and API responses.</p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  All interface pipelines validated
                </span>
                <span>Press any step to animate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Modules Grid */}
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Core System Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {components.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.name} className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${c.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">{c.name}</h3>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{c.tech}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Repository Codebase Map */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-4 h-4 text-emerald-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Repository Map &amp; Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {codeStructure.map((folder) => (
              <div key={folder.dir} className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-mono text-xs font-bold text-foreground">{folder.dir}/</span>
                </div>
                <div className="space-y-2 pl-3 border-l border-border">
                  {folder.files.map((file) => (
                    <div key={file.name} className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-muted-foreground" />
                        <span className="font-mono text-[10px] font-semibold text-zinc-300">{file.name}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground pl-4 leading-tight">{file.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
