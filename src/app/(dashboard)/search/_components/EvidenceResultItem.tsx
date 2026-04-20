"use client";

import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";
import { EvidenceResult } from "../types";
import { Button } from "@/app/components/ui/button";

interface EvidenceResultItemProps {
  result: EvidenceResult;
  onView: (evidenceId: string) => void;
}

export function EvidenceResultItem({
  result,
  onView,
}: EvidenceResultItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              {result.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="font-medium">{result.category}</span>
            <span>•</span>
            <span>{result.source}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {result.relevanceScore}/10
          </div>
          <div className="text-xs text-gray-500">relevance</div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4">{result.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>From: Project ID {result.projectId}</div>
        <Button
          onClick={() => onView(result.id)}
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 gap-1"
        >
          View Evidence <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
