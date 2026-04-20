"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SearchFilters } from "../types";

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  resultCounts: {
    projects: number;
    evidence: number;
    templates: number;
    reports: number;
    articles: number;
  };
}

export function FilterSidebar({
  filters,
  onFilterChange,
  resultCounts,
}: FilterSidebarProps) {
  const toggleType = (type: SearchFilters["types"][number]) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFilterChange({ ...filters, types: newTypes });
  };

  const toggleStatus = (
    status: "draft" | "analyzing" | "complete" | "archived"
  ) => {
    const newStatus = filters.projectStatus || [];
    const updated = newStatus.includes(status)
      ? newStatus.filter((s) => s !== status)
      : [...newStatus, status];
    onFilterChange({ ...filters, projectStatus: updated });
  };

  const handleClearFilters = () => {
    onFilterChange({
      types: ["project", "evidence", "template", "report", "article"],
      projectStatus: ["draft", "analyzing", "complete"],
      dateRange: "any",
    });
  };

  const typeOptions = [
    { key: "project", label: "Projects", count: resultCounts.projects },
    { key: "evidence", label: "Evidence", count: resultCounts.evidence },
    { key: "template", label: "Templates", count: resultCounts.templates },
    { key: "report", label: "Reports", count: resultCounts.reports },
    { key: "article", label: "Help Articles", count: resultCounts.articles },
  ] as const;

  const statusOptions = [
    { key: "draft", label: "Draft" },
    { key: "analyzing", label: "Analyzing" },
    { key: "complete", label: "Complete" },
    { key: "archived", label: "Archived" },
  ] as const;

  const dateOptions = [
    { key: "any", label: "Any time" },
    { key: "30days", label: "Last 30 days" },
    { key: "90days", label: "Last 90 days" },
    { key: "1year", label: "Last year" },
  ] as const;

  return (
    <div className="w-64 bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-20">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Filter Results
      </h3>

      {/* Type Filter */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 text-sm mb-4">Type</h4>
        <div className="space-y-3">
          {typeOptions.map(({ key, label, count }) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(key)}
                onChange={() => toggleType(key)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">
                {label} ({count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter (Projects only) */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 text-sm mb-4">
          Status (Projects only)
        </h4>
        <div className="space-y-3">
          {statusOptions.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.projectStatus?.includes(key) || false}
                onChange={() => toggleStatus(key)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 text-sm mb-4">Date Range</h4>
        <div className="space-y-3">
          {dateOptions.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="dateRange"
                checked={filters.dateRange === key}
                onChange={() =>
                  onFilterChange({ ...filters, dateRange: key })
                }
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <Button
        onClick={handleClearFilters}
        variant="outline"
        className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
      >
        Clear All Filters
      </Button>
    </div>
  );
}
