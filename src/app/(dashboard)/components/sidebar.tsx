"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Folder, Settings, CreditCard, LifeBuoy, LogOut, User, ChevronsLeft, ChevronsRight, BookOpen, Shield, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { cn } from "../../components/ui/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: Folder, label: "Projects" },
  { href: "/templates", icon: BookOpen, label: "Templates" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/admin", icon: Shield, label: "Admin" },
  { href: "/help", icon: LifeBuoy, label: "Help" },
];

export function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean, onToggle: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-muted/40 p-4 transition-all",
        isCollapsed ? "w-20" : "w-60"
      )}
    >
      <div className="flex items-center gap-2 pb-6 border-b shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        {!isCollapsed && <h1 className="text-lg font-bold">Curimax</h1>}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <form onSubmit={handleSearch} className="mt-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 text-sm bg-white border-gray-300"
            />
          </div>
        </form>
      )}

      <nav className="flex-1 mt-6 overflow-auto">
        <ul className="grid gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
              <Link href={item.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}>
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t pt-4 shrink-0">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col text-sm">
              <span className="font-medium">Shadcn</span>
              <Badge variant="secondary">Pro</Badge>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button variant="outline" className="w-full mt-4">
            Upgrade
          </Button>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background border hover:bg-muted"
        onClick={onToggle}
      >
        {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </Button>
    </aside>
  );
}
