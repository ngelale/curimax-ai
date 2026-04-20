import { PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

// This will be replaced with a dynamic component
import { ProjectList } from "./_components/project-list";

export default function ProjectsPage() {
  const quota = { used: 2, total: 3 };
  const quotaPercentage = (quota.used / quota.total) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-muted-foreground">
              {quota.used} of {quota.total} projects used
            </span>
            <Progress value={quotaPercentage} className="w-40" />
          </div>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Placeholder for filters and project list */}
      <ProjectList />
    </div>
  );
}
