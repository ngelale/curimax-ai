"use client";

import { User } from "../types";
import {
  Eye,
  Folder,
  CreditCard,
  RotateCcw,
  LogIn,
  Pause,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface UserActionsMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
  onViewProfile: (user: User) => void;
  onViewProjects: (user: User) => void;
  onChangeTier: (user: User) => void;
  onResetPassword: (user: User) => void;
  onImpersonate: (user: User) => void;
  onSuspend: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActionsMenu({
  user,
  isOpen,
  onClose,
  position = { x: 0, y: 0 },
  onViewProfile,
  onViewProjects,
  onChangeTier,
  onResetPassword,
  onImpersonate,
  onSuspend,
  onDelete,
}: UserActionsMenuProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const actions = [
    {
      label: "View profile",
      icon: Eye,
      onClick: () => {
        onViewProfile(user);
        onClose();
      },
      variant: "default" as const,
    },
    {
      label: "View projects",
      icon: Folder,
      onClick: () => {
        onViewProjects(user);
        onClose();
      },
      variant: "default" as const,
    },
    {
      label: "Change subscription tier",
      icon: CreditCard,
      onClick: () => {
        onChangeTier(user);
        onClose();
      },
      variant: "default" as const,
    },
    {
      label: "Reset password",
      icon: RotateCcw,
      onClick: () => {
        onResetPassword(user);
        onClose();
      },
      variant: "default" as const,
    },
    {
      label: "Impersonate user",
      icon: LogIn,
      onClick: () => {
        onImpersonate(user);
        onClose();
      },
      variant: "default" as const,
    },
    {
      label:
        user.status === "Suspended" ? "Unsuspend account" : "Suspend account",
      icon: Pause,
      onClick: () => {
        onSuspend(user);
        onClose();
      },
      variant: "warning",
    },
    {
      label: "Delete account",
      icon: Trash2,
      onClick: () => setConfirmDelete(true),
      variant: "danger" as const,
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className="absolute z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
        style={{
          top: `${position.y + 40}px`,
          left: `${Math.max(16, position.x - 180)}px`,
        }}
      >
        <div className="py-1">
          {actions.map((action) => {
            const Icon = action.icon;
            const isWarning = action.variant === "warning";
            const isDanger = action.variant === "danger";

            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                  isWarning
                    ? "text-amber-600"
                    : isDanger
                      ? "text-red-600"
                      : "text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Account
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {user.name}'s account? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(user);
                  setConfirmDelete(false);
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
