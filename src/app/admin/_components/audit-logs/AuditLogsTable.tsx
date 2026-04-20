"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuditLog, AuditEventType } from "./types";

interface AuditLogsTableProps {
  logs: AuditLog[];
  onSelectLog: (log: AuditLog) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function AuditLogsTable({
  logs,
  onSelectLog,
  currentPage,
  itemsPerPage,
  onPageChange,
}: AuditLogsTableProps) {
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = logs.slice(startIndex, endIndex);

  const getSeverityColor = (
    severity: "info" | "warning" | "critical"
  ): string => {
    switch (severity) {
      case "critical":
        return "text-red-700 bg-red-50";
      case "warning":
        return "text-yellow-700 bg-yellow-50";
      case "info":
        return "text-blue-700 bg-blue-50";
    }
  };

  const getStatusIcon = (status: "success" | "failed" | "partial"): string => {
    switch (status) {
      case "success":
        return "✓";
      case "failed":
        return "✕";
      case "partial":
        return "◐";
    }
  };

  const getStatusColor = (status: "success" | "failed" | "partial"): string => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "partial":
        return "text-yellow-600";
    }
  };

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Event
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                IP Address
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-700">
                Severity
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No audit logs found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => onSelectLog(log)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3 text-gray-900">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-3 text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>{log.event}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600 font-mono text-xs">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`text-lg font-bold ${getStatusColor(log.status)}`}
                    >
                      {getStatusIcon(log.status)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}
                    >
                      {log.severity.charAt(0).toUpperCase() +
                        log.severity.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, logs.length)} of{" "}
          {logs.length} events
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white font-medium"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="px-2 text-gray-600">...</span>
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
