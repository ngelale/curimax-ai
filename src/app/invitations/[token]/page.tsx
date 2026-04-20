"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InvitationCard } from "./_components/invitation-card";
import { InvitationData, mockInvitations } from "../types";
import { toast } from "sonner";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface InvitationPageProps {
  params: {
    token: string;
  };
}

type PageState = "loading" | "not_found" | "expired" | "display" | "accepting" | "accepted" | "declined";

export default function InvitationPage({ params }: InvitationPageProps) {
  const router = useRouter();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [state, setState] = useState<PageState>("loading");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate checking authentication
    const checkAuth = () => {
      // In real app, check if user is logged in via session/cookies
      const hasAuth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(hasAuth);
    };

    // Simulate fetching invitation from API
    const fetchInvitation = () => {
      // In real app, call API endpoint
      const inv = mockInvitations[params.token];

      if (!inv) {
        setState("not_found");
        return;
      }

      if (inv.expiresAt < new Date()) {
        setState("expired");
        return;
      }

      setInvitation(inv);
      setState("display");
    };

    setTimeout(() => {
      checkAuth();
      fetchInvitation();
    }, 500);
  }, [params.token]);

  const handleAccept = async () => {
    if (!invitation) return;

    setState("accepting");

    try {
      // Call API to accept invitation
      const response = await fetch("/api/invitations/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token }),
      });

      if (response.ok) {
        setState("accepted");
        toast.success("You're now a collaborator!");

        // Redirect to project after 2 seconds
        setTimeout(() => {
          router.push(`/dashboard/projects/${invitation.projectId}`);
        }, 2000);
      } else {
        toast.error("Failed to accept invitation");
        setState("display");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while accepting invitation");
      setState("display");
    }
  };

  const handleDecline = async () => {
    if (!invitation) return;

    try {
      // Call API to decline invitation
      const response = await fetch("/api/invitations/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token }),
      });

      if (response.ok) {
        setState("declined");
        toast.success("Invitation declined");

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Failed to decline invitation");
        setState("display");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while declining invitation");
      setState("display");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {state === "loading" && (
          <Card className="p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <div className="h-6 w-6 border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
            <p className="text-slate-600">Loading invitation...</p>
          </Card>
        )}

        {state === "not_found" && (
          <Card className="border-red-200 bg-red-50 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-red-900">Invitation Not Found</h2>
            </div>
            <p className="text-red-700">
              This invitation link is invalid or may have already been used. Please contact the
              project owner to request a new invitation.
            </p>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Go to Dashboard
            </Button>
          </Card>
        )}

        {state === "expired" && (
          <Card className="border-yellow-200 bg-yellow-50 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-yellow-900">Invitation Expired</h2>
            </div>
            <p className="text-yellow-700">
              This invitation has expired. Please contact the project owner to request a new
              invitation.
            </p>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Go to Dashboard
            </Button>
          </Card>
        )}

        {state === "display" && invitation && (
          <InvitationCard
            invitation={invitation}
            isAuthenticated={isAuthenticated}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}

        {state === "accepted" && invitation && (
          <Card className="border-green-200 bg-green-50 p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Invitation Accepted!</h2>
              <p className="text-green-700 mb-4">
                You're now a collaborator on <span className="font-semibold">"{invitation.projectName}"</span>
              </p>
              <p className="text-sm text-green-600">
                Redirecting to the project...
              </p>
            </div>
          </Card>
        )}

        {state === "declined" && invitation && (
          <Card className="border-slate-200 bg-slate-50 p-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Invitation Declined</h2>
              <p className="text-slate-600">
                You've declined the invitation to <span className="font-semibold">"{invitation.projectName}"</span>
              </p>
              <p className="text-sm text-slate-500">
                The project owner has been notified.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-slate-600 mb-4">Redirecting to dashboard...</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
