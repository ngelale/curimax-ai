"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../../components/ui/button";
import { Card } from "../../../../../components/ui/card";
import { Textarea } from "../../../../../components/ui/textarea";
import { Label } from "../../../../../components/ui/label";
import { Checkbox } from "../../../../../components/ui/checkbox";

interface ApprovalDecisionProps {
  onApprove: (notes: string) => void;
  onReject: (reason: string) => void;
  onRequestChanges: (notes: string) => void;
  isLoading?: boolean;
}

export function ApprovalDecision({
  onApprove,
  onReject,
  onRequestChanges,
  isLoading = false,
}: ApprovalDecisionProps) {
  const [notes, setNotes] = useState("");
  const [requestChanges, setRequestChanges] = useState(false);

  const handleApprove = () => {
    onApprove(notes);
    setNotes("");
  };

  const handleReject = () => {
    if (!notes.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    onReject(notes);
    setNotes("");
  };

  const handleRequestChanges = () => {
    if (!notes.trim()) {
      toast.error("Please provide details about requested changes");
      return;
    }
    onRequestChanges(notes);
    setNotes("");
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Decision:</h3>

        {/* Notes Textarea */}
        <div className="mb-4">
          <Label htmlFor="notes" className="font-medium mb-2 block">
            Add approval notes or requested changes:
          </Label>
          <Textarea
            id="notes"
            placeholder={
              requestChanges
                ? "Describe the changes you'd like to see..."
                : "Add optional approval notes or suggestions..."
            }
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            className="resize-none"
            rows={5}
          />
        </div>

        {/* Request Changes Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <Checkbox
            id="request-changes"
            checked={requestChanges}
            onCheckedChange={(checked: boolean | string) => setRequestChanges(checked as boolean)}
          />
          <Label htmlFor="request-changes" className="font-normal cursor-pointer">
            Request changes before approval
          </Label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleReject}
            disabled={isLoading}
          >
            Reject
          </Button>
          {requestChanges ? (
            <Button
              onClick={handleRequestChanges}
              disabled={isLoading || !notes.trim()}
            >
              Request Changes
            </Button>
          ) : (
            <Button
              onClick={handleApprove}
              disabled={isLoading}
            >
              Approve
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
