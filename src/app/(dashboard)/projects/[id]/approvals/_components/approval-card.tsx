"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Card } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { formatTimeAgo } from "../utils";
import { ApprovalSection } from "../types";

interface ApprovalCardProps {
  requesterName: string;
  requesterAvatar?: string;
  requestedAt: string;
  message: string;
  sections: ApprovalSection[];
}

export function ApprovalCard({ requesterName, requesterAvatar, requestedAt, message, sections }: ApprovalCardProps) {
  const initials = requesterName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={requesterAvatar} alt={requesterName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">
            {requesterName} requested approval
          </p>
          <p className="text-sm text-muted-foreground">{formatTimeAgo(requestedAt)}</p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-slate-50 rounded-lg p-4 border">
        <p className="text-sm text-muted-foreground italic">"{message}"</p>
      </div>

      <div className="border-t" />

      {/* Review Sections */}
      <div>
        <h3 className="font-semibold mb-4">Review Sections:</h3>
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="flex items-start gap-3">
              <span className="text-lg">{section.icon || "✓"}</span>
              <div className="flex-1">
                <p className="font-medium">{section.title}</p>
                <p className="text-xs text-muted-foreground">{section.description}</p>
                {section.details && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(section.details).map(([key, value]) => (
                      <p key={key} className="text-xs text-muted-foreground">
                        • {key}: <span className="font-medium text-foreground">{value}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
