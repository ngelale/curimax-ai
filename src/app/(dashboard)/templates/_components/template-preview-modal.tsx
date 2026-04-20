"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { type Template } from "../types";
import { CheckCircle2 } from "lucide-react";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
}

export function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}: TemplatePreviewModalProps) {
  if (!template) return null;

  const results = template.typicalResults || {
    avgDemandScore: template.avgDemandScore,
    avgJobsFound: "N/A",
    avgSalary: "N/A",
    breakEvenMonths: "N/A",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{template.title} - Template Preview</DialogTitle>
          <DialogDescription>Review what's included with this template</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Overview</h3>
            <p className="text-muted-foreground">{template.description}</p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="font-semibold text-lg mb-3">What's Included:</h3>
            <ul className="space-y-2">
              {template.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Typical Results */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Typical Results:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Demand Score</p>
                <p className="text-xl font-bold">{results.avgDemandScore}/10</p>
                <p className="text-xs text-green-600 mt-1">High</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg Jobs Found</p>
                <p className="text-xl font-bold">{results.avgJobsFound}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg Salary</p>
                <p className="text-xl font-bold">{results.avgSalary}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Break-even</p>
                <p className="text-xl font-bold">{results.breakEvenMonths}</p>
              </div>
            </div>
          </div>

          {/* Customization Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              ℹ️ You can customize all fields after using this template.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onUseTemplate(template)}>
            Use This Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
