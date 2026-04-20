// Re-export all approval components
export { ApprovalRequestModal } from "./approval-request-modal";
export { ApprovalPending } from "./approval-pending";
export { ApprovalCard } from "./approval-card";
export {
  type ApprovalRequest,
  type ApprovalStatus,
  type ApprovalSection,
  type Approver,
  mockApprovalRequests,
  mockApprovers,
  APPROVAL_SECTIONS,
  daysUntilExpiry,
} from "./types";
