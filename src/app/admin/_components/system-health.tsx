"use client";

import { SystemService } from "../types";
import {
  getStatusIcon,
  getStatusLabel,
  getStatusColor,
} from "../utils";
import { RefreshCw, History } from "lucide-react";

interface SystemHealthProps {
  services: SystemService[];
}

export function SystemHealth({ services }: SystemHealthProps) {
  const operationalCount = services.filter(
    (s) => s.status === "operational"
  ).length;
  const degradedCount = services.filter(
    (s) => s.status === "degraded"
  ).length;
  const downCount = services.filter((s) => s.status === "down").length;

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">System Status</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
            <History className="w-4 h-4" />
            History
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {operationalCount}
          </div>
          <div className="text-xs text-gray-600">Operational</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">
            {degradedCount}
          </div>
          <div className="text-xs text-gray-600">Degraded</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{downCount}</div>
          <div className="text-xs text-gray-600">Down</div>
        </div>
      </div>

      {/* Service List */}
      <div className="divide-y divide-gray-200">
        {services.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No services configured
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 ${
                service.status === "operational"
                  ? "border-l-green-500"
                  : service.status === "degraded"
                    ? "border-l-amber-500"
                    : "border-l-red-500"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-lg">
                  {getStatusIcon(service.status)}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {service.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.details}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}
                >
                  {getStatusLabel(service.status)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          View Detailed Status
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          Incident History
        </button>
      </div>
    </div>
  );
}
