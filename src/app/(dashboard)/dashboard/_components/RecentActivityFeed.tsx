"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Eye, FileText, Plus } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  status: "draft" | "analyzing" | "complete" | "archived";
  progress?: number;
  date: string;
}

interface RecentActivityFeedProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  { id: "1", title: "React Developer Market Analysis", status: "analyzing", progress: 65, date: "2 days ago" },
  { id: "2", title: "AI/ML Engineer Trends 2024", status: "complete", date: "4 days ago" },
  { id: "3", title: "DevOps Skills Landscape", status: "complete", date: "1 week ago" },
  { id: "4", title: "Full Stack Developer Demand", status: "draft", date: "1 week ago" },
];

const statusConfig = {
  draft: { color: "bg-slate-100", textColor: "text-slate-700", label: "Draft" },
  analyzing: { color: "bg-blue-100", textColor: "text-blue-700", label: "Analyzing" },
  complete: { color: "bg-green-100", textColor: "text-green-700", label: "Complete" },
  archived: { color: "bg-gray-100", textColor: "text-gray-700", label: "Archived" },
};

export function RecentActivityFeed({ activities = defaultActivities }: RecentActivityFeedProps) {
  return (
    <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="text-lg md:text-xl text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2 md:space-y-4">
          {activities.map((activity) => {
            const config = statusConfig[activity.status];
            return (
              <div
                key={activity.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 p-3 md:p-4 rounded-lg border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 hover:border-blue-200/60 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                    <Badge className={`${config.color} ${config.textColor} border-0 text-xs flex-shrink-0`}>
                      {config.label}
                    </Badge>
                  </div>
                  {activity.status === "analyzing" && activity.progress !== undefined && (
                    <div className="mb-2">
                      <Progress value={activity.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.progress}% complete
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <div className="flex gap-1 ml-0 sm:ml-3 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <FileText className="w-4 h-4" />
                  </Button>
                  {activity.status === "draft" && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
