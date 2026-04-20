"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { type Template, type TemplateCategory } from "../types";
import { mockTemplates, recentlyUsedTemplateIds } from "../mock-data";
import { TemplateCard } from "./template-card";
import { TemplateFilters } from "./template-filters";
import { TemplatePreviewModal } from "./template-preview-modal";
import { CreateCustomTemplateModal } from "./create-custom-template-modal";
import { Search } from "lucide-react";

const TAB_CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "academic", label: "Academic Programs" },
  { id: "corporate", label: "Corporate Training" },
  { id: "government", label: "Government Workforce" },
  { id: "recently-used", label: "Recently Used" },
];

export function TemplatesList() {
  const [selectedTab, setSelectedTab] = useState<TemplateCategory>("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [programLevelFilter, setProgramLevelFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getFilteredTemplates = useCallback(() => {
    let filtered = mockTemplates;

    // Filter by tab
    if (selectedTab === "academic") {
      filtered = filtered.filter((t) => t.category === "Academic Programs");
    } else if (selectedTab === "corporate") {
      filtered = filtered.filter((t) => t.category === "Corporate Training");
    } else if (selectedTab === "government") {
      filtered = filtered.filter((t) => t.category === "Government Workforce");
    } else if (selectedTab === "recently-used") {
      filtered = filtered.filter((t) => recentlyUsedTemplateIds.includes(t.id));
    }
    // "popular" shows all

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by program level
    if (programLevelFilter) {
      filtered = filtered.filter((t) => t.programLevel === programLevelFilter);
    }

    // Filter by industry
    if (industryFilter) {
      filtered = filtered.filter((t) => t.industry === industryFilter);
    }

    // Filter by region
    if (regionFilter) {
      filtered = filtered.filter((t) => t.regions.includes(regionFilter as any));
    }

    return filtered;
  }, [selectedTab, searchTerm, programLevelFilter, industryFilter, regionFilter]);

  const filteredTemplates = useMemo(() => getFilteredTemplates(), [getFilteredTemplates]);

  const handleUseTemplate = (template: Template) => {
    // TODO: Implement actual template usage - pre-fill intake wizard
    toast.success(`Template applied! Review and customize before creating.`);
    // In a real app, this would redirect to the intake wizard with pre-filled data
    console.log("Using template:", template);
    setPreviewTemplate(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setProgramLevelFilter("");
    setIndustryFilter("");
    setRegionFilter("");
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={(value: string) => setSelectedTab(value as TemplateCategory)}>
        <TabsList>
          {TAB_CATEGORIES.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          {/* Filters */}
          <TemplateFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            programLevelFilter={programLevelFilter}
            onProgramLevelChange={setProgramLevelFilter}
            industryFilter={industryFilter}
            onIndustryChange={setIndustryFilter}
            regionFilter={regionFilter}
            onRegionChange={setRegionFilter}
          />

          {/* Create Custom Template Button */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"} found
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} variant="outline">
              + Create Custom Template
            </Button>
          </div>

          {/* Templates Grid or Empty State */}
          {filteredTemplates.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">🔍 No templates found</h3>
              <p className="text-muted-foreground mb-6">Try different keywords or filters</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
                <Button variant="outline" onClick={() => setSelectedTab("popular")}>
                  Browse All
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onPreview={setPreviewTemplate}
                  onUseTemplate={() => {
                    setPreviewTemplate(null);
                    handleUseTemplate(template);
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={previewTemplate !== null}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={(template) => {
          handleUseTemplate(template);
          setPreviewTemplate(null);
        }}
      />

      <CreateCustomTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isEnterpriseOnly={true}
      />
    </div>
  );
}
