"use client";

import { useState, useMemo, useRef } from "react";
import {
  Lock,
  AlertCircle,
} from "lucide-react";
import { User, Project, ProjectStatus, UserTier, DemandScoreRange } from "./types";
import { MetricsCard, ActivityFeed, SystemHealth, UsersTable, UserDetailModal, UserActionsMenu, UserSearchFilterBar, ProjectsTable, ProjectActionsMenu, ProjectFilters, ProjectsSearch, PerformanceMetrics, ErrorRates, InfrastructureCosts, UserGrowthChart, RevenueMetrics, FeatureUsageComponent, AuditLogsComponent, AdminSettingsPanel, AdminHeader, AdminSidebar } from "./_components";
import {
  mockMetrics,
  mockActivityEvents,
  mockSystemServices,
  mockUsers,
  mockProjects,
  mockSystemHealth,
  mockAnalytics,
  mockAuditLogs,
  mockAdminSettings,
} from "./mock-data";
import { convertAdminAuditLogsToComponentLogs } from "./audit-logs-bridge";

/**
 * Admin Dashboard
 * System administration interface - Admin only
 *
 * Features:
 * - System metrics overview
 * - Real-time activity monitoring
 * - Service health status
 * - User management
 * - Project oversight
 * - System analytics
 * - Audit logging
 * - Admin settings
 */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "users"
    | "projects"
    | "health"
    | "analytics"
    | "audit"
    | "settings"
  >("overview");
  const [isLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Users tab state
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [selectedUserForMenu, setSelectedUserForMenu] = useState<User | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!userSearchQuery.trim()) return mockUsers;

    const query = userSearchQuery.toLowerCase();
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.organization.toLowerCase().includes(query)
    );
  }, [userSearchQuery]);

  // Projects tab state
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState<ProjectStatus | "All">("All");
  const [projectTierFilter, setProjectTierFilter] = useState<UserTier | "All">("All");
  const [projectDateFilter, setProjectDateFilter] = useState<7 | 30 | 90 | null>(null);
  const [projectScoreFilter, setProjectScoreFilter] = useState<DemandScoreRange | "All">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [selectedProjectForMenu, setSelectedProjectForMenu] = useState<Project | null>(null);
  const projectMenuRef = useRef<HTMLDivElement>(null);

  // Filter projects based on search and filters
  const { isDateInRange } = require("./utils");
  const filteredProjects = useMemo(() => {
    let result = mockProjects;

    // Search filter
    if (projectSearchQuery.trim()) {
      const query = projectSearchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.owner.email.toLowerCase().includes(query) ||
          project.owner.name.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (projectStatusFilter !== "All") {
      result = result.filter((project) => project.status === projectStatusFilter);
    }

    // Tier filter
    if (projectTierFilter !== "All") {
      result = result.filter((project) => project.tier === projectTierFilter);
    }

    // Date range filter
    if (projectDateFilter !== null) {
      result = result.filter((project) => isDateInRange(project.lastModifiedDate, projectDateFilter));
    }

    // Demand score filter
    if (projectScoreFilter !== "All") {
      result = result.filter((project) => project.demandScore?.range === projectScoreFilter);
    }

    return result;
  }, [projectSearchQuery, projectStatusFilter, projectTierFilter, projectDateFilter, projectScoreFilter]);

  // TODO: Replace with actual admin role verification from auth context
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAdmin ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600">
              You must be an admin to access this page
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <AdminHeader />

          {/* Main Layout with Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={(tab) =>
                setActiveTab(
                  tab as
                    | "overview"
                    | "users"
                    | "projects"
                    | "health"
                    | "analytics"
                    | "audit"
                    | "settings"
                )
              }
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Content Area */}
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading...</p>
                    </div>
                  </div>
                )}

                {/* Overview Tab */}
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* System Metrics */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        System Metrics
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockMetrics.map((metric) => (
                          <MetricsCard key={metric.id} metric={metric} />
                        ))}
                      </div>
                    </div>

                    {/* Activity Feed and System Health */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          Recent Activity
                        </h2>
                        <ActivityFeed activities={mockActivityEvents} />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          System Services
                        </h2>
                        <SystemHealth services={mockSystemServices} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                  <div className="space-y-6">
                    {/* Search and Filter Bar */}
                    <UserSearchFilterBar
                      onSearch={setUserSearchQuery}
                      onInviteUser={() => {
                        alert("Invite user dialog would open here");
                      }}
                      onExportCSV={() => {
                        const csv = [
                          ["Name", "Email", "Tier", "Status", "Last Active"],
                          ...filteredUsers.map((u) => [
                            u.name,
                            u.email,
                            u.tier,
                            u.status,
                            u.lastLoginDate.toISOString(),
                          ]),
                        ]
                          .map((row) => row.map((cell) => `"${cell}"`).join(","))
                          .join("\n");

                        const blob = new Blob([csv], { type: "text/csv" });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
                        a.click();
                      }}
                      userCount={mockUsers.length}
                    />

                    {/* Users Table */}
                    <UsersTable
                      users={filteredUsers}
                      onSelectUser={(user) => {
                        setSelectedUser(user);
                        setIsDetailModalOpen(true);
                      }}
                      onActionMenu={(user) => {
                        setSelectedUserForMenu(user);
                        setIsActionsMenuOpen(true);
                      }}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Showing 1-{Math.min(filteredUsers.length, 5)} of{" "}
                        {filteredUsers.length} users
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, "...", 69].map((page, idx) => (
                          <button
                            key={idx}
                            className={`px-3 py-1 rounded border transition-colors ${
                              page === 1
                                ? "bg-blue-600 text-white border-blue-600"
                                : page === "..."
                                  ? "cursor-default border-gray-300"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            disabled={page === "..."}
                          >
                            {page}
                          </button>
                        ))}
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                          →
                        </button>
                      </div>
                    </div>

                    {/* User Detail Modal */}
                    <UserDetailModal
                      user={selectedUser}
              isOpen={isDetailModalOpen}
              onClose={() => {
                setIsDetailModalOpen(false);
                setSelectedUser(null);
              }}
              onImpersonate={(user) => {
                alert(`Impersonating ${user.name}`);
              }}
              onEdit={(user) => {
                alert(`Edit user: ${user.name}`);
              }}
              onSuspend={(user) => {
                alert(
                  `${user.status === "Suspended" ? "Unsuspend" : "Suspend"} ${user.name}`
                );
              }}
              onViewActivityLog={(user) => {
                alert(`View activity log for ${user.name}`);
              }}
            />

            {/* User Actions Menu */}
            {selectedUserForMenu && (
              <UserActionsMenu
                user={selectedUserForMenu}
                isOpen={isActionsMenuOpen}
                onClose={() => {
                  setIsActionsMenuOpen(false);
                  setSelectedUserForMenu(null);
                }}
                position={{ x: 0, y: 0 }}
                onViewProfile={(user) => {
                  setSelectedUser(user);
                  setIsDetailModalOpen(true);
                }}
                onViewProjects={(user) => {
                  alert(`View projects for ${user.name}`);
                }}
                onChangeTier={(user) => {
                  alert(`Change tier for ${user.name}`);
                }}
                onResetPassword={(user) => {
                  alert(`Reset password for ${user.name}`);
                }}
                onImpersonate={(user) => {
                  alert(`Impersonating ${user.name}`);
                }}
                onSuspend={(user) => {
                  alert(
                    `${user.status === "Suspended" ? "Unsuspend" : "Suspend"} ${user.name}`
                  );
                }}
                onDelete={(user) => {
                  alert(`Delete ${user.name}`);
                }}
              />
            )}
          </div>
        )}

        {/* Projects Tab - Placeholder */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Search and Export */}
            <ProjectsSearch
              searchQuery={projectSearchQuery}
              onSearchChange={setProjectSearchQuery}
              onExportAll={() => {
                const csv =
                  "name,owner,email,status,tier,demandScore,createdDate,lastModifiedDate\n";
                const dataUri =
                  "data:text/csv;charset=utf-8," +
                  encodeURIComponent(
                    csv + "Project data will be included on backend"
                  );
                const link = document.createElement("a");
                link.setAttribute("href", dataUri);
                link.setAttribute(
                  "download",
                  `projects-${new Date().toISOString().split("T")[0]}.csv`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              onBulkAction={(action) => {
                alert(
                  `Bulk action: ${action}. Implementation details to follow.`
                );
              }}
            />

            {/* Filters */}
            <ProjectFilters
              statusFilter={projectStatusFilter}
              tierFilter={projectTierFilter}
              dateRangeFilter={projectDateFilter}
              demandScoreFilter={projectScoreFilter}
              onStatusChange={setProjectStatusFilter}
              onTierChange={setProjectTierFilter}
              onDateRangeChange={setProjectDateFilter}
              onDemandScoreChange={setProjectScoreFilter}
            />

            {/* Projects Table */}
            <div>
              <ProjectsTable
                projects={filteredProjects}
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  setIsProjectDetailOpen(true);
                }}
                onActionMenu={(project, ref) => {
                  setSelectedProjectForMenu(project);
                  setIsProjectMenuOpen(true);
                }}
              />

              {/* Pagination Info */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing 1-{Math.min(5, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
                </p>
                <div className="flex gap-2">
                  <button
                    disabled
                    className="px-3 py-2 text-sm font-medium text-gray-400 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
                  >
                    ←
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Project Actions Menu */}
            <ProjectActionsMenu
              project={selectedProjectForMenu}
              isOpen={isProjectMenuOpen}
              position={{
                top: 0,
                right: 0,
              }}
              onClose={() => {
                setIsProjectMenuOpen(false);
                setSelectedProjectForMenu(null);
              }}
              onViewDetails={(project) => {
                setSelectedProject(project);
                setIsProjectDetailOpen(true);
              }}
              onDownload={(project) => {
                alert(`Download results for ${project.name}`);
              }}
              onExport={(project) => {
                alert(`Export report for ${project.name}`);
              }}
              onArchive={(project) => {
                alert(
                  `${project.status === "Archived" ? "Restore" : "Archive"} ${project.name}`
                );
              }}
              onDelete={(project) => {
                alert(`Delete ${project.name}`);
              }}
            />
          </div>
        )}

        {/* System Health Tab - Placeholder */}
        {activeTab === "health" && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <PerformanceMetrics
              avgResponseTime={mockSystemHealth.metrics?.avgResponseTime || 120}
              p50ResponseTime={mockSystemHealth.metrics?.p50ResponseTime || 95}
              p95ResponseTime={mockSystemHealth.metrics?.p95ResponseTime || 450}
              p99ResponseTime={mockSystemHealth.metrics?.p99ResponseTime || 1200}
              slaBoundary={mockSystemHealth.metrics?.slaBoundary || 500}
              slaMet={mockSystemHealth.metrics?.slaMet || true}
            />

            {/* Error Rates */}
            {mockSystemHealth.errorStats.length >= 3 && (
              <ErrorRates
                lastHourRate={mockSystemHealth.errorStats[0].errorRate}
                last24hRate={mockSystemHealth.errorStats[1].errorRate}
                last7daysRate={mockSystemHealth.errorStats[2].errorRate}
                lastHourErrors={mockSystemHealth.errorStats[0].totalErrors}
                last24hErrors={mockSystemHealth.errorStats[1].totalErrors}
                last7daysErrors={mockSystemHealth.errorStats[2].totalErrors}
                topErrors={mockSystemHealth.errorStats[1].topErrors}
              />
            )}

            {/* Infrastructure Costs */}
            <InfrastructureCosts
              costs={mockSystemHealth.infrastructureCosts}
              totalBudget={5000}
            />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && mockAnalytics && (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Analytics & Reports
              </h2>
              <p className="text-sm text-gray-600">
                Track growth, revenue, and feature adoption across your platform
              </p>
            </div>

            {/* User Growth Chart */}
            <UserGrowthChart
              data={mockAnalytics.userGrowth}
              growthRate={mockAnalytics.growthRate}
            />

            {/* Revenue and Feature Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Metrics */}
              <RevenueMetrics
                revenueByTier={mockAnalytics.revenueByTier}
                monthlyRecurringRevenue={mockAnalytics.monthlyRecurringRevenue}
                annualRecurringRevenue={mockAnalytics.annualRecurringRevenue}
              />

              {/* Feature Usage */}
              <FeatureUsageComponent features={mockAnalytics.featureUsage} />
            </div>
          </div>
        )}

        {/* Audit Logs Tab - Placeholder */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Audit Logs
              </h2>
              <p className="text-sm text-gray-600">
                Track all system events, user actions, and security incidents
              </p>
            </div>

            {/* Audit Logs Component */}
            <AuditLogsComponent
              logs={convertAdminAuditLogsToComponentLogs(mockAuditLogs)}
            />
          </div>
        )}

        {/* Settings Tab - Placeholder */}
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                System Configuration
              </h2>
              <p className="text-sm text-gray-600">
                Manage feature flags, rate limits, and system settings
              </p>
            </div>

            {/* Settings Panel */}
            <AdminSettingsPanel settings={mockAdminSettings} />
          </div>
        )}
      </div>
    </main>
  </div>
</>
)}
    </div>
  );
}
