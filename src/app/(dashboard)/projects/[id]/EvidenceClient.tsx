"use client";

import React, { useState } from "react";
import { Project } from "../types";
import { Evidence, mockEvidence } from "./evidence-mock-data";
import { ChevronDown, Download, MoreVertical, RefreshCw } from "lucide-react";

export default function EvidenceClient({ project }: { project: Project }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState("All");
  const [primaryCitationsOnly, setPrimaryCitationsOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "salary">(
    "relevance"
  );

  const sourceTypes = [
    "All",
    "Job Postings",
    "Labor Stats",
    "News",
    "Studies",
  ];

  const filteredEvidence = mockEvidence
    .filter(
      (e) =>
        (filterSource === "All" || e.type === filterSource) &&
        (!primaryCitationsOnly || e.isPrimaryCitation) &&
        (searchQuery === "" ||
          e.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.fullText.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "salary" && a.salaryRange && b.salaryRange) {
        const aMax = parseInt(a.salaryRange.split("-")[1]) || 0;
        const bMax = parseInt(b.salaryRange.split("-")[1]) || 0;
        return bMax - aMax;
      }
      return 0;
    });

  // Get summary stats
  const avgSalary = Math.round(
    filteredEvidence.reduce((sum, e) => {
      if (e.salaryRange) {
        const range = e.salaryRange.split("-").map((s) => parseInt(s));
        return sum + (range[0] + range[1]) / 2;
      }
      return sum;
    }, 0) / Math.max(1, filteredEvidence.filter((e) => e.salaryRange).length)
  );

  const relevanceStarPercentage =
    Math.round(
      (filteredEvidence.reduce((sum, e) => sum + e.relevanceScore, 0) /
        Math.max(1, filteredEvidence.length)) *
        10
    ) / 10;

  // State handling
  if (project.status === "draft") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-md border-2 border-dashed">
        <div className="text-center space-y-4">
          <div className="text-4xl">📋</div>
          <h2 className="text-xl font-semibold">No evidence gathered yet</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Start the analysis to gather evidence from job postings, labor
            statistics, and industry research.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
            Start Analysis
          </button>
        </div>
      </div>
    );
  }

  if (project.status === "analyzing") {
    return (
      <div className="space-y-4">
        <div className="rounded-md border p-6 bg-blue-50">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🔄</div>
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold">Gathering evidence...</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[45%]" />
                </div>
              </div>

              <div className="text-sm space-y-1 pt-2 border-t">
                <div className="font-medium">Current step: Searching job postings</div>
                <div className="text-muted-foreground">
                  Estimated time remaining: 8 minutes
                </div>
              </div>

              <details className="pt-2">
                <summary className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                  View Live Progress
                </summary>
                <div className="mt-3 bg-white rounded p-3 text-xs font-mono space-y-1 max-h-40 overflow-auto">
                  <div className="text-green-600">✓ Constructed search queries</div>
                  <div className="text-green-600">✓ Searched 247 job postings</div>
                  <div className="text-blue-600">🔄 Fetching BLS data...</div>
                  <div className="text-gray-400">⏳ Parsing with AI...</div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete state
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-md border p-4">
          <h4 className="text-sm text-muted-foreground">Demand Score</h4>
          <div className="text-2xl font-bold mt-2">{project.demandScore}/10</div>
          <div className="flex gap-0.5 mt-3">
            {[...Array(10)].map((_, i) => (
              <span key={i} className={i < Math.round(project.demandScore) ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>
                ⭐
              </span>
            ))}
          </div>
          <div className="text-xs text-green-600 font-medium mt-3">
            ✓ Green indicator
          </div>
        </div>

        <div className="rounded-md border p-4">
          <h4 className="text-sm text-muted-foreground">Job Market</h4>
          <div className="space-y-2 mt-2">
            <div>
              <div className="font-semibold">{project.jobCount} jobs found</div>
            </div>
            <div>
              <div className="text-sm">${(project.avgSalary / 1000).toFixed(0)}K avg salary</div>
            </div>
            <div>
              <div className="text-sm text-green-600">+12% growth/year</div>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4">
          <h4 className="text-sm text-muted-foreground">Skills Gap</h4>
          <div className="space-y-2 mt-2">
            <div className="text-sm font-medium">High demand for:</div>
            <ul className="space-y-1 text-sm">
              <li>• ESG Analysis</li>
              <li>• Python</li>
              <li>• Financial Analysis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="flex gap-2 flex-wrap">
            {sourceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterSource(type)}
                className={`px-3 py-1.5 text-sm rounded-md border transition ${
                  filterSource === type
                    ? "bg-blue-100 border-blue-300 text-blue-900"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="primary"
            checked={primaryCitationsOnly}
            onChange={(e) => setPrimaryCitationsOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="primary" className="text-sm">
            Primary citations only
          </label>
        </div>

        <input
          type="text"
          placeholder="Search evidence..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm bg-white"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm">
          <RefreshCw className="w-4 h-4" />
          Refresh Analysis
        </button>

        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" />
            Export Data
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute left-0 mt-1 w-40 bg-white border rounded-md shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-10">
            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-b">
              Download CSV
            </button>
            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">
              Download JSON
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left font-medium">Source</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">
                  <button
                    onClick={() => setSortBy("relevance")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Relevance
                    {sortBy === "relevance" && <ChevronDown className="w-3 h-3" />}
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <button
                    onClick={() => setSortBy("date")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Date
                    {sortBy === "date" && <ChevronDown className="w-3 h-3" />}
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium">Key Data</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidence.map((evidence) => (
                <React.Fragment key={evidence.id}>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === evidence.id ? null : evidence.id
                      )
                    }
                  >
                    <td className="px-4 py-3">
                      <a
                        href={evidence.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {evidence.source}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                        {evidence.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-12 rounded-full ${
                          evidence.relevanceScore >= 8.5
                            ? "bg-green-500"
                            : evidence.relevanceScore >= 7
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`} />
                        <span className="font-medium">{evidence.relevanceScore.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(evidence.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs">{evidence.keyData}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>

                  {expandedRow === evidence.id && (
                    <tr className="bg-blue-50 border-b">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Full Evidence Text</h4>
                            <p className="text-sm text-muted-foreground">
                              {evidence.fullText}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Structured Data
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {evidence.jobTitle && (
                                <div>
                                  <div className="text-xs text-muted-foreground">
                                    Job Title
                                  </div>
                                  <div className="font-medium">
                                    {evidence.jobTitle}
                                  </div>
                                </div>
                              )}
                              {evidence.company && (
                                <div>
                                  <div className="text-xs text-muted-foreground">
                                    Company
                                  </div>
                                  <div className="font-medium">
                                    {evidence.company}
                                  </div>
                                </div>
                              )}
                              {evidence.location && (
                                <div>
                                  <div className="text-xs text-muted-foreground">
                                    Location
                                  </div>
                                  <div className="font-medium">
                                    {evidence.location}
                                  </div>
                                </div>
                              )}
                              {evidence.salaryRange && (
                                <div>
                                  <div className="text-xs text-muted-foreground">
                                    Salary Range
                                  </div>
                                  <div className="font-medium">
                                    {evidence.salaryRange}
                                  </div>
                                </div>
                              )}
                              {evidence.experienceRequired && (
                                <div className="col-span-2">
                                  <div className="text-xs text-muted-foreground">
                                    Experience Required
                                  </div>
                                  <div className="font-medium">
                                    {evidence.experienceRequired}
                                  </div>
                                </div>
                              )}
                              {evidence.skillsRequired && (
                                <div className="col-span-2">
                                  <div className="text-xs text-muted-foreground mb-1">
                                    Skills Required
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {evidence.skillsRequired.map((skill) => (
                                      <span
                                        key={skill}
                                        className="px-2 py-1 bg-white border rounded text-xs"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                defaultChecked={evidence.isPrimaryCitation}
                                className="rounded"
                              />
                              Use in report (mark as primary citation)
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
