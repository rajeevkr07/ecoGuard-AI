import React from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityCard } from "@/components/dashboard/activity-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  Sprout,
  Droplet,
  Cpu,
  TrendingDown,
} from "lucide-react"

const recentActivity = [
  {
    id: "1",
    title: "Spray mission completed",
    description: "Zone-04 (Wheat B) received 2.35L precision spray. Drone returned to dock.",
    timestamp: "2 minutes ago",
    status: "success" as const,
  },
  {
    id: "2",
    title: "Wheat Rust detected",
    description: "Gemini Vision Agent identified Puccinia triticina in Zone-04 field camera feed.",
    timestamp: "8 minutes ago",
    status: "error" as const,
  },
  {
    id: "3",
    title: "Moisture alert triggered",
    description: "Zone-04 soil moisture dropped to 28.4%, below critical threshold of 30%.",
    timestamp: "12 minutes ago",
    status: "warning" as const,
  },
  {
    id: "4",
    title: "Telemetry sync complete",
    description: "All 12 IoT sensor nodes reported successfully. Data stored in PostgreSQL.",
    timestamp: "35 minutes ago",
    status: "info" as const,
  },
]

const zoneColumns = ["Zone", "Crop", "NDVI", "Moisture", "Status", "Last Scan"]
const zoneRows = [
  [
    "ZONE-01",
    "Wheat (Primary)",
    "0.78",
    "45.2%",
    <StatusBadge key="z1" label="HEALTHY" variant="success" />,
    "3 min ago",
  ],
  [
    "ZONE-02",
    "Rice (Paddy A)",
    "0.82",
    "68.1%",
    <StatusBadge key="z2" label="OPTIMAL" variant="success" />,
    "5 min ago",
  ],
  [
    "ZONE-03",
    "Maize (Corn Belt)",
    "0.65",
    "38.7%",
    <StatusBadge key="z3" label="MONITOR" variant="warning" />,
    "8 min ago",
  ],
  [
    "ZONE-04",
    "Wheat (Block B)",
    "0.52",
    "28.4%",
    <StatusBadge key="z4" label="STRESSED" variant="error" />,
    "1 min ago",
  ],
]

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Monitor your farm zones, agent diagnostics, and spray missions in real time."
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active Zones"
          value={12}
          icon={Sprout}
          trend={{ value: "2 new", positive: true }}
          description="Across 3 farm regions"
        />
        <StatCard
          title="Avg Soil Moisture"
          value="42.1%"
          icon={Droplet}
          trend={{ value: "3.2%", positive: false }}
          description="1 zone below critical threshold"
        />
        <StatCard
          title="Agent Runs Today"
          value={28}
          icon={Cpu}
          trend={{ value: "12%", positive: true }}
          description="Gemini diagnostic + spray pipelines"
        />
        <StatCard
          title="Pesticide Saved"
          value="74.8%"
          icon={TrendingDown}
          trend={{ value: "8.3%", positive: true }}
          description="vs. blanket scheduling baseline"
        />
      </div>

      {/* Zone Monitoring + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold mb-3">Zone Monitoring</h3>
          <DataTable columns={zoneColumns} rows={zoneRows} />
        </div>
        <div>
          <ActivityCard title="Recent Activity" items={recentActivity} />
        </div>
      </div>
    </>
  )
}
