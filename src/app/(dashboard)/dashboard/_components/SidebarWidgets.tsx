"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { TrendingUp, Lightbulb, Zap } from "lucide-react";

interface SidebarWidgetsProps {}

export function SidebarWidgets({}: SidebarWidgetsProps) {
  const trendingTopics = [
    { topic: "AI/Machine Learning", trend: "↑ +12%" },
    { topic: "Cloud Architecture", trend: "↑ +8%" },
    { topic: "DevOps", trend: "↑ +6%" },
    { topic: "Data Engineering", trend: "↑ +9%" },
  ];

  const recommendations = [
    { title: "Update React skills", subtitle: "3 new courses available" },
    { title: "Explore cloud platforms", subtitle: "AWS certifications trending" },
    { title: "Learn containerization", subtitle: "Docker & Kubernetes demand up" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {/* Trending Topics */}
      <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3 border-b border-slate-100/50">
          <CardTitle className="text-sm md:text-base flex items-center gap-2 text-slate-900">
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {trendingTopics.map((item, idx) => (
            <div key={idx} className="text-xs md:text-sm p-2 rounded-md hover:bg-blue-50/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium truncate text-slate-700">{item.topic}</span>
                <span className="text-xs text-green-600 font-semibold flex-shrink-0 ml-2">{item.trend}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3 border-b border-slate-100/50">
          <CardTitle className="text-sm md:text-base flex items-center gap-2 text-slate-900">
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="text-xs md:text-sm p-3 rounded-md bg-gradient-to-br from-blue-50/60 to-slate-50/40 border border-blue-100/50 hover:border-blue-200/80 hover:bg-gradient-to-br hover:from-blue-100/60 hover:to-slate-50/60 transition-all cursor-pointer">
              <div className="font-semibold text-slate-900">{rec.title}</div>
              <div className="text-xs text-slate-600 mt-0.5">{rec.subtitle}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3 border-b border-slate-100/50">
          <CardTitle className="text-sm md:text-base flex items-center gap-2 text-slate-900">
            <Zap className="w-4 h-4 flex-shrink-0" />
            Account Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span>Reports Generated</span>
              <span className="font-semibold flex-shrink-0">18/25</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span>Projects Limit</span>
              <span className="font-semibold flex-shrink-0">12/20</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div className="text-xs text-muted-foreground pt-2 border-t">
            Pro Plan • Renews in 23 days
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
