"use client"

import React, { useState, useEffect } from "react"
import { 
  Shield, 
  Eye, 
  Droplet, 
  LineChart, 
  Terminal as TerminalIcon, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  RefreshCw
} from "lucide-react"

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [activeTab, setActiveTab] = useState<"farms" | "telemetry" | "logs">("farms")
  const [simulating, setSimulating] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "System initialized. Awaiting IoT data...",
    "MCP Server status: CONNECTED (2 tools exposed: read_soil_moisture, dispatch_spray_drone)",
    "Google ADK Client: ONLINE (Gemini 2.5 Flash ready)"
  ])

  // Simple theme toggler
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Effect to set dark mode on page load
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  // Run mock diagnostic pipeline simulation
  const runSimulation = () => {
    if (simulating) return
    setSimulating(true)
    setLogs([
      "Triggering diagnostics for field 04 (Wheat Zone B)...",
    ])

    const steps = [
      "Fetching moisture and temperature telemetry from PostgreSQL...",
      "Result: Moisture = 28.4% (Critical Alert: threshold < 30.0%)",
      "Calling Gemini Crop Diagnostic Vision Agent with current field camera stream...",
      "Gemini: Disease identified: 'Wheat Rust Pustules' (Confidence: 94.8%)",
      "Invoking Pesticide Optimization Service...",
      "Algorithm: High pest severity + low soil moisture = Spraying REQUIRED.",
      "Calculated dosage: 2.35 Liters per Hectare (75% savings vs generic scheduling).",
      "Invoking MCP Tool: dispatch_spray_drone...",
      "MCP Command: drone_api.dispatch(farm_id=4, volume=2.35, coords='-34.82, 138.60')",
      "Drone response: Takeoff success. Executing precision path spray...",
      "Mission completed. Pesticide applied successfully. Returning to dock.",
      "Pipeline execution finished. System IDLE."
    ]

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step])
        if (idx === steps.length - 1) {
          setSimulating(false)
        }
      }, (idx + 1) * 1200)
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === "dark" ? "bg-black text-white" : "bg-zinc-50 text-zinc-900"}`}>
      
      {/* Radial Gradient Glow for Dark Mode */}
      {theme === "dark" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-transparent to-transparent pointer-events-none -z-10" />
      )}

      {/* Grid Overlay */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20 ${theme === "dark" ? "" : "opacity-30"}`} />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-opacity-70 transition-all duration-300 border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-white via-zinc-100 to-zinc-400 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              EcoGuard <span className="text-emerald-500">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-emerald-500 transition-colors">How It Works</a>
            <a href="#benefits" className="hover:text-emerald-500 transition-colors">Benefits</a>
            <a href="#docs" className="hover:text-emerald-500 transition-colors">Docs</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a 
              href="/dashboard" 
              className="hidden sm:inline-flex items-center justify-center text-sm font-medium h-9 px-4 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
            >
              Demo Sandbox
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-6 animate-pulse">
          <Cpu className="w-3.5 h-3.5" />
          Powered by Google Gemini 2.5 & FastMCP
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-b from-white to-zinc-400 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">EcoGuard AI</span>
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold tracking-wide text-emerald-500 mb-6">
          Detect. Analyze. Protect.
        </p>

        <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          A Multi-Agent Precision Agriculture platform designed to reduce pesticide volume, detect plant stress with computer vision, and orchestrate autonomous drone spray missions.
        </p>

        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row mb-20">
          <a
            href="/dashboard"
            className="w-full sm:w-auto h-11 px-8 rounded-full bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            Launch Platform Sandbox
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="file:///f:/ecoGaurd_AI/docs/README.md"
            className="w-full sm:w-auto h-11 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-950 transition-colors flex items-center justify-center gap-2"
          >
            Read API Specs
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dashboard Interactive Mockup */}
        <div id="dashboard-preview" className="relative max-w-5xl mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/80 shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] transition-all">
          
          {/* Mockup Title bar */}
          <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 select-none">
              ecoguard-sandbox // field-agent-terminal
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] text-zinc-400 font-mono">MCP: Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[420px]">
            {/* Sidebar navigation */}
            <div className="border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 p-4 flex flex-col gap-1 text-left">
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-2 pl-2">Dashboard</span>
              <button 
                onClick={() => setActiveTab("farms")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "farms" ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
              >
                <Layers className="w-3.5 h-3.5" />
                Active Zones & Crops
              </button>
              <button 
                onClick={() => setActiveTab("telemetry")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "telemetry" ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
              >
                <LineChart className="w-3.5 h-3.5" />
                Live Sensor Telemetry
              </button>
              <button 
                onClick={() => setActiveTab("logs")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "logs" ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                Agent Pipeline Logs
              </button>
              
              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button 
                  onClick={runSimulation}
                  disabled={simulating}
                  className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {simulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  {simulating ? "Executing..." : "Run Agent Diagnostic"}
                </button>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="col-span-3 p-6 text-left flex flex-col justify-between">
              
              {activeTab === "farms" && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Active Monitoring Zones</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold font-mono text-zinc-400">ZONE-01 (Wheat)</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">HEALTHY</span>
                      </div>
                      <p className="text-sm font-semibold mb-1">NDVI Index: 0.78</p>
                      <p className="text-xs text-zinc-400">Pesticide optimized. No action needed.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10 hover:border-red-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold font-mono text-zinc-400">ZONE-04 (Wheat B)</span>
                        <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold">STRESSED</span>
                      </div>
                      <p className="text-sm font-semibold mb-1">NDVI Index: 0.52</p>
                      <p className="text-xs text-red-400/90 font-medium">Rust pustules detected. Awaiting spray command.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "telemetry" && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Live Telemetry (FARM-01)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10">
                      <Droplet className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                      <span className="block text-[10px] text-zinc-400 font-medium">Moisture</span>
                      <span className="text-base font-bold">28.4%</span>
                    </div>
                    <div className="p-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10">
                      <Sun className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                      <span className="block text-[10px] text-zinc-400 font-medium">Temperature</span>
                      <span className="text-base font-bold">22.8 °C</span>
                    </div>
                    <div className="p-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10">
                      <LineChart className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
                      <span className="block text-[10px] text-zinc-400 font-medium">NDVI Index</span>
                      <span className="text-base font-bold">0.52</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed pl-1">
                    *Telemetry updates autonomously. Critical moisture threshold triggers automatic diagnostic request alerts.
                  </p>
                </div>
              )}

              {activeTab === "logs" && (
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Agent Run Log</h3>
                  <div className="flex-1 min-h-[180px] bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 font-mono text-xs overflow-y-auto flex flex-col gap-1.5 text-zinc-600 dark:text-zinc-300">
                    {logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-emerald-500 select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Prompt */}
              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {simulating ? "Pipeline running... watch logs" : "Click &apos;Run Agent Diagnostic&apos; to trigger full ingestion pipeline"}
                </span>
                <span className="font-bold text-emerald-500 tracking-wider uppercase flex items-center gap-1 select-none">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Designed for High Precision & Minimal Runoff
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              By combining Google&apos;s GenAI tools with localized sensor endpoints, EcoGuard AI closes the loop between diagnosis and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Gemini Multimodal Vision</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Feed crop photos into the Gemini 2.5 Flash model via the Google ADK. Identifies plant stress, leaf diseases, and weed types with high accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Precision Dosing Logic</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Calculates tailored pesticide requirements on-the-fly based on localized temperature, humidity, and vegetation indices (NDVI) rather than blanket spraying.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">MCP Tool Integration</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Exposes local actuators (drone deployment) and database connectors as standard tools directly queryable by your LLM agents without hardcoding API endpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Workflow Pipeline */}
      <section id="workflow" className="py-20 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How the Multi-Agent Pipeline Flows
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Four streamlined steps from raw telemetry streams to precision hardware deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center mx-auto mb-4 font-bold text-sm text-emerald-400 shadow-md">
                01
              </div>
              <h4 className="font-bold text-base mb-1">Telemetry Ingestion</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 px-4 leading-relaxed">
                IoT soil sensors transmit moisture levels to PostgreSQL database models.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center mx-auto mb-4 font-bold text-sm text-emerald-400 shadow-md">
                02
              </div>
              <h4 className="font-bold text-base mb-1">AI Diagnostic Agent</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 px-4 leading-relaxed">
                Gemini processes crop visual data alongside soil temperature metadata.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center mx-auto mb-4 font-bold text-sm text-emerald-400 shadow-md">
                03
              </div>
              <h4 className="font-bold text-base mb-1">Dosage Optimization</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 px-4 leading-relaxed">
                Algorithm calculates optimized pesticide dosing volume based on crop distress.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center mx-auto mb-4 font-bold text-sm text-emerald-400 shadow-md animate-pulse">
                04
              </div>
              <h4 className="font-bold text-base mb-1">Autonomous Dispatch</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 px-4 leading-relaxed">
                MCP command triggers precision spray drones to navigate to targeting coordinates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Real Impact for Modern Agriculture
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Improving yield survivability and reducing environmental runoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 text-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
              <span className="block text-5xl font-extrabold text-emerald-400 mb-2 font-mono">-75%</span>
              <h4 className="font-bold text-lg mb-1">Chemical Application Waste</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tailored micro-spraying avoids chemical saturation, reducing local water runoff.
              </p>
            </div>

            <div className="p-8 text-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
              <span className="block text-5xl font-extrabold text-emerald-400 mb-2 font-mono">+25%</span>
              <h4 className="font-bold text-lg mb-1">Operational Cost Savings</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Minimizing chemical purchase requirements while retaining total crop yield.
              </p>
            </div>

            <div className="p-8 text-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
              <span className="block text-5xl font-extrabold text-emerald-400 mb-2 font-mono">100%</span>
              <h4 className="font-bold text-lg mb-1">Hands-Free Automation</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Automated diagnostics connect database alerts to physical actuators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              EcoGuard AI
            </span>
          </div>

          <div className="flex items-center gap-6 text-zinc-500 dark:text-zinc-400">
            <a href="/dashboard" className="hover:underline hover:text-emerald-400">Documentation</a>
            <a href="/dashboard/architecture" className="hover:underline hover:text-emerald-400">Architecture</a>
            <a href="#workflow" className="hover:underline hover:text-emerald-400">System Pipeline</a>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse" />
            <span className="text-zinc-500 dark:text-zinc-400">All Systems Operational</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-center text-zinc-400 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} EcoGuard AI precision farming platform. Open source hackathon reference design.
        </div>
      </footer>
    </div>
  )
}
