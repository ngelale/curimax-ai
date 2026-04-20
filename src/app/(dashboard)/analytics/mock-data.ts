import { KPICard, ProjectPerformance, TopProgram, IndustryData, Skill, UsageMetric, ProjectStatus } from "./types";

export const kpiData: KPICard[] = [
  {
    label: "Avg Demand Score",
    value: "7.8/10",
    change: "+0.5 vs last mo",
    changeType: "positive",
  },
  {
    label: "Projects Created",
    value: "12",
    change: "+3 vs last mo",
    changeType: "positive",
  },
  {
    label: "Time to Complete",
    value: "4.2 days",
    change: "-1.3 vs last mo",
    changeType: "positive",
  },
  {
    label: "Report Downloads",
    value: "45",
    change: "+12 vs last mo",
    changeType: "positive",
  },
];

export const projectPerformanceData: ProjectPerformance[] = [
  {
    name: "Sustainable Finance",
    demandScore: 8.5,
    daysToComplete: 3,
    reportsGenerated: 5,
    status: "complete",
  },
  {
    name: "AI Machine Learning",
    demandScore: 8.2,
    daysToComplete: 4,
    reportsGenerated: 3,
    status: "complete",
  },
  {
    name: "Cybersecurity Cert",
    demandScore: 7.9,
    daysToComplete: 2,
    reportsGenerated: 2,
    status: "analyzing",
  },
  {
    name: "Leadership Development",
    demandScore: 7.2,
    daysToComplete: 5,
    reportsGenerated: 4,
    status: "draft",
  },
  {
    name: "Data Analytics",
    demandScore: 6.8,
    daysToComplete: 6,
    reportsGenerated: 1,
    status: "draft",
  },
];

export const topPrograms: TopProgram[] = [
  {
    rank: 1,
    name: "Sustainable Finance",
    score: 8.5,
    jobs: 247,
    avgSalary: "$95K",
    growth: 12,
  },
  {
    rank: 2,
    name: "AI Machine Learning",
    score: 8.2,
    jobs: 312,
    avgSalary: "$118K",
    growth: 8,
  },
  {
    rank: 3,
    name: "Cybersecurity Certificate",
    score: 7.9,
    jobs: 189,
    avgSalary: "$102K",
    growth: 15,
  },
];

export const industryData: IndustryData[] = [
  { industry: "Technology", demand: 9.2, jobCount: 1240 },
  { industry: "Healthcare", demand: 8.1, jobCount: 890 },
  { industry: "Finance", demand: 8.9, jobCount: 756 },
  { industry: "Energy", demand: 7.4, jobCount: 342 },
  { industry: "Education", demand: 6.8, jobCount: 567 },
  { industry: "Manufacturing", demand: 6.2, jobCount: 421 },
];

export const topSkills: Skill[] = [
  { rank: 1, name: "Python", jobsCount: 847, growthRate: 23 },
  { rank: 2, name: "Data Analysis", jobsCount: 692, growthRate: 18 },
  { rank: 3, name: "Machine Learning", jobsCount: 584, growthRate: 31 },
  { rank: 4, name: "SQL", jobsCount: 521, growthRate: 12 },
  { rank: 5, name: "Cloud Computing", jobsCount: 473, growthRate: 27 },
];

export const usageMetrics: UsageMetric[] = [
  { label: "Projects Created", used: 3, limit: 3, warning: true },
  { label: "Reports Generated", used: 5, limit: "∞" },
  { label: "Storage Used", used: "2.4 GB", limit: "10 GB" },
  { label: "API Calls", used: 1247, limit: 10000 },
];

export const projectStatusDistribution: ProjectStatus[] = [
  { status: "complete", count: 6, percentage: 50 },
  { status: "analyzing", count: 2, percentage: 17 },
  { status: "draft", count: 3, percentage: 25 },
  { status: "archived", count: 1, percentage: 8 },
];

// Chart data for demand score trends
export const demandScoreTrendData = [
  { month: "Jan", yourScore: 7.0, industryAvg: 7.2 },
  { month: "Feb", yourScore: 7.5, industryAvg: 7.4 },
  { month: "Mar", yourScore: 8.2, industryAvg: 7.8 },
  { month: "Apr", yourScore: 7.8, industryAvg: 7.9 },
  { month: "May", yourScore: 8.0, industryAvg: 8.1 },
  { month: "Jun", yourScore: 7.8, industryAvg: 8.0 },
];
