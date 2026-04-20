"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  AllSearchResults,
  SearchFilters,
  SearchSort,
  ProjectResult,
  EvidenceResult,
  TemplateResult,
  ReportResult,
  HelpArticleResult,
} from "./types";
import {
  allMockResults,
  filterResultsByQuery,
  sortResults,
  getResultCountByType,
  getSuggestions,
} from "./mock-data";
import { FilterSidebar } from "./_components/FilterSidebar";
import { ProjectResultItem } from "./_components/ProjectResultItem";
import { EvidenceResultItem } from "./_components/EvidenceResultItem";
import { TemplateResultItem } from "./_components/TemplateResultItem";
import { ReportResultItem } from "./_components/ReportResultItem";
import { HelpArticleResultItem } from "./_components/HelpArticleResultItem";

interface GlobalSearchClientProps {
  initialQuery?: string;
}

export function GlobalSearchClient({
  initialQuery = "sustainable finance",
}: GlobalSearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({
    types: ["project", "evidence", "template", "report", "article"],
    projectStatus: ["draft", "analyzing", "complete"],
    dateRange: "any",
  });
  const [sort, setSort] = useState<SearchSort>({
    field: "relevance",
    direction: "desc",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    // Start with query filter
    let results = filterResultsByQuery(allMockResults, query);

    // Apply type filters
    results = results.filter((r) => filters.types.includes(r.type));

    // Apply project status filter
    if (filters.projectStatus && filters.projectStatus.length > 0) {
      results = results.filter((r) => {
        if (r.type === "project") {
          return filters.projectStatus?.includes(r.status);
        }
        return true;
      });
    }

    // Apply sorting
    results = sortResults(results, sort.field, sort.direction);

    return results;
  }, [query, filters, sort]);

  // Get result counts for display
  const resultCounts = useMemo(
    () => getResultCountByType(filteredResults),
    [filteredResults]
  );

  const suggestions = useMemo(() => getSuggestions(query), [query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSortChange = (field: "relevance" | "date" | "name") => {
    if (sort.field === field) {
      // Toggle direction
      setSort({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ field, direction: "desc" });
    }
  };

  // Group results by type for display
  const projectResults = filteredResults.filter(
    (r) => r.type === "project"
  ) as ProjectResult[];
  const evidenceResults = filteredResults.filter(
    (r) => r.type === "evidence"
  ) as EvidenceResult[];
  const templateResults = filteredResults.filter(
    (r) => r.type === "template"
  ) as TemplateResult[];
  const reportResults = filteredResults.filter(
    (r) => r.type === "report"
  ) as ReportResult[];
  const articleResults = filteredResults.filter(
    (r) => r.type === "article"
  ) as HelpArticleResult[];

  const handleProjectOpen = (projectId: string) => {
    window.location.href = `/dashboard/projects/${projectId}`;
  };

  const handleEvidenceView = (evidenceId: string) => {
    console.log("View evidence:", evidenceId);
  };

  const handleTemplateUse = (templateId: string) => {
    window.location.href = `/dashboard/projects/new?template=${templateId}`;
  };

  const handleReportView = (reportId: string) => {
    console.log("View report:", reportId);
  };

  const handleArticleRead = (articleId: string) => {
    window.location.href = `/dashboard/help?article=${articleId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
              placeholder="Search projects, evidence, templates, reports..."
              className="pl-12 pr-4 py-3 text-lg border-gray-300"
            />

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-blue-600 font-medium"
                >
                  💡 Show all results →
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Results for "{query}"
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredResults.length} results found
              </p>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="flex gap-2">
                {(["relevance", "date", "name"] as const).map((field) => (
                  <Button
                    key={field}
                    onClick={() => handleSortChange(field)}
                    variant={sort.field === field ? "default" : "outline"}
                    size="sm"
                    className="capitalize"
                  >
                    {field}
                    {sort.field === field && (
                      <span className="ml-2">
                        {sort.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            resultCounts={resultCounts}
          />

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try different keywords or clear filters
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600 font-medium">
                    Suggestions:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check spelling</li>
                    <li>• Use broader search terms</li>
                    <li>• Remove some filters</li>
                  </ul>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() =>
                      setFilters({
                        types: [
                          "project",
                          "evidence",
                          "template",
                          "report",
                          "article",
                        ],
                        projectStatus: ["draft", "analyzing", "complete"],
                        dateRange: "any",
                      })
                    }
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                  <Button onClick={() => setQuery("")} variant="outline">
                    Browse Projects
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Projects Section */}
                {projectResults.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Projects ({projectResults.length} results)
                    </h2>
                    <div className="space-y-4">
                      {projectResults.map((result) => (
                        <ProjectResultItem
                          key={result.id}
                          result={result}
                          onOpen={handleProjectOpen}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Evidence Section */}
                {evidenceResults.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Evidence ({evidenceResults.length} results)
                    </h2>
                    <div className="space-y-4">
                      {evidenceResults.map((result) => (
                        <EvidenceResultItem
                          key={result.id}
                          result={result}
                          onView={handleEvidenceView}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Templates Section */}
                {templateResults.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Templates ({templateResults.length} results)
                    </h2>
                    <div className="space-y-4">
                      {templateResults.map((result) => (
                        <TemplateResultItem
                          key={result.id}
                          result={result}
                          onUse={handleTemplateUse}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Reports Section */}
                {reportResults.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Reports ({reportResults.length} results)
                    </h2>
                    <div className="space-y-4">
                      {reportResults.map((result) => (
                        <ReportResultItem
                          key={result.id}
                          result={result}
                          onView={handleReportView}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Help Articles Section */}
                {articleResults.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Help Articles ({articleResults.length} results)
                    </h2>
                    <div className="space-y-4">
                      {articleResults.map((result) => (
                        <HelpArticleResultItem
                          key={result.id}
                          result={result}
                          onRead={handleArticleRead}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
