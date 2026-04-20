"use client";

import React, { useState } from "react";
import { Project } from "../types";
import { Competitor, mockCompetitors, gapAnalysis } from "./competitors-mock-data";
import {
  ChevronDown,
  Download,
  ExternalLink,
  MoreVertical,
  Plus,
  Table2,
  Grid3x3,
} from "lucide-react";

export default function CompetitorsClient({ project }: { project: Project }) {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sortBy, setSortBy] = useState<keyof Competitor>("institution");
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedGapSection, setExpandedGapSection] = useState<string | null>(null);

  const competitorList = [...mockCompetitors].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal);
    }
    return (aVal as number) - (bVal as number);
  });

  const avgTuition = Math.round(
    mockCompetitors.reduce((sum, c) => sum + c.tuition, 0) / mockCompetitors.length
  );
  const avgDuration = Math.round(
    mockCompetitors.reduce((sum, c) => sum + c.duration, 0) / mockCompetitors.length
  );
  const formatCounts = mockCompetitors.reduce(
    (acc, c) => {
      acc[c.format] = (acc[c.format] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const mostCommonFormat = Object.entries(formatCounts).sort(([, a], [, b]) => b - a)[0][0];
  const mostCommonFormatPercent = Math.round(
    ((formatCounts[mostCommonFormat] || 0) / mockCompetitors.length) * 100
  );

  // State: Not Started
  if (project.status === "draft") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-md border-2 border-dashed">
        <div className="text-center space-y-4">
          <div className="text-4xl">🏢</div>
          <h2 className="text-xl font-semibold">No competitor analysis yet</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Start analyzing competitors to understand market positioning and
            identify opportunities.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
            Start Competitor Analysis
          </button>
        </div>
      </div>
    );
  }

  // State: Analyzing
  if (project.status === "analyzing") {
    return (
      <div className="space-y-4">
        <div className="rounded-md border p-6 bg-blue-50">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🔄</div>
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold">Searching competitor programs...</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">62%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[62%]" />
                </div>
              </div>

              <div className="text-sm space-y-1 pt-2 border-t">
                <div className="font-medium">
                  Current step: Analyzing competitor websites
                </div>
                <div className="text-muted-foreground">
                  Estimated time remaining: 5 minutes
                </div>
              </div>

              <details className="pt-2">
                <summary className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                  View Live Progress
                </summary>
                <div className="mt-3 bg-white rounded p-3 text-xs font-mono space-y-1 max-h-40 overflow-auto">
                  <div className="text-green-600">✓ Identified 12 programs</div>
                  <div className="text-green-600">✓ Scraped tuition data</div>
                  <div className="text-blue-600">🔄 Analyzing rankings...</div>
                  <div className="text-gray-400">⏳ Processing features...</div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State: Complete
  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="rounded-md border p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold mb-4">
          {mockCompetitors.length} competitor programs found
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Average tuition</div>
            <div className="text-2xl font-bold mt-1">
              ${(avgTuition / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Average duration</div>
            <div className="text-2xl font-bold mt-1">{avgDuration} weeks</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Most common format</div>
            <div className="text-2xl font-bold mt-1">
              {mostCommonFormat} ({mostCommonFormatPercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 border rounded-md p-1 bg-white">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded ${
              viewMode === "card"
                ? "bg-blue-100 text-blue-600"
                : "text-muted-foreground hover:bg-gray-100"
            }`}
            title="Card view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-muted-foreground hover:bg-gray-100"
            }`}
            title="Table view"
          >
            <Table2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Competitor Manually
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
            <Download className="w-4 h-4" />
            Generate Comparison Report
          </button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" && (
        <div className="grid grid-cols-2 gap-4">
          {competitorList.map((competitor) => (
            <div key={competitor.id} className="rounded-md border p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{competitor.institution}</h3>
                  <p className="text-sm text-muted-foreground">
                    {competitor.programName}
                  </p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <a
                href={competitor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-3"
              >
                Visit Website <ExternalLink className="w-3 h-3" />
              </a>

              <div className="space-y-2 border-t pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuition:</span>
                  <span className="font-medium">${(competitor.tuition / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{competitor.duration} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">{competitor.format}</span>
                </div>
                {competitor.ranking && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ranking:</span>
                    <span className="font-medium">{competitor.ranking}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3 mt-3">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                  Unique Features:
                </h4>
                <ul className="space-y-1">
                  {competitor.uniqueFeatures.map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  {[
                    "institution",
                    "programName",
                    "tuition",
                    "duration",
                    "format",
                    "uniqueFeatures",
                  ].map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-medium">
                      <button
                        onClick={() => setSortBy(col as keyof Competitor)}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        {col === "institution"
                          ? "Institution"
                          : col === "programName"
                          ? "Program"
                          : col === "tuition"
                          ? "Tuition"
                          : col === "duration"
                          ? "Duration"
                          : col === "format"
                          ? "Format"
                          : "Unique Features"}
                        {sortBy === col && <ChevronDown className="w-3 h-3" />}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitorList.map((competitor) => (
                  <tr key={competitor.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a
                        href={competitor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        {competitor.institution}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs">{competitor.programName}</td>
                    <td className="px-4 py-3 text-xs font-medium">
                      ${(competitor.tuition / 1000).toFixed(0)}K
                    </td>
                    <td className="px-4 py-3 text-xs">{competitor.duration} wks</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                        {competitor.format}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {competitor.uniqueFeatures.slice(0, 2).join(", ")}
                      {competitor.uniqueFeatures.length > 2 && "..."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gap Analysis */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Gap Analysis</h3>

        <details open={expandedGapSection === "doing"} className="rounded-md border">
          <summary
            onClick={() =>
              setExpandedGapSection(
                expandedGapSection === "doing" ? null : "doing"
              )
            }
            className="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-50 flex items-center gap-2"
          >
            <ChevronDown
              className={`w-4 h-4 transition ${
                expandedGapSection === "doing" ? "rotate-180" : ""
              }`}
            />
            What competitors are doing
          </summary>
          <div className="px-4 py-3 border-t bg-gray-50 space-y-2">
            {gapAnalysis.whatTheyDo.map((item, idx) => (
              <div key={idx} className="text-sm flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </details>

        <details open={expandedGapSection === "missing"} className="rounded-md border">
          <summary
            onClick={() =>
              setExpandedGapSection(
                expandedGapSection === "missing" ? null : "missing"
              )
            }
            className="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-50 flex items-center gap-2"
          >
            <ChevronDown
              className={`w-4 h-4 transition ${
                expandedGapSection === "missing" ? "rotate-180" : ""
              }`}
            />
            What competitors are missing (opportunities)
          </summary>
          <div className="px-4 py-3 border-t bg-yellow-50 space-y-2">
            {gapAnalysis.whatTheyMiss.map((item, idx) => (
              <div key={idx} className="text-sm flex gap-2">
                <span className="text-yellow-600">⚠</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </details>

        <details open={expandedGapSection === "positioning"} className="rounded-md border">
          <summary
            onClick={() =>
              setExpandedGapSection(
                expandedGapSection === "positioning" ? null : "positioning"
              )
            }
            className="px-4 py-3 font-semibold cursor-pointer hover:bg-gray-50 flex items-center gap-2"
          >
            <ChevronDown
              className={`w-4 h-4 transition ${
                expandedGapSection === "positioning" ? "rotate-180" : ""
              }`}
            />
            Recommended positioning
          </summary>
          <div className="px-4 py-3 border-t bg-green-50 space-y-2">
            {gapAnalysis.recommendedPositioning.map((item, idx) => (
              <div key={idx} className="text-sm flex gap-2">
                <span className="text-green-600">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add Competitor Manually</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Institution name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Program name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Website URL"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Tuition ($)"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Duration (weeks)"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option value="">Select format</option>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <textarea
                placeholder="Unique features (one per line)"
                className="w-full px-3 py-2 border rounded-md text-sm h-24"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Add Competitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
