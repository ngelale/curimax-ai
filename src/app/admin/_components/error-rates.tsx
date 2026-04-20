"use client";

import React from "react";
import { ErrorInfo } from "../types";
import { formatErrorRate, formatNumber, getErrorRateColor } from "../utils";
import { AlertCircle, ChevronRight } from "lucide-react";

interface ErrorRatesProps {
  lastHourRate: number;
  last24hRate: number;
  last7daysRate: number;
  lastHourErrors: number;
  last24hErrors: number;
  last7daysErrors: number;
  topErrors: ErrorInfo[];
}

export const ErrorRates: React.FC<ErrorRatesProps> = ({
  lastHourRate,
  last24hRate,
  last7daysRate,
  lastHourErrors,
  last24hErrors,
  last7daysErrors,
  topErrors,
}) => {
  const colorClass = getErrorRateColor(last24hRate);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Error Rates</h3>

      {/* Error rate timeline */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Last hour</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatErrorRate(lastHourRate)}
            </p>
            <p className="text-xs text-gray-500">
              {lastHourErrors} errors / 15,000 requests
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-700">
              {lastHourErrors}
            </p>
          </div>
        </div>

        <div className={`flex items-center justify-between p-4 border rounded-lg ${colorClass}`}>
          <div>
            <p className="text-sm text-gray-600">Last 24h</p>
            <p className="text-lg font-semibold">
              {formatErrorRate(last24hRate)}
            </p>
            <p className="text-xs">
              {last24hErrors} errors / 254,000 requests
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{last24hErrors}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Last 7 days</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatErrorRate(last7daysRate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-700">
              {last7daysErrors}
            </p>
          </div>
        </div>
      </div>

      {/* SLA Target */}
      <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-600">Target</p>
        <p className="text-lg font-semibold text-green-800">&lt;0.1%</p>
        <p className="text-sm text-green-700 mt-1">✓ Meeting target</p>
      </div>

      {/* Top Errors */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Top errors:</h4>
        <div className="space-y-3">
          {topErrors.map((error) => (
            <div
              key={error.code}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {error.code} {error.message}
                  </p>
                  <p className="text-sm text-gray-600">
                    {error.occurrences} occurrences ({error.percentage.toFixed(2)}%)
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* View Details Link */}
      <button className="mt-6 w-full py-2 px-4 text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
        View Error Details →
      </button>
    </div>
  );
};
