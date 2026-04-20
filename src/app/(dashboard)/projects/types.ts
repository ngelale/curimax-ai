export type ProjectStatus = "draft" | "analyzing" | "complete" | "archived";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  programLevel: string;
  topic: string;
  demandScore: number;
  jobCount: number;
  avgSalary: number;
  competitors: number;
  createdAt: string;
}
