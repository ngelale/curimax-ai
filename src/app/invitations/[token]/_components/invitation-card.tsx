"use client";

import { InvitationData, rolePermissions, roleLabels } from "../../types";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { CheckCircle, XCircle, Clock, User, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface InvitationCardProps {
  invitation: InvitationData;
  isAuthenticated: boolean;
  onAccept: () => Promise<void>;
  onDecline: () => Promise<void>;
  isLoading?: boolean;
}

export function InvitationCard({
  invitation,
  isAuthenticated,
  onAccept,
  onDecline,
  isLoading = false,
}: InvitationCardProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const daysUntilExpiry = Math.ceil(
    (invitation.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const permissions = rolePermissions[invitation.role] || [];

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await onAccept();
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    try {
      await onDecline();
      setShowDeclineDialog(false);
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <>
      <Card className="w-full border-0 shadow-lg overflow-hidden">
        {/* Background accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

        <div className="p-8 md:p-12 space-y-8">
          {/* Header with logo placeholder */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-6">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              You've been invited to collaborate!
            </h1>
          </div>

          {/* Invitation from */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{invitation.inviterName}</span> has invited you to work on:
              </span>
            </div>
            <p className="text-xl font-semibold text-slate-900 ml-8">
              "{invitation.projectName}"
            </p>
          </div>

          {/* Permission level */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Permission level:</span>
              <Badge variant="secondary" className="bg-slate-100 text-slate-900">
                {roleLabels[invitation.role]}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 mb-3">You'll be able to:</p>
              <ul className="space-y-2">
                {permissions.map((permission, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Personal message */}
          {invitation.personalMessage && (
            <div className="border-l-4 border-l-purple-400 bg-purple-50 p-4 rounded">
              <p className="text-xs font-semibold text-purple-900 mb-2">
                Personal message from {invitation.inviterName}:
              </p>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "{invitation.personalMessage}"
              </p>
            </div>
          )}

          {/* Expiration notice */}
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-4 rounded">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>
              This invitation expires in{" "}
              <span className="font-semibold text-slate-900">{daysUntilExpiry} days</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleAccept}
              disabled={isAccepting || isDeclining || isLoading}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              {isAccepting ? "Accepting..." : "Accept Invitation"}
            </Button>
            <Button
              onClick={() => setShowDeclineDialog(true)}
              disabled={isAccepting || isDeclining || isLoading}
              variant="outline"
              className="flex-1 h-11 font-semibold rounded-lg"
            >
              {isDeclining ? "Declining..." : "Decline"}
            </Button>
          </div>

          {!isAuthenticated && (
            <div className="text-center pt-4 text-sm text-slate-600">
              <span>Not the right account? </span>
              <button className="text-blue-600 hover:underline font-semibold">
                Sign out and use another account
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Decline confirmation dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Decline Invitation?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to decline this invitation to "{invitation.projectName}"?
              </p>
              <p className="text-xs text-slate-500">
                The project owner will be notified of your decision. You can request another
                invitation if you change your mind.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Keep Invitation</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDecline}
              disabled={isDeclining}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeclining ? "Declining..." : "Decline"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
