"use client";

import { Activity, ACTIVITY_ICONS } from "../types";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface ActivityCardProps {
  activity: Activity;
  onActionClick?: (activity: Activity, action: string) => void;
}

export function ActivityCard({ activity, onActionClick }: ActivityCardProps) {
  return (
    <Card className="border-l-4 border-l-slate-200 hover:border-l-blue-400 transition-colors">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
            <img
              src={activity.userAvatar}
              alt={activity.userName}
              className="h-full w-full object-cover"
            />
          </Avatar>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{ACTIVITY_ICONS[activity.type]}</span>
                  <span className="font-semibold text-slate-900">
                    {activity.userName}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {activity.title}
                </p>
              </div>

              {/* Timestamp */}
              <div className="flex-shrink-0 text-xs text-slate-500 whitespace-nowrap">
                {formatTime(activity.timestamp)}
              </div>
            </div>

            {/* Description */}
            {activity.description && (
              <p className="text-sm text-slate-600 mb-3 italic">
                {activity.description}
              </p>
            )}

            {/* Details - Before/After */}
            {activity.details?.before && activity.details?.after && (
              <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded">
                Changed: <span className="line-through">{activity.details.before}</span> →{" "}
                <span className="font-medium">{activity.details.after}</span>
              </div>
            )}

            {/* Actions */}
            {activity.actions && activity.actions.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                {activity.actions.map((action) => (
                  <Button
                    key={action.action}
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs hover:bg-slate-100"
                    onClick={() => onActionClick?.(activity, action.action)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const activityDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (activityDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (activityDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  // Format as "Jan 5, 2025"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
