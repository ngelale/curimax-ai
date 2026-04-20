/**
 * Audit Logs Bridge
 * Converts between admin mock data format and audit logs component format
 */

import { AuditLogEvent, AuditEventType as AdminAuditEventType } from "../admin/types";
import {
  AuditLog,
  AuditEventType,
  EventCategory,
} from "./_components/audit-logs/types";

/**
 * Map event type to category
 */
function getEventCategory(eventType: AdminAuditEventType): EventCategory {
  if (
    eventType.includes("user") ||
    eventType.includes("login") ||
    eventType.includes("registration")
  ) {
    return "user";
  }
  if (eventType.includes("project")) {
    return "project";
  }
  if (eventType.includes("subscription")) {
    return "subscription";
  }
  if (eventType.includes("admin")) {
    return "admin";
  }
  if (eventType.includes("security")) {
    return "security";
  }
  return "system";
}

/**
 * Get event description
 */
function getEventDescription(
  eventType: AdminAuditEventType,
  details: Record<string, unknown>
): string {
  const descriptions: Record<string, string> = {
    "user.login": "User logged in successfully",
    "user.logout": "User logged out",
    "user.registration": "New user registration",
    "user.password_reset": "User password reset",
    "project.created": "New project created",
    "project.modified": "Project modified",
    "project.deleted": "Project deleted",
    "project.analyzed": "Project analysis completed",
    "subscription.created": "Subscription created",
    "subscription.upgraded": "Subscription upgraded",
    "subscription.downgraded": "Subscription downgraded",
    "subscription.canceled": "Subscription canceled",
    "admin.user_modified": "User modified by admin",
    "admin.settings_changed": "System settings changed",
    "admin.impersonation": "Admin impersonation session",
    "system.analysis_completed": "System analysis completed",
    "system.report_generated": "Report generated",
    "system.error_occurred": "System error occurred",
    "security.failed_login": "Failed login attempt",
    "security.suspicious_activity": "Suspicious activity detected",
    "security.rate_limit_hit": "Rate limit exceeded",
  };

  return descriptions[eventType] || "System event occurred";
}

/**
 * Convert admin audit log to component audit log
 */
export function convertAdminAuditLogToComponentLog(
  log: AuditLogEvent
): AuditLog {
  const category = getEventCategory(log.eventType);
  const description = getEventDescription(log.eventType, log.details);

  // Extract event name from event type
  const eventParts = log.eventType.split(".");
  const eventName = eventParts[eventParts.length - 1]
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    id: log.id,
    eventId: `evt_${log.id.substring(0, 8)}`,
    timestamp: log.timestamp,
    eventType: log.eventType as AuditEventType,
    category,
    user: log.userEmail,
    userId: log.userId,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    event: eventName,
    description,
    details: log.details,
    severity:
      log.severity === "error" ? "critical" : (log.severity as any),
    status: "success",
  };
}

/**
 * Convert multiple admin audit logs to component format
 */
export function convertAdminAuditLogsToComponentLogs(
  logs: AuditLogEvent[]
): AuditLog[] {
  return logs.map(convertAdminAuditLogToComponentLog);
}
