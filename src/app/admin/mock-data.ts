/**
 * Admin Dashboard Mock Data
 * Sample data for development and testing
 */

import {
  AdminDashboardData,
  SystemMetric,
  ActivityEvent,
  SystemService,
  User,
  Project,
  PerformanceMetric,
  ErrorStats,
  InfrastructureCost,
  SystemHealthData,
  UserGrowthPoint,
  RevenueData,
  FeatureUsage,
  AnalyticsData,
  AuditLogEvent,
  AuditEventType,
} from "./types";

export const mockMetrics: SystemMetric[] = [
  {
    id: "total-users",
    label: "Total Users",
    value: 342,
    trend: "up",
    changeValue: 23,
    changeType: "users",
    icon: "users",
    color: "blue",
  },
  {
    id: "active-projects",
    label: "Active Projects",
    value: 1847,
    trend: "up",
    changeValue: 89,
    changeType: "projects",
    icon: "folder",
    color: "green",
  },
  {
    id: "system-uptime",
    label: "System Uptime",
    value: "99.97%",
    unit: "%",
    trend: "stable",
    changeValue: "Last 30 days",
    changeType: "percentage",
    icon: "activity",
    color: "purple",
  },
  {
    id: "api-requests",
    label: "API Requests",
    value: "2.4M",
    unit: "/month",
    trend: "up",
    changeValue: "15%",
    changeType: "requests",
    icon: "zap",
    color: "orange",
  },
];

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: "activity-1",
    timestamp: new Date(Date.now() - 2 * 60000), // 2 min ago
    type: "user_upgrade",
    message: 'User "jane@university.edu" upgraded to Portfolio',
    user: "jane@university.edu",
    severity: "info",
  },
  {
    id: "activity-2",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 min ago
    type: "project_completed",
    message: 'Project "AI Machine Learning" analysis complete',
    metadata: { projectId: "proj_ml_123", duration: "45 mins" },
    severity: "info",
  },
  {
    id: "activity-3",
    timestamp: new Date(Date.now() - 8 * 60000), // 8 min ago
    type: "user_registration",
    message: "New user registration: john@corporate.com",
    user: "john@corporate.com",
    severity: "info",
  },
  {
    id: "activity-4",
    timestamp: new Date(Date.now() - 12 * 60000), // 12 min ago
    type: "report_generated",
    message: "Report generated: project_abc123.pdf (12.5 MB)",
    metadata: { fileSize: "12.5 MB", fileName: "project_abc123.pdf" },
    severity: "info",
  },
  {
    id: "activity-5",
    timestamp: new Date(Date.now() - 15 * 60000), // 15 min ago
    type: "failed_login",
    message: "Failed login attempt: suspicious@domain.com",
    user: "suspicious@domain.com",
    severity: "warning",
  },
  {
    id: "activity-6",
    timestamp: new Date(Date.now() - 18 * 60000), // 18 min ago
    type: "rate_limit",
    message: "API rate limit exceeded: api_key_xyz",
    metadata: { apiKey: "api_key_xyz", limit: 1000, requests: 1015 },
    severity: "critical",
  },
];

export const mockSystemServices: SystemService[] = [
  {
    id: "web-app",
    name: "Web Application",
    status: "operational",
    details: "Response: 120ms",
    responseTime: "120ms",
    lastChecked: new Date(),
  },
  {
    id: "database-postgres",
    name: "Database (PostgreSQL)",
    status: "operational",
    details: "Connections: 47/100",
    metric: "47/100",
    lastChecked: new Date(),
  },
  {
    id: "cache-redis",
    name: "Cache (Redis)",
    status: "operational",
    details: "Hit rate: 94%",
    metric: "94%",
    lastChecked: new Date(),
  },
  {
    id: "storage-s3",
    name: "File Storage (S3)",
    status: "operational",
    details: "Usage: 847GB/2TB",
    metric: "847GB/2TB",
    lastChecked: new Date(),
  },
  {
    id: "email-service",
    name: "Email Service",
    status: "degraded",
    details: "Queue: 23 pending",
    metric: "23 pending",
    lastChecked: new Date(),
  },
  {
    id: "ai-workers",
    name: "AI Workers (Python)",
    status: "operational",
    details: "Jobs: 3 active",
    metric: "3 active",
    lastChecked: new Date(),
  },
  {
    id: "search-api",
    name: "Search API (Tavily)",
    status: "operational",
    details: "Rate: 450/1000",
    metric: "450/1000",
    lastChecked: new Date(),
  },
];

export const mockAdminDashboardData: AdminDashboardData = {
  metrics: mockMetrics,
  activities: mockActivityEvents,
  services: mockSystemServices,
  lastUpdated: new Date(),
};

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Jane Doe",
    email: "jane@university.edu",
    organization: "University of Example",
    role: "Associate Dean",
    tier: "Accelerator",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-11-15"),
    lastLoginDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    lastLoginIP: "203.0.113.45",
    subscription: {
      tier: "Accelerator",
      status: "Active",
      startDate: new Date("2024-12-01"),
      renewalDate: new Date("2025-12-01"),
      paymentMethod: "Visa ••••4242",
      annualCost: 25000,
    },
    usage: {
      projectsUsed: 2,
      projectsLimit: 3,
      reportsGenerated: 5,
      storageUsedGB: 2.4,
      apiCallsThisMonth: 1247,
    },
    projects: [
      {
        id: "proj-1",
        name: "Master's in Sustainable Finance",
        status: "Complete",
      },
      {
        id: "proj-2",
        name: "Bachelor's in AI",
        status: "Analyzing",
      },
    ],
  },
  {
    id: "user-2",
    name: "John Smith",
    email: "john@corporate.com",
    organization: "Corporate Analytics Inc",
    role: "VP of Strategy",
    tier: "Portfolio",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-10-20"),
    lastLoginDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    lastLoginIP: "198.51.100.89",
    subscription: {
      tier: "Portfolio",
      status: "Active",
      startDate: new Date("2024-10-20"),
      renewalDate: new Date("2025-10-20"),
      paymentMethod: "Amex ••••3782",
      annualCost: 50000,
    },
    usage: {
      projectsUsed: 5,
      projectsLimit: 10,
      reportsGenerated: 23,
      storageUsedGB: 15.8,
      apiCallsThisMonth: 8234,
    },
    projects: [
      {
        id: "proj-3",
        name: "Market Analysis Q1 2025",
        status: "Analyzing",
      },
      {
        id: "proj-4",
        name: "Competitive Landscape",
        status: "Analyzing",
      },
      {
        id: "proj-5",
        name: "Pricing Strategy Review",
        status: "Complete",
      },
    ],
  },
  {
    id: "user-3",
    name: "Sarah Chen",
    email: "sarah@gov.org",
    organization: "Government Policy Institute",
    role: "Director of Research",
    tier: "Sprint",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-09-10"),
    lastLoginDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    lastLoginIP: "192.0.2.156",
    subscription: {
      tier: "Sprint",
      status: "Active",
      startDate: new Date("2024-09-10"),
      renewalDate: new Date("2025-09-10"),
      paymentMethod: "Bank Transfer",
      annualCost: 15000,
    },
    usage: {
      projectsUsed: 1,
      projectsLimit: 2,
      reportsGenerated: 3,
      storageUsedGB: 0.8,
      apiCallsThisMonth: 342,
    },
    projects: [
      {
        id: "proj-6",
        name: "Policy Impact Analysis",
        status: "Pending",
      },
    ],
  },
  {
    id: "user-4",
    name: "Mike Rodriguez",
    email: "mike@edtech.io",
    organization: "EdTech Innovations",
    role: "Founder",
    tier: "Trial",
    status: "Expired",
    verified: true,
    createdDate: new Date("2024-12-01"),
    lastLoginDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    lastLoginIP: "203.0.113.72",
    subscription: {
      tier: "Trial",
      status: "Expired",
      startDate: new Date("2024-12-01"),
      renewalDate: new Date("2025-01-01"),
      paymentMethod: "None",
      annualCost: 0,
    },
    usage: {
      projectsUsed: 0,
      projectsLimit: 1,
      reportsGenerated: 0,
      storageUsedGB: 0.1,
      apiCallsThisMonth: 0,
    },
    projects: [],
  },
  {
    id: "user-5",
    name: "Lisa Thompson",
    email: "lisa@consultant.com",
    organization: "Thompson Consulting",
    role: "Principal Consultant",
    tier: "Enterprise",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-06-15"),
    lastLoginDate: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    lastLoginIP: "198.51.100.45",
    subscription: {
      tier: "Enterprise",
      status: "Active",
      startDate: new Date("2024-06-15"),
      renewalDate: new Date("2025-06-15"),
      paymentMethod: "Visa ••••1234",
      annualCost: 100000,
    },
    usage: {
      projectsUsed: 20,
      projectsLimit: 50,
      reportsGenerated: 87,
      storageUsedGB: 124.3,
      apiCallsThisMonth: 45678,
    },
    projects: [
      {
        id: "proj-7",
        name: "Enterprise Strategy Initiative",
        status: "Analyzing",
      },
      {
        id: "proj-8",
        name: "Digital Transformation",
        status: "Analyzing",
      },
      {
        id: "proj-9",
        name: "Market Expansion Plan",
        status: "Complete",
      },
      {
        id: "proj-10",
        name: "Risk Assessment",
        status: "Pending",
      },
    ],
  },
  {
    id: "user-6",
    name: "Robert Kim",
    email: "robert@biotech.io",
    organization: "BioTech Research Labs",
    role: "Research Director",
    tier: "Portfolio",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-08-22"),
    lastLoginDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    lastLoginIP: "192.0.2.201",
    subscription: {
      tier: "Portfolio",
      status: "Active",
      startDate: new Date("2024-08-22"),
      renewalDate: new Date("2025-08-22"),
      paymentMethod: "Visa ••••5678",
      annualCost: 50000,
    },
    usage: {
      projectsUsed: 8,
      projectsLimit: 10,
      reportsGenerated: 34,
      storageUsedGB: 42.7,
      apiCallsThisMonth: 12456,
    },
    projects: [
      {
        id: "proj-11",
        name: "Clinical Trial Analysis",
        status: "Analyzing",
      },
      {
        id: "proj-12",
        name: "Drug Efficacy Study",
        status: "Analyzing",
      },
    ],
  },
  {
    id: "user-7",
    name: "Amelia Martinez",
    email: "amelia@finance.com",
    organization: "Global Finance Corp",
    role: "Senior Analyst",
    tier: "Accelerator",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-07-01"),
    lastLoginDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    lastLoginIP: "203.0.113.99",
    subscription: {
      tier: "Accelerator",
      status: "Active",
      startDate: new Date("2024-07-01"),
      renewalDate: new Date("2025-07-01"),
      paymentMethod: "Amex ••••2468",
      annualCost: 25000,
    },
    usage: {
      projectsUsed: 3,
      projectsLimit: 3,
      reportsGenerated: 12,
      storageUsedGB: 8.5,
      apiCallsThisMonth: 3847,
    },
    projects: [
      {
        id: "proj-13",
        name: "Portfolio Analysis",
        status: "Complete",
      },
      {
        id: "proj-14",
        name: "Risk Dashboard",
        status: "Analyzing",
      },
      {
        id: "proj-15",
        name: "Quarterly Review",
        status: "Pending",
      },
    ],
  },
  {
    id: "user-8",
    name: "David Lee",
    email: "david@startup.io",
    organization: "TechStartup Inc",
    role: "CEO",
    tier: "Sprint",
    status: "Active",
    verified: true,
    createdDate: new Date("2024-11-05"),
    lastLoginDate: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    lastLoginIP: "198.51.100.73",
    subscription: {
      tier: "Sprint",
      status: "Active",
      startDate: new Date("2024-11-05"),
      renewalDate: new Date("2025-11-05"),
      paymentMethod: "Visa ••••9999",
      annualCost: 15000,
    },
    usage: {
      projectsUsed: 2,
      projectsLimit: 2,
      reportsGenerated: 7,
      storageUsedGB: 3.2,
      apiCallsThisMonth: 1523,
    },
    projects: [
      {
        id: "proj-16",
        name: "Funding Strategy",
        status: "Analyzing",
      },
      {
        id: "proj-17",
        name: "Series A Roadmap",
        status: "Pending",
      },
    ],
  },
  {
    id: "user-9",
    name: "Elena Rossi",
    email: "elena@academic.edu",
    organization: "University Research Institute",
    role: "Professor",
    tier: "Trial",
    status: "Active",
    verified: false,
    createdDate: new Date("2026-01-01"),
    lastLoginDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    lastLoginIP: "192.0.2.88",
    subscription: {
      tier: "Trial",
      status: "Active",
      startDate: new Date("2026-01-01"),
      renewalDate: new Date("2026-02-01"),
      paymentMethod: "None",
      annualCost: 0,
    },
    usage: {
      projectsUsed: 1,
      projectsLimit: 1,
      reportsGenerated: 2,
      storageUsedGB: 0.5,
      apiCallsThisMonth: 156,
    },
    projects: [
      {
        id: "proj-18",
        name: "Academic Research",
        status: "Analyzing",
      },
    ],
  },
  {
    id: "user-10",
    name: "James Wilson",
    email: "james@healthcare.com",
    organization: "Healthcare Analytics",
    role: "Chief Data Officer",
    tier: "Enterprise",
    status: "Suspended",
    verified: true,
    createdDate: new Date("2024-05-10"),
    lastLoginDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastLoginIP: "203.0.113.150",
    subscription: {
      tier: "Enterprise",
      status: "Active",
      startDate: new Date("2024-05-10"),
      renewalDate: new Date("2025-05-10"),
      paymentMethod: "Bank Transfer",
      annualCost: 100000,
    },
    usage: {
      projectsUsed: 15,
      projectsLimit: 50,
      reportsGenerated: 56,
      storageUsedGB: 98.6,
      apiCallsThisMonth: 34523,
    },
    projects: [
      {
        id: "proj-19",
        name: "Patient Analytics",
        status: "Complete",
      },
      {
        id: "proj-20",
        name: "Operational Efficiency",
        status: "Archived",
      },
    ],
  },
];

// Helper function to generate sample projects
const generateMockProjects = (): Project[] => {
  const projectNames = [
    "Sustainable Finance",
    "AI Machine Learning",
    "Cybersecurity Certificate",
    "Leadership Development",
    "Supply Chain Optimization",
    "Healthcare Analytics",
    "Climate Impact Study",
    "Digital Transformation",
    "Customer Retention Analysis",
    "Product Launch Strategy",
    "Energy Efficiency Report",
    "Market Expansion Plan",
    "Fraud Detection System",
    "Employee Engagement Survey",
    "Real Estate Valuation",
    "Revenue Forecasting",
    "Risk Assessment Framework",
    "Quality Assurance Process",
    "Social Media Analytics",
    "Data Governance Initiative",
  ];

  const statuses: Array<"Draft" | "Analyzing" | "Complete" | "Archived"> = [
    "Draft",
    "Analyzing",
    "Complete",
    "Archived",
  ];

  const tiers: Array<"Trial" | "Sprint" | "Accelerator" | "Portfolio" | "Enterprise"> = [
    "Trial",
    "Sprint",
    "Accelerator",
    "Portfolio",
    "Enterprise",
  ];

  const projects: Project[] = [];

  // Add specific demo projects first
  const demoProjects: Project[] = [
    {
      id: "proj-demo-1",
      name: "Sustainable Finance",
      owner: {
        id: "user-1",
        name: "Jane Doe",
        email: "jane@university.edu",
        tier: "Accelerator",
        organization: "University",
      },
      status: "Complete",
      demandScore: { score: 8.5, range: "High", percentile: 85 },
      createdDate: new Date("2025-06-15"),
      lastModifiedDate: new Date("2025-12-10"),
      tier: "Accelerator",
      description: "Analysis of sustainable financing options",
      metadata: {
        createdDate: new Date("2025-06-15"),
        lastModifiedDate: new Date("2025-12-10"),
        completedDate: new Date("2025-12-10"),
        analysisDuration: 156,
        totalRows: 50000,
        totalColumns: 45,
      },
    },
    {
      id: "proj-demo-2",
      name: "AI Machine Learning",
      owner: {
        id: "user-2",
        name: "John Smith",
        email: "john@corporate.com",
        tier: "Portfolio",
        organization: "Corporate",
      },
      status: "Analyzing",
      createdDate: new Date("2025-11-01"),
      lastModifiedDate: new Date("2026-01-08"),
      tier: "Portfolio",
      description: "Building ML models for predictive analytics",
      metadata: {
        createdDate: new Date("2025-11-01"),
        lastModifiedDate: new Date("2026-01-08"),
        analysisDuration: 72,
        totalRows: 100000,
        totalColumns: 78,
      },
    },
    {
      id: "proj-demo-3",
      name: "Cybersecurity Certificate",
      owner: {
        id: "user-3",
        name: "Sarah Chen",
        email: "sarah@gov.org",
        tier: "Sprint",
        organization: "Government",
      },
      status: "Complete",
      demandScore: { score: 7.9, range: "Good", percentile: 79 },
      createdDate: new Date("2025-08-20"),
      lastModifiedDate: new Date("2025-11-30"),
      tier: "Sprint",
      description: "Security compliance and certification analysis",
      metadata: {
        createdDate: new Date("2025-08-20"),
        lastModifiedDate: new Date("2025-11-30"),
        completedDate: new Date("2025-11-30"),
        analysisDuration: 108,
        totalRows: 25000,
        totalColumns: 32,
      },
    },
    {
      id: "proj-demo-4",
      name: "Leadership Development",
      owner: {
        id: "user-5",
        name: "Lisa Thompson",
        email: "lisa@consultant.com",
        tier: "Enterprise",
        organization: "Consulting",
      },
      status: "Complete",
      demandScore: { score: 7.2, range: "Good", percentile: 72 },
      createdDate: new Date("2025-07-10"),
      lastModifiedDate: new Date("2025-10-20"),
      tier: "Enterprise",
      description: "Executive leadership and development program",
      metadata: {
        createdDate: new Date("2025-07-10"),
        lastModifiedDate: new Date("2025-10-20"),
        completedDate: new Date("2025-10-20"),
        analysisDuration: 192,
        totalRows: 150000,
        totalColumns: 95,
      },
    },
  ];

  projects.push(...demoProjects);

  // Generate additional projects to reach 1,847 total
  for (let i = 4; i < 1847; i++) {
    const projectName = projectNames[i % projectNames.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const ownerIndex = i % mockUsers.length;
    const owner = mockUsers[ownerIndex];

    let demandScore: { score: number; range: "High" | "Good" | "Low"; percentile?: number } | undefined = undefined;
    if (status === "Complete" || status === "Analyzing") {
      const score = Math.random() * 10;
      const range: "High" | "Good" | "Low" = score >= 8 ? "High" : score >= 6 ? "Good" : "Low";
      demandScore = {
        score: parseFloat(score.toFixed(1)),
        range: range,
        percentile: Math.floor(score * 10),
      };
    }

    const createdDate = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    );
    const lastModifiedDate = new Date(
      createdDate.getTime() +
        Math.random() * (Date.now() - createdDate.getTime())
    );

    projects.push({
      id: `proj-${i}`,
      name: `${projectName} ${i}`,
      owner: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        tier: owner.tier,
        organization: owner.organization,
      },
      status,
      demandScore,
      createdDate,
      lastModifiedDate,
      tier,
      description: `Project focused on ${projectName.toLowerCase()}`,
      metadata: {
        createdDate,
        lastModifiedDate,
        completedDate:
          status === "Complete" || status === "Archived"
            ? new Date(
                lastModifiedDate.getTime() +
                  Math.random() * 30 * 24 * 60 * 60 * 1000
              )
            : undefined,
        analysisDuration:
          status === "Analyzing" || status === "Complete"
            ? Math.floor(Math.random() * 200) + 20
            : undefined,
        totalRows: Math.floor(Math.random() * 200000) + 1000,
        totalColumns: Math.floor(Math.random() * 100) + 10,
      },
    });
  }

  return projects;
};

export const mockProjects: Project[] = generateMockProjects();
// System Health Mock Data
const generatePerformanceMetrics = (): PerformanceMetric[] => {
  const metrics: PerformanceMetric[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    // Generate realistic response times with some variance
    const baseTime = 120 + Math.random() * 100;
    const variance = Math.sin(i / 24 * Math.PI * 2) * 50;
    const responseTime = Math.max(50, baseTime + variance + (Math.random() - 0.5) * 200);

    metrics.push({
      timestamp,
      responseTime: Math.round(responseTime),
    });
  }

  return metrics;
};

const generateErrorStats = (): ErrorStats[] => {
  const now = new Date();
  const stats: ErrorStats[] = [];

  // Last hour
  stats.push({
    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    errorRate: 0.02,
    totalErrors: 3,
    totalRequests: 15000,
    topErrors: [
      { code: 503, message: "Service Unavailable", occurrences: 2, percentage: 66.67 },
      { code: 429, message: "Rate Limit Exceeded", occurrences: 1, percentage: 33.33 },
    ],
  });

  // Last 24 hours
  stats.push({
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    errorRate: 0.05,
    totalErrors: 127,
    totalRequests: 254000,
    topErrors: [
      { code: 503, message: "Service Unavailable", occurrences: 47, percentage: 37.01 },
      { code: 429, message: "Rate Limit Exceeded", occurrences: 32, percentage: 25.20 },
      { code: 500, message: "Internal Server Error", occurrences: 28, percentage: 22.05 },
      { code: 502, message: "Bad Gateway", occurrences: 12, percentage: 9.45 },
      { code: 504, message: "Gateway Timeout", occurrences: 8, percentage: 6.30 },
    ],
  });

  // Last 7 days
  stats.push({
    timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    errorRate: 0.03,
    totalErrors: 650,
    totalRequests: 2170000,
    topErrors: [
      { code: 429, message: "Rate Limit Exceeded", occurrences: 245, percentage: 37.69 },
      { code: 503, message: "Service Unavailable", occurrences: 198, percentage: 30.46 },
      { code: 500, message: "Internal Server Error", occurrences: 125, percentage: 19.23 },
      { code: 502, message: "Bad Gateway", occurrences: 56, percentage: 8.62 },
      { code: 504, message: "Gateway Timeout", occurrences: 26, percentage: 4.00 },
    ],
  });

  return stats;
};

export const mockPerformanceMetrics: PerformanceMetric[] =
  generatePerformanceMetrics();

export const mockErrorStats: ErrorStats[] = generateErrorStats();

export const mockInfrastructureCosts: InfrastructureCost[] = [
  {
    service: "Vercel",
    description: "Hosting (Pro Plan)",
    monthlyCost: 450,
    trend: "stable",
  },
  {
    service: "Supabase",
    description: "Database (PostgreSQL)",
    monthlyCost: 125,
    trend: "up",
  },
  {
    service: "Vercel KV",
    description: "Redis Cache",
    monthlyCost: 45,
    trend: "stable",
  },
  {
    service: "Vercel Blob",
    description: "File Storage",
    monthlyCost: 89,
    trend: "stable",
  },
  {
    service: "OpenAI",
    description: "API (GPT-4/3.5)",
    monthlyCost: 2340,
    trend: "up",
  },
  {
    service: "Tavily",
    description: "Search API",
    monthlyCost: 187,
    trend: "stable",
  },
  {
    service: "Resend",
    description: "Transactional Email",
    monthlyCost: 12,
    trend: "stable",
  },
];

export const mockSystemHealth: SystemHealthData = {
  performanceMetrics: mockPerformanceMetrics,
  errorStats: mockErrorStats,
  infrastructureCosts: mockInfrastructureCosts,
  metrics: {
    avgResponseTime: 120,
    p50ResponseTime: 95,
    p95ResponseTime: 450,
    p99ResponseTime: 1200,
    slaBoundary: 500,
    slaMet: true,
  },
};

// Analytics Mock Data
export const mockUserGrowth: UserGrowthPoint[] = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 78 },
  { month: "Mar", count: 115 },
  { month: "Apr", count: 168 },
  { month: "May", count: 232 },
  { month: "Jun", count: 298 },
  { month: "Jul", count: 305 },
  { month: "Aug", count: 289 },
  { month: "Sep", count: 312 },
  { month: "Oct", count: 289 },
  { month: "Nov", count: 298 },
  { month: "Dec", count: 342 },
];

export const mockRevenueByTier: RevenueData[] = [
  {
    tier: "Enterprise",
    users: 12,
    monthlyRevenue: 600000,
    percentage: 59.46,
  },
  {
    tier: "Portfolio",
    users: 47,
    monthlyRevenue: 195000,
    percentage: 19.33,
  },
  {
    tier: "Accelerator",
    users: 89,
    monthlyRevenue: 185000,
    percentage: 18.34,
  },
  {
    tier: "Sprint",
    users: 124,
    monthlyRevenue: 29000,
    percentage: 2.87,
  },
  {
    tier: "Trial",
    users: 70,
    monthlyRevenue: 0,
    percentage: 0,
  },
];

export const mockFeatureUsage: FeatureUsage[] = [
  {
    name: "Evidence Analysis",
    projectCount: 1847,
    percentage: 100,
  },
  {
    name: "Financial Modeling",
    projectCount: 1523,
    percentage: 82,
  },
  {
    name: "Report Generation",
    projectCount: 1289,
    percentage: 70,
  },
  {
    name: "Competitor Analysis",
    projectCount: 894,
    percentage: 48,
  },
  {
    name: "Collaboration (v2)",
    projectCount: 234,
    percentage: 13,
  },
  {
    name: "Template Library",
    projectCount: 178,
    percentage: 10,
  },
];

export const mockAnalytics: AnalyticsData = {
  userGrowth: mockUserGrowth,
  growthRate: 23,
  revenueByTier: mockRevenueByTier,
  monthlyRecurringRevenue: 1009000,
  annualRecurringRevenue: 12108000,
  featureUsage: mockFeatureUsage,
  lastUpdated: new Date(),
};

// Audit Log Mock Data
const eventTypes: AuditEventType[] = [
  "user.login",
  "user.logout",
  "user.registration",
  "user.password_reset",
  "project.created",
  "project.edited",
  "project.deleted",
  "project.analyzed",
  "subscription.upgraded",
  "subscription.downgraded",
  "subscription.canceled",
  "subscription.renewed",
  "admin.user_modified",
  "admin.settings_changed",
  "admin.impersonation",
  "system.analysis_completed",
  "system.report_generated",
  "system.error_occurred",
  "security.failed_login",
  "security.suspicious_activity",
  "security.rate_limit_hit",
];

const sampleEmails = [
  "jane@university.edu",
  "john@corporate.com",
  "admin@arbpc.com",
  "sarah@gov.org",
  "mike@edtech.io",
  "emma@startup.io",
  "david@enterprise.com",
  "lisa@nonprofit.org",
];

const sampleIPs = [
  "203.0.113.45",
  "198.51.100.22",
  "10.0.0.1",
  "192.0.2.78",
  "203.0.113.99",
  "198.51.100.50",
  "192.0.2.100",
  "203.0.113.1",
];

const userAgents = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Mozilla/5.0 (X11; Linux x86_64)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)",
  "Mozilla/5.0 (iPad; CPU OS 14_7_1)",
];

function generateAuditLogs(): AuditLogEvent[] {
  const logs: AuditLogEvent[] = [];
  const now = new Date();

  // Generate 45,789 audit logs spanning the past 90 days
  for (let i = 0; i < 45789; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);

    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const email = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
    const ip = sampleIPs[Math.floor(Math.random() * sampleIPs.length)];
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    let details: Record<string, unknown> = {};
    let severity: "info" | "warning" | "error" | "critical" = "info";

    // Generate details based on event type
    if (eventType.includes("project")) {
      details = {
        project_id: `proj_${Math.random().toString(36).substring(7)}`,
        project_name: `Project ${i}`,
        program_level: ["bachelor", "master", "phd"][Math.floor(Math.random() * 3)],
        target_regions: ["California, USA", "New York, USA", "Texas, USA"],
      };
    } else if (eventType.includes("subscription")) {
      details = {
        previous_tier: ["Sprint", "Accelerator", "Portfolio"][Math.floor(Math.random() * 3)],
        new_tier: ["Accelerator", "Portfolio", "Enterprise"][Math.floor(Math.random() * 3)],
        billing_cycle: "monthly",
      };
    } else if (eventType.includes("admin")) {
      details = {
        target_user: email,
        action: "modified",
        fields_changed: ["tier", "status"],
      };
    } else if (eventType.includes("security")) {
      severity = eventType === "security.failed_login" ? "warning" : "critical";
      details = {
        attempt_count: Math.floor(Math.random() * 5) + 1,
        reason: "invalid_credentials",
      };
    } else if (eventType.includes("system")) {
      details = {
        duration_ms: Math.floor(Math.random() * 5000) + 100,
        status: eventType.includes("error") ? "failed" : "success",
      };
    }

    logs.push({
      id: `evt_${Math.random().toString(36).substring(2, 11)}`,
      timestamp,
      eventType,
      userId: `user_${Math.random().toString(36).substring(7)}`,
      userEmail: email,
      userName: email.split("@")[0],
      ipAddress: ip,
      userAgent,
      details,
      severity,
    });
  }

  // Sort by timestamp descending (newest first)
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const mockAuditLogs: AuditLogEvent[] = generateAuditLogs();

// Admin Settings
import { mockAdminSettings } from "./_components/admin-settings/mock-data";
export { mockAdminSettings } from "./_components/admin-settings/mock-data";
