"use client";

import React from "react";
import { ProjectStatus, UserTier, DemandScoreRange } from "../types";
import { ChevronDown } from "lucide-react";

interface ProjectFiltersProps {
  statusFilter: ProjectStatus | "All";
  tierFilter: UserTier | "All";
  dateRangeFilter: 7 | 30 | 90 | null;
  demandScoreFilter: DemandScoreRange | "All";
  onStatusChange: (status: ProjectStatus | "All") => void;
  onTierChange: (tier: UserTier | "All") => void;
  onDateRangeChange: (days: 7 | 30 | 90 | null) => void;
  onDemandScoreChange: (range: DemandScoreRange | "All") => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  statusFilter,
  tierFilter,
  dateRangeFilter,
  demandScoreFilter,
  onStatusChange,
  onTierChange,
  onDateRangeChange,
  onDemandScoreChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-6">
        {/* Status Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <div className="flex flex-wrap gap-2">
            {(["All", "Draft", "Analyzing", "Complete", "Archived"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status === "All" ? "All" : status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tier Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Tier:</label>
          <div className="flex flex-wrap gap-2">
            {(["All", "Trial", "Sprint", "Accelerator", "Portfolio", "Enterprise"] as const).map(
              (tier) => (
                <button
                  key={tier}
                  onClick={() => onTierChange(tier === "All" ? "All" : tier)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    tierFilter === tier
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {tier}
                </button>
              )
            )}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Date Range:</label>
          <div className="flex flex-wrap gap-2">
            {([
              { label: "Last 7 days", value: 7 },
              { label: "30 days", value: 30 },
              { label: "90 days", value: 90 },
              { label: "All time", value: null },
            ] as const).map(({ label, value }) => (
              <button
                key={label}
                onClick={() => onDateRangeChange(value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  dateRangeFilter === value
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Demand Score Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Demand Score:</label>
          <div className="flex flex-wrap gap-2">
            {(["All", "High", "Good", "Low"] as const).map((range) => (
              <button
                key={range}
                onClick={() => onDemandScoreChange(range === "All" ? "All" : range)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  demandScoreFilter === range
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                {range === "All"
                  ? "All"
                  : range === "High"
                    ? "High (8-10)"
                    : range === "Good"
                      ? "Good (6-7.9)"
                      : "Low (0-5.9)"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
