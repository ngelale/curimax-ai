"use client";

import { ApprovalRequest, daysUntilExpiry } from "./types";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
} from "lucide-react";

interface ApprovalPendingProps {
  approvalRequest: ApprovalRequest;
  onWithdraw?: () => void;
  onRetry?: () => void;
}

export function ApprovalPending({
  approvalRequest,
  onWithdraw,
  onRetry,
}: ApprovalPendingProps) {
  const daysLeft = daysUntilExpiry(approvalRequest.expiresAt);
  const isDaysLow = daysLeft <= 2;

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className={`border-l-4 p-4 space-y-4 ${
        approvalRequest.status === "pending"
          ? "border-l-amber-400 bg-amber-50"
          : approvalRequest.status === "approved"
            ? "border-l-green-400 bg-green-50"
            : "border-l-red-400 bg-red-50"
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {approvalRequest.status === "pending" && (
              <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            {approvalRequest.status === "approved" && (
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            {approvalRequest.status === "rejected" && (
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                {approvalRequest.status === "pending"
                  ? "Awaiting Approval"
                  : approvalRequest.status === "approved"
                    ? "Approved"
                    : "Rejected"}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {approvalRequest.projectName}
              </p>
            </div>
          </div>

          <Badge
            variant={
              approvalRequest.status === "pending"
                ? "outline"
                : approvalRequest.status === "approved"
                  ? "secondary"
                  : "destructive"
            }
          >
            {approvalRequest.status === "pending"
              ? "Pending"
              : approvalRequest.status === "approved"
                ? "Approved"
                : "Rejected"}
          </Badge>
        </div>

        {/* Approver Info */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span className="font-medium">Approver:</span>
          <span>{approvalRequest.approverName}</span>
          <span className="text-slate-500">({approvalRequest.approverEmail})</span>
        </div>

        {/* Timeline */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Requested:</span>
            <span>
              {approvalRequest.requestedAt.toLocaleDateString()} at{" "}
              {approvalRequest.requestedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {approvalRequest.respondedAt && (
            <div className="flex items-center justify-between text-slate-600">
              <span>Responded:</span>
              <span>
                {approvalRequest.respondedAt.toLocaleDateString()} at{" "}
                {approvalRequest.respondedAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          {approvalRequest.status === "pending" && (
            <div className={`flex items-center justify-between font-medium ${
              isDaysLow ? "text-red-600" : "text-slate-900"
            }`}>
              <span>Expires in:</span>
              <span>{daysLeft} day{daysLeft !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* Attached Sections */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Attached sections:</p>
          <div className="flex flex-wrap gap-2">
            {approvalRequest.attachedSections
              .filter((s) => s.isIncluded)
              .map((section) => (
                <Badge key={section.id} variant="secondary">
                  {section.name}
                </Badge>
              ))}
          </div>
        </div>

        {/* Message */}
        {approvalRequest.message && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Your message:
            </p>
            <p className="text-sm text-slate-600 italic border-l-2 border-slate-300 pl-3">
              "{approvalRequest.message}"
            </p>
          </div>
        )}

        {/* Response Message */}
        {approvalRequest.responseMessage && (
          <div className="space-y-2 bg-white rounded p-3">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {approvalRequest.status === "approved"
                ? "Approval note:"
                : "Rejection reason:"}
            </p>
            <p className={`text-sm ${
              approvalRequest.status === "approved"
                ? "text-green-700"
                : "text-red-700"
            }`}>
              "{approvalRequest.responseMessage}"
            </p>
          </div>
        )}

        {/* Warning for Low Days */}
        {approvalRequest.status === "pending" && isDaysLow && (
          <div className="flex items-start gap-2 text-sm text-red-700 bg-red-100 p-3 rounded">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>This approval request expires in {daysLeft} days.</p>
          </div>
        )}

        {/* Actions */}
        {approvalRequest.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onWithdraw}
              className="flex-1"
            >
              Withdraw Request
            </Button>
          </div>
        )}

        {approvalRequest.status === "rejected" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={onRetry}
            >
              Send New Request
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
