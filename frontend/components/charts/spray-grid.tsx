"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"

type CellStatus = "healthy" | "affected" | "monitor" | "sprayed"

const INITIAL_GRID: CellStatus[][] = [
  ["healthy","healthy","healthy","healthy","monitor","monitor","healthy","healthy","healthy","healthy"],
  ["healthy","healthy","healthy","monitor","monitor","affected","monitor","healthy","healthy","healthy"],
  ["healthy","healthy","monitor","monitor","affected","affected","affected","monitor","healthy","healthy"],
  ["healthy","monitor","monitor","affected","affected","affected","affected","monitor","monitor","healthy"],
  ["healthy","monitor","affected","affected","affected","affected","monitor","monitor","healthy","healthy"],
  ["healthy","healthy","monitor","affected","affected","monitor","monitor","healthy","healthy","healthy"],
  ["healthy","healthy","monitor","monitor","affected","monitor","healthy","healthy","healthy","healthy"],
  ["healthy","healthy","healthy","monitor","monitor","monitor","healthy","healthy","healthy","healthy"],
  ["healthy","healthy","healthy","healthy","monitor","healthy","healthy","healthy","healthy","healthy"],
  ["healthy","healthy","healthy","healthy","healthy","healthy","healthy","healthy","healthy","healthy"],
]

const CELL_STYLES: Record<CellStatus, string> = {
  healthy:  "bg-emerald-500/80 hover:bg-emerald-400 border-emerald-600/40",
  affected: "bg-red-500/80 hover:bg-red-400 border-red-600/40",
  monitor:  "bg-amber-400/80 hover:bg-amber-300 border-amber-500/40",
  sprayed:  "bg-blue-500/60 hover:bg-blue-400 border-blue-600/40",
}

const LEGEND = [
  { status: "healthy",  label: "Healthy",  color: "bg-emerald-500", count: 0 },
  { status: "monitor",  label: "Monitor",  color: "bg-amber-400",   count: 0 },
  { status: "affected", label: "Affected", color: "bg-red-500",     count: 0 },
  { status: "sprayed",  label: "Sprayed",  color: "bg-blue-500",    count: 0 },
]

function countCells(grid: CellStatus[][], status: CellStatus) {
  return grid.flat().filter((c) => c === status).length
}

export function SprayGrid() {
  const [grid, setGrid] = useState<CellStatus[][]>(INITIAL_GRID.map(row => [...row]))
  const [sprayMode, setSprayMode] = useState(false)
  const [tooltip, setTooltip] = useState<{ row: number; col: number } | null>(null)

  const toggleCell = (row: number, col: number) => {
    setGrid((prev) => {
      const next = prev.map(r => [...r])
      if (sprayMode && (next[row][col] === "affected" || next[row][col] === "monitor")) {
        next[row][col] = "sprayed"
      } else {
        // Cycle: healthy → monitor → affected → healthy
        const cycle: CellStatus[] = ["healthy", "monitor", "affected"]
        const idx = cycle.indexOf(next[row][col] as CellStatus)
        next[row][col] = idx === -1 ? "healthy" : cycle[(idx + 1) % cycle.length]
      }
      return next
    })
  }

  const sprayAllAffected = () => {
    setGrid((prev) =>
      prev.map(row =>
        row.map(cell => (cell === "affected" || cell === "monitor") ? "sprayed" : cell)
      )
    )
  }

  const resetGrid = () => {
    setGrid(INITIAL_GRID.map(row => [...row]))
  }

  const counts = {
    healthy:  countCells(grid, "healthy"),
    monitor:  countCells(grid, "monitor"),
    affected: countCells(grid, "affected"),
    sprayed:  countCells(grid, "sprayed"),
  }

  const affectedPct = Math.round((counts.affected / 100) * 100)
  const healthyPct  = Math.round((counts.healthy / 100) * 100)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-bold">Spray Visualization</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">10×10 field grid — click cells to change status</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSprayMode(!sprayMode)}
            className={cn(
              "h-8 px-3 rounded-lg text-[11px] font-bold transition-all",
              sprayMode
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                : "border border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {sprayMode ? "🚁 Spray Mode ON" : "🚁 Spray Mode"}
          </button>
          <button
            onClick={sprayAllAffected}
            className="h-8 px-3 rounded-lg text-[11px] font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
          >
            Spray All
          </button>
          <button
            onClick={resetGrid}
            className="h-8 w-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:bg-accent transition-colors"
            title="Reset grid"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {(["healthy", "monitor", "affected", "sprayed"] as CellStatus[]).map((s) => {
          const colors: Record<CellStatus, string> = {
            healthy:  "text-emerald-500",
            monitor:  "text-amber-400",
            affected: "text-red-500",
            sprayed:  "text-blue-500",
          }
          return (
            <div key={s} className="text-center py-2 px-1 rounded-lg bg-muted/30 border border-border">
              <p className={cn("text-lg font-extrabold", colors[s])}>{counts[s]}</p>
              <p className="text-[9px] text-muted-foreground capitalize">{s}</p>
            </div>
          )
        })}
      </div>

      {/* Grid */}
      <div
        className="grid gap-1 mx-auto"
        style={{ gridTemplateColumns: "repeat(10, 1fr)", maxWidth: 420 }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => toggleCell(rIdx, cIdx)}
              onMouseEnter={() => setTooltip({ row: rIdx, col: cIdx })}
              onMouseLeave={() => setTooltip(null)}
              className={cn(
                "relative aspect-square rounded-sm border cursor-pointer transition-all duration-150 hover:scale-110 hover:z-10",
                CELL_STYLES[cell]
              )}
              title={`[${rIdx + 1}, ${cIdx + 1}] — ${cell}`}
            />
          ))
        )}
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-muted-foreground font-medium">Healthy Coverage</span>
            <span className="font-bold text-emerald-500">{healthyPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${healthyPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-muted-foreground font-medium">Affected / Monitor</span>
            <span className="font-bold text-red-400">{affectedPct + Math.round((counts.monitor / 100) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${affectedPct + Math.round((counts.monitor / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4">
        {[
          { color: "bg-emerald-500", label: "Healthy — No spray needed" },
          { color: "bg-amber-400",   label: "Monitor — Watch closely" },
          { color: "bg-red-500",     label: "Affected — Spray required" },
          { color: "bg-blue-500",    label: "Sprayed — Treatment applied" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-sm shrink-0", color)} />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
