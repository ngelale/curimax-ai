import { UserRole, PermissionsMap, Permission } from "./types";
import { permissionsMatrix } from "./mock-data";

/**
 * Get permissions for a specific user role
 */
export function getPermissionsByRole(role: UserRole): Permission {
  return permissionsMatrix[role];
}

/**
 * Check if a user can perform an action
 */
export function canPerformAction(
  userRole: UserRole,
  action: keyof Permission
): boolean {
  return getPermissionsByRole(userRole)[action];
}

/**
 * Check if user can view project
 */
export function canView(userRole: UserRole): boolean {
  return canPerformAction(userRole, "view");
}

/**
 * Check if user can comment
 */
export function canComment(userRole: UserRole): boolean {
  return canPerformAction(userRole, "comment");
}

/**
 * Check if user can edit project data
 */
export function canEdit(userRole: UserRole): boolean {
  return canPerformAction(userRole, "edit");
}

/**
 * Check if user can approve/reject approvals
 */
export function canApprove(userRole: UserRole): boolean {
  return canPerformAction(userRole, "approve");
}

/**
 * Check if user can manage collaborators
 */
export function canManageCollaborators(userRole: UserRole): boolean {
  return canPerformAction(userRole, "manageCollaborators");
}

/**
 * Check if user can delete project
 */
export function canDelete(userRole: UserRole): boolean {
  return canPerformAction(userRole, "delete");
}

/**
 * Check if user can generate reports (requires approval if workflow enabled)
 */
export function canGenerateReports(
  userRole: UserRole,
  approvalWorkflowEnabled?: boolean
): boolean {
  if (userRole === "owner" || userRole === "editor") {
    return true;
  }
  return false;
}

/**
 * Get user-friendly description of role
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    owner: "Full access, can manage collaborators and delete project",
    editor: "Can view, edit, and comment, but cannot approve",
    commenter: "Can view and comment only",
    viewer: "View-only access",
  };
  return descriptions[role];
}
