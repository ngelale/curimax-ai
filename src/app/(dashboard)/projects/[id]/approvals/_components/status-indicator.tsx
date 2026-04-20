"use client";

import { Badge } from "../../../../../components/ui/badge";
import { getStatusColor, getStatusIcon, getStatusLabel } from "../utils";
import { ApprovalStatus } from "../types";

interface StatusIndicatorProps {
  status: ApprovalStatus;
  approverName?: string;
}

export function StatusIndicator({ status, approverName }: StatusIndicatorProps) {
  const icon = getStatusIcon(status);
  const label = getStatusLabel(status);
  const colorClass = getStatusColor(status);

  return (
    <div className={`rounded-lg border p-3 flex items-center gap-2 ${colorClass}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="font-medium">
          {status === "approved" && approverName
            ? `Approved by ${approverName}`
            : status === "rejected"
              ? "Rejected"
              : status === "changes-requested"
                ? "Changes Requested"
                : "Pending Approval"}
        </span>
      </div>
    </div>
  );
}
