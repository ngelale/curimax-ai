"use client";

import React, { useCallback, useState } from "react";
import { Search, Download, ChevronDown } from "lucide-react";

interface ProjectsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExportAll: () => void;
  onBulkAction: (action: string) => void;
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({
  searchQuery,
  onSearchChange,
  onExportAll,
  onBulkAction,
}) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      onSearchChange(query);
    },
    [onSearchChange]
  );

  const handleExportAll = () => {
    // Generate CSV with all projects
    const csv = "name,owner,status,demandScore,tier\n";
    const dataUri =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(csv + "Project data will be included on backend");

    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `projects-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bulkActions = [
    { label: "Archive Selected", action: "archive" },
    { label: "Delete Selected", action: "delete" },
    { label: "Export Selected", action: "export" },
    { label: "Change Tier", action: "change-tier" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Export All Button */}
        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Export All
        </button>

        {/* Bulk Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBulkMenu(!showBulkMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Bulk Actions
            <ChevronDown className="w-4 h-4" />
          </button>

          {showBulkMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowBulkMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="py-1">
                  {bulkActions.map((item) => (
                    <button
                      key={item.action}
                      onClick={() => {
                        onBulkAction(item.action);
                        setShowBulkMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
