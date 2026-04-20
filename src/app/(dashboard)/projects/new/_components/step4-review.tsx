import { useFormContext } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { Edit } from "lucide-react";
import { NewProjectData } from "../types";

interface ReviewSectionProps {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}

function ReviewSection({ title, step, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="icon" onClick={() => onEdit(step)}>
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export function Step4Review({ onEdit }: { onEdit: (step: number) => void }) {
  const form = useFormContext<NewProjectData>();
  const data = form.getValues();

  return (
    <div>
      <ReviewSection title="Program Basics" step={1} onEdit={onEdit}>
        <p><strong>Project Name:</strong> {data.projectName}</p>
        <p><strong>Program Level:</strong> {data.programLevel}</p>
        <p><strong>Program Topic:</strong> {data.programTopic}</p>
      </ReviewSection>
      <ReviewSection title="Geography & Industry" step={2} onEdit={onEdit}>
        <p><strong>Target Regions:</strong> {data.targetRegions.join(", ")}</p>
        <p><strong>Industry Sectors:</strong> {data.industrySectors?.join(", ") || "None"}</p>
      </ReviewSection>
      <ReviewSection title="Configuration" step={3} onEdit={onEdit}>
        <p><strong>Program Refresh:</strong> {data.isRefresh ? "Yes" : "No"}</p>
        {data.isRefresh && <p><strong>Existing URL:</strong> {data.existingProgramUrl || "N/A"}</p>}
        <p><strong>Delivery Format:</strong> {data.deliveryFormat}</p>
        <p><strong>Duration:</strong> {data.noPreferenceDuration ? "No preference" : `${data.duration} weeks`}</p>
        <p><strong>Considerations:</strong> {data.specialConsiderations || "None"}</p>
      </ReviewSection>
    </div>
  );
}
