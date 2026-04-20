"use client";

import React, { useState } from "react";
import { FeatureFlag } from "./types";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";

interface FeatureFlagsPanelProps {
  flags: FeatureFlag[];
  onUpdate: (flags: FeatureFlag[]) => void;
}

export function FeatureFlagsPanel({ flags, onUpdate }: FeatureFlagsPanelProps) {
  const [editedFlags, setEditedFlags] = useState(flags);
  const [isSaved, setIsSaved] = useState(true);

  const handleToggle = (id: string) => {
    const updated = editedFlags.map((flag) =>
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    );
    setEditedFlags(updated);
    setIsSaved(false);
  };

  const handleSave = () => {
    onUpdate(editedFlags);
    setIsSaved(true);
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Feature Flags
      </h3>

      <div className="space-y-3 mb-6">
        {editedFlags.map((flag) => (
          <label
            key={flag.id}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <Checkbox
              checked={flag.enabled}
              onCheckedChange={() => handleToggle(flag.id)}
              disabled={flag.comingSoon}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{flag.name}</span>
                {flag.phase && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {flag.phase}
                  </span>
                )}
                {flag.comingSoon && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{flag.description}</p>
            </div>
          </label>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={isSaved}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Save Changes
      </Button>
    </div>
  );
}
