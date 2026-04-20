"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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
import { MoreVertical, Pencil, Trash2, CheckCircle, Flag } from "lucide-react";
import { toast } from "sonner";

interface CommentMenuProps {
  commentId: string;
  isOwnComment: boolean;
  isOwnerOfProject?: boolean;
  status: "active" | "resolved" | "flagged";
  onEdit?: () => void;
  onDelete?: () => void;
  onResolve?: () => void;
  onReport?: () => void;
}

export function CommentMenu({
  commentId,
  isOwnComment,
  isOwnerOfProject = false,
  status,
  onEdit,
  onDelete,
  onResolve,
  onReport,
}: CommentMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleDelete = () => {
    onDelete?.();
    setShowDeleteDialog(false);
    toast.success("Comment deleted");
  };

  const handleReport = () => {
    onReport?.();
    setShowReportDialog(false);
    setReportReason("");
    toast.success("Comment reported. Thank you for helping keep our community safe.");
  };

  const handleResolve = () => {
    onResolve?.();
    toast.success(status === "resolved" ? "Comment unresolved" : "Comment marked as resolved");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100">
            <MoreVertical className="h-4 w-4 text-slate-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {isOwnComment && (
            <>
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="cursor-pointer text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}

          {(isOwnerOfProject || isOwnComment) && (
            <>
              {!isOwnComment && <DropdownMenuSeparator />}
              <DropdownMenuItem onClick={handleResolve} className="cursor-pointer">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>{status === "resolved" ? "Unresolve" : "Resolve"}</span>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowReportDialog(true)}
            className="cursor-pointer text-orange-600"
          >
            <Flag className="h-4 w-4 mr-2" />
            <span>Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The comment will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report comment</AlertDialogTitle>
            <AlertDialogDescription>
              Help us understand what's wrong with this comment
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                "Inappropriate content",
                "Spam",
                "Harassment",
                "Misinformation",
                "Other",
              ].map((reason) => (
                <label key={reason} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-slate-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReport}
              disabled={!reportReason}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Report
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
