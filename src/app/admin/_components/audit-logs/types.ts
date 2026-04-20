/**
 * Audit Log Types
 */

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

export type EventCategory =
  | "user"
  | "project"
  | "subscription"
  | "admin"
  | "system"
  | "security";

export interface AuditLog {
  id: string;
  eventId: string;
  timestamp: Date;
  eventType: AuditEventType;
  category: EventCategory;
  user: string;
  userId: string;
  ipAddress: string;
  userAgent?: string;
  event: string;
  description: string;
  details: Record<string, unknown>;
  severity: "info" | "warning" | "critical";
  status: "success" | "failed" | "partial";
}

export interface AuditLogFilters {
  searchQuery?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  eventType?: AuditEventType | "all";
  user?: string | "all";
  severity?: "all" | "info" | "warning" | "critical";
}
