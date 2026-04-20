"use client";

import { ActivityEvent } from "../types";
import { formatActivityTime, getActivitySeverityColor } from "../utils";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const [isPaused, setIsPaused] = useState(false);

  const getSeverityIcon = (severity: ActivityEvent["severity"]): string => {
    switch (severity) {
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "critical":
        return "🔴";
      default:
        return "○";
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">System Activity</h3>
          <span className="text-xs text-gray-500">(Real-time)</span>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4" />
              Resume
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          )}
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {isPaused && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-sm text-amber-700">
            Feed paused
          </div>
        )}

        {activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No recent activities
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-3">
                <div className="pt-0.5 text-lg">
                  {getSeverityIcon(activity.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">
                      {formatActivityTime(activity.timestamp)}
                    </span>
                    <span className="text-sm text-gray-900">
                      • {activity.message}
                    </span>
                  </div>
                  {activity.metadata && (
                    <div className="mt-1 text-xs text-gray-500">
                      {JSON.stringify(activity.metadata).slice(0, 60)}...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
