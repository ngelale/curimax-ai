"use client";

import React from "react";
import { Search, Download, ChevronDown } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { AuditLog, AuditEventType } from "./types";

interface AuditLogsFilterBarProps {
  logs: AuditLog[];
  onSearch: (query: string) => void;
  onFilterByEventType: (eventType: AuditEventType | "all") => void;
  onFilterByUser: (user: string | "all") => void;
  onDateRangeChange: (days: 7 | 30 | 90 | "all") => void;
  onExportCSV: () => void;
  searchQuery: string;
  selectedEventType: AuditEventType | "all";
  selectedUser: string | "all";
  selectedDateRange: 7 | 30 | 90 | "all";
}

const eventTypes: { value: AuditEventType | "all"; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "user.login", label: "User Login" },
  { value: "user.logout", label: "User Logout" },
  { value: "user.registration", label: "Registration" },
  { value: "project.created", label: "Project Created" },
  { value: "project.deleted", label: "Project Deleted" },
  { value: "subscription.upgraded", label: "Subscription Upgraded" },
  { value: "admin.user_modified", label: "User Modified" },
  { value: "system.analysis_completed", label: "Analysis Completed" },
  { value: "security.failed_login", label: "Failed Login" },
];

export function AuditLogsFilterBar({
  logs,
  onSearch,
  onFilterByEventType,
  onFilterByUser,
  onDateRangeChange,
  onExportCSV,
  searchQuery,
  selectedEventType,
  selectedUser,
  selectedDateRange,
}: AuditLogsFilterBarProps) {
  const uniqueUsers = Array.from(new Set(logs.map((log) => log.user)));
  const [showEventTypeDropdown, setShowEventTypeDropdown] = React.useState(
    false
  );
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);

  return (
    <div className="space-y-4 bg-white rounded-lg border border-gray-200 p-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 text-sm"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Date Range Filter */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
          >
            Date Range <ChevronDown className="w-4 h-4" />
          </button>
          {showDateDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {[
                { value: 7 as const, label: "Last 7 days" },
                { value: 30 as const, label: "Last 30 days" },
                { value: 90 as const, label: "Last 90 days" },
                { value: "all" as const, label: "All time" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    onDateRangeChange(value);
                    setShowDateDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedDateRange === value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Event Type Filter */}
        <div className="relative">
          <button
            onClick={() => setShowEventTypeDropdown(!showEventTypeDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
          >
            Event Type <ChevronDown className="w-4 h-4" />
          </button>
          {showEventTypeDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto min-w-48">
              {eventTypes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    onFilterByEventType(value);
                    setShowEventTypeDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedEventType === value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Filter */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
          >
            User <ChevronDown className="w-4 h-4" />
          </button>
          {showUserDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto min-w-48">
              <button
                onClick={() => {
                  onFilterByUser("all");
                  setShowUserDropdown(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  selectedUser === "all"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                All Users
              </button>
              {uniqueUsers.map((user) => (
                <button
                  key={user}
                  onClick={() => {
                    onFilterByUser(user);
                    setShowUserDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-t border-gray-100 ${
                    selectedUser === user
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {user}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Button */}
        <Button
          onClick={onExportCSV}
          variant="outline"
          className="flex items-center gap-2 ml-auto"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
