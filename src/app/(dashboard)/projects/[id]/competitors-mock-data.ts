export interface Competitor {
  id: string;
  institution: string;
  programName: string;
  websiteUrl: string;
  tuition: number;
  duration: number; // in weeks
  format: "Online" | "In-Person" | "Hybrid";
  ranking?: string;
  uniqueFeatures: string[];
}

export const mockCompetitors: Competitor[] = [
  {
    id: "1",
    institution: "Columbia University",
    programName: "MS in Sustainability Management",
    websiteUrl: "https://columbia.edu/sustainability",
    tuition: 72000,
    duration: 52,
    format: "Hybrid",
    ranking: "#3 (US News)",
    uniqueFeatures: [
      "Climate finance specialization",
      "World Bank partnerships",
      "NYC location advantage",
    ],
  },
  {
    id: "2",
    institution: "Stanford University",
    programName: "MS in Earth Systems",
    websiteUrl: "https://stanford.edu/earth-systems",
    tuition: 88000,
    duration: 48,
    format: "In-Person",
    ranking: "#1 (US News)",
    uniqueFeatures: [
      "Silicon Valley network",
      "Tech-focused ESG curriculum",
      "Industry partnerships",
    ],
  },
  {
    id: "3",
    institution: "Yale School of the Environment",
    programName: "MESc in Environmental Management",
    websiteUrl: "https://yale.edu/environment",
    tuition: 68000,
    duration: 56,
    format: "In-Person",
    ranking: "#2 (US News)",
    uniqueFeatures: [
      "Research-focused",
      "Yale endowment network",
      "Global field programs",
    ],
  },
  {
    id: "4",
    institution: "Duke University",
    programName: "MS in Environmental Management",
    websiteUrl: "https://duke.edu/environment",
    tuition: 65000,
    duration: 52,
    format: "Hybrid",
    ranking: "#5 (US News)",
    uniqueFeatures: [
      "Nicholas School reputation",
      "Policy focus",
      "Global fieldwork opportunities",
    ],
  },
  {
    id: "5",
    institution: "University of Michigan",
    programName: "MSE in Sustainability",
    websiteUrl: "https://umich.edu/sustainability",
    tuition: 52000,
    duration: 48,
    format: "Online",
    ranking: "#8 (US News)",
    uniqueFeatures: [
      "Most affordable option",
      "Online flexibility",
      "Industry certifications included",
    ],
  },
  {
    id: "6",
    institution: "UC Berkeley",
    programName: "MS in Energy and Resources",
    websiteUrl: "https://berkeley.edu/energy",
    tuition: 75000,
    duration: 60,
    format: "In-Person",
    ranking: "#4 (US News)",
    uniqueFeatures: [
      "Bay Area tech connections",
      "Energy policy focus",
      "Leading research programs",
    ],
  },
  {
    id: "7",
    institution: "Northwestern University",
    programName: "MS in Environmental Engineering",
    websiteUrl: "https://northwestern.edu/env-eng",
    tuition: 70000,
    duration: 48,
    format: "Hybrid",
    ranking: "#6 (US News)",
    uniqueFeatures: [
      "Technical rigor",
      "Chicago location",
      "Corporate partnerships",
    ],
  },
  {
    id: "8",
    institution: "Harvard Kennedy School",
    programName: "Mid-Career Master's in Public Administration (ESG Track)",
    websiteUrl: "https://harvard.edu/hks",
    tuition: 95000,
    duration: 52,
    format: "In-Person",
    ranking: "#1 (Policy Focus)",
    uniqueFeatures: [
      "Highest prestige",
      "Policy network",
      "Executive focus",
    ],
  },
];

export const gapAnalysis = {
  whatTheyDo: [
    "Focus heavily on climate & renewable energy",
    "Strong corporate partnerships & internships",
    "Integrated technology/data science training",
    "Global field programs and international exposure",
    "Hybrid and online options gaining popularity",
  ],
  whatTheyMiss: [
    "Limited coverage of emerging ESG standards (CSRD, SEC disclosure rules)",
    "Few programs teach corporate governance deeply",
    "Underemphasis on social equity & just transition",
    "Limited practical experience with real portfolio analysis",
    "Few options for working professionals (only 3/8 offer online/hybrid)",
  ],
  recommendedPositioning: [
    "Position as the 'practitioner-focused' program (vs. academic)",
    "Emphasize emerging regulatory knowledge (CSRD, SEC rules)",
    "Highlight hands-on project work with real companies",
    "Target working professionals with flexible scheduling",
    "Partner with leading ESG consultancies for guest lecturers",
  ],
};
