"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Upload,
  FileCheck2,
  BarChart3,
  History,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Leaf,
  Workflow,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload", href: "/dashboard/upload", icon: Upload },
  { label: "Results", href: "/dashboard/results", icon: FileCheck2 },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Architecture", href: "/dashboard/architecture", icon: Workflow },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden">
            EcoGuard <span className="text-emerald-500">AI</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span
          className={cn(
            "block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3",
            collapsed ? "text-center" : "px-3"
          )}
        >
          {collapsed ? "•••" : "Menu"}
        </span>

        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-emerald-500/10 text-emerald-500 shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-2 border-t border-border pt-4 shrink-0">
        {/* Environment badge */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10",
            collapsed && "justify-center px-0"
          )}
        >
          <Leaf className="w-4 h-4 text-emerald-500 shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Eco Mode</p>
              <p className="text-[10px] text-muted-foreground truncate">Precision Active</p>
            </div>
          )}
        </div>

        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
