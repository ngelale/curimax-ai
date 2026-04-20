"use client";

import { useState } from "react";
import { ApprovalRequest, daysUntilExpiry } from "./types";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Eye,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface ApprovalCardProps {
  request: ApprovalRequest;
  onApprove?: (responseMessage: string) => Promise<void>;
  onReject?: (responseMessage: string) => Promise<void>;
}

export function ApprovalCard({
  request,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const daysLeft = daysUntilExpiry(request.expiresAt);
  const isDaysLow = daysLeft <= 2;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove?.(responseMessage);
      toast.success("Request approved!");
      setShowApproveDialog(false);
      setResponseMessage("");
    } catch (error) {
      toast.error("Failed to approve request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await onReject?.(responseMessage);
      toast.success("Request rejected");
      setShowRejectDialog(false);
      setResponseMessage("");
    } catch (error) {
      toast.error("Failed to reject request");
    } finally {
      setIsLoading(false);
    }
  };

  const statusBgColor =
    request.status === "pending"
      ? "bg-amber-50 border-l-amber-400"
      : request.status === "approved"
        ? "bg-green-50 border-l-green-400"
        : "bg-red-50 border-l-red-400";

  return (
    <>
      <Card className={`border-0 border-l-4 shadow-sm overflow-hidden ${statusBgColor}`}>
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900">
                  {request.projectName}
                </h3>
                <Badge variant="outline" className="text-xs capitalize">
                  {request.reportType} report
                </Badge>
              </div>
              <p className="text-sm text-slate-600">
                Requested by <span className="font-medium">{request.requesterName}</span>
              </p>
            </div>

            <Badge
              variant={
                request.status === "pending"
                  ? "outline"
                  : request.status === "approved"
                    ? "secondary"
                    : "destructive"
              }
              className={request.status === "pending" ? "bg-amber-100 text-amber-900" : ""}
            >
              {request.status === "pending"
                ? "Pending"
                : request.status === "approved"
                  ? "Approved"
                  : "Rejected"}
            </Badge>
          </div>

          {/* Timeline */}
          <div className="space-y-1 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Requested:</span>
              <span className="text-slate-900 font-medium">
                {request.requestedAt.toLocaleDateString()} at{" "}
                {request.requestedAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {request.status !== "pending" && (
              <div className="flex items-center justify-between">
                <span>Responded:</span>
                <span className="text-slate-900 font-medium">
                  {request.respondedAt?.toLocaleDateString()} at{" "}
                  {request.respondedAt?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
            {request.status === "pending" && (
              <div className={`flex items-center justify-between font-medium ${
                isDaysLow ? "text-red-600" : "text-slate-900"
              }`}>
                <span>Expires in:</span>
                <span>{daysLeft} day{daysLeft !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>

          {/* Request Message */}
          {request.message && (
            <div className="bg-white rounded p-3 space-y-1">
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Request Message:
              </p>
              <p className="text-sm text-slate-700">"{request.message}"</p>
            </div>
          )}

          {/* Attached Sections */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Attached Sections ({request.attachedSections.filter((s) => s.isIncluded).length}):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {request.attachedSections
                .filter((s) => s.isIncluded)
                .map((section) => (
                  <div
                    key={section.id}
                    className="text-xs bg-white rounded p-2 border border-slate-200"
                  >
                    <p className="font-medium text-slate-900">{section.name}</p>
                    {section.description && (
                      <p className="text-slate-500 mt-0.5">{section.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Response Message (if already responded) */}
          {request.responseMessage && (
            <div className={`rounded p-3 ${
              request.status === "approved"
                ? "bg-green-100 border border-green-200"
                : "bg-red-100 border border-red-200"
            }`}>
              <p className={`text-xs font-semibold mb-1 ${
                request.status === "approved"
                  ? "text-green-900"
                  : "text-red-900"
              }`}>
                {request.status === "approved" ? "Approval Note:" : "Rejection Reason:"}
              </p>
              <p className={`text-sm ${
                request.status === "approved"
                  ? "text-green-800"
                  : "text-red-800"
              }`}>
                {request.responseMessage}
              </p>
            </div>
          )}

          {/* Actions */}
          {request.status === "pending" && (
            <div className="flex gap-2 pt-2 border-t border-slate-200 mt-4">
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 h-8 gap-1 text-xs"
              >
                <Eye className="h-3.5 w-3.5" />
                View Sections
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 gap-1 text-xs text-red-600 hover:text-red-700"
                onClick={() => setShowRejectDialog(true)}
              >
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </Button>
              <Button
                size="sm"
                className="flex-1 h-8 gap-1 text-xs bg-green-600 hover:bg-green-700"
                onClick={() => setShowApproveDialog(true)}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Approve Request?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3 mt-4">
                <p>
                  You're about to approve the report generation for{" "}
                  <span className="font-semibold">{request.projectName}</span>.
                </p>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Add approval note (optional):
                  </label>
                  <Textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Looks great! All sections are thorough and well-documented."
                    className="min-h-20 resize-none"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Reject Request?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3 mt-4">
                <p>
                  You're about to reject the report generation request for{" "}
                  <span className="font-semibold">{request.projectName}</span>.
                </p>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Reason for rejection (required):
                  </label>
                  <Textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Please provide more detail on the methodology used in the evidence section..."
                    className="min-h-20 resize-none border-red-200"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={isLoading || !responseMessage.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
