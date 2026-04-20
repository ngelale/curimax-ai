"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface TemplateFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  programLevelFilter: string;
  onProgramLevelChange: (value: string) => void;
  industryFilter: string;
  onIndustryChange: (value: string) => void;
  regionFilter: string;
  onRegionChange: (value: string) => void;
}

const programLevels = ["All Levels", "Bachelor's", "Master's", "Certificate", "Diploma", "Bootcamp"];
const industries = ["All Industries", "Technology", "Business", "Healthcare", "Finance", "Education", "Government"];
const regions = ["All Regions", "US", "Canada", "Europe", "Global", "APAC"];

export function TemplateFilters({
  searchTerm,
  onSearchChange,
  programLevelFilter,
  onProgramLevelChange,
  industryFilter,
  onIndustryChange,
  regionFilter,
  onRegionChange,
}: TemplateFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-10"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Program Level
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Program Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {programLevels.map((level) => (
              <DropdownMenuItem
                key={level}
                onClick={() => onProgramLevelChange(level === "All Levels" ? "" : level)}
                className={programLevelFilter === (level === "All Levels" ? "" : level) ? "bg-accent" : ""}
              >
                {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Industry
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Industry</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {industries.map((industry) => (
              <DropdownMenuItem
                key={industry}
                onClick={() => onIndustryChange(industry === "All Industries" ? "" : industry)}
                className={industryFilter === (industry === "All Industries" ? "" : industry) ? "bg-accent" : ""}
              >
                {industry}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Region
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Region</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {regions.map((region) => (
              <DropdownMenuItem
                key={region}
                onClick={() => onRegionChange(region === "All Regions" ? "" : region)}
                className={regionFilter === (region === "All Regions" ? "" : region) ? "bg-accent" : ""}
              >
                {region}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
