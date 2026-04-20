export interface KPICard {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

export interface ProjectPerformance {
  name: string;
  demandScore: number;
  daysToComplete: number;
  reportsGenerated: number;
  status: "complete" | "analyzing" | "draft" | "archived";
}

export interface TopProgram {
  rank: number;
  name: string;
  score: number;
  jobs: number;
  avgSalary: string;
  growth: number;
}

export interface IndustryData {
  industry: string;
  demand: number;
  jobCount: number;
}

export interface Skill {
  rank: number;
  name: string;
  jobsCount: number;
  growthRate: number;
}

export interface UsageMetric {
  label: string;
  used: number | string;
  limit: number | string;
  unit?: string;
  warning?: boolean;
}

export interface ProjectStatus {
  status: "complete" | "analyzing" | "draft" | "archived";
  count: number;
  percentage: number;
}
