export type ActivityType =
  | "comment"
  | "edit"
  | "view"
  | "approve"
  | "reject"
  | "share"
  | "user_joined"
  | "user_removed"
  | "settings_changed"
  | "analysis_complete"
  | "report_generated";

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  timestamp: Date;
  title: string;
  description?: string;
  details?: {
    before?: string;
    after?: string;
    resource?: string;
    itemName?: string;
    permission?: string;
    count?: number;
  };
  actions?: {
    label: string;
    action: string;
  }[];
}

export const ACTIVITY_ICONS: Record<ActivityType, string> = {
  comment: "💬",
  edit: "✏️",
  view: "👁️",
  approve: "✅",
  reject: "❌",
  share: "📤",
  user_joined: "👤",
  user_removed: "👤",
  settings_changed: "🔧",
  analysis_complete: "✓",
  report_generated: "📄",
};

// Mock activity data
export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "comment",
    userId: "user2",
    userName: "Sarah Chen",
    userEmail: "sarah.chen@university.edu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    timestamp: new Date(new Date().setHours(14, 15, 0)),
    title: "Commented on Evidence Analysis",
    description: '"These salary numbers look great. Can we get more data on skills?"',
    actions: [
      { label: "View Comment", action: "view_comment" },
      { label: "Reply", action: "reply" },
    ],
  },
  {
    id: "2",
    type: "edit",
    userId: "user1",
    userName: "You",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: new Date(new Date().setHours(11, 30, 0)),
    title: "Updated financial model",
    description: "Changed enrollment projections for Year 1: 120 → 150",
    actions: [{ label: "View Changes", action: "view_changes" }],
  },
  {
    id: "3",
    type: "view",
    userId: "user3",
    userName: "Mike Rodriguez",
    userEmail: "mike.rodriguez@university.edu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1), 16, 45, 0),
    title: "Viewed project",
  },
  {
    id: "4",
    type: "approve",
    userId: "user4",
    userName: "Lisa Thompson",
    userEmail: "lisa.thompson@university.edu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1), 14, 20, 0),
    title: "Approved report",
    description: '"Comprehensive PDF Report" is approved for generation',
  },
  {
    id: "5",
    type: "share",
    userId: "user1",
    userName: "You",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1), 10, 15, 0),
    title: "Shared project with sarah.chen@university.edu",
    description: "Permission: Can Edit",
  },
  {
    id: "6",
    type: "analysis_complete",
    userId: "system",
    userName: "System",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
    timestamp: new Date(2025, 0, 5, 15, 42, 0),
    title: "Analysis complete",
    description: "Evidence gathering finished • 247 jobs analyzed",
    actions: [{ label: "View Results", action: "view_results" }],
  },
  {
    id: "7",
    type: "report_generated",
    userId: "system",
    userName: "System",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
    timestamp: new Date(2025, 0, 4, 9, 30, 0),
    title: "Report generated",
    description: "Market Analysis Report - PDF version created",
    actions: [{ label: "Download", action: "download" }],
  },
  {
    id: "8",
    type: "user_joined",
    userId: "user5",
    userName: "James Wilson",
    userEmail: "james.wilson@university.edu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    timestamp: new Date(2025, 0, 3, 13, 10, 0),
    title: "Joined project as Editor",
  },
  {
    id: "9",
    type: "settings_changed",
    userId: "user1",
    userName: "You",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: new Date(2024, 11, 30, 16, 45, 0),
    title: "Changed project settings",
    description: "Updated project visibility to Private",
  },
  {
    id: "10",
    type: "comment",
    userId: "user2",
    userName: "Sarah Chen",
    userEmail: "sarah.chen@university.edu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    timestamp: new Date(2024, 11, 28, 11, 20, 0),
    title: "Commented on Market Trends",
    description: '"This data is very insightful. Great work!"',
    actions: [
      { label: "View Comment", action: "view_comment" },
      { label: "Reply", action: "reply" },
    ],
  },
];

export type ActivityFilter = "all" | "comments" | "edits" | "approvals" | "system" | "user";

export const FILTER_OPTIONS: { value: ActivityFilter; label: string }[] = [
  { value: "all", label: "All activity" },
  { value: "comments", label: "Comments only" },
  { value: "edits", label: "Edits only" },
  { value: "approvals", label: "Approvals only" },
  { value: "system", label: "System events" },
];
