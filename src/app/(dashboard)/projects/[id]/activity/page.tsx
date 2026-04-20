"use client";

import { useState, useMemo } from "react";
import { Activity, ActivityFilter, mockActivities } from "./types";
import { ActivityCard } from "./_components/activity-card";
import { ActivityFilterBar } from "./_components/activity-filter";
import { Button } from "@/app/components/ui/button";
import { History } from "lucide-react";
import { toast } from "sonner";

interface ActivityGroup {
  date: string;
  activities: Activity[];
}

export default function ActivityPage({ params }: { params: { id: string } }) {
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [displayedCount, setDisplayedCount] = useState(6);

  // Filter activities
  const filteredActivities = useMemo(() => {
    let result = [...mockActivities];

    // Apply activity type filter
    if (filter === "comments") {
      result = result.filter((a) => a.type === "comment");
    } else if (filter === "edits") {
      result = result.filter((a) => a.type === "edit");
    } else if (filter === "approvals") {
      result = result.filter((a) => a.type === "approve" || a.type === "reject");
    } else if (filter === "system") {
      result = result.filter((a) => a.userId === "system");
    }

    // Apply user filter
    if (userFilter !== "all") {
      result = result.filter((a) => a.userName === userFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description?.toLowerCase().includes(query) ||
          a.userName.toLowerCase().includes(query)
      );
    }

    return result;
  }, [filter, searchQuery, userFilter]);

  // Group activities by date
  const groupedActivities: ActivityGroup[] = useMemo(() => {
    const groups: Record<string, Activity[]> = {};

    filteredActivities.forEach((activity) => {
      const date = new Date(activity.timestamp);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const activityDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;
      if (activityDate.getTime() === today.getTime()) {
        dateKey = "Today";
      } else if (activityDate.getTime() === yesterday.getTime()) {
        dateKey = "Yesterday";
      } else {
        dateKey = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    // Create ordered groups
    const result: ActivityGroup[] = [];
    const dateOrder = ["Today", "Yesterday"];

    for (const dateKey of dateOrder) {
      if (groups[dateKey]) {
        result.push({ date: dateKey, activities: groups[dateKey] });
      }
    }

    // Add other dates in reverse chronological order
    Object.keys(groups)
      .filter((key) => !dateOrder.includes(key))
      .sort(
        (a, b) =>
          new Date(b).getTime() - new Date(a).getTime()
      )
      .forEach((dateKey) => {
        result.push({ date: dateKey, activities: groups[dateKey] });
      });

    return result;
  }, [filteredActivities]);

  const handleFilterChange = (newFilter: ActivityFilter, search: string) => {
    setFilter(newFilter);
    setSearchQuery(search);
    setDisplayedCount(6);
  };

  const handleActionClick = (activity: Activity, action: string) => {
    const actionMessages: Record<string, string> = {
      view_comment: "Opening comment view...",
      reply: "Opening reply form...",
      view_changes: "Showing changes...",
      view_results: "Loading analysis results...",
      download: "Downloading report...",
    };

    toast.success(actionMessages[action] || "Action performed");
  };

  const displayedActivities = groupedActivities.slice(0, displayedCount);
  const hasMore = displayedCount < groupedActivities.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <History className="h-7 w-7 text-blue-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Activity History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredActivities.length} activity record{filteredActivities.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <ActivityFilterBar
        onFilterChange={handleFilterChange}
        onUserFilterChange={(userId) => {
          setUserFilter(userId);
          setDisplayedCount(6);
        }}
        activities={mockActivities}
      />

      {/* Activities */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No activities found</h3>
          <p className="text-slate-500">
            {searchQuery
              ? "No activities match your search query"
              : "No activities yet. Get started by collaborating on this project!"}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {displayedActivities.map((group) => (
            <div key={group.date}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-semibold text-slate-900">{group.date}</h3>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Activities for this date */}
              <div className="space-y-4">
                {group.activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onActionClick={handleActionClick}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => setDisplayedCount((prev) => prev + 6)}
                className="px-6 py-2"
              >
                Load More ↓
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
