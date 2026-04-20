"use client";

import { Search, UserPlus, Download } from "lucide-react";
import { useState, useCallback } from "react";

interface UserSearchFilterBarProps {
  onSearch: (query: string) => void;
  onInviteUser?: () => void;
  onExportCSV?: () => void;
  userCount?: number;
}

export function UserSearchFilterBar({
  onSearch,
  onInviteUser,
  onExportCSV,
  userCount,
}: UserSearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
    },
    [onSearch]
  );

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {onInviteUser && (
          <button
            onClick={onInviteUser}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Invite User
          </button>
        )}
        {onExportCSV && (
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>
    </div>
  );
}
