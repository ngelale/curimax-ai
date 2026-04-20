"use client";

import React, { useState, useMemo } from "react";
import { AuditLog, AuditEventType } from "./types";
import { AuditLogsFilterBar } from "./AuditLogsFilterBar";
import { AuditLogsTable } from "./AuditLogsTable";
import { AuditLogDetailModal } from "./AuditLogDetailModal";

interface AuditLogsComponentProps {
  logs: AuditLog[];
}

export function AuditLogsComponent({ logs }: AuditLogsComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] =
    useState<AuditEventType | "all">("all");
  const [selectedUser, setSelectedUser] = useState<string | "all">("all");
  const [selectedDateRange, setSelectedDateRange] = useState<
    7 | 30 | 90 | "all"
  >("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logs
  const filteredLogs = useMemo(() => {
    let result = logs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (log) =>
          log.user.toLowerCase().includes(query) ||
          log.event.toLowerCase().includes(query) ||
          log.description.toLowerCase().includes(query) ||
          log.eventId.toLowerCase().includes(query)
      );
    }

    // Event type filter
    if (selectedEventType !== "all") {
      result = result.filter((log) => log.eventType === selectedEventType);
    }

    // User filter
    if (selectedUser !== "all") {
      result = result.filter((log) => log.user === selectedUser);
    }

    // Date range filter
    if (selectedDateRange !== "all") {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - selectedDateRange);
      result = result.filter((log) => log.timestamp >= daysAgo);
    }

    return result;
  }, [logs, searchQuery, selectedEventType, selectedUser, selectedDateRange]);

  const handleExportCSV = () => {
    const headers = [
      "Timestamp",
      "User",
      "Event",
      "IP Address",
      "Event ID",
      "Severity",
      "Status",
    ];
    const rows = filteredLogs.map((log) => [
      log.timestamp.toISOString(),
      log.user,
      log.event,
      log.ipAddress,
      log.eventId,
      log.severity,
      log.status,
    ]);

    const csvContent = [
      headers,
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ]
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSelectLog = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <AuditLogsFilterBar
        logs={logs}
        onSearch={setSearchQuery}
        onFilterByEventType={setSelectedEventType}
        onFilterByUser={setSelectedUser}
        onDateRangeChange={setSelectedDateRange}
        onExportCSV={handleExportCSV}
        searchQuery={searchQuery}
        selectedEventType={selectedEventType}
        selectedUser={selectedUser}
        selectedDateRange={selectedDateRange}
      />

      {/* Logs Table */}
      <AuditLogsTable
        logs={filteredLogs}
        onSelectLog={handleSelectLog}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Detail Modal */}
      <AuditLogDetailModal
        log={selectedLog}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedLog(null);
        }}
      />
    </div>
  );
}
