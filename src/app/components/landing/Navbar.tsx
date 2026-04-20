"use client";

import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-[20px]">InsightHub</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[14px] hover:text-[#0066CC] dark:hover:text-primary transition-colors">Features</a>
            <a href="#use-cases" className="text-[14px] hover:text-[#0066CC] dark:hover:text-primary transition-colors">Use Cases</a>
            <a href="#pricing" className="text-[14px] hover:text-[#0066CC] dark:hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-[14px] hover:text-[#0066CC] dark:hover:text-primary transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" className="text-[14px]">
              Sign In
            </Button>
            <Button className="bg-[#0066CC] hover:bg-[#0052A3] shadow-lg shadow-[#0066CC]/20">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
