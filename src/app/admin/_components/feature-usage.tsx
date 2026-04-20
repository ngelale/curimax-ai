"use client";

import React from "react";
import { Zap } from "lucide-react";
import { FeatureUsage } from "../types";
import { formatPercentage, formatUserCount, getUsageColor } from "../utils";

interface FeatureUsageProps {
  features: FeatureUsage[];
}

export function FeatureUsageComponent({ features }: FeatureUsageProps) {
  if (!features || features.length === 0) {
    return null;
  }

  // Sort by percentage descending
  const sortedFeatures = [...features].sort(
    (a, b) => b.percentage - a.percentage
  );
  const maxProjects = Math.max(...sortedFeatures.map((f) => f.projectCount));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Feature Adoption
          </h3>
          <p className="text-sm text-gray-600">Usage across projects</p>
        </div>
        <div className="bg-purple-100 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-purple-600" />
        </div>
      </div>

      {/* Feature bars */}
      <div className="space-y-4">
        {sortedFeatures.map((feature, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {feature.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  {formatPercentage(feature.percentage)}
                </span>
                <span className="text-xs text-gray-500">
                  ({formatUserCount(feature.projectCount)} projects)
                </span>
              </div>
            </div>
            <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getUsageColor(feature.percentage)} transition-all duration-300 group-hover:shadow-lg flex items-center justify-end pr-2`}
                style={{ width: `${feature.percentage}%` }}
              >
                {feature.percentage >= 20 && (
                  <span className="text-xs font-semibold text-white">
                    {feature.percentage.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Most Used</p>
            <p className="text-sm font-semibold text-gray-900">
              {sortedFeatures[0].name}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Avg Adoption</p>
            <p className="text-sm font-semibold text-gray-900">
              {(
                sortedFeatures.reduce((sum, f) => sum + f.percentage, 0) /
                sortedFeatures.length
              ).toFixed(0)}
              %
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Usage</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatUserCount(
                sortedFeatures.reduce((sum, f) => sum + f.projectCount, 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
