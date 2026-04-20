"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string | ReactNode;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
  icon?: React.ReactNode;
}

export function KPICard({ title, value, subtitle, trend, icon }: KPICardProps) {
  const isPositive = trend?.direction === "up";

  return (
    <Card className="relative overflow-hidden border border-slate-500/50 bg-gradient-to-br from-white via-white-500/50 to-blue-50/20 hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 group">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Animated accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3 relative z-10">
        <CardTitle className="text-xs md:text-sm font-semibold text-slate-700">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-xl md:text-2xl flex-shrink-0 p-2 rounded-lg bg-slate-100/60 group-hover:bg-slate-200/60 transition-colors duration-200">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-600 mt-1.5 font-medium">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1.5 mt-3 text-xs font-semibold px-2 py-1 rounded-md w-fit ${
            isPositive 
              ? "text-green-700 bg-green-50/60 group-hover:bg-green-100/60" 
              : "text-red-700 bg-red-50/60 group-hover:bg-red-100/60"
          } transition-colors duration-200`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 flex-shrink-0" />
            )}
            <span className="truncate">{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
