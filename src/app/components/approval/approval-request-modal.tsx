"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Textarea } from "@/app/components/ui/textarea";
import { Avatar } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { ApprovalSection, Approver, APPROVAL_SECTIONS } from "./types";
import { Mail, Send, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ApprovalRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  approver: Approver;
  projectName: string;
  projectId: string;
  reportType?: "full" | "summary" | "financial" | "market";
  onSubmit?: (data: {
    approverId: string;
    message: string;
    sections: ApprovalSection[];
  }) => Promise<void>;
}

export function ApprovalRequestModal({
  open,
  onOpenChange,
  approver,
  projectName,
  projectId,
  reportType = "full",
  onSubmit,
}: ApprovalRequestModalProps) {
  const [message, setMessage] = useState("");
  const [selectedSections, setSelectedSections] = useState<ApprovalSection[]>(
    APPROVAL_SECTIONS.map((s) => ({
      ...s,
      isIncluded: s.id !== "draft-preview",
    }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isIncluded: !section.isIncluded }
          : section
      )
    );
  };

  const handleSubmit = async () => {
    if (selectedSections.filter((s) => s.isIncluded).length === 0) {
      toast.error("Please select at least one section to attach");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit?.({
        approverId: approver.id,
        message,
        sections: selectedSections,
      });

      toast.success("Approval request sent!");
      setMessage("");
      setSelectedSections(
        APPROVAL_SECTIONS.map((s) => ({
          ...s,
          isIncluded: s.id !== "draft-preview",
        }))
      );
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to send approval request");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCount = selectedSections.filter((s) => s.isIncluded).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Approval to Generate Report</DialogTitle>
          <DialogDescription>
            This project requires approval before generating reports.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Approver Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-slate-700">Approver:</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <img
                  src={approver.avatar}
                  alt={approver.name}
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{approver.name}</p>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {approver.email}
                </p>
              </div>
              <Badge variant="secondary">{approver.role === "owner" ? "Owner" : "Approver"}</Badge>
            </div>
          </div>

          {/* Message for Approver */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Add a message for the approver (optional):
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I've completed the analysis and financial projections. Ready for your review!"
              className="min-h-24 resize-none"
            />
            <p className="text-xs text-slate-500">
              {message.length}/500 characters
            </p>
          </div>

          {/* Sections to Attach */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Attach sections for review:
              </label>
              <Badge variant="outline" className="text-xs">
                {selectedCount} selected
              </Badge>
            </div>

            <div className="space-y-2 bg-slate-50 rounded-lg p-4">
              {APPROVAL_SECTIONS.map((section) => {
                const isSelected = selectedSections.find(
                  (s) => s.id === section.id
                )?.isIncluded;

                return (
                  <div key={section.id} className="flex items-start gap-3">
                    <Checkbox
                      id={`section-${section.id}`}
                      checked={isSelected}
                      onCheckedChange={() => toggleSection(section.id)}
                      className="mt-1"
                    />
                    <label
                      htmlFor={`section-${section.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <p className="font-medium text-slate-900">{section.name}</p>
                      {section.description && (
                        <p className="text-xs text-slate-500">{section.description}</p>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>

            {selectedCount === 0 && (
              <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Please select at least one section to attach for review.</p>
              </div>
            )}
          </div>

          {/* Report Info */}
          <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded">
            <div>
              <p className="font-medium text-slate-900">{projectName}</p>
              <p className="text-xs">Report Type: <span className="capitalize">{reportType}</span></p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || selectedCount === 0}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Approval Request
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
