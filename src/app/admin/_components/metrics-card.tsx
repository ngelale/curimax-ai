"use client";

import { SystemMetric } from "../types";
import {
  formatMetricValue,
  getMetricCardColor,
  getMetricIconColor,
  formatTrend,
  getTrendColor,
} from "../utils";
import {
  Users,
  Folder,
  Activity,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface MetricsCardProps {
  metric: SystemMetric;
}

export function MetricsCard({ metric }: MetricsCardProps) {
  const getIcon = () => {
    switch (metric.icon) {
      case "users":
        return (
          <Users className={`w-8 h-8 ${getMetricIconColor(metric.color)}`} />
        );
      case "folder":
        return (
          <Folder className={`w-8 h-8 ${getMetricIconColor(metric.color)}`} />
        );
      case "activity":
        return (
          <Activity className={`w-8 h-8 ${getMetricIconColor(metric.color)}`} />
        );
      case "zap":
        return (
          <Zap className={`w-8 h-8 ${getMetricIconColor(metric.color)}`} />
        );
      default:
        return null;
    }
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case "up":
        return (
          <TrendingUp className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
        );
      case "down":
        return (
          <TrendingDown className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
        );
      case "stable":
        return <Minus className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border ${getMetricCardColor(metric.color)}`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{metric.label}</h3>
        {getIcon()}
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {formatMetricValue(metric.value)}
        </div>
        {metric.unit && (
          <span className="text-sm text-gray-600">{metric.unit}</span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {getTrendIcon()}
        <span className={getTrendColor(metric.trend)}>
          +{metric.changeValue}{" "}
          {metric.changeType === "users" && "this week"}
          {metric.changeType === "projects" && "this week"}
          {metric.changeType === "percentage" && ""}
          {metric.changeType === "requests" && "this month"}
        </span>
      </div>
    </div>
  );
}
