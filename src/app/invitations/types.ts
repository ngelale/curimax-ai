export interface InvitationData {
  token: string;
  id: string;
  projectId: string;
  projectName: string;
  inviterId: string;
  inviterName: string;
  inviterEmail: string;
  inviteeEmail: string;
  role: "viewer" | "editor" | "approver";
  personalMessage?: string;
  createdAt: Date;
  expiresAt: Date;
  status: "pending" | "accepted" | "declined";
}

export interface InvitationResponse {
  success: boolean;
  message: string;
  data?: {
    projectId: string;
    projectName: string;
    role: string;
  };
}

// Mock invitations for different tokens
export const mockInvitations: Record<string, InvitationData> = {
  "token-12345": {
    token: "token-12345",
    id: "inv-001",
    projectId: "proj-001",
    projectName: "Master's in Sustainable Finance",
    inviterId: "user-jane",
    inviterName: "Jane Doe",
    inviterEmail: "jane.doe@university.edu",
    inviteeEmail: "student@university.edu",
    role: "editor",
    personalMessage:
      "Hi! I'm inviting you to collaborate on our new Sustainable Finance program analysis. Your insights on market trends would be invaluable to this project. Looking forward to working with you!",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    expiresAt: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000), // 26 days from now
    status: "pending",
  },
  "token-67890": {
    token: "token-67890",
    id: "inv-002",
    projectId: "proj-002",
    projectName: "EdTech Market Analysis",
    inviterId: "user-mike",
    inviterName: "Mike Rodriguez",
    inviterEmail: "mike.rodriguez@university.edu",
    inviteeEmail: "analyst@university.edu",
    role: "viewer",
    personalMessage:
      "We'd love to have you review our EdTech market analysis. Please share your feedback on the data gathering methodology.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    expiresAt: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days from now
    status: "pending",
  },
};

export const rolePermissions: Record<string, string[]> = {
  viewer: [
    "View all project data",
    "View reports",
    "Comment and collaborate with team",
  ],
  editor: [
    "View all project data",
    "Edit evidence and financial models",
    "Generate reports",
    "Comment and collaborate with team",
  ],
  approver: [
    "View all project data",
    "Approve reports",
    "Comment and collaborate with team",
  ],
};

export const roleLabels: Record<string, string> = {
  viewer: "Can View",
  editor: "Can Edit",
  approver: "Can Approve",
};
