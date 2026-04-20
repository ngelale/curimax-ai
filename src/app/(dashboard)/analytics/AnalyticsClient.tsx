"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  Activity,
} from "lucide-react";
import {
  kpiData,
  projectPerformanceData,
  topPrograms,
  industryData,
  topSkills,
  usageMetrics,
  projectStatusDistribution,
  demandScoreTrendData,
} from "./mock-data";

type TabType = "overview" | "projects" | "market" | "usage";
type DateRange = "7d" | "30d" | "90d" | "year" | "custom";

export default function AnalyticsClient() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  const getDemandScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    return "text-yellow-600";
  };

  const getDemandScoreBackground = (score: number) => {
    if (score >= 8) return "bg-green-50";
    if (score >= 7) return "bg-blue-50";
    return "bg-yellow-50";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800";
      case "analyzing":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">
            Deep insights into projects, usage, and trends
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="bg-transparent text-sm outline-none cursor-pointer"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="year">Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-8">
          {[
            { id: "overview" as TabType, label: "Overview" },
            { id: "projects" as TabType, label: "Projects" },
            { id: "market" as TabType, label: "Market Trends" },
            { id: "usage" as TabType, label: "Usage & Billing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-white">
                <p className="text-xs text-muted-foreground mb-2">{kpi.label}</p>
                <div className="text-2xl font-bold mb-2">{kpi.value}</div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    kpi.changeType === "positive"
                      ? "text-green-600"
                      : kpi.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {kpi.changeType === "positive" && <TrendingUp className="w-3 h-3" />}
                  {kpi.changeType === "negative" && <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Demand Score Trends */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="font-semibold mb-4">Demand Score Trends (Last 90 Days)</h3>
              <div className="h-64 bg-gradient-to-b from-blue-50 to-transparent rounded-lg p-4 flex flex-col justify-end">
                <div className="flex items-end justify-between h-48 gap-2">
                  {demandScoreTrendData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex gap-1 h-32 items-end">
                        <div
                          className="flex-1 bg-blue-600 rounded-t opacity-70"
                          style={{
                            height: `${(data.yourScore / 10) * 100}%`,
                            minHeight: "2px",
                          }}
                        />
                        <div
                          className="flex-1 bg-blue-300 rounded-t opacity-50"
                          style={{
                            height: `${(data.industryAvg / 10) * 100}%`,
                            minHeight: "2px",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    <span>Your Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full" />
                    <span>Industry Average</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Status Distribution */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="font-semibold mb-4">Project Status Distribution</h3>
              <div className="flex items-center justify-between">
                <div className="w-48 h-48 relative flex items-center justify-center">
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    {/* Pie chart segments */}
                    {(() => {
                      let startAngle = -90;
                      const statusColors = {
                        complete: "#10b981",
                        analyzing: "#3b82f6",
                        draft: "#f59e0b",
                        archived: "#9ca3af",
                      };

                      return projectStatusDistribution.map((status, idx) => {
                        const sliceAngle = (status.percentage / 100) * 360;
                        const endAngle = startAngle + sliceAngle;
                        const startRad = (startAngle * Math.PI) / 180;
                        const endRad = (endAngle * Math.PI) / 180;
                        const x1 = 100 + 80 * Math.cos(startRad);
                        const y1 = 100 + 80 * Math.sin(startRad);
                        const x2 = 100 + 80 * Math.cos(endRad);
                        const y2 = 100 + 80 * Math.sin(endRad);
                        const largeArc = sliceAngle > 180 ? 1 : 0;
                        const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

                        startAngle = endAngle;

                        return (
                          <path
                            key={idx}
                            d={path}
                            fill={statusColors[status.status as keyof typeof statusColors]}
                            opacity="0.8"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {projectStatusDistribution.map((status, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            status.status === "complete"
                              ? "bg-green-600"
                              : status.status === "analyzing"
                              ? "bg-blue-600"
                              : status.status === "draft"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                        />
                        <span className="capitalize font-medium">{status.status}:</span>
                      </div>
                      <div className="text-xs text-muted-foreground ml-5">
                        {status.percentage}% ({status.count} projects)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Projects Performance Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h3 className="font-semibold">Projects Performance</h3>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 border rounded hover:bg-white">
                  Export
                </button>
                <button className="text-sm px-3 py-1 border rounded hover:bg-white">
                  View Full Report
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium">Project Name</th>
                    <th className="px-4 py-3 text-left font-medium">Demand Score</th>
                    <th className="px-4 py-3 text-left font-medium">Days to Complete</th>
                    <th className="px-4 py-3 text-left font-medium">Reports Generated</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectPerformanceData.map((project, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{project.name}</td>
                      <td className="px-4 py-3">
                        <div
                          className={`inline-block px-3 py-1 rounded font-semibold text-sm ${getDemandScoreBackground(
                            project.demandScore
                          )} ${getDemandScoreColor(project.demandScore)}`}
                        >
                          {project.demandScore.toFixed(1)}
                          {project.demandScore >= 8
                            ? " (High)"
                            : project.demandScore >= 7
                            ? " (Good)"
                            : " (Moderate)"}
                        </div>
                      </td>
                      <td className="px-4 py-3">{project.daysToComplete} days</td>
                      <td className="px-4 py-3">{project.reportsGenerated}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performing Programs */}
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="font-semibold mb-4">Your Highest Demand Scores</h3>
            <div className="space-y-4">
              {topPrograms.map((program) => (
                <div key={program.rank} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl font-bold">
                        {program.rank === 1 ? "🥇" : program.rank === 2 ? "🥈" : "🥉"}
                      </div>
                      <div>
                        <h4 className="font-semibold">{program.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {program.jobs.toLocaleString()} jobs • {program.avgSalary} avg •{" "}
                          {program.growth}% growth
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${getDemandScoreColor(program.score)}`}>
                      {program.score.toFixed(1)}/10
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Market Trends Tab */}
      {activeTab === "market" && (
        <div className="space-y-6">
          {/* Industry Heatmap */}
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="font-semibold mb-4">Demand by Industry (Last 30 Days)</h3>
            <div className="space-y-3">
              {industryData.map((industry, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{industry.industry}</span>
                    <span className="text-muted-foreground">{industry.demand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          industry.demand >= 8
                            ? "bg-green-600"
                            : industry.demand >= 7
                            ? "bg-blue-600"
                            : "bg-yellow-600"
                        }`}
                        style={{ width: `${(industry.demand / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-20">
                      {industry.jobCount.toLocaleString()} jobs
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6 pt-6 border-t text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded" />
                <span>High (8-10)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded" />
                <span>Moderate (6-7.9)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-600 rounded" />
                <span>Low (0-5.9)</span>
              </div>
            </div>
          </div>

          {/* Emerging Skills */}
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="font-semibold mb-4">Top In-Demand Skills (Across Your Projects)</h3>
            <div className="space-y-3">
              {topSkills.map((skill) => (
                <div key={skill.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-muted-foreground">{skill.rank}.</span>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Mentioned in {skill.jobsCount.toLocaleString()} jobs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{skill.growthRate}%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:underline">
              View Full Skills Report →
            </button>
          </div>
        </div>
      )}

      {/* Usage & Billing Tab */}
      {activeTab === "usage" && (
        <div className="space-y-6">
          {/* Usage Metrics */}
          <div className="border rounded-lg p-6 bg-white">
            <h3 className="font-semibold mb-6">Account Usage (Current Month)</h3>
            <div className="space-y-6">
              {usageMetrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">{metric.label}</label>
                    <span className="text-sm text-muted-foreground">
                      {metric.used} {metric.unit || ""} of {metric.limit} {metric.unit || ""}
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    {typeof metric.used === "string" ? (
                      <div className="h-full w-3/4 bg-blue-600 rounded-full" />
                    ) : typeof metric.limit === "string" ? (
                      <div className="h-full w-1/3 bg-blue-600 rounded-full" />
                    ) : (
                      <div
                        className={`h-full rounded-full ${metric.warning ? "bg-orange-600" : "bg-blue-600"}`}
                        style={{
                          width: `${((metric.used as number) / (metric.limit as number)) * 100}%`,
                        }}
                      />
                    )}
                  </div>
                  {metric.warning && (
                    <p className="text-xs text-orange-600 mt-1">
                      ⚠️ You've reached your project limit
                    </p>
                  )}
                </div>
              ))}
            </div>
            {usageMetrics[0].warning && (
              <button className="mt-6 text-sm text-blue-600 hover:underline font-medium">
                Upgrade Plan →
              </button>
            )}
          </div>

          {/* Billing Forecast */}
          <div className="border rounded-lg p-6 bg-blue-50">
            <h3 className="font-semibold mb-4">Projected Costs (Based on Current Usage)</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Plan:</span>
                <span className="font-semibold">Accelerator ($25,000/year)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Renewal:</span>
                <span className="font-semibold">Dec 1, 2025</span>
              </div>
            </div>

            <div className="border-t border-blue-200 mt-4 pt-4">
              <p className="text-sm font-medium mb-3">If you upgrade to Portfolio tier:</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>5 concurrent projects (vs 3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Custom branding & API access</span>
                </li>
              </ul>
              <p className="text-sm font-semibold text-blue-900">Cost: $50,000/year</p>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-blue-200">
              <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-white text-sm font-medium">
                Compare Plans
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
