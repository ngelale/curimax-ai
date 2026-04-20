"use client";

import React from "react";
import {
  formatResponseTime,
  getSLAStatusColor,
  getSLAStatusLabel,
} from "../utils";

interface PerformanceMetricsProps {
  avgResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  slaBoundary: number;
  slaMet: boolean;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  avgResponseTime,
  p50ResponseTime,
  p95ResponseTime,
  p99ResponseTime,
  slaBoundary,
  slaMet,
}) => {
  const slaColor = getSLAStatusColor(slaMet);
  const slaLabel = getSLAStatusLabel(slaMet);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Response Times (Last 24 Hours)
      </h3>

      {/* Simple chart representation */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="text-center text-gray-600 py-8">
          📊 Response Time Trend Chart
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Average</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatResponseTime(avgResponseTime)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">P50 (Median)</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatResponseTime(p50ResponseTime)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">P95</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatResponseTime(p95ResponseTime)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">P99</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatResponseTime(p99ResponseTime)}
          </p>
        </div>
      </div>

      {/* SLA Status */}
      <div
        className={`border ${slaColor.border} ${slaColor.bg} rounded-lg p-4`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Target SLA</p>
            <p className={`text-lg font-semibold ${slaColor.text}`}>
              &lt;{formatResponseTime(slaBoundary)} (P95)
            </p>
          </div>
          <p className={`text-2xl font-bold ${slaColor.text}`}>{slaLabel}</p>
        </div>
      </div>
    </div>
  );
};
