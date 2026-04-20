"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

import {
  StatusIndicator,
  ApprovalCard,
  ApprovalDecision,
  ActivityFeed,
  CommentsSection,
  CollaboratorsList,
} from "./_components";

import { mockApprovalRequest, mockCollaborators, mockActivityLog } from "./mock-data";
import { canApprove, canComment } from "./permissions";
import { ApprovalStatus } from "./types";

export default function ApprovalsPage({ params }: { params: { id: string } }) {
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(
    mockApprovalRequest.status
  );
  const [approvedBy, setApprovedBy] = useState<string | undefined>(
    mockApprovalRequest.approvedBy?.name
  );

  // Current user is owner
  const currentUserId = "user-1";
  const userRole = "owner";
  const canApproveRequest = canApprove(userRole);
  const canCommentOnRequest = canComment(userRole);

  const handleApprove = (notes: string) => {
    setApprovalStatus("approved");
    setApprovedBy("Lisa Thompson");
    toast.success("✅ Approval submitted. Requester can now generate report.");
  };

  const handleReject = (reason: string) => {
    setApprovalStatus("rejected");
    toast.success("❌ Request rejected. Feedback sent to requester.");
  };

  const handleRequestChanges = (notes: string) => {
    setApprovalStatus("changes-requested");
    toast.success("⚠️ Change request sent to requester.");
  };

  const handleAddComment = (content: string) => {
    toast.success("Comment added");
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    toast.success("Collaborator removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/projects/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Approval Request: Generate Report</h1>
          <p className="text-muted-foreground mt-1">Review and decide on the report generation request</p>
        </div>
      </div>

      {/* Status Banner */}
      {approvalStatus !== "pending" && (
        <StatusIndicator status={approvalStatus} approverName={approvedBy} />
      )}

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Left Column - Approval Details */}
        <div className="space-y-6">
          <ApprovalCard
            requesterName={mockApprovalRequest.requestedBy.name}
            requesterAvatar={mockApprovalRequest.requestedBy.avatar}
            requestedAt={mockApprovalRequest.requestedAt}
            message={mockApprovalRequest.message}
            sections={mockApprovalRequest.sections}
          />

          {/* View Full Project Details */}
          <Button variant="outline" className="w-full">
            View Full Project Details
          </Button>

          {/* Approval Decision Section */}
          {approvalStatus === "pending" && canApproveRequest && (
            <ApprovalDecision
              onApprove={handleApprove}
              onReject={handleReject}
              onRequestChanges={handleRequestChanges}
            />
          )}

          {/* Tabs for Activity and Comments */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Activity Feed</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <ActivityFeed activities={mockActivityLog} />
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <CommentsSection
                section={{
                  sectionId: "general",
                  sectionTitle: "General Comments",
                  comments: [
                    {
                      id: "c-1",
                      author: {
                        id: "user-3",
                        name: "John Smith",
                        email: "john@example.com",
                      },
                      content:
                        "Great work on the financial analysis. The ROI projections look solid.",
                      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    },
                  ],
                }}
                currentUserId={currentUserId}
                currentUserName="Lisa Thompson"
                canComment={canCommentOnRequest}
                onAddComment={handleAddComment}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Collaborators Section */}
      <div className="border-t pt-6">
        <CollaboratorsList
          collaborators={mockCollaborators}
          currentUserId={currentUserId}
          canManageCollaborators={userRole === "owner"}
          onRemove={handleRemoveCollaborator}
        />
      </div>
    </div>
  );
}
