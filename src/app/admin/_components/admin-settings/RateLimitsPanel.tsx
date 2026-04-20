"use client";

import React, { useState } from "react";
import { RateLimits } from "./types";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface RateLimitsPanelProps {
  limits: RateLimits;
  onUpdate: (limits: RateLimits) => void;
}

export function RateLimitsPanel({ limits, onUpdate }: RateLimitsPanelProps) {
  const [editedLimits, setEditedLimits] = useState(limits);
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (key: keyof RateLimits, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setEditedLimits((prev) => ({
        ...prev,
        [key]: numValue,
      }));
      setIsSaved(false);
    }
  };

  const handleUpdate = () => {
    onUpdate(editedLimits);
    setIsSaved(true);
  };

  const limitLabels: Record<keyof RateLimits, { label: string; unit: string }> =
    {
      apiRequests: { label: "API requests", unit: "per hour per user" },
      projectCreation: { label: "Project creation", unit: "per day per user" },
      reportGeneration: { label: "Report generation", unit: "per day per project" },
      evidenceRefresh: { label: "Evidence refresh", unit: "per day per project" },
    };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rate Limits
      </h3>

      <div className="space-y-4 mb-6">
        {(Object.keys(editedLimits) as (keyof RateLimits)[]).map((key) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-gray-700">
              {limitLabels[key].label}:
            </label>
            <Input
              type="number"
              value={editedLimits[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-32"
              min="1"
            />
            <span className="text-sm text-gray-600">
              {limitLabels[key].unit}
            </span>
          </div>
        ))}
      </div>

      <Button
        onClick={handleUpdate}
        disabled={isSaved}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Update Limits
      </Button>
    </div>
  );
}
