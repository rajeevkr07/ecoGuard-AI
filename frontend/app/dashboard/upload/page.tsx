"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/dashboard/page-header"
import { 
  Upload as UploadIcon, 
  ImagePlus, 
  X, 
  Cpu, 
  RotateCcw,
  Sparkles
} from "lucide-react"

interface MockDiagnosticResult {
  crop: string
  disease: string
  confidence: string
  severity: string
  affected: string
  healthy: string
  chemicalSaving: string
  moneySaving: string
  recommendation: string
  optimizedDosage: string
  pesticideSavings: string
  mcpLogs: string[]
}

interface UploadedFile {
  name: string
  size: string
  previewUrl: string
  status: "ready" | "analyzing" | "completed" | "failed"
  progress: number
  result?: MockDiagnosticResult
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [analyzingAll, setAnalyzingAll] = useState(false)

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const imageFiles = droppedFiles.filter(f => f.type.startsWith("image/"))
    
    const newFiles: UploadedFile[] = imageFiles.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      previewUrl: URL.createObjectURL(file),
      status: "ready",
      progress: 0,
    }))
    
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  // File browse selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const imageFiles = selected.filter(f => f.type.startsWith("image/"))
    
    const newFiles: UploadedFile[] = imageFiles.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      previewUrl: URL.createObjectURL(file),
      status: "ready",
      progress: 0,
    }))
    
    setFiles((prev) => [...prev, ...newFiles])
  }

  // Remove file from list
  const removeFile = (index: number) => {
    const fileToRemove = files[index]
    if (fileToRemove.previewUrl && !fileToRemove.previewUrl.startsWith("/")) {
      URL.revokeObjectURL(fileToRemove.previewUrl)
    }
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Clear all files
  const clearAll = () => {
    files.forEach(f => {
      if (f.previewUrl && !f.previewUrl.startsWith("/")) {
        URL.revokeObjectURL(f.previewUrl)
      }
    })
    setFiles([])
  }

  // Run mock analysis on a file
  const runAnalysis = async (fileIndex: number) => {
    if (files[fileIndex].status !== "ready") return

    // Update status to analyzing
    setFiles(prev => prev.map((f, i) => i === fileIndex ? { ...f, status: "analyzing", progress: 5 } : f))

    // Simulate progress increase
    const duration = 2000 // 2 seconds
    const intervalTime = 100
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 95)
      setFiles(prev => prev.map((f, i) => i === fileIndex ? { ...f, progress: newProgress } : f))
    }, intervalTime)

    // Wait for the mock timer duration to finish
    await new Promise(resolve => setTimeout(resolve, duration))
    clearInterval(timer)

    // Generate mock diagnostic results based on file name or defaults
    const fileNameLower = files[fileIndex].name.toLowerCase()
    let mockResult: MockDiagnosticResult

    if (fileNameLower.includes("rust") || fileNameLower.includes("demo")) {
      mockResult = {
        crop: "Wheat (Block B)",
        disease: "Leaf Blight",
        confidence: "95.6%",
        severity: "Medium",
        affected: "12%",
        healthy: "88%",
        chemicalSaving: "81%",
        moneySaving: "$420",
        recommendation: "Targeted spot spray. Precise leaf-level chemical release.",
        optimizedDosage: "1.45 Liters per Hectare",
        pesticideSavings: "81.0% reduction compared to baseline",
        mcpLogs: [
          "[Ingestion] Telemetry read: Soil Moisture = 34.2% (Threshold: 30%)",
          "[Gemini Agent] Running leaf blight diagnostics classification...",
          "[Gemini Agent] Diagnosis: Leaf Blight detected (12% leaf surface area).",
          "[Pesticide Optimizer] Calculated optimized dosage: 1.45L/ha (81% chemical savings).",
          "[Pesticide Optimizer] Estimated cost savings: $420.",
          "[MCP Server] Executing tool: dispatch_spray_drone...",
          "[MCP Server] Drone dispatched to Zone-04 (GPS: -34.82, 138.60).",
          "[MCP Server] Spray cycle complete. Mission status: SUCCESS."
        ]
      }
    } else if (fileNameLower.includes("blight") || fileNameLower.includes("leaf")) {
      mockResult = {
        crop: "Rice (Paddy A)",
        disease: "Bacterial Leaf Blight (Xanthomonas oryzae)",
        confidence: "91.5%",
        severity: "Moderate (Yellow stripes on leaf blades)",
        affected: "24%",
        healthy: "76%",
        chemicalSaving: "61%",
        moneySaving: "$280",
        recommendation: "Localized preventive spraying around Sector 2.",
        optimizedDosage: "3.80 Liters per Hectare",
        pesticideSavings: "61.2% reduction compared to baseline",
        mcpLogs: [
          "[Ingestion] Telemetry read: Soil Moisture = 45.2% (Threshold: 30%)",
          "[Gemini Agent] Running disease classification model...",
          "[Gemini Agent] Diagnosis: Bacterial Leaf Blight detected at 91.5% confidence.",
          "[Pesticide Optimizer] Calculated optimized dosage: 3.80L/ha.",
          "[MCP Server] Executing tool: dispatch_spray_drone...",
          "[MCP Server] Drone dispatched to Zone-02 (GPS: -34.80, 138.58).",
          "[MCP Server] Spray cycle complete. Saved 61% chemical runoff."
        ]
      }
    } else {
      mockResult = {
        crop: "Maize (Corn Belt)",
        disease: "No active disease detected",
        confidence: "97.2%",
        severity: "Healthy (Normal vegetation index)",
        affected: "0%",
        healthy: "100%",
        chemicalSaving: "100%",
        moneySaving: "$540",
        recommendation: "No pesticide spraying required. Maintain current hydration schedule.",
        optimizedDosage: "0.00 Liters per Hectare",
        pesticideSavings: "100.0% reduction (skipped spray session)",
        mcpLogs: [
          "[Ingestion] Telemetry read: Soil Moisture = 38.7% (Threshold: 30%)",
          "[Gemini Agent] Running disease classification model...",
          "[Gemini Agent] Diagnosis: Healthy crop structure. Confidence: 97.2%",
          "[Pesticide Optimizer] Calculations show spraying is unnecessary.",
          "[MCP Server] Spray trigger status: SKIPPED. Drone kept at dock."
        ]
      }
    }

    setFiles(prev => prev.map((f, i) => i === fileIndex ? { 
      ...f, 
      status: "completed", 
      progress: 100, 
      result: mockResult 
    } : f))
  }

  // Trigger analysis for all files currently in "ready" state
  const analyzeAllFiles = async () => {
    if (analyzingAll) return
    setAnalyzingAll(true)
    
    // Find all indexes in ready state
    const readyIndexes = files
      .map((f, idx) => f.status === "ready" ? idx : -1)
      .filter(idx => idx !== -1)

    for (const idx of readyIndexes) {
      await runAnalysis(idx)
    }
    
    setAnalyzingAll(false)
  }

  // Load a pre-configured demo image to run immediately
  const runDemoMode = () => {
    const demoFile: UploadedFile = {
      name: "demo-wheat-rust.png",
      size: "248.5 KB",
      previewUrl: "/demo-wheat-rust.png",
      status: "ready",
      progress: 0,
    }

    // Set files array with this single demo file and run analysis on it
    setFiles([demoFile])
    
    // We delay slightly to let the state update before triggering analysis
    setTimeout(() => {
      runAnalysis(0)
    }, 100)
  }

  return (
    <>
      <PageHeader
        title="Upload"
        description="Upload crop leaf images or run our precision diagnostic simulator."
      >
        <div className="flex gap-2">
          {files.length > 0 && (
            <button
              onClick={clearAll}
              className="h-9 px-4 rounded-lg border border-border bg-card text-xs font-semibold hover:bg-accent text-muted-foreground transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={runDemoMode}
            className="h-9 px-4 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Run Demo
          </button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Column (Takes 2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 bg-card ${
              dragOver
                ? "border-emerald-500 bg-emerald-500/5 shadow-md shadow-emerald-500/5 scale-[1.01]"
                : "border-border hover:border-emerald-500/30"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <ImagePlus className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-base font-bold mb-1">Drag and drop crop images</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto">
              Upload photographs of leaves, plant stems, or soil regions to diagnose potential diseases and calculate spot-spraying volumes.
            </p>
            
            <label className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 cursor-pointer shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all">
              <UploadIcon className="w-4 h-4" />
              Browse Local Files
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Action buttons */}
          {files.some(f => f.status === "ready") && (
            <div className="flex justify-end gap-2">
              <button
                onClick={analyzeAllFiles}
                disabled={analyzingAll}
                className="h-10 px-6 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
              >
                <Cpu className="w-4 h-4" />
                Analyze Field
              </button>
            </div>
          )}

          {/* Uploaded Files list */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Files Queue ({files.length})
              </h3>
              
              <div className="space-y-3">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <div className="p-4 flex items-start gap-4">
                      {/* Image Preview */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                        <Image
                          src={file.previewUrl}
                          alt={file.name}
                          fill
                          className="object-cover"
                          unoptimized={file.previewUrl.startsWith("/")}
                        />
                      </div>

                      {/* File details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold truncate">{file.name}</p>
                          <button
                            onClick={() => removeFile(idx)}
                            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{file.size}</p>

                        {/* Progress and status */}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold font-mono text-emerald-500">
                            {file.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Result section (if completed) */}
                    {file.status === "completed" && file.result && (
                      <div className="border-t border-border bg-muted/10 p-5 space-y-5">
                        
                        {/* Result Header */}
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Analysis Complete</span>
                        </div>

                        {/* Stat Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { label: "Disease", value: file.result.disease, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
                            { label: "Severity", value: file.result.severity, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                            { label: "Confidence", value: file.result.confidence, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                            { label: "Affected Area", value: file.result.affected, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
                            { label: "Healthy Crop", value: file.result.healthy, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                            { label: "Target Crop", value: file.result.crop, color: "text-foreground", bg: "bg-muted/50 border-border" },
                          ].map((card) => (
                            <div key={card.label} className={`rounded-xl border p-3 ${card.bg}`}>
                              <p className="text-[10px] text-muted-foreground font-medium mb-1">{card.label}</p>
                              <p className={`text-sm font-bold ${card.color} leading-tight`}>{card.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Coverage Progress Bars */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-muted-foreground font-medium">Healthy Coverage</span>
                              <span className="font-bold text-emerald-500">{file.result.healthy}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: file.result.healthy }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-muted-foreground font-medium">Affected Coverage</span>
                              <span className="font-bold text-red-400">{file.result.affected}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full transition-all duration-1000" style={{ width: file.result.affected }} />
                            </div>
                          </div>
                        </div>

                        {/* Savings Cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                            <p className="text-2xl font-extrabold text-emerald-500">{file.result.chemicalSaving}</p>
                            <p className="text-[10px] text-muted-foreground font-medium mt-1">Chemical Reduction</p>
                          </div>
                          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                            <p className="text-2xl font-extrabold text-emerald-500">{file.result.moneySaving}</p>
                            <p className="text-[10px] text-muted-foreground font-medium mt-1">Money Saved / Hectare</p>
                          </div>
                        </div>

                        {/* Treatment Recommendation */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Treatment Plan</p>
                          <p className="text-xs font-medium leading-relaxed">{file.result.recommendation}</p>
                          <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1">
                            <span>Dosage: <strong className="text-foreground">{file.result.optimizedDosage}</strong></span>
                            <span>Savings: <strong className="text-emerald-500">{file.result.pesticideSavings}</strong></span>
                          </div>
                        </div>

                        {/* Agent Execution Logs */}
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agent Execution Logs</p>
                          <div className="bg-black/90 text-zinc-300 p-3 rounded-lg font-mono text-[10px] space-y-1 overflow-x-auto max-h-40">
                            {file.result.mcpLogs.map((log, lIdx) => (
                              <div key={lIdx} className="flex gap-2">
                                <span className="text-emerald-500 select-none">&gt;</span>
                                <span>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Info Column */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Demo Simulator Guide
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Don&apos;t have real crop disease photographs on hand? Click the **Run Demo** button above to load a simulated high-resolution leaf scan.
            </p>
            <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400">
              <strong>Tip:</strong> The simulator uses our free Open-Meteo and Google Gemini 2.5 Flash classification formats to produce precision spot-spraying outcomes.
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold mb-3">Diagnostic Workflow</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">1</div>
                <div>
                  <h4 className="text-xs font-bold">Image Capture</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Upload a JPEG/PNG photo of crop anomalies.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">2</div>
                <div>
                  <h4 className="text-xs font-bold">Gemini Classification</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Google Gemini detects pest infestations, fungi, or deficiencies.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">3</div>
                <div>
                  <h4 className="text-xs font-bold">MCP Local Dispatch</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">FastMCP tools trigger targeted drone spraying at precise coordinates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
