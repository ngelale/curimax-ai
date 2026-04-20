"use client";

import React from "react";
import { Project } from "../types";
import { getProjectStatusBadge, getDemandScoreBadge, formatDemandScore } from "../utils";
import { MoreVertical } from "lucide-react";

interface ProjectsTableProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onActionMenu: (project: Project, ref: HTMLDivElement | null) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onSelectProject,
  onActionMenu,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Demand Score
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => {
            const statusBadge = getProjectStatusBadge(project.status);
            const scoreBadge = getDemandScoreBadge(project.demandScore?.range);
            const actionRef = React.useRef<HTMLDivElement>(null);

            return (
              <tr
                key={project.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{project.owner.name}</p>
                    <p className="text-sm text-gray-600">{project.owner.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {project.demandScore ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreBadge.bg} ${scoreBadge.text}`}
                    >
                      {formatDemandScore(project.demandScore.score)}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <div ref={actionRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onActionMenu(project, actionRef.current);
                        }}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Project actions"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
