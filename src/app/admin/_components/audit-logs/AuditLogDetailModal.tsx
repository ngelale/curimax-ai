"use client";

import React from "react";
import { X, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuditLog } from "./types";

interface AuditLogDetailModalProps {
  log: AuditLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AuditLogDetailModal({
  log,
  isOpen,
  onClose,
}: AuditLogDetailModalProps) {
  if (!isOpen || !log) return null;

  const handleCopyEventId = () => {
    navigator.clipboard.writeText(log.eventId);
    alert("Event ID copied to clipboard");
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Audit Log Detail
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Event ID and Timestamp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Event ID</p>
                <p className="text-sm font-mono text-gray-900 mt-1">
                  {log.eventId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Timestamp</p>
                <p className="text-sm text-gray-900 mt-1">
                  {formatTimestamp(log.timestamp)} UTC
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Event Type</p>
                <p className="text-sm font-mono text-gray-900 mt-1 bg-gray-50 p-2 rounded">
                  {log.eventType}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Severity</p>
                <div className="mt-1">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      log.severity === "critical"
                        ? "bg-red-100 text-red-800"
                        : log.severity === "warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* User and IP Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">User</p>
                <div className="mt-1">
                  <p className="text-sm text-gray-900">{log.user}</p>
                  <p className="text-xs text-gray-500 font-mono">
                    ({log.userId})
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">IP Address</p>
                <p className="text-sm font-mono text-gray-900 mt-1">
                  {log.ipAddress}
                </p>
              </div>
            </div>

            {/* User Agent */}
            {log.userAgent && (
              <div>
                <p className="text-sm font-medium text-gray-500">User Agent</p>
                <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded overflow-x-auto">
                  {log.userAgent}
                </p>
              </div>
            )}

            {/* JSON Details */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Details</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCopyEventId}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Event ID
              </Button>
              <Button
                onClick={() => {
                  alert(
                    `Navigate to user: ${log.user}\n\nThis would open the user detail modal.`
                  );
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View User
              </Button>
              {Boolean((log.details as Record<string, unknown>).project_id) && (
                <Button
                  onClick={() => {
                    const projectId = String((log.details as Record<string, unknown>).project_id || "");
                    alert(
                      `Navigate to project: ${projectId}\n\nThis would open the project detail modal.`
                    );
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
