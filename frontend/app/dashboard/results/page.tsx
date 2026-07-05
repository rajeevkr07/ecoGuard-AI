import React from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { DataTable } from "@/components/dashboard/data-table"
import { Eye, Download } from "lucide-react"

const resultColumns = ["Run ID", "Zone", "Diagnosis", "Dosage (L/ha)", "Confidence", "Status", "Actions"]
const resultRows = [
  [
    <span key="r1" className="font-mono text-muted-foreground">RUN-0041</span>,
    "ZONE-04",
    "Wheat Rust (Puccinia triticina)",
    "2.35",
    "94.8%",
    <StatusBadge key="s1" label="SPRAYED" variant="success" />,
    <div key="a1" className="flex gap-1">
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button>
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Download className="w-3.5 h-3.5" /></button>
    </div>,
  ],
  [
    <span key="r2" className="font-mono text-muted-foreground">RUN-0040</span>,
    "ZONE-03",
    "Mild Aphid Cluster",
    "1.10",
    "87.2%",
    <StatusBadge key="s2" label="PENDING" variant="warning" />,
    <div key="a2" className="flex gap-1">
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button>
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Download className="w-3.5 h-3.5" /></button>
    </div>,
  ],
  [
    <span key="r3" className="font-mono text-muted-foreground">RUN-0039</span>,
    "ZONE-01",
    "No disease detected",
    "0.00",
    "96.1%",
    <StatusBadge key="s3" label="SKIPPED" variant="neutral" />,
    <div key="a3" className="flex gap-1">
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button>
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Download className="w-3.5 h-3.5" /></button>
    </div>,
  ],
  [
    <span key="r4" className="font-mono text-muted-foreground">RUN-0038</span>,
    "ZONE-02",
    "Bacterial Leaf Blight",
    "3.80",
    "91.5%",
    <StatusBadge key="s4" label="SPRAYED" variant="success" />,
    <div key="a4" className="flex gap-1">
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button>
      <button className="p-1 rounded hover:bg-accent text-muted-foreground"><Download className="w-3.5 h-3.5" /></button>
    </div>,
  ],
]

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        title="Results"
        description="View diagnostic results from all completed agent pipeline runs."
      >
        <button className="h-9 px-4 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </PageHeader>

      <DataTable columns={resultColumns} rows={resultRows} />
    </>
  )
}
