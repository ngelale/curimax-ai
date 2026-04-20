"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { ReportResult } from "../types";
import { Button } from "@/app/components/ui/button";

interface ReportResultItemProps {
  result: ReportResult;
  onView: (reportId: string) => void;
}

export function ReportResultItem({
  result,
  onView,
}: ReportResultItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              {result.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
              {result.format}
            </span>
            <span>•</span>
            <span>{result.generatedDate}</span>
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
        <span>From: Project {result.projectId}</span>
        <Button
          onClick={() => onView(result.id)}
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 gap-1"
        >
          View Report <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
