"use client";

import React, { useState } from "react";
import { AdminSettings, FeatureFlag, RateLimits, MaintenanceSchedule } from "./types";
import { FeatureFlagsPanel } from "./FeatureFlagsPanel";
import { RateLimitsPanel } from "./RateLimitsPanel";
import { MaintenancePanel } from "./MaintenancePanel";
import { DangerZonePanel } from "./DangerZonePanel";

interface AdminSettingsPanelProps {
  settings: AdminSettings;
}

export function AdminSettingsPanel({ settings }: AdminSettingsPanelProps) {
  const [currentSettings, setCurrentSettings] = useState(settings);

  const handleFeatureFlagsUpdate = (flags: FeatureFlag[]) => {
    setCurrentSettings((prev) => ({
      ...prev,
      featureFlags: flags,
    }));
  };

  const handleRateLimitsUpdate = (limits: RateLimits) => {
    setCurrentSettings((prev) => ({
      ...prev,
      rateLimits: limits,
    }));
  };

  const handleMaintenanceUpdate = (maintenance: MaintenanceSchedule) => {
    setCurrentSettings((prev) => ({
      ...prev,
      maintenance,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Settings
        </h2>
        <p className="text-gray-600">
          Configure system features, rate limits, and maintenance settings
        </p>
      </div>

      {/* Feature Flags */}
      <FeatureFlagsPanel
        flags={currentSettings.featureFlags}
        onUpdate={handleFeatureFlagsUpdate}
      />

      {/* Rate Limits */}
      <RateLimitsPanel
        limits={currentSettings.rateLimits}
        onUpdate={handleRateLimitsUpdate}
      />

      {/* Maintenance */}
      <MaintenancePanel
        maintenance={currentSettings.maintenance}
        onUpdate={handleMaintenanceUpdate}
      />

      {/* Danger Zone */}
      <DangerZonePanel lastCacheClear={currentSettings.lastCacheClear} />
    </div>
  );
}
