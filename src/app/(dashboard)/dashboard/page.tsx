"use client";

import { useState } from "react";
import { KPICard } from "./_components/KPICard";
import { ProjectPipeline } from "./_components/ProjectPipeline";
import { RecentActivityFeed } from "./_components/RecentActivityFeed";
import { SidebarWidgets } from "./_components/SidebarWidgets";
import { IndustryBenchmarksChart } from "./_components/IndustryBenchmarksChart";
import { RecentReports } from "./_components/RecentReports";
import { EmptyState } from "./_components/EmptyState";
import { RatingStars } from "./_components/RatingStars";
import { BarChart3, TrendingUp, FileText, Award } from "lucide-react";

const hasProjects = true; // Toggle this to show/hide empty state

export default function DashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  if (!hasProjects) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Welcome back! Here's your market analysis overview.
        </p>
      </div>

      {/* KPI Cards Grid - Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Total Projects"
          value="12"
          subtitle="Active projects"
          trend={{ direction: "up", value: "+3 this month" }}
          icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
        />
        <KPICard
          title="Avg Demand Score"
          value="7.8"
          subtitle={<span className="flex items-center gap-1">out of 10 <RatingStars rating={7.8} size="sm" /></span>}
          trend={{ direction: "up", value: "+0.6 this month" }}
          icon={<Award className="w-5 h-5 text-yellow-600" />}
        />
        <KPICard
          title="Total Jobs Analyzed"
          value="2,847"
          subtitle="Job listings processed"
          trend={{ direction: "up", value: "+342 this month" }}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
        <KPICard
          title="Reports Generated"
          value="18"
          subtitle="PDF & PowerPoint"
          trend={{ direction: "up", value: "+5 this month" }}
          icon={<FileText className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Project Pipeline */}
      <ProjectPipeline onFilterByStatus={setSelectedStatus} />

      {/* Recent Activity & Sidebar Layout - Desktop: 2/3-1/3, Tablet: full width with stacking, Mobile: full width */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content (Left) - Desktop & Tablet: 2 cols, Mobile: full width */}
        <div className="md:col-span-2 lg:col-span-2 space-y-6 md:space-y-8">
          {/* Recent Activity Feed */}
          <RecentActivityFeed />

          {/* Industry Benchmarks Chart */}
          <IndustryBenchmarksChart />

          {/* Recent Reports */}
          <RecentReports />
        </div>

        {/* Sidebar Widgets (Right) - Desktop & Tablet: 1 col, Mobile: full width */}
        <div className="md:col-span-1 lg:col-span-1">
          <SidebarWidgets />
        </div>
      </div>
    </div>
  );
}
