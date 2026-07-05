"use client"

import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface HealthPieChartProps {
  healthy?: number
  diseased?: number
}

const COLORS = ["#10b981", "#ef4444"]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-emerald-500 font-semibold">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx?: number; cy?: number; midAngle?: number; innerRadius?: number; outerRadius?: number; percent?: number
}) => {
  const _cx = cx ?? 0
  const _cy = cy ?? 0
  const _midAngle = midAngle ?? 0
  const _innerRadius = innerRadius ?? 0
  const _outerRadius = outerRadius ?? 0
  const _percent = percent ?? 0
  const radius = _innerRadius + (_outerRadius - _innerRadius) * 0.5
  const x = _cx + radius * Math.cos(-_midAngle * RADIAN)
  const y = _cy + radius * Math.sin(-_midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(_percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function HealthPieChart({ healthy = 88, diseased = 12 }: HealthPieChartProps) {
  const data = [
    { name: "Healthy", value: healthy },
    { name: "Diseased", value: diseased },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold">Field Health Distribution</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Healthy vs Diseased crop surface area</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs font-medium">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-around pt-2 border-t border-border mt-2">
        <div className="text-center">
          <p className="text-xl font-extrabold text-emerald-500">{healthy}%</p>
          <p className="text-[10px] text-muted-foreground">Healthy</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-xl font-extrabold text-red-500">{diseased}%</p>
          <p className="text-[10px] text-muted-foreground">Diseased</p>
        </div>
      </div>
    </div>
  )
}
