"use client";

import React from "react";
import { TrendingUp, Users } from "lucide-react";
import { UserGrowthPoint } from "../types";

interface UserGrowthChartProps {
  data: UserGrowthPoint[];
  growthRate: number;
}

export function UserGrowthChart({ data, growthRate }: UserGrowthChartProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const maxCount = Math.max(...data.map((d) => d.count));
  const firstMonth = data[0];
  const lastMonth = data[data.length - 1];
  const monthlyGrowth =
    ((lastMonth.count - firstMonth.count) / firstMonth.count) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
          <p className="text-sm text-gray-600">12-month trend</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-lg">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* Simple line chart ASCII-style */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-end justify-between h-48 gap-1">
          {data.map((point, index) => {
            const height = (point.count / maxCount) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end"
              >
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500 group relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {point.count}
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">
                  {point.month.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Growth metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Start</p>
          <p className="text-2xl font-bold text-gray-900">{firstMonth.count}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">End</p>
          <p className="text-2xl font-bold text-gray-900">{lastMonth.count}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-xs text-emerald-700 mb-1">Growth</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-emerald-600">+{growthRate}</p>
            <p className="text-xs text-emerald-600">%/mo</p>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
        <Users className="w-4 h-4" />
        <span>
          {lastMonth.count.toLocaleString()} active users in December
        </span>
      </div>
    </div>
  );
}
