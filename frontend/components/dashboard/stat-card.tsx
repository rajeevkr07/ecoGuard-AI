import React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-xl border border-border bg-card hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 group",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/15 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
              trend.positive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>

      <p className="text-2xl font-extrabold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground font-medium mt-0.5">{title}</p>
      {description && (
        <p className="text-[10px] text-muted-foreground/70 mt-1.5">{description}</p>
      )}
    </div>
  )
}
