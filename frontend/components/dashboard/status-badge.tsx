import React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatusBadgeProps {
  label: string
  variant: "success" | "warning" | "error" | "neutral"
}

const variants = {
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  neutral: "bg-muted text-muted-foreground border-border",
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border",
        variants[variant]
      )}
    >
      {label}
    </span>
  )
}
