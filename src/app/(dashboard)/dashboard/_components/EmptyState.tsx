"use client";

import { Button } from "@/app/components/ui/button";
import { Plus, Sparkles, BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md">
        {/* Illustration */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Curimax! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Start your journey by creating your first project to analyze market demand and trends.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Create First Project
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <BookOpen className="w-4 h-4" />
            View Tutorial
          </Button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Browse project templates →
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Watch video introduction →
          </a>
        </div>
      </div>
    </div>
  );
}
