/**
 * Format time ago (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return then.toLocaleDateString();
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get status color for approval status
 */
export function getStatusColor(
  status: "pending" | "approved" | "rejected" | "changes-requested"
): string {
  switch (status) {
    case "approved":
      return "text-green-600 bg-green-50 border-green-200";
    case "rejected":
      return "text-red-600 bg-red-50 border-red-200";
    case "changes-requested":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "pending":
    default:
      return "text-blue-600 bg-blue-50 border-blue-200";
  }
}

/**
 * Get status icon
 */
export function getStatusIcon(
  status: "pending" | "approved" | "rejected" | "changes-requested"
): string {
  switch (status) {
    case "approved":
      return "✅";
    case "rejected":
      return "❌";
    case "changes-requested":
      return "⚠️";
    case "pending":
    default:
      return "⏳";
  }
}

/**
 * Get status label
 */
export function getStatusLabel(
  status: "pending" | "approved" | "rejected" | "changes-requested"
): string {
  switch (status) {
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "changes-requested":
      return "Changes Requested";
    case "pending":
    default:
      return "Pending";
  }
}

/**
 * Get action verb for activity log
 */
export function getActionVerb(
  action: "requested" | "approved" | "rejected" | "changes-requested" | "commented" | "edited" | "viewed"
): string {
  switch (action) {
    case "requested":
      return "requested approval";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "changes-requested":
      return "requested changes";
    case "commented":
      return "commented";
    case "edited":
      return "edited";
    case "viewed":
      return "viewed";
    default:
      return "updated";
  }
}
