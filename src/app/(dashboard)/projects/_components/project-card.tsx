"use client";

import Link from "next/link";
import { MoreVertical, Trash2, Archive, Copy, Edit, Eye, TrendingUp, Users, Target } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Progress } from "../../../components/ui/progress";
import { cn } from "../../../components/ui/utils";
import { type Project, type ProjectStatus } from "../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "border-gray-300 bg-gray-100 text-gray-600" },
  analyzing: { label: "Analyzing", className: "border-orange-300 bg-orange-100 text-orange-600 animate-pulse" },
  complete: { label: "Complete", className: "border-green-300 bg-green-100 text-green-600" },
  archived: { label: "Archived", className: "border-gray-200 bg-gray-50 text-gray-500" },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(value);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const status = statusConfig[project.status];
  const demandScoreColor = project.demandScore > 7 ? "text-green-600" : project.demandScore > 4 ? "text-yellow-600" : "text-red-600";
  const statusBgColor = status.className.includes('green') ? 'bg-green-50' : status.className.includes('orange') ? 'bg-orange-50' : 'bg-gray-50';

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/projects/${project.id}`);
  };

  const handleEditIntake = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Edit intake feature coming soon");
  };

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      toast.loading("Duplicating project...");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Project duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate project");
    }
  };

  const handleArchive = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      toast.loading("Archiving project...");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Project archived");
    } catch (error) {
      toast.error("Failed to archive project");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      toast.loading("Deleting project...");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowDeleteConfirm(false);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/projects/${project.id}`}>
        <Card className={cn(
          "transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer h-full",
          "border border-gray-200 hover:border-blue-300",
          statusBgColor
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <Badge variant="outline" className={cn("capitalize shrink-0", status.className)}>
                <span className="w-2 h-2 rounded-full mr-2" style={{ 
                  backgroundColor: status.className.includes('gray') ? '#9ca3af' : 
                                 status.className.includes('orange') ? '#f97316' : 
                                 status.className.includes('green') ? '#22c55e' : '#6366f1' 
                }}></span>
                {status.label}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleViewDetails}>
                    <Eye className="mr-2 h-4 w-4" /> View details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEditIntake}>
                    <Edit className="mr-2 h-4 w-4" /> Edit intake
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDuplicate}>
                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleArchive}>
                    <Archive className="mr-2 h-4 w-4" /> Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Project Title and Topic */}
            <div className="space-y-1">
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition">
                {project.name}
              </CardTitle>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {project.programLevel} • {project.topic}
              </p>
            </div>

            {/* Demand Score */}
            <div className="space-y-2 p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Market Demand</p>
                </div>
                <p className={cn("text-sm font-bold", demandScoreColor)}>
                  {project.demandScore}/10
                </p>
              </div>
              <Progress value={project.demandScore * 10} className="h-2" />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-white rounded-md text-center">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <Users className="h-3 w-3" />
                  Jobs
                </p>
                <p className="text-sm font-bold">{project.jobCount}</p>
              </div>
              <div className="p-2 bg-white rounded-md text-center">
                <p className="text-xs text-muted-foreground mb-1">Avg Salary</p>
                <p className="text-sm font-bold text-green-600">{formatCurrency(project.avgSalary)}</p>
              </div>
              <div className="p-2 bg-white rounded-md text-center">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <Target className="h-3 w-3" />
                  Rivals
                </p>
                <p className="text-sm font-bold">{project.competitors}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
              <span>Created {formatDate(project.createdAt)}</span>
              <span className="text-blue-600 font-medium group-hover:underline">View →</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold">Delete Project?</h2>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete "<strong>{project.name}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end pt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
