"use client";

import { useState } from "react";
import { Activity, FILTER_OPTIONS, ActivityFilter } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ActivityFilterProps {
  onFilterChange: (filter: ActivityFilter, search: string) => void;
  onUserFilterChange?: (userId: string) => void;
  activities: Activity[];
}

export function ActivityFilterBar({
  onFilterChange,
  onUserFilterChange,
  activities,
}: ActivityFilterProps) {
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [search, setSearch] = useState("");

  const handleFilterChange = (newFilter: ActivityFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter, search);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange(filter, value);
  };

  // Get unique users
  const uniqueUsers = Array.from(
    new Map(
      activities
        .filter((a) => a.userId !== "system")
        .map((a) => [a.userId, { name: a.userName, email: a.userEmail }])
    ).values()
  );

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-600">Filter:</span>
          </div>

          <Select value={filter} onValueChange={(value) => handleFilterChange(value as ActivityFilter)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {uniqueUsers.length > 0 && (
            <Select defaultValue="all" onValueChange={(value) => onUserFilterChange?.(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="By user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All users</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user.name} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
