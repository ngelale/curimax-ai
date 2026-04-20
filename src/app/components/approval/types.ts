export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ApprovalSection {
  id: string;
  name: string;
  description?: string;
  isIncluded: boolean;
}

export interface Approver {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "approver" | "owner";
}

export interface ApprovalRequest {
  id: string;
  projectId: string;
  projectName: string;
  requesterName: string;
  requesterId: string;
  approverId: string;
  approverName: string;
  approverEmail: string;
  approverAvatar?: string;
  reportType: "full" | "summary" | "financial" | "market";
  message?: string;
  attachedSections: ApprovalSection[];
  status: ApprovalStatus;
  requestedAt: Date;
  respondedAt?: Date;
  responseMessage?: string;
  expiresAt: Date;
}

export const APPROVAL_SECTIONS: ApprovalSection[] = [
  {
    id: "evidence",
    name: "Evidence Analysis",
    description: "Market research and job data analysis",
    isIncluded: true,
  },
  {
    id: "benchmarking",
    name: "Competitor Benchmarking",
    description: "Competitive analysis and market positioning",
    isIncluded: true,
  },
  {
    id: "financial",
    name: "Financial Model",
    description: "Revenue projections and financial assumptions",
    isIncluded: true,
  },
  {
    id: "draft-preview",
    name: "Draft Report Preview",
    description: "Preview of the final report",
    isIncluded: false,
  },
];

export const mockApprovers: Approver[] = [
  {
    id: "user-4",
    name: "Lisa Thompson",
    email: "lisa.t@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    role: "approver",
  },
  {
    id: "user-5",
    name: "James Wilson",
    email: "james.w@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    role: "owner",
  },
];

// Mock approval requests
export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: "approval-1",
    projectId: "proj-001",
    projectName: "Master's in Sustainable Finance",
    requesterName: "You",
    requesterId: "user-1",
    approverId: "user-4",
    approverName: "Lisa Thompson",
    approverEmail: "lisa.t@university.edu",
    approverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    reportType: "full",
    message:
      "Hi Lisa, I've completed the analysis and financial projections. Ready for your review!",
    attachedSections: APPROVAL_SECTIONS.map((section) => ({
      ...section,
      isIncluded:
        section.id === "draft-preview" ? false : true,
    })),
    status: "pending",
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
  {
    id: "approval-2",
    projectId: "proj-002",
    projectName: "EdTech Market Analysis",
    requesterName: "Sarah Chen",
    requesterId: "user-2",
    approverId: "user-5",
    approverName: "James Wilson",
    approverEmail: "james.w@university.edu",
    approverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    reportType: "financial",
    message: "Please review the financial model updates.",
    attachedSections: APPROVAL_SECTIONS.filter((s) => s.id === "financial"),
    status: "approved",
    requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    respondedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    responseMessage: "Looks great! The analysis is thorough and well-documented.",
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days
  },
  {
    id: "approval-3",
    projectId: "proj-003",
    projectName: "Healthcare Tech Innovation",
    requesterName: "Mike Rodriguez",
    requesterId: "user-3",
    approverId: "user-4",
    approverName: "Lisa Thompson",
    approverEmail: "lisa.t@university.edu",
    approverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    reportType: "summary",
    message: "Summary report ready for approval.",
    attachedSections: APPROVAL_SECTIONS.map((section) => ({
      ...section,
      isIncluded: true,
    })),
    status: "rejected",
    requestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    respondedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    responseMessage:
      "Please revise the evidence section with more recent data from 2024-2025.",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
  },
];

export function daysUntilExpiry(expiresAt: Date): number {
  return Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}
