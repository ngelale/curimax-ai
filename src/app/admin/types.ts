/**
 * Admin Dashboard Types
 * Defines interfaces for system administration features
 */

export type UserRole = "admin" | "owner" | "editor" | "commenter" | "viewer";

export type HealthStatus = "operational" | "degraded" | "down" | "unknown";

export type MetricTrend = "up" | "down" | "stable";

export interface SystemMetric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  trend: MetricTrend;
  changeValue: number | string;
  changeType: "users" | "projects" | "percentage" | "requests";
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface ActivityEvent {
  id: string;
  timestamp: Date;
  type:
    | "user_upgrade"
    | "project_completed"
    | "user_registration"
    | "report_generated"
    | "failed_login"
    | "rate_limit"
    | "system_alert"
    | "other";
  message: string;
  user?: string;
  metadata?: Record<string, unknown>;
  severity: "info" | "warning" | "critical";
}

export interface SystemService {
  id: string;
  name: string;
  status: HealthStatus;
  details: string;
  responseTime?: string;
  metric?: string;
  lastChecked: Date;
}

export type UserTier = "Trial" | "Sprint" | "Accelerator" | "Portfolio" | "Enterprise";

export type AccountStatus = "Active" | "Expired" | "Suspended" | "Inactive";

export interface UserSubscription {
  tier: UserTier;
  status: AccountStatus;
  startDate: Date;
  renewalDate: Date;
  paymentMethod: string;
  annualCost?: number;
}

export interface UserUsage {
  projectsUsed: number;
  projectsLimit: number;
  reportsGenerated: number;
  storageUsedGB: number;
  apiCallsThisMonth: number;
}

export interface UserProject {
  id: string;
  name: string;
  status: "Complete" | "Analyzing" | "Pending" | "Archived";
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  tier: UserTier;
  status: AccountStatus;
  verified: boolean;
  createdDate: Date;
  lastLoginDate: Date;
  lastLoginIP?: string;
  subscription: UserSubscription;
  usage: UserUsage;
  projects: UserProject[];
}

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  lastLogin: Date;
}

export type ProjectStatus = "Draft" | "Analyzing" | "Complete" | "Archived";

export type DemandScoreRange = "High" | "Good" | "Low" | "None";

export interface DemandScore {
  score: number; // 0-10
  range: DemandScoreRange;
  percentile?: number;
}

export interface ProjectOwner {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  organization: string;
}

export interface ProjectMetadata {
  createdDate: Date;
  lastModifiedDate: Date;
  completedDate?: Date;
  analysisDuration?: number; // in hours
  totalRows?: number;
  totalColumns?: number;
}

export interface Project {
  id: string;
  name: string;
  owner: ProjectOwner;
  status: ProjectStatus;
  demandScore?: DemandScore;
  createdDate: Date;
  lastModifiedDate: Date;
  tier: UserTier;
  description?: string;
  metadata?: ProjectMetadata;
}

export interface PerformanceMetric {
  timestamp: Date;
  responseTime: number; // milliseconds
}

export interface ErrorInfo {
  code: number;
  message: string;
  occurrences: number;
  percentage: number;
}

export interface ErrorStats {
  timestamp: Date;
  errorRate: number; // percentage
  totalErrors: number;
  totalRequests: number;
  topErrors: ErrorInfo[];
}

export interface InfrastructureCost {
  service: string;
  description: string;
  monthlyCost: number;
  unit?: string;
  trend?: "up" | "down" | "stable";
}

export interface SystemHealthData {
  performanceMetrics: PerformanceMetric[];
  errorStats: ErrorStats[];
  infrastructureCosts: InfrastructureCost[];
  metrics?: {
    avgResponseTime: number;
    p50ResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    slaBoundary: number;
    slaMet: boolean;
  };
}

export interface UserGrowthPoint {
  month: string; // Jan, Feb, etc.
  count: number; // number of users
}

export interface RevenueData {
  tier: UserTier;
  users: number;
  monthlyRevenue: number; // MRR
  percentage: number;
}

export interface FeatureUsage {
  name: string;
  projectCount: number;
  percentage: number; // 0-100
}

export interface AnalyticsData {
  userGrowth: UserGrowthPoint[];
  growthRate: number; // percentage month-over-month
  revenueByTier: RevenueData[];
  monthlyRecurringRevenue: number; // MRR
  annualRecurringRevenue: number; // ARR
  featureUsage: FeatureUsage[];
  lastUpdated: Date;
}

export type AuditEventType =
  | "user.login"
  | "user.logout"
  | "user.registration"
  | "user.password_reset"
  | "project.created"
  | "project.edited"
  | "project.deleted"
  | "project.analyzed"
  | "subscription.upgraded"
  | "subscription.downgraded"
  | "subscription.canceled"
  | "subscription.renewed"
  | "admin.user_modified"
  | "admin.settings_changed"
  | "admin.impersonation"
  | "system.analysis_completed"
  | "system.report_generated"
  | "system.error_occurred"
  | "security.failed_login"
  | "security.suspicious_activity"
  | "security.rate_limit_hit";

export interface AuditLogEvent {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  userId: string;
  userEmail: string;
  userName: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, unknown>;
  severity: "info" | "warning" | "error" | "critical";
}

export interface AuditLogFilter {
  searchQuery: string;
  dateRange: { start: Date; end: Date } | null;
  eventType: AuditEventType | "All";
  userId: string | "All";
}

export interface AdminDashboardData {
  metrics: SystemMetric[];
  activities: ActivityEvent[];
  services: SystemService[];
  users?: User[];
  projects?: Project[];
  health?: SystemHealthData;
  analytics?: AnalyticsData;
  auditLogs?: AuditLogEvent[];
  lastUpdated: Date;
}
