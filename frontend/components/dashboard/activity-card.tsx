import React from "react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
}

interface ActivityCardProps {
  title: string
  items: ActivityItem[]
  className?: string
}

const statusStyles = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
}

export function ActivityCard({ title, items, className }: ActivityCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        className
      )}
    >
      <h3 className="text-sm font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative flex flex-col items-center">
              <div className={cn("w-2.5 h-2.5 rounded-full mt-1 shrink-0", statusStyles[item.status])} />
              <div className="w-px flex-1 bg-border mt-1" />
            </div>
            <div className="min-w-0 pb-4">
              <p className="text-xs font-semibold leading-tight">{item.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
