"use client"

import React, { useState } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Save, Key, Globe, Bell, Database } from "lucide-react"

interface SettingsSectionProps {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

function SettingsSection({ icon, title, description, children }: SettingsSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function SettingsInput({ label, placeholder, type = "text", defaultValue = "" }: {
  label: string
  placeholder: string
  type?: string
  defaultValue?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
      />
    </div>
  )
}

function SettingsToggle({ label, description, defaultChecked = false }: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-10 h-5 rounded-full transition-colors relative ${
          checked ? "bg-emerald-500" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your EcoGuard AI platform preferences and API integrations."
      >
        <button className="h-9 px-5 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsSection
          icon={<Key className="w-4 h-4" />}
          title="API Keys"
          description="Configure external API integrations"
        >
          <SettingsInput
            label="Google Gemini API Key"
            placeholder="AIza..."
            type="password"
          />
          <SettingsInput
            label="Open-Meteo Region Override"
            placeholder="latitude,longitude"
            defaultValue="-34.82, 138.60"
          />
        </SettingsSection>

        <SettingsSection
          icon={<Database className="w-4 h-4" />}
          title="Database"
          description="PostgreSQL connection settings"
        >
          <SettingsInput
            label="Database URL"
            placeholder="postgresql://user:pass@host:5432/db"
            defaultValue="postgresql://postgres:postgres@localhost:5432/ecoguard"
          />
          <SettingsToggle
            label="Connection Pooling"
            description="Enable SQLAlchemy connection pool pre-ping"
            defaultChecked={true}
          />
        </SettingsSection>

        <SettingsSection
          icon={<Globe className="w-4 h-4" />}
          title="MCP Server"
          description="Model Context Protocol server configuration"
        >
          <SettingsInput
            label="MCP Server URL"
            placeholder="http://localhost:8001"
            defaultValue="http://localhost:8001"
          />
          <SettingsToggle
            label="Auto-Connect on Startup"
            description="Automatically connect to MCP server when backend starts"
            defaultChecked={true}
          />
          <SettingsToggle
            label="Expose Drone Tool"
            description="Allow agents to dispatch spray drones via MCP"
            defaultChecked={true}
          />
        </SettingsSection>

        <SettingsSection
          icon={<Bell className="w-4 h-4" />}
          title="Notifications"
          description="Alert preferences for monitoring events"
        >
          <SettingsToggle
            label="Critical Moisture Alerts"
            description="Notify when soil moisture drops below threshold"
            defaultChecked={true}
          />
          <SettingsToggle
            label="Disease Detection Alerts"
            description="Notify when Gemini identifies crop diseases"
            defaultChecked={true}
          />
          <SettingsToggle
            label="Mission Completion Reports"
            description="Notify when spray drone missions complete"
            defaultChecked={false}
          />
        </SettingsSection>
      </div>
    </>
  )
}
