"use client";

import React, { useMemo } from "react";
import { InfrastructureCost } from "../types";
import {
  formatCurrency,
  calculateMonthlyProjection,
  getTrendIndicator,
} from "../utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface InfrastructureCostsProps {
  costs: InfrastructureCost[];
  totalBudget: number;
}

export const InfrastructureCosts: React.FC<InfrastructureCostsProps> = ({
  costs,
  totalBudget,
}) => {
  const totalCost = useMemo(() => {
    return costs.reduce((sum, cost) => sum + cost.monthlyCost, 0);
  }, [costs]);

  const projectedCost = useMemo(() => {
    return calculateMonthlyProjection(costs.map((c) => c.monthlyCost));
  }, [costs]);

  const remainingBudget = totalBudget - projectedCost;
  const budgetPercentage = (projectedCost / totalBudget) * 100;

  const getTrendIcon = (trend: "up" | "down" | "stable" | undefined) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Infrastructure Costs (This Month)
      </h3>

      {/* Cost breakdown list */}
      <div className="space-y-3 mb-8">
        {costs.map((cost) => {
          const trend = getTrendIndicator(cost.trend);
          return (
            <div
              key={cost.service}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{cost.service}</p>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${trend.color}`}
                  >
                    {getTrendIcon(cost.trend)}
                    {trend.label}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{cost.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(cost.monthlyCost)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Current Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalCost)}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Projected Monthly</p>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(projectedCost)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Budget</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalBudget)}
          </p>
        </div>
      </div>

      {/* Budget status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Budget Usage</p>
          <p className="text-sm font-medium text-gray-700">
            {budgetPercentage.toFixed(1)}%
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              budgetPercentage > 90
                ? "bg-red-600"
                : budgetPercentage > 75
                  ? "bg-amber-600"
                  : "bg-green-600"
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <p className="text-sm text-green-600">Remaining Budget</p>
            <p className="text-xl font-bold text-green-800">
              {formatCurrency(remainingBudget)}
            </p>
          </div>
          <p className="text-2xl font-bold text-green-700">
            ✓ Under budget
          </p>
        </div>
      </div>

      {/* Budget info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Monthly Projection:</strong> {formatCurrency(projectedCost)}
        </p>
        <p className="text-sm text-blue-900 mt-1">
          <strong>Budget:</strong> {formatCurrency(totalBudget)}
        </p>
      </div>
    </div>
  );
};
