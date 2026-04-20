import { AdminSettings, FeatureFlag, MaintenanceSchedule } from "./types";

export const mockFeatureFlags: FeatureFlag[] = [
  {
    id: "collab-features",
    name: "Collaboration features",
    description: "Team collaboration and comments",
    enabled: true,
    phase: "Phase 2",
  },
  {
    id: "template-library",
    name: "Template library",
    description: "Pre-built program templates",
    enabled: true,
  },
  {
    id: "curriculum-builder",
    name: "Curriculum blueprint builder",
    description: "Advanced curriculum design tools",
    enabled: false,
    comingSoon: true,
  },
  {
    id: "advanced-analytics",
    name: "Advanced analytics",
    description: "Extended analytics and reporting",
    enabled: true,
  },
  {
    id: "api-v2",
    name: "API v2",
    description: "REST API v2 with new endpoints",
    enabled: false,
  },
  {
    id: "email-notifications",
    name: "Email notifications",
    description: "Email alert system",
    enabled: true,
  },
  {
    id: "in-app-chat",
    name: "In-app chat support",
    description: "Live chat support widget",
    enabled: true,
  },
];

export const mockMaintenanceSchedule: MaintenanceSchedule = {
  id: "maint-001",
  scheduledDate: new Date("2025-01-15"),
  scheduledTime: "02:00",
  duration: 2,
  message:
    "ARBPC will be unavailable for scheduled maintenance on Jan 15 from 2-4 AM EST. We're improving performance!",
  sendEmailNotification: true,
  showBanner: true,
  status: "operational",
};

export const mockAdminSettings: AdminSettings = {
  featureFlags: mockFeatureFlags,
  rateLimits: {
    apiRequests: 1000,
    projectCreation: 20,
    reportGeneration: 3,
    evidenceRefresh: 5,
  },
  maintenance: mockMaintenanceSchedule,
  lastCacheClear: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
};
