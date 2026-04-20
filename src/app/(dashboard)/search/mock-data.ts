import {
  ProjectResult,
  EvidenceResult,
  TemplateResult,
  ReportResult,
  HelpArticleResult,
  AllSearchResults,
} from "./types";

// Project Results
export const mockProjectResults: ProjectResult[] = [
  {
    id: "proj-1",
    type: "project",
    projectId: "proj-001",
    title: "Master's in Sustainable Finance",
    description:
      "Analysis complete • Demand Score: 8.5/10. ...markets for sustainable finance professionals showing strong growth in California and New York...",
    status: "complete",
    demandScore: 8.5,
    relevance: 9.5,
    lastUpdated: "2 days ago",
  },
  {
    id: "proj-2",
    type: "project",
    projectId: "proj-002",
    title: "Certificate in ESG and Sustainable Investing",
    description:
      "Draft • Created 5 days ago. ...sustainable finance principles for corporate professionals...",
    status: "draft",
    demandScore: 7.2,
    relevance: 8.9,
    lastUpdated: "5 days ago",
  },
  {
    id: "proj-3",
    type: "project",
    projectId: "proj-003",
    title: "Advanced Sustainable Finance Specialization",
    description:
      "Analyzing • In progress. ...comprehensive program covering sustainable finance, ESG integration, and impact investing...",
    status: "analyzing",
    demandScore: 8.1,
    relevance: 8.7,
    lastUpdated: "1 day ago",
  },
  {
    id: "proj-4",
    type: "project",
    projectId: "proj-004",
    title: "Corporate Sustainability Management",
    description:
      "Complete • Published 2 months ago. ...corporate sustainability strategies and environmental impact measurement...",
    status: "complete",
    demandScore: 7.8,
    relevance: 8.3,
    lastUpdated: "2 months ago",
  },
];

// Evidence Results
export const mockEvidenceResults: EvidenceResult[] = [
  {
    id: "evid-1",
    type: "evidence",
    title: "Senior Sustainable Finance Analyst - Goldman Sachs",
    description:
      "Job Posting • Relevance: 9.2/10. ...leading sustainable finance initiatives...ESG analysis...Bloomberg Terminal...",
    category: "Job Posting",
    source: "Goldman Sachs",
    projectId: "proj-001",
    relevance: 9.2,
    relevanceScore: 9.2,
    lastUpdated: "1 week ago",
  },
  {
    id: "evid-2",
    type: "evidence",
    title: "BLS: Financial Analysts (Green Economy)",
    description:
      "Labor Statistic • Relevance: 8.7/10. ...sustainable finance sector growing 12% annually...",
    category: "Labor Statistic",
    source: "Bureau of Labor Statistics",
    projectId: "proj-001",
    relevance: 8.7,
    relevanceScore: 8.7,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "evid-3",
    type: "evidence",
    title: "ESG Rating Methodology - MSCI",
    description:
      "Research Paper • Relevance: 8.4/10. ...environmental, social, and governance scoring frameworks...",
    category: "Research",
    source: "MSCI",
    projectId: "proj-001",
    relevance: 8.4,
    relevanceScore: 8.4,
    lastUpdated: "3 weeks ago",
  },
  {
    id: "evid-4",
    type: "evidence",
    title: "Sustainable Finance Growth Report 2024",
    description:
      "Market Report • Relevance: 8.1/10. ...global sustainable finance market projected to reach $2.8 trillion...",
    category: "Market Report",
    source: "Bloomberg Terminal",
    projectId: "proj-002",
    relevance: 8.1,
    relevanceScore: 8.1,
    lastUpdated: "2 weeks ago",
  },
];

// Template Results
export const mockTemplateResults: TemplateResult[] = [
  {
    id: "tmpl-1",
    type: "template",
    title: "Master's in Sustainable Business",
    description:
      "Academic • Master's • Business. ...sustainable finance and ESG components...",
    templateType: "academic",
    level: "Master's",
    field: "Business",
    usedBy: 23,
    relevance: 8.6,
    lastUpdated: "1 month ago",
  },
  {
    id: "tmpl-2",
    type: "template",
    title: "Professional Certificate - Environmental Finance",
    description:
      "Professional • Certificate • Finance. ...credential for financial professionals in sustainable sector...",
    templateType: "professional",
    level: "Certificate",
    field: "Finance",
    usedBy: 15,
    relevance: 8.2,
    lastUpdated: "2 weeks ago",
  },
];

// Report Results
export const mockReportResults: ReportResult[] = [
  {
    id: "report-1",
    type: "report",
    title: "Master's in Sustainable Finance - Market Analysis Report",
    description:
      "PDF Report • Generated 3 days ago. ...comprehensive market analysis with demand scoring and competitive landscape...",
    format: "PDF",
    generatedDate: "3 days ago",
    projectId: "proj-001",
    relevance: 8.8,
    lastUpdated: "3 days ago",
  },
  {
    id: "report-2",
    type: "report",
    title: "Sustainable Finance - PowerPoint Presentation",
    description:
      "PowerPoint • Generated 1 week ago. ...presentation-ready slides with key findings and recommendations...",
    format: "PowerPoint",
    generatedDate: "1 week ago",
    projectId: "proj-001",
    relevance: 8.4,
    lastUpdated: "1 week ago",
  },
];

// Help Article Results
export const mockHelpArticleResults: HelpArticleResult[] = [
  {
    id: "help-1",
    type: "article",
    title: "Understanding Demand Scores",
    description:
      "Learn how Curimax calculates demand scores and what factors influence program viability...",
    category: "Getting Started",
    readTime: 3,
    views: 950,
    rating: 4.5,
    relevance: 8.9,
    lastUpdated: "1 week ago",
  },
  {
    id: "help-2",
    type: "article",
    title: "Creating Your First Project",
    description:
      "Step-by-step guide to setting up a new program analysis in Curimax...",
    category: "Tutorials",
    readTime: 5,
    views: 1200,
    rating: 4.7,
    relevance: 8.7,
    lastUpdated: "2 days ago",
  },
];

// All results combined
export const allMockResults: AllSearchResults[] = [
  ...mockProjectResults,
  ...mockEvidenceResults,
  ...mockTemplateResults,
  ...mockReportResults,
  ...mockHelpArticleResults,
];

// Search suggestions as user types
export const searchSuggestions = [
  "sustainable finance",
  "sustainability management",
  "ESG investing",
  "environmental finance",
  "impact measurement",
  "corporate social responsibility",
  "green finance",
  "climate risk analysis",
];

// Function to filter results by search query
export function filterResultsByQuery(
  results: AllSearchResults[],
  query: string
): AllSearchResults[] {
  const lowerQuery = query.toLowerCase();
  return results.filter(
    (result) =>
      result.title.toLowerCase().includes(lowerQuery) ||
      result.description.toLowerCase().includes(lowerQuery)
  );
}

// Function to sort results
export function sortResults(
  results: AllSearchResults[],
  sortBy: "relevance" | "date" | "name",
  direction: "asc" | "desc" = "desc"
): AllSearchResults[] {
  const sorted = [...results].sort((a, b) => {
    let compareValue = 0;

    if (sortBy === "relevance") {
      compareValue = a.relevance - b.relevance;
    } else if (sortBy === "date") {
      // Parse "X days ago" format
      const aDate = new Date();
      const bDate = new Date();
      compareValue = aDate.getTime() - bDate.getTime();
    } else if (sortBy === "name") {
      compareValue = a.title.localeCompare(b.title);
    }

    return direction === "asc" ? compareValue : -compareValue;
  });

  return sorted;
}

// Function to get result count by type
export function getResultCountByType(results: AllSearchResults[]) {
  return {
    projects: results.filter((r) => r.type === "project").length,
    evidence: results.filter((r) => r.type === "evidence").length,
    templates: results.filter((r) => r.type === "template").length,
    reports: results.filter((r) => r.type === "report").length,
    articles: results.filter((r) => r.type === "article").length,
  };
}

// Function to get suggestions
export function getSuggestions(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  return searchSuggestions
    .filter((s) => s.toLowerCase().includes(lowerQuery))
    .slice(0, 4);
}
