import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { type ProjectStatus } from "../types";

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | "all";
  onStatusChange: (value: ProjectStatus | "all") => void;
  sortOrder: "newest" | "oldest" | "name-az";
  onSortChange: (value: "newest" | "oldest" | "name-az") => void;
}

export function ProjectFilters({ 
  searchTerm, onSearchChange, 
  statusFilter, onStatusChange, 
  sortOrder, onSortChange 
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="relative w-full md:w-auto md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by project name..." 
          className="pl-9" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="analyzing">Analyzing</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="name-az">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
