"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { cn } from "../components/ui/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-background">
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:static lg:z-auto",
        "transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={toggleMobileMenu} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in-50">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
