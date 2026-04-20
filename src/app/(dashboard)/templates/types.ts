import { ReactNode } from "react";
export type TemplateCategory = "popular" | "academic" | "corporate" | "government" | "recently-used";
export type ProgramLevel = "Bachelor's" | "Master's" | "Certificate" | "Diploma" | "Bootcamp";
export type Industry = "Technology" | "Business" | "Healthcare" | "Finance" | "Education" | "Government";
export type Region = "US" | "Canada" | "Europe" | "Global" | "APAC";

export interface Template {
  id: string;
  title: string;
  icon: string;
  category: "Academic Programs" | "Corporate Training" | "Government Workforce";
  programLevel: ProgramLevel;
  industry: Industry;
  description: string;
  includes: string[];
  regions: Region[];
  typicalDuration: string;
  usedBy: number;
  avgDemandScore: number;
  typicalResults?: {
    avgDemandScore: number;
    avgJobsFound: string;
    avgSalary: string;
    breakEvenMonths: string;
  };
  deliveryFormat?: string;
  usageCount?: number;
  createdAt?: string;
}

export interface CustomTemplate extends Template {
  createdBy: string;
  sharing: "private" | "organization" | "public";
  baseProjectId?: string;
}

export interface TemplateCardViewModel {
  id: string;
  title: string;
  icon?: ReactNode;
  meta?: string;
  includes?: string[];
  stats?: ReactNode; // optional.. can be anything - number, string, icon, etc.
  usageLabel?: string; // e.g. "Used by 10 institutions"
  score?: number; // optional 0-10 number for scoring 
}