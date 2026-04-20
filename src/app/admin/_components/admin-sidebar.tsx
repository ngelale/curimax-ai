"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Folder,
  Server,
  TrendingUp,
  History,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Shield,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../components/ui/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const adminTabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "health", label: "System Health", icon: Server },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "audit", label: "Audit Logs", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggle,
}: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-gradient-to-b from-gray-50 to-white border-gray-200 transition-all",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Admin Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="text-sm font-bold text-gray-900">Admin</h2>
            <p className="text-xs text-gray-600">Control Panel</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 mt-6 px-3 overflow-auto">
        <ul className="grid gap-2">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <li key={tab.id}>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-purple-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span className="truncate">{tab.label}</span>}
                      </button>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{tab.label}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
        onClick={onToggle}
      >
        {isCollapsed ? (
          <ChevronsRight className="h-4 w-4" />
        ) : (
          <ChevronsLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
}
