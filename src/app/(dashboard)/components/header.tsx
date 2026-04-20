"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, Folder, Settings, CreditCard } from "lucide-react";
import { Input } from "../../components/ui/input";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command";
import { Button } from "../../components/ui/button";
import { NotificationCenter } from "./notification-center";
import { UserMenu } from "./user-menu";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left Side - Menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden hover:bg-slate-100" 
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
          
          <div className="hidden md:flex flex-1 max-w-md">
            <Button
              variant="outline"
              className="w-full justify-start text-slate-500 bg-slate-50 border-slate-200 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              onClick={() => setOpenSearch(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="text-sm">Search projects...</span>
              <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>

        {/* Right Side - Notifications + User Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>

      {/* Search Command Dialog */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput 
          placeholder="Search projects, analyses, reports..." 
          className="text-base"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Projects">
            <CommandItem className="cursor-pointer">
              <Folder className="mr-2 h-4 w-4" />
              <span>Sustainable Finance Analysis</span>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <Folder className="mr-2 h-4 w-4" />
              <span>AI/ML Engineer Market Trends</span>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <Folder className="mr-2 h-4 w-4" />
              <span>Cloud Architecture Skills</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Quick Links">
            <CommandItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
