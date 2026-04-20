"use client";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { type Template } from "../types";

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onUseTemplate: (template: Template) => void;
}

export function TemplateCard({ template, onPreview, onUseTemplate }: TemplateCardProps) {
  return (
    <Card className="p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
      {/* Header with Icon and Title */}
      <div>
        <div className="text-4xl mb-2">{template.icon}</div>
        <h3 className="text-lg font-semibold">{template.title}</h3>
        <p className="text-sm text-muted-foreground">
          {template.category} • {template.programLevel} • {template.industry}
        </p>
      </div>

      {/* Includes Section */}
      <div>
        <p className="text-sm font-medium mb-2">Includes:</p>
        <ul className="space-y-1">
          {template.includes.slice(0, 4).map((item, idx) => (
            <li key={idx} className="text-xs text-muted-foreground">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Usage Stats */}
      <div className="space-y-1 text-sm">
        <p className="text-muted-foreground">
          Used by {template.usedBy} {template.usedBy === 1 ? "institution" : "institutions"}
        </p>
        <p className="font-medium">
          Avg Demand Score: <span className="text-green-600">{template.avgDemandScore}/10</span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t my-2"></div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onPreview(template)}>
          Preview
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onUseTemplate(template)}>
          Use Template
        </Button>
      </div>
    </Card>
  );
}
