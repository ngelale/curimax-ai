import { ApprovalRequest, Collaborator, ActivityLog, NotificationPreferences, PermissionsMap, Permission } from "./types";

export const mockApprovalRequest: ApprovalRequest = {
  id: "apr-001",
  projectId: "proj-1",
  requestedBy: {
    id: "user-2",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  status: "pending",
  message:
    "Hi Lisa, I've completed the analysis and financial projections. Ready for your review!",
  sections: [
    {
      id: "sec-1",
      title: "Evidence Analysis",
      description: "Market demand and job availability research",
      status: "completed",
      icon: "📊",
      details: {
        "Jobs Found": "247",
        "Demand Score": "8.5/10",
        "Regions Analyzed": "5",
      },
    },
    {
      id: "sec-2",
      title: "Competitor Benchmarking",
      description: "Comparison with similar programs in market",
      status: "completed",
      icon: "🎯",
      details: {
        "Programs Analyzed": "8",
        "Average Enrollment": "156",
        "Average Salary": "$98,500",
      },
    },
    {
      id: "sec-3",
      title: "Financial Model",
      description: "Revenue projections and cost analysis",
      status: "completed",
      icon: "💰",
      details: {
        "Break-even": "18 months",
        "ROI": "135.7%",
        "Year 1 Revenue": "$2.4M",
      },
    },
  ],
};

export const mockCollaborators: Collaborator[] = [
  {
    id: "user-1",
    name: "Lisa Thompson",
    email: "lisa@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "owner",
    addedAt: "2024-01-01T10:00:00Z",
    addedBy: "system",
  },
  {
    id: "user-2",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "editor",
    addedAt: "2024-06-15T14:30:00Z",
    addedBy: "user-1",
  },
  {
    id: "user-3",
    name: "John Smith",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "commenter",
    addedAt: "2024-08-20T09:15:00Z",
    addedBy: "user-1",
  },
  {
    id: "user-4",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "viewer",
    addedAt: "2024-09-10T11:45:00Z",
    addedBy: "user-2",
  },
];

export const mockActivityLog: ActivityLog[] = [
  {
    id: "log-1",
    action: "requested",
    actor: {
      id: "user-2",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    details: "Requested approval for project report",
  },
  {
    id: "log-2",
    action: "edited",
    actor: {
      id: "user-2",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    details: "Updated financial projections",
    targetSection: "sec-3",
  },
  {
    id: "log-3",
    action: "commented",
    actor: {
      id: "user-3",
      name: "John Smith",
      email: "john@example.com",
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    details: "Added comment on demand analysis",
    targetSection: "sec-1",
  },
  {
    id: "log-4",
    action: "viewed",
    actor: {
      id: "user-1",
      name: "Lisa Thompson",
      email: "lisa@example.com",
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    details: "Viewed project details",
  },
];

export const permissionsMatrix: PermissionsMap = {
  owner: {
    view: true,
    comment: true,
    edit: true,
    approve: true,
    manageCollaborators: true,
    delete: true,
  },
  editor: {
    view: true,
    comment: true,
    edit: true,
    approve: false,
    manageCollaborators: false,
    delete: false,
  },
  commenter: {
    view: true,
    comment: true,
    edit: false,
    approve: false,
    manageCollaborators: false,
    delete: false,
  },
  viewer: {
    view: true,
    comment: false,
    edit: false,
    approve: false,
    manageCollaborators: false,
    delete: false,
  },
};

export const mockNotificationPreferences: NotificationPreferences = {
  userId: "user-1",
  email: {
    onInvite: true,
    onComment: true,
    onMention: true,
    onApproval: true,
    onView: false,
    onEdit: true,
  },
  inApp: {
    desktopNotifications: true,
    playSoundOnMention: true,
  },
  frequency: "daily",
  digestTime: "09:00",
  digestDay: "monday",
};
