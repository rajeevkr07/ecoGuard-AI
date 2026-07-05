"use client"

import React from "react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts"

interface HealthGaugeProps {
  score?: number
}

function getScoreColor(score: number) {
  if (score >= 80) return "#10b981"
  if (score >= 60) return "#f59e0b"
  return "#ef4444"
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Fair"
  return "Critical"
}

export function HealthGauge({ score = 87 }: HealthGaugeProps) {
  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  const data = [
    { name: "score", value: score, fill: color },
    { name: "remainder", value: 100 - score, fill: "transparent" },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-2">
        <h3 className="text-sm font-bold">Overall Health Score</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Composite farm health index (0–100)</p>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="60%"
            innerRadius="60%"
            outerRadius="90%"
            startAngle={180}
            endAngle={0}
            data={data}
            barSize={16}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              background={{ fill: "rgba(255,255,255,0.05)" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-4 pointer-events-none">
          <span className="text-4xl font-black" style={{ color }}>
            {score}
          </span>
          <span className="text-xs font-bold mt-0.5" style={{ color }}>
            {label}
          </span>
        </div>
      </div>

      {/* Legend ticks */}
      <div className="flex justify-between px-4 -mt-1">
        <span className="text-[10px] text-red-400 font-bold">Critical</span>
        <span className="text-[10px] text-amber-400 font-bold">Fair</span>
        <span className="text-[10px] text-emerald-400 font-bold">Excellent</span>
      </div>

      {/* Sub-metrics */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
        {[
          { label: "Soil Health", val: 82 },
          { label: "Biodiversity", val: 91 },
          { label: "Water Safety", val: 88 },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-sm font-extrabold text-emerald-500">{m.val}</div>
            <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
