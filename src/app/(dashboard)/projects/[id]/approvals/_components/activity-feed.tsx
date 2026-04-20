"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Card } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { formatTimeAgo, getActionVerb } from "../utils";
import { ActivityLog } from "../types";

interface ActivityFeedProps {
  activities: ActivityLog[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        <p>No activity yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Activity Feed</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const initials = activity.actor.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div key={activity.id}>
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={activity.actor.avatar} alt={activity.actor.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-medium text-sm">{activity.actor.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {getActionVerb(activity.action)}
                    </span>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>

              {index < activities.length - 1 && <div className="border-t my-4" />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
