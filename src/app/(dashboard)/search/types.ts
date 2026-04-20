export interface SearchResult {
  id: string;
  type: "project" | "evidence" | "template" | "report" | "article";
  title: string;
  description: string;
  relevance: number;
  lastUpdated?: string;
  metadata?: Record<string, string | number>;
}

export interface ProjectResult extends SearchResult {
  type: "project";
  status: "draft" | "analyzing" | "complete" | "archived";
  demandScore?: number;
  projectId: string;
}

export interface EvidenceResult extends SearchResult {
  type: "evidence";
  category: string;
  source: string;
  projectId: string;
  relevanceScore: number;
}

export interface TemplateResult extends SearchResult {
  type: "template";
  templateType: "academic" | "professional" | "custom";
  level: string;
  field: string;
  usedBy: number;
}

export interface ReportResult extends SearchResult {
  type: "report";
  format: string;
  generatedDate: string;
  projectId: string;
}

export interface HelpArticleResult extends SearchResult {
  type: "article";
  category: string;
  readTime: number;
  views: number;
  rating: number;
}

export type AllSearchResults =
  | ProjectResult
  | EvidenceResult
  | TemplateResult
  | ReportResult
  | HelpArticleResult;

export interface SearchFilters {
  types: ("project" | "evidence" | "template" | "report" | "article")[];
  projectStatus?: ("draft" | "analyzing" | "complete" | "archived")[];
  dateRange: "any" | "30days" | "90days" | "1year" | "custom";
  customDateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchSort {
  field: "relevance" | "date" | "name";
  direction: "asc" | "desc";
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  sort: SearchSort;
  results: AllSearchResults[];
  suggestions: string[];
  loading: boolean;
  hasMore: boolean;
}
