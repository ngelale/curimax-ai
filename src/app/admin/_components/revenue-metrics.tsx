"use client";

import React from "react";
import { DollarSign, ArrowUpRight } from "lucide-react";
import { RevenueData } from "../types";
import { formatMRR, formatARR, getRevenueColor, formatUserCount } from "../utils";

interface RevenueMetricsProps {
  revenueByTier: RevenueData[];
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
}

export function RevenueMetrics({
  revenueByTier,
  monthlyRecurringRevenue,
  annualRecurringRevenue,
}: RevenueMetricsProps) {
  if (!revenueByTier || revenueByTier.length === 0) {
    return null;
  }

  const totalUsers = revenueByTier.reduce((sum, tier) => sum + tier.users, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Revenue by Tier
          </h3>
          <p className="text-sm text-gray-600">Monthly breakdown</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Revenue cards by tier */}
      <div className="space-y-3 mb-6">
        {revenueByTier.map((tier, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${getRevenueColor(tier.percentage)} p-4 rounded-lg text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{tier.tier}</span>
              <span className="text-sm font-semibold">
                {tier.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">
                  ${(tier.monthlyRevenue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs opacity-90">{tier.users} users</p>
              </div>
              <div className="w-32 h-8 bg-white/20 rounded overflow-hidden">
                <div
                  className="h-full bg-white/40 transition-all"
                  style={{ width: `${tier.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MRR and ARR summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Monthly Recurring</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatMRR(monthlyRecurringRevenue)}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-xs text-emerald-700 mb-1">Annual Recurring</p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatARR(annualRecurringRevenue)}
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          {formatUserCount(totalUsers)} total paying users
        </span>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          View Revenue Report
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
