/**
 * Admin Settings Types
 */

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  phase?: string;
  comingSoon?: boolean;
}

export interface RateLimits {
  apiRequests: number; // per hour per user
  projectCreation: number; // per day per user
  reportGeneration: number; // per day per project
  evidenceRefresh: number; // per day per project
}

export interface MaintenanceSchedule {
  id: string;
  scheduledDate: Date;
  scheduledTime: string; // HH:MM format
  duration: number; // in hours
  message: string;
  sendEmailNotification: boolean;
  showBanner: boolean;
  status: "operational" | "maintenance" | "scheduled";
}

export interface AdminSettings {
  featureFlags: FeatureFlag[];
  rateLimits: RateLimits;
  maintenance: MaintenanceSchedule;
  lastCacheClear?: Date;
}
