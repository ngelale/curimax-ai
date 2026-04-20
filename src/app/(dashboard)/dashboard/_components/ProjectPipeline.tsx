"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PipelineStage {
  name: string;
  count: number;
  color: string;
  textColor: string;
}

interface ProjectPipelineProps {
  onFilterByStatus?: (status: string) => void;
}

export function ProjectPipeline({ onFilterByStatus }: ProjectPipelineProps) {
  const stages: PipelineStage[] = [
    { name: "Draft", count: 3, color: "bg-slate-100 hover:bg-slate-150", textColor: "text-slate-700" },
    { name: "Analyzing", count: 2, color: "bg-blue-100 hover:bg-blue-150", textColor: "text-blue-700" },
    { name: "Complete", count: 6, color: "bg-green-100 hover:bg-green-150", textColor: "text-green-700" },
    { name: "Archived", count: 1, color: "bg-gray-100 hover:bg-gray-150", textColor: "text-gray-700" },
  ];

  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const handleStageClick = (stageName: string) => {
    setSelectedStage(stageName === selectedStage ? null : stageName);
    onFilterByStatus?.(stageName);
  };

  return (
    <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="text-lg md:text-xl text-slate-900">Project Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-3 md:pb-4 -mx-1 px-1">
          {stages.map((stage, index) => (
            <div key={stage.name} className="flex items-center gap-1 md:gap-2 min-w-max">
              <Button
                variant={selectedStage === stage.name ? "default" : "outline"}
                className={`flex items-center gap-1 md:gap-2 cursor-pointer transition-all whitespace-nowrap text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2`}
                onClick={() => handleStageClick(stage.name)}
              >
                <div className={`px-2 md:px-3 py-1 md:py-2 rounded-lg ${stage.color}`}>
                  <span className={`font-semibold text-xs md:text-sm ${stage.textColor}`}>
                    {stage.name}
                  </span>
                  <span className={`ml-1 md:ml-2 font-bold text-xs md:text-sm ${stage.textColor}`}>
                    ({stage.count})
                  </span>
                </div>
              </Button>
              {index < stages.length - 1 && (
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
