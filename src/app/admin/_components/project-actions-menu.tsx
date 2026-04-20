"use client";

import React, { useState } from "react";
import { Project } from "../types";
import {
  Eye,
  Download,
  Share2,
  Archive,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface ProjectActionsMenuProps {
  project: Project | null;
  isOpen: boolean;
  position: { top: number; right: number } | null;
  onClose: () => void;
  onViewDetails: (project: Project) => void;
  onDownload: (project: Project) => void;
  onExport: (project: Project) => void;
  onArchive: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectActionsMenu: React.FC<ProjectActionsMenuProps> = ({
  project,
  isOpen,
  position,
  onClose,
  onViewDetails,
  onDownload,
  onExport,
  onArchive,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!project || !isOpen) return null;

  const handleDelete = () => {
    onDelete(project);
    setShowDeleteConfirm(false);
    onClose();
  };

  const actions = [
    {
      label: "View Details",
      icon: Eye,
      onClick: () => {
        onViewDetails(project);
        onClose();
      },
      className: "text-gray-700",
    },
    {
      label: "Download Results",
      icon: Download,
      onClick: () => {
        onDownload(project);
        onClose();
      },
      className: "text-gray-700",
      disabled: project.status === "Draft" || project.status === "Analyzing",
    },
    {
      label: "Export Report",
      icon: Share2,
      onClick: () => {
        onExport(project);
        onClose();
      },
      className: "text-gray-700",
      disabled: project.status === "Draft" || project.status === "Analyzing",
    },
    {
      label: project.status === "Archived" ? "Restore" : "Archive",
      icon: Archive,
      onClick: () => {
        onArchive(project);
        onClose();
      },
      className: "text-amber-600",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: () => setShowDeleteConfirm(true),
      className: "text-red-600",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={onClose}
        />
      )}

      <div
        className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-40 w-48"
        style={{
          top: position?.top,
          right: position?.right,
        }}
      >
        <div className="py-1">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 ${
                action.disabled ? "opacity-50 cursor-not-allowed" : ""
              } ${action.className}`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Delete Project?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone. The project "{project.name}" and all associated data will be permanently deleted.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
