"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../../components/ui/button";
import { Card } from "../../../../../components/ui/card";
import { Textarea } from "../../../../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { formatTimeAgo } from "../utils";
import { Comment } from "../types";

interface CommentsSection {
  sectionId?: string;
  sectionTitle?: string;
  comments: Comment[];
}

interface CommentsSectionProps {
  section: CommentsSection;
  currentUserId: string;
  currentUserName: string;
  canComment: boolean;
  onAddComment: (content: string) => void;
  isLoading?: boolean;
}

export function CommentsSection({
  section,
  currentUserId,
  currentUserName,
  canComment,
  onAddComment,
  isLoading = false,
}: CommentsSectionProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <Card className="p-6 space-y-4">
      {section.sectionTitle && (
        <div>
          <Badge variant="outline">{section.sectionTitle}</Badge>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {section.comments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No comments yet</p>
        ) : (
          section.comments.map((comment) => {
            const initials = comment.author.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div key={comment.id} className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Comment */}
      {canComment && (
        <div className="space-y-3 border-t pt-4">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
            className="resize-none"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCommentText("")}
              disabled={!commentText.trim() || isLoading}
            >
              Clear
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!commentText.trim() || isLoading}
            >
              Comment
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
