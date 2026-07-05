import React from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { DataTable } from "@/components/dashboard/data-table"
import { CalendarDays } from "lucide-react"

const historyColumns = ["Date", "Zone", "Agent", "Action", "Result", "Savings"]
const historyRows = [
  [
    "2026-07-05 13:42",
    "ZONE-04",
    "Spray Agent",
    "Precision spray dispatched",
    <StatusBadge key="h1" label="COMPLETED" variant="success" />,
    "2.35L saved",
  ],
  [
    "2026-07-05 13:38",
    "ZONE-04",
    "Crop Agent",
    "Wheat Rust diagnosis",
    <StatusBadge key="h2" label="DISEASE FOUND" variant="error" />,
    "—",
  ],
  [
    "2026-07-05 12:15",
    "ZONE-01",
    "Crop Agent",
    "Routine scan",
    <StatusBadge key="h3" label="HEALTHY" variant="success" />,
    "4.8L saved",
  ],
  [
    "2026-07-04 18:30",
    "ZONE-02",
    "Spray Agent",
    "Bacterial blight spray",
    <StatusBadge key="h4" label="COMPLETED" variant="success" />,
    "3.80L saved",
  ],
  [
    "2026-07-04 16:20",
    "ZONE-03",
    "Crop Agent",
    "Aphid cluster detection",
    <StatusBadge key="h5" label="MONITORING" variant="warning" />,
    "—",
  ],
  [
    "2026-07-04 09:00",
    "ALL",
    "System",
    "Scheduled telemetry sync",
    <StatusBadge key="h6" label="SYNCED" variant="neutral" />,
    "—",
  ],
  [
    "2026-07-03 14:55",
    "ZONE-01",
    "Spray Agent",
    "Preventive micro-dose",
    <StatusBadge key="h7" label="COMPLETED" variant="success" />,
    "1.20L saved",
  ],
  [
    "2026-07-03 10:10",
    "ZONE-02",
    "Crop Agent",
    "Leaf blight confirmed",
    <StatusBadge key="h8" label="DISEASE FOUND" variant="error" />,
    "—",
  ],
]

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        title="History"
        description="Full audit log of all agent actions, diagnostic results, and spray missions."
      >
        <button className="h-9 px-4 rounded-lg border border-border bg-card text-xs font-medium hover:bg-accent transition-colors flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5" />
          Filter by Date
        </button>
      </PageHeader>

      <DataTable columns={historyColumns} rows={historyRows} />
    </>
  )
}
