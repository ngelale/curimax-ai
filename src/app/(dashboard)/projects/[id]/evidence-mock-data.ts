export interface Evidence {
  id: string;
  source: string;
  sourceUrl: string;
  type: "Job Posting" | "Labor Stats" | "News" | "Studies";
  relevanceScore: number;
  date: string;
  keyData: string;
  fullText: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  salaryRange?: string;
  skillsRequired?: string[];
  experienceRequired?: string;
  isPrimaryCitation?: boolean;
}

export const mockEvidence: Evidence[] = [
  {
    id: "1",
    source: "LinkedIn Job Posting - Sr. ESG Analyst at Goldman Sachs",
    sourceUrl: "https://linkedin.com/jobs/1",
    type: "Job Posting",
    relevanceScore: 9.5,
    date: "2025-01-05",
    keyData: "$120K - $150K | NYC | 5+ yrs",
    fullText:
      "Senior ESG Analyst needed at Goldman Sachs. Requires deep knowledge of ESG frameworks, Python scripting, and financial analysis.",
    jobTitle: "Senior ESG Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    salaryRange: "$120,000 - $150,000",
    skillsRequired: ["ESG Analysis", "Python", "Financial Analysis", "SQL"],
    experienceRequired: "5+ years in sustainability or finance",
    isPrimaryCitation: true,
  },
  {
    id: "2",
    source: "U.S. Bureau of Labor Statistics - Environmental Science Outlook",
    sourceUrl: "https://bls.gov/ooh/life-physical-social-science",
    type: "Labor Stats",
    relevanceScore: 8.8,
    date: "2024-12-01",
    keyData: "+12% growth 2024-2034 | Median $95K",
    fullText:
      "Environmental scientists and specialists are projected to grow 12% faster than average occupations.",
    salaryRange: "$60,000 - $140,000",
    isPrimaryCitation: true,
  },
  {
    id: "3",
    source: "Indeed Job Board - Data Analyst (ESG Focus)",
    sourceUrl: "https://indeed.com/jobs/2",
    type: "Job Posting",
    relevanceScore: 8.2,
    date: "2025-01-02",
    keyData: "$80K - $110K | Remote | 3+ yrs",
    fullText:
      "Data Analyst with ESG expertise. Company building sustainability tracking tools.",
    jobTitle: "Data Analyst - ESG",
    company: "SustainTech Inc.",
    location: "Remote",
    salaryRange: "$80,000 - $110,000",
    skillsRequired: ["ESG Analysis", "SQL", "Tableau", "Python"],
    experienceRequired: "3+ years in data analysis",
  },
  {
    id: "4",
    source:
      "Harvard Business Review - ESG Skills Gap Report 2025",
    sourceUrl: "https://hbr.org/2024/12/esg-skills",
    type: "Studies",
    relevanceScore: 7.9,
    date: "2024-12-15",
    keyData: "Skills gap worsening | High demand for: ESG Analysis, Python",
    fullText:
      "Research shows a significant skills gap in the ESG market. Most in-demand skills are ESG Analysis frameworks, Python programming, and financial modeling.",
  },
  {
    id: "5",
    source: "Glassdoor - Environmental Analyst Salaries",
    sourceUrl: "https://glassdoor.com/salaries",
    type: "Labor Stats",
    relevanceScore: 7.5,
    date: "2024-11-20",
    keyData: "Avg $87K | Range: $60K - $130K",
    fullText:
      "Glassdoor salary data for Environmental Analysts shows median of $87,000 with strong growth projections.",
  },
  {
    id: "6",
    source: "Tech Skills Report - Emerging Certifications 2025",
    sourceUrl: "https://techskillsreport.com",
    type: "News",
    relevanceScore: 6.8,
    date: "2024-12-10",
    keyData: "ESG Analysis certifications seeing 18% YoY growth",
    fullText:
      "Professional ESG certifications are among the fastest-growing credentials in 2025.",
  },
];
