"use client"

import React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { CalendarDays, Droplet, Cpu } from "lucide-react"

const timelineData = [
  { date: "Jun 28", spray: 0, scan: 1, moisture: 42 },
  { date: "Jun 30", spray: 0, scan: 0, moisture: 38 },
  { date: "Jul 01", spray: 1, scan: 1, moisture: 30 },
  { date: "Jul 02", spray: 0, scan: 0, moisture: 35 },
  { date: "Jul 03", spray: 1, scan: 1, moisture: 32 },
  { date: "Jul 04", spray: 0, scan: 1, moisture: 40 },
  { date: "Jul 05", spray: 1, scan: 1, moisture: 28 },
]

const events = [
  { date: "Jul 05", type: "spray", label: "Leaf Blight Spray", zone: "Zone-04", color: "#10b981" },
  { date: "Jul 03", type: "spray", label: "Preventive Spray", zone: "Zone-02", color: "#10b981" },
  { date: "Jul 04", type: "scan", label: "Routine Diagnostic", zone: "Zone-01", color: "#3b82f6" },
  { date: "Jul 01", type: "spray", label: "Bacterial Blight Spray", zone: "Zone-02", color: "#10b981" },
  { date: "Jun 28", type: "scan", label: "Scheduled Field Scan", zone: "All Zones", color: "#3b82f6" },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number }[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-lg text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-blue-400">
          Moisture: <span className="font-bold">{payload[0]?.value}%</span>
        </p>
      </div>
    )
  }
  return null
}

export function TreatmentTimeline() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold">Treatment Schedule</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Spray missions and diagnostic scans over time</p>
      </div>

      {/* Soil moisture trend */}
      <div className="mb-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Soil Moisture Trend</p>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart
            data={timelineData}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
              axisLine={false}
              tickLine={false}
              domain={[20, 55]}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: "Threshold", position: "right", fontSize: 9, fill: "#ef4444" }} />
            <Area
              type="monotone"
              dataKey="moisture"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#moistureGradient)"
              dot={{ fill: "#3b82f6", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Events log */}
      <div className="border-t border-border pt-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-3">Recent Events</p>
        <div className="space-y-2">
          {events.map((ev, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: ev.color + "18" }}
              >
                {ev.type === "spray" ? (
                  <Droplet className="w-3.5 h-3.5" style={{ color: ev.color }} />
                ) : (
                  <Cpu className="w-3.5 h-3.5" style={{ color: ev.color }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{ev.label}</p>
                <p className="text-[10px] text-muted-foreground">{ev.zone}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                <CalendarDays className="w-3 h-3" />
                {ev.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
