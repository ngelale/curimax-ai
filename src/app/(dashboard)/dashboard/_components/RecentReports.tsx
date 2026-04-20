"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Download, FileText, Eye } from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: "pdf" | "pptx";
  date: string;
  downloads: number;
}

const defaultReports: Report[] = [
  { id: "1", title: "Q4 2024 React Developer Market Report", type: "pdf", date: "Dec 15, 2024", downloads: 234 },
  { id: "2", title: "AI Engineer Trends Presentation", type: "pptx", date: "Dec 10, 2024", downloads: 156 },
  { id: "3", title: "Cloud Architecture Skills Analysis", type: "pdf", date: "Dec 5, 2024", downloads: 89 },
  { id: "4", title: "DevOps Engineer Demand Forecast", type: "pptx", date: "Nov 28, 2024", downloads: 145 },
];

export function RecentReports({ reports = defaultReports }: { reports?: Report[] }) {
  return (
    <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="text-lg md:text-xl text-slate-900">Recent Reports</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2 md:space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 md:p-4 rounded-lg border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 hover:border-blue-200/60 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {report.type === "pdf" ? (
                    <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-red-700">PDF</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-700">PPT</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{report.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {report.date} • {report.downloads} downloads
                  </p>
                </div>
              </div>
              <div className="flex gap-1 ml-0 sm:ml-3 flex-shrink-0">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
