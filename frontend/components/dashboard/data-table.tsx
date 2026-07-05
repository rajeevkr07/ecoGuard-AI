import React from "react"
import { cn } from "@/lib/utils"

interface DataTableProps {
  columns: string[]
  rows: (string | React.ReactNode)[][]
  className?: string
}

export function DataTable({ columns, rows, className }: DataTableProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-xs">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
