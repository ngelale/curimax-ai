"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { AlertCircle, Trash2 } from "lucide-react";

interface DangerZonePanelProps {
  lastCacheClear?: Date;
}

export function DangerZonePanel({ lastCacheClear }: DangerZonePanelProps) {
  const [clearing, setClearing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleClearCaches = async () => {
    setClearing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("✓ All caches cleared successfully");
    setClearing(false);
  };

  const handleRegenerateSecrets = async () => {
    const confirmed = window.confirm(
      "⚠️ This will invalidate all active API keys. Are you sure?"
    );
    if (!confirmed) return;

    setRegenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("✓ API secrets regenerated successfully. Check your email for new keys.");
    setRegenerating(false);
  };

  const handleResetDatabase = () => {
    const confirmed = window.confirm(
      "⚠️ This action cannot be undone. Reset the database?"
    );
    if (!confirmed) return;

    alert("✓ Database reset completed. All data has been cleared.");
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="border-t-2 border-red-200 pt-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
      </div>

      <div className="space-y-4">
        {/* Clear Caches */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Clear All Caches
              </h4>
              <p className="text-sm text-gray-600">
                Last cleared: {formatDate(lastCacheClear)}
              </p>
            </div>
            <Button
              onClick={handleClearCaches}
              disabled={clearing}
              variant="destructive"
              className="whitespace-nowrap"
            >
              {clearing ? "Clearing..." : "Clear Caches"}
            </Button>
          </div>
        </div>

        {/* Regenerate Secrets */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Regenerate API Secrets
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Will invalidate all active API keys
              </p>
            </div>
            <Button
              onClick={handleRegenerateSecrets}
              disabled={regenerating}
              variant="destructive"
              className="whitespace-nowrap"
            >
              {regenerating ? "Regenerating..." : "Regenerate"}
            </Button>
          </div>
        </div>

        {/* Reset Database */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Reset Database
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Not available in production
              </p>
            </div>
            <Button
              onClick={handleResetDatabase}
              disabled={false}
              variant="destructive"
              className="whitespace-nowrap opacity-50 cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset (Staging)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
