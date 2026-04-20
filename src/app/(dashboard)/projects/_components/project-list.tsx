"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PlusCircle, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { type Project, type ProjectStatus } from "../types";
import { ProjectCard } from "./project-card";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { ProjectFilters } from "./project-filters";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "name-az">("newest");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => statusFilter === "all" || p.status === statusFilter)
      .sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOrder === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortOrder === "name-az") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [projects, searchTerm, statusFilter, sortOrder]);

  if (error) {
    return <div className="text-red-600 text-center py-12">Error: {error}</div>;
  }

  return (
    <div>
      <ProjectFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
      ) : filteredAndSortedProjects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold mt-4">No projects yet</h2>
          <p className="text-muted-foreground mt-2">Create your first curriculum analysis to get started.</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
