"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const sprayData = [
  { zone: "Zone-01", traditional: 8.4, ecoguard: 2.1 },
  { zone: "Zone-02", traditional: 9.2, ecoguard: 3.8 },
  { zone: "Zone-03", traditional: 7.6, ecoguard: 2.9 },
  { zone: "Zone-04", traditional: 10.1, ecoguard: 1.45 },
  { zone: "Zone-05", traditional: 8.8, ecoguard: 0.0 },
  { zone: "Zone-06", traditional: 9.5, ecoguard: 3.2 },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-lg text-xs space-y-1">
        <p className="font-bold mb-1.5">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-bold">{p.value.toFixed(2)} L/ha</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function SprayComparisonChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold">Spray Volume Comparison</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Traditional vs EcoGuard AI (Liters per Hectare)</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={sprayData}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="zone"
            tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
            axisLine={false}
            tickLine={false}
            unit=" L"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            formatter={(value) => <span className="text-xs font-medium">{value}</span>}
          />
          <Bar
            dataKey="traditional"
            name="Traditional Spray"
            fill="#f87171"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            dataKey="ecoguard"
            name="EcoGuard AI"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
