/**
 * Admin Dashboard Utilities
 * Helper functions for formatting and status checks
 */

import { HealthStatus, MetricTrend, ActivityEvent } from "./types";

/**
 * Format metric values for display (e.g., 1847 → 1,847)
 */
export function formatMetricValue(value: number | string): string {
  if (typeof value === "string") {
    return value;
  }
  return value.toLocaleString();
}

/**
 * Get color class for health status
 */
export function getStatusColor(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "text-green-600 bg-green-50 border-green-200";
    case "degraded":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "down":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

/**
 * Get icon for health status
 */
export function getStatusIcon(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "✅";
    case "degraded":
      return "⚠️";
    case "down":
      return "❌";
    default:
      return "❓";
  }
}

/**
 * Get text label for health status
 */
export function getStatusLabel(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "Operational";
    case "degraded":
      return "Degraded";
    case "down":
      return "Down";
    default:
      return "Unknown";
  }
}

/**
 * Format activity timestamp as relative time (e.g., "2 min ago")
 */
export function formatActivityTime(timestamp: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return timestamp.toLocaleDateString();
}

/**
 * Get trend indicator string
 */
export function formatTrend(trend: MetricTrend): string {
  switch (trend) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "stable":
      return "→";
    default:
      return "−";
  }
}

/**
 * Get color for trend indicator
 */
export function getTrendColor(trend: MetricTrend): string {
  switch (trend) {
    case "up":
      return "text-green-600";
    case "down":
      return "text-red-600";
    case "stable":
      return "text-gray-600";
    default:
      return "text-gray-400";
  }
}

/**
 * Get background color for metric card
 */
export function getMetricCardColor(color: string): string {
  switch (color) {
    case "blue":
      return "bg-blue-50 border-blue-200";
    case "green":
      return "bg-green-50 border-green-200";
    case "purple":
      return "bg-purple-50 border-purple-200";
    case "orange":
      return "bg-orange-50 border-orange-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

/**
 * Get icon color for metric card
 */
export function getMetricIconColor(color: string): string {
  switch (color) {
    case "blue":
      return "text-blue-600";
    case "green":
      return "text-green-600";
    case "purple":
      return "text-purple-600";
    case "orange":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
}

/**
 * Get severity badge color for activity
 */
export function getActivitySeverityColor(
  severity: ActivityEvent["severity"]
): string {
  switch (severity) {
    case "info":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-amber-100 text-amber-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Check if user has admin role
 */
export function isAdmin(userRole: string): boolean {
  return userRole === "admin";
}

/**
 * Format large numbers with abbreviations (e.g., 2400000 → 2.4M)
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toString();
}

/**
 * Get icon name based on activity type
 */
export function getActivityIcon(
  type: ActivityEvent["type"]
): "user" | "folder" | "log" | "alert" | "key" | "alert-circle" {
  switch (type) {
    case "user_upgrade":
    case "user_registration":
      return "user";
    case "project_completed":
      return "folder";
    case "report_generated":
      return "log";
    case "failed_login":
      return "key";
    case "rate_limit":
    case "system_alert":
      return "alert-circle";
    default:
      return "alert";
  }
}

/**
 * Get tier display label
 */
export function formatTierLabel(tier: string): string {
  return tier;
}

/**
 * Get color class for user tier
 */
export function getTierColor(tier: string): string {
  switch (tier) {
    case "Trial":
      return "bg-gray-100 text-gray-800";
    case "Sprint":
      return "bg-blue-100 text-blue-800";
    case "Accelerator":
      return "bg-purple-100 text-purple-800";
    case "Portfolio":
      return "bg-green-100 text-green-800";
    case "Enterprise":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Get color class for user account status
 */
export function getUserStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "text-green-600 bg-green-50 border-green-200";
    case "Expired":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "Suspended":
      return "text-red-600 bg-red-50 border-red-200";
    case "Inactive":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

/**
 * Get badge color for user account status
 */
export function getUserStatusBadge(status: string): string {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Expired":
      return "bg-amber-100 text-amber-800";
    case "Suspended":
      return "bg-red-100 text-red-800";
    case "Inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Format last active time relative to now
 */
export function getLastActiveText(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}m ago`;
  }
  return date.toLocaleDateString();
}

/**
 * Format storage size in GB
 */
export function formatStorageSize(gb: number): string {
  if (gb < 1) {
    return `${(gb * 1024).toFixed(0)} MB`;
  }
  return `${gb.toFixed(1)} GB`;
}

/**
 * Format date for display
 */
export function formatUserDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format full date with time
 */
export function formatUserDateTime(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
/**
 * Get color class for project status
 */
export function getProjectStatusColor(status: string): string {
  switch (status) {
    case "Complete":
      return "text-green-600 bg-green-50 border-green-200";
    case "Analyzing":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "Draft":
      return "text-gray-600 bg-gray-50 border-gray-200";
    case "Archived":
      return "text-slate-600 bg-slate-50 border-slate-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

/**
 * Get badge classes for project status
 */
export function getProjectStatusBadge(status: string): {
  bg: string;
  text: string;
} {
  switch (status) {
    case "Complete":
      return { bg: "bg-green-100", text: "text-green-800" };
    case "Analyzing":
      return { bg: "bg-blue-100", text: "text-blue-800" };
    case "Draft":
      return { bg: "bg-gray-100", text: "text-gray-800" };
    case "Archived":
      return { bg: "bg-slate-100", text: "text-slate-800" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
}

/**
 * Get color class for demand score range
 */
export function getDemandScoreColor(range: string | undefined): string {
  switch (range) {
    case "High":
      return "text-green-600 bg-green-50 border-green-200";
    case "Good":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "Low":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

/**
 * Get badge classes for demand score
 */
export function getDemandScoreBadge(range: string | undefined): {
  bg: string;
  text: string;
} {
  switch (range) {
    case "High":
      return { bg: "bg-green-100", text: "text-green-800" };
    case "Good":
      return { bg: "bg-amber-100", text: "text-amber-800" };
    case "Low":
      return { bg: "bg-red-100", text: "text-red-800" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
}

/**
 * Format demand score for display
 */
export function formatDemandScore(score: number | undefined): string {
  if (score === undefined) return "-";
  return `${score.toFixed(1)}/10`;
}

/**
 * Get date filter label
 */
export function getDateRangeLabel(days: number | null): string {
  if (days === null) return "All time";
  if (days === 7) return "Last 7 days";
  if (days === 30) return "Last 30 days";
  if (days === 90) return "Last 90 days";
  return `Last ${days} days`;
}

/**
 * Check if date is within range
 */
export function isDateInRange(date: Date, days: number | null): boolean {
  if (days === null) return true;
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return date >= cutoffDate;
}

/**
 * Format project count with limit
 */
export function formatProjectCount(used: number, limit?: number): string {
  if (limit) return `${used}/${limit}`;
  return `${used}`;
}

/**
 * Format response time in milliseconds
 */
export function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Get color class for SLA status
 */
export function getSLAStatusColor(met: boolean): {
  bg: string;
  text: string;
  border: string;
} {
  if (met) {
    return {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-200",
    };
  }
  return {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  };
}

/**
 * Get SLA status label
 */
export function getSLAStatusLabel(met: boolean): string {
  return met ? "✓ Meeting target" : "✗ Exceeding target";
}

/**
 * Get color class for error rate
 */
export function getErrorRateColor(rate: number): string {
  if (rate < 0.05) return "text-green-600 bg-green-50 border-green-200";
  if (rate < 0.1) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

/**
 * Format error rate percentage
 */
export function formatErrorRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate monthly projection based on current costs
 */
export function calculateMonthlyProjection(currentCosts: number[]): number {
  const total = currentCosts.reduce((sum, cost) => sum + cost, 0);
  return Math.round(total * 1.05); // Add 5% buffer for projections
}

/**
 * Get trend indicator
 */
export function getTrendIndicator(
  trend: "up" | "down" | "stable" | undefined
): { icon: string; color: string; label: string } {
  switch (trend) {
    case "up":
      return { icon: "↑", color: "text-amber-600", label: "Increasing" };
    case "down":
      return { icon: "↓", color: "text-green-600", label: "Decreasing" };
    case "stable":
    default:
      return { icon: "→", color: "text-gray-600", label: "Stable" };
  }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Get percentile label
 */
export function getPercentileLabel(percentile: number): string {
  if (percentile === 50) return "P50 (Median)";
  if (percentile === 95) return "P95";
  if (percentile === 99) return "P99";
  return `P${percentile}`;
}

/**
 * Format percentage with % sign
 */
export function formatPercentage(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

/**
 * Format large numbers with commas
 */
export function formatUserCount(count: number): string {
  return count.toLocaleString();
}

/**
 * Format currency value
 */
export function formatCurrencyValue(amount: number): string {
  return `$${(amount / 1000).toFixed(0)}k`;
}

/**
 * Format MRR (Monthly Recurring Revenue)
 */
export function formatMRR(mrr: number): string {
  return `$${(mrr / 1000000).toFixed(2)}M`;
}

/**
 * Format ARR (Annual Recurring Revenue)
 */
export function formatARR(arr: number): string {
  return `$${(arr / 1000000).toFixed(1)}M`;
}

/**
 * Get color for revenue percentage
 */
export function getRevenueColor(percentage: number): string {
  if (percentage >= 50) return "from-emerald-500 to-emerald-600";
  if (percentage >= 20) return "from-blue-500 to-blue-600";
  if (percentage >= 10) return "from-amber-500 to-amber-600";
  return "from-slate-500 to-slate-600";
}

/**
 * Get color for feature usage percentage
 */
export function getUsageColor(percentage: number): string {
  if (percentage >= 90) return "bg-emerald-500";
  if (percentage >= 70) return "bg-blue-500";
  if (percentage >= 50) return "bg-amber-500";
  if (percentage >= 25) return "bg-orange-500";
  return "bg-slate-400";
}

/**
 * Calculate growth trend
 */
export function calculateGrowthTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
