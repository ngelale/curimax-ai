"use client";

import React from "react";
import { ArrowRight, TrendingUp, BarChart3 } from "lucide-react";
import { ProjectResult } from "../types";
import { Button } from "@/app/components/ui/button";

interface ProjectResultItemProps {
  result: ProjectResult;
  onOpen: (projectId: string) => void;
}

export function ProjectResultItem({
  result,
  onOpen,
}: ProjectResultItemProps) {
  const statusBadgeColor = {
    draft: "bg-yellow-100 text-yellow-800",
    analyzing: "bg-blue-100 text-blue-800",
    complete: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  const statusBadgeLabel = {
    draft: "Draft",
    analyzing: "Analyzing",
    complete: "Complete",
    archived: "Archived",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              {result.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusBadgeColor[result.status]}`}
            >
              {statusBadgeLabel[result.status]}
            </span>
            {result.demandScore && (
              <span className="text-xs text-gray-600">
                Demand Score: {result.demandScore}/10
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {result.relevance}/10
          </div>
          <div className="text-xs text-gray-500">relevance</div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4">{result.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Last updated: {result.lastUpdated}</span>
        <Button
          onClick={() => onOpen(result.projectId)}
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 gap-1"
        >
          Open Project <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
