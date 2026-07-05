"use client"

import React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  User,
} from "lucide-react"

interface NavbarProps {
  sidebarCollapsed: boolean
  onMobileMenuToggle: () => void
}

export function Navbar({ sidebarCollapsed, onMobileMenuToggle }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-md transition-all duration-300",
        sidebarCollapsed ? "md:pl-[68px]" : "md:pl-[240px]"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left: Mobile menu + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border w-[280px]">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search fields, zones, agents..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
            />
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-card" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

          {/* User avatar */}
          <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-tight">Farm Admin</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Precision Tier</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
