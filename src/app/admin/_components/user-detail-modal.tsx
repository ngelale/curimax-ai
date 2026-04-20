"use client";

import { User } from "../types";
import { formatStorageSize, formatUserDate, formatUserDateTime } from "../utils";
import { X, LogIn, Edit, Pause, FileText } from "lucide-react";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onImpersonate?: (user: User) => void;
  onEdit?: (user: User) => void;
  onSuspend?: (user: User) => void;
  onViewActivityLog?: (user: User) => void;
}

export function UserDetailModal({
  user,
  isOpen,
  onClose,
  onImpersonate,
  onEdit,
  onSuspend,
  onViewActivityLog,
}: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              User Details: {user.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  {user.email}
                  {user.verified && (
                    <span className="text-green-600 text-xs">✓ Verified</span>
                  )}
                  {!user.verified && (
                    <span className="text-amber-600 text-xs">Unverified</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Organization</p>
                <p className="text-gray-900 font-medium">{user.organization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-gray-900 font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-gray-900 font-medium">
                  {formatUserDate(user.createdDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last login</p>
                <p className="text-gray-900 font-medium">
                  {formatUserDateTime(user.lastLoginDate)}
                  {user.lastLoginIP && (
                    <span className="block text-xs text-gray-500">
                      IP: {user.lastLoginIP}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Subscription
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tier</p>
                <p className="text-gray-900 font-medium">
                  {user.subscription.tier}
                  {user.subscription.annualCost && (
                    <span className="block text-xs text-gray-500">
                      ${user.subscription.annualCost.toLocaleString()}/year
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-gray-900 font-medium">
                  {user.subscription.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Renewal</p>
                <p className="text-gray-900 font-medium">
                  {formatUserDate(user.subscription.renewalDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment method</p>
                <p className="text-gray-900 font-medium">
                  {user.subscription.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Projects</p>
                <p className="text-gray-900 font-medium">
                  {user.usage.projectsUsed}/{user.usage.projectsLimit} used
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reports generated</p>
                <p className="text-gray-900 font-medium">
                  {user.usage.reportsGenerated} this month
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Storage</p>
                <p className="text-gray-900 font-medium">
                  {formatStorageSize(user.usage.storageUsedGB)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">API calls</p>
                <p className="text-gray-900 font-medium">
                  {user.usage.apiCallsThisMonth.toLocaleString()} this month
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          {user.projects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Projects ({user.projects.length})
              </h3>
              <ul className="space-y-2">
                {user.projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {project.name}
                      </p>
                      <p className="text-xs text-gray-500">{project.id}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                      {project.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-2 sticky bottom-0">
          {onViewActivityLog && (
            <button
              onClick={() => onViewActivityLog(user)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Activity Log
            </button>
          )}
          {onImpersonate && (
            <button
              onClick={() => onImpersonate(user)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Impersonate
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          )}
          {onSuspend && (
            <button
              onClick={() => onSuspend(user)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors ${
                user.status === "Suspended"
                  ? "text-green-700 bg-green-50 border border-green-200 hover:bg-green-100"
                  : "text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <Pause className="w-4 h-4" />
              {user.status === "Suspended" ? "Unsuspend" : "Suspend"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
