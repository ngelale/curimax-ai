"use client";

import React, { useState } from "react";
import { MaintenanceSchedule } from "./types";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Circle } from "lucide-react";

interface MaintenancePanelProps {
  maintenance: MaintenanceSchedule;
  onUpdate: (maintenance: MaintenanceSchedule) => void;
}

export function MaintenancePanel({
  maintenance,
  onUpdate,
}: MaintenancePanelProps) {
  const [edited, setEdited] = useState(maintenance);
  const [isSaved, setIsSaved] = useState(true);

  const handleDateChange = (date: string) => {
    setEdited((prev) => ({
      ...prev,
      scheduledDate: new Date(date),
    }));
    setIsSaved(false);
  };

  const handleTimeChange = (time: string) => {
    setEdited((prev) => ({
      ...prev,
      scheduledTime: time,
    }));
    setIsSaved(false);
  };

  const handleDurationChange = (duration: string) => {
    const numDuration = parseInt(duration, 10);
    if (!isNaN(numDuration)) {
      setEdited((prev) => ({
        ...prev,
        duration: numDuration,
      }));
      setIsSaved(false);
    }
  };

  const handleMessageChange = (message: string) => {
    setEdited((prev) => ({
      ...prev,
      message,
    }));
    setIsSaved(false);
  };

  const handleCheckboxChange = (key: "sendEmailNotification" | "showBanner") => {
    setEdited((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setIsSaved(false);
  };

  const handleSchedule = () => {
    onUpdate(edited);
    setIsSaved(true);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getStatusColor = () => {
    switch (edited.status) {
      case "operational":
        return "text-green-600";
      case "maintenance":
        return "text-yellow-600";
      case "scheduled":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusLabel = () => {
    switch (edited.status) {
      case "operational":
        return "Operational";
      case "maintenance":
        return "Maintenance in Progress";
      case "scheduled":
        return "Maintenance Scheduled";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Maintenance Mode
      </h3>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Status:</p>
        <div className="flex items-center gap-2">
          <Circle className={`w-3 h-3 fill-current ${getStatusColor()}`} />
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusLabel()}
          </span>
        </div>
      </div>

      {/* Schedule Maintenance */}
      <div className="space-y-4 mb-6">
        <p className="text-sm font-medium text-gray-900">
          Schedule maintenance:
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Date
            </label>
            <Input
              type="date"
              value={formatDate(edited.scheduledDate)}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Time (EST)
            </label>
            <Input
              type="time"
              value={edited.scheduledTime}
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Duration (hours)
            </label>
            <Input
              type="number"
              value={edited.duration}
              onChange={(e) => handleDurationChange(e.target.value)}
              min="0.5"
              step="0.5"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">
            Message to display:
          </label>
          <textarea
            value={edited.message}
            onChange={(e) => handleMessageChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
            rows={3}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={edited.sendEmailNotification}
              onCheckedChange={() =>
                handleCheckboxChange("sendEmailNotification")
              }
            />
            <span className="text-sm text-gray-700">
              Send email notification 24 hours before
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={edited.showBanner}
              onCheckedChange={() => handleCheckboxChange("showBanner")}
            />
            <span className="text-sm text-gray-700">
              Show banner 1 hour before maintenance
            </span>
          </label>
        </div>
      </div>

      <Button
        onClick={handleSchedule}
        disabled={isSaved}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Schedule Maintenance
      </Button>
    </div>
  );
}
