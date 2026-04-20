export type ApprovalStatus = "pending" | "approved" | "rejected" | "changes-requested";
export type UserRole = "owner" | "editor" | "commenter" | "viewer";
export type NotificationFrequency = "real-time" | "daily" | "weekly" | "off";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Collaborator extends User {
  role: UserRole;
  addedAt: string;
  addedBy: string;
}

export interface ApprovalRequest {
  id: string;
  projectId: string;
  requestedBy: User;
  requestedAt: string;
  status: ApprovalStatus;
  message: string;
  sections: ApprovalSection[];
  notes?: string;
  approvedBy?: User;
  approvedAt?: string;
  rejectedReason?: string;
  changesRequestedNotes?: string;
}

export interface ApprovalSection {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  icon?: string;
  details?: Record<string, string>;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  sectionId?: string;
  replies?: Comment[];
  mentions?: string[];
}

export interface ActivityLog {
  id: string;
  action: "requested" | "approved" | "rejected" | "changes-requested" | "commented" | "edited" | "viewed";
  actor: User;
  timestamp: string;
  details?: string;
  targetSection?: string;
}

export interface Permission {
  view: boolean;
  comment: boolean;
  edit: boolean;
  approve: boolean;
  manageCollaborators: boolean;
  delete: boolean;
}

export interface PermissionsMap {
  owner: Permission;
  editor: Permission;
  commenter: Permission;
  viewer: Permission;
}

export interface NotificationPreferences {
  userId: string;
  email: {
    onInvite: boolean;
    onComment: boolean;
    onMention: boolean;
    onApproval: boolean;
    onView: boolean;
    onEdit: boolean;
  };
  inApp: {
    desktopNotifications: boolean;
    playSoundOnMention: boolean;
  };
  frequency: NotificationFrequency;
  digestTime?: string; // "09:00" format for daily
  digestDay?: string; // "monday" format for weekly
}
