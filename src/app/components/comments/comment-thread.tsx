"use client";

import { useState, useMemo } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CommentItem } from "./comment-item";
import { CommentInput } from "./comment-input";
import { Comment, CommentThread as ICommentThread, mockComments, mockCurrentUser } from "./types";
import { MessageCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface CommentThreadProps {
  threadData?: ICommentThread;
  resourceType?: "evidence" | "model" | "report" | "general";
  resourceId?: string;
  resourceName?: string;
  isOwnerOfProject?: boolean;
  onCommentAdded?: (comment: Comment) => void;
}

export function CommentThread({
  threadData,
  resourceType = "evidence",
  resourceId = "resource-1",
  resourceName = "Evidence Section",
  isOwnerOfProject = false,
  onCommentAdded,
}: CommentThreadProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [showResolved, setShowResolved] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  // Filter comments based on resolved status
  const filteredComments = useMemo(() => {
    return comments.filter((c) => showResolved || c.status !== "resolved");
  }, [comments, showResolved]);

  const activeComments = comments.filter((c) => c.status === "active");
  const resolvedComments = comments.filter((c) => c.status === "resolved");

  const handleAddComment = (content: string, parentCommentId?: string) => {
    if (parentCommentId) {
      // Add reply to comment
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: `reply-${Date.now()}`,
                parentCommentId,
                author: mockCurrentUser,
                content,
                createdAt: new Date(),
                likes: 0,
                userLiked: false,
                isEdited: false,
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      // Add new comment
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        threadId: `thread-${resourceId}`,
        author: mockCurrentUser,
        content,
        createdAt: new Date(),
        likes: 0,
        userLiked: false,
        status: "active",
        replies: [],
        isEdited: false,
      };
      setComments([...comments, newComment]);
      onCommentAdded?.(newComment);
    }
    toast.success(parentCommentId ? "Reply added" : "Comment added");
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleResolveComment = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          status: comment.status === "resolved" ? "active" : "resolved",
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked,
        };
      }
      // Handle reply likes
      if (comment.replies.some((r) => r.id === commentId)) {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
                userLiked: !reply.userLiked,
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <Card className="border-0 shadow-sm">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex-1 justify-start h-auto p-0 text-sm font-semibold text-slate-900 hover:bg-transparent"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
            <span>{activeComments.length} Comment{activeComments.length !== 1 ? "s" : ""}</span>
            {resolvedComments.length > 0 && (
              <span className="text-slate-500 ml-2">
                ({resolvedComments.length} resolved)
              </span>
            )}
            <ChevronDown
              className={`h-4 w-4 ml-auto transition-transform ${
                showComments ? "rotate-180" : ""
              }`}
            />
          </Button>

          {!showComments && activeComments.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => setShowComments(true)}
            >
              + Add Comment
            </Button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 border-t border-slate-200 pt-4">
            {/* Active Comments */}
            {filteredComments.length > 0 ? (
              <div className="space-y-0">
                {filteredComments.map((comment) => (
                  <div key={comment.id}>
                    <CommentItem
                      comment={comment}
                      isOwnerOfProject={isOwnerOfProject}
                      onReply={(parentId) => setReplyingTo(parentId)}
                      onEdit={(id) => setEditingCommentId(id)}
                      onDelete={handleDeleteComment}
                      onResolve={handleResolveComment}
                      onLike={handleLikeComment}
                      onReplyLike={handleLikeComment}
                    />
                    {replyingTo === comment.id && (
                      <div className="ml-11 mb-4 border-l-2 border-slate-200 pl-3">
                        <CommentInput
                          parentCommentId={comment.id}
                          onSubmit={handleAddComment}
                          onCancel={() => setReplyingTo(null)}
                          placeholder={`Reply to ${comment.author.name}...`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                {comments.length > 0
                  ? "All resolved comments"
                  : "No comments yet. Be the first to comment!"}
              </p>
            )}

            {/* Show Resolved Toggle */}
            {resolvedComments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-8 text-xs text-slate-600"
                onClick={() => setShowResolved(!showResolved)}
              >
                {showResolved ? "Hide" : "Show"} Resolved ({resolvedComments.length})
              </Button>
            )}

            {/* Resolved Comments Section */}
            {showResolved && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-0">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Resolved Comments
                </p>
                {resolvedComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    isOwnerOfProject={isOwnerOfProject}
                    onDelete={handleDeleteComment}
                    onResolve={handleResolveComment}
                    onReport={() => toast.success("Comment reported")}
                    onLike={handleLikeComment}
                  />
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            <div className="border-t border-slate-200 pt-4">
              <CommentInput
                onSubmit={handleAddComment}
                placeholder="Add a comment..."
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
