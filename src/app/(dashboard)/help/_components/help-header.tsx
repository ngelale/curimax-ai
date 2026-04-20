"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";

interface HelpHeaderProps {
  onContactClick: () => void;
}

export const HelpHeader = ({ onContactClick }: HelpHeaderProps) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find guides, tutorials, and support resources
        </p>
        <div className="mt-6 max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help..."
            className="w-full pl-10 h-12 text-base bg-white"
          />
        </div>
      </div>
      <div className="absolute top-8 right-8">
        <Button 
          variant="outline" 
          onClick={onContactClick}
          className="bg-white hover:bg-gray-50"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
};