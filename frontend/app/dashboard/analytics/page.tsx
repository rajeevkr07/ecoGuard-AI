import React from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { HealthPieChart } from "@/components/charts/health-pie-chart"
import { SprayComparisonChart } from "@/components/charts/spray-comparison-chart"
import { HealthGauge } from "@/components/charts/health-gauge"
import { TreatmentTimeline } from "@/components/charts/treatment-timeline"
import { SprayGrid } from "@/components/charts/spray-grid"
import { TrendingDown, Droplet, Cpu, Leaf } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Visual insights on field health, spray efficiency, and treatment schedules."
      />

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Pesticide Saved"
          value="81%"
          icon={TrendingDown}
          trend={{ value: "8.3%", positive: true }}
          description="vs. traditional blanket spray"
        />
        <StatCard
          title="Avg Soil Moisture"
          value="34.2%"
          icon={Droplet}
          trend={{ value: "1.8%", positive: false }}
          description="1 zone below critical threshold"
        />
        <StatCard
          title="Agent Runs"
          value={186}
          icon={Cpu}
          trend={{ value: "12%", positive: true }}
          description="Gemini diagnostic pipeline"
        />
        <StatCard
          title="Eco Score"
          value="87 / 100"
          icon={Leaf}
          trend={{ value: "3 pts", positive: true }}
          description="Composite environmental index"
        />
      </div>

      {/* Charts Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pie */}
        <div>
          <HealthPieChart healthy={88} diseased={12} />
        </div>

        {/* Bar spans 2 cols */}
        <div className="lg:col-span-2">
          <SprayComparisonChart />
        </div>
      </div>

      {/* Charts Grid Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauge */}
        <div>
          <HealthGauge score={87} />
        </div>

        {/* Timeline spans 2 cols */}
        <div className="lg:col-span-2">
          <TreatmentTimeline />
        </div>
      </div>

      {/* Spray Grid */}
      <div className="mt-6">
        <SprayGrid />
      </div>
    </>
  )
}
