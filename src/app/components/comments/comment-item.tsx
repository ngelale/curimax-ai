"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Avatar } from "@/app/components/ui/avatar";
import { CommentMenu } from "./comment-menu";
import { Comment, CommentReply, formatTimeAgo, mockCurrentUser } from "./types";
import { ThumbsUp, Reply, Pencil } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
  onReply?: (parentCommentId: string) => void;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onResolve?: (commentId: string) => void;
  onReport?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onReplyLike?: (replyId: string) => void;
  isOwnerOfProject?: boolean;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  onReply,
  onEdit,
  onDelete,
  onResolve,
  onReport,
  onLike,
  onReplyLike,
  isOwnerOfProject = false,
  isReply = false,
}: CommentItemProps) {
  const isOwnComment = comment.author.id === mockCurrentUser.id;
  const isResolved = comment.status === "resolved";

  return (
    <div className={isResolved ? "opacity-60" : ""}>
      {/* Main Comment */}
      <div className="flex gap-3 py-4">
        {/* Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="h-full w-full object-cover"
          />
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${isResolved ? "line-through text-slate-500" : "text-slate-900"}`}>
                  {comment.author.name}
                </span>
                <span className="text-xs text-slate-500">
                  {formatTimeAgo(comment.createdAt)}
                </span>
                {comment.isEdited && (
                  <span className="text-xs text-slate-400">(edited)</span>
                )}
                {isResolved && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Resolved
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 leading-relaxed ${isResolved ? "line-through text-slate-500" : "text-slate-700"}`}>
                {comment.content}
              </p>
            </div>

            <CommentMenu
              commentId={comment.id}
              isOwnComment={isOwnComment}
              isOwnerOfProject={isOwnerOfProject}
              status={comment.status}
              onEdit={() => onEdit?.(comment.id)}
              onDelete={() => onDelete?.(comment.id)}
              onResolve={() => onResolve?.(comment.id)}
              onReport={() => onReport?.(comment.id)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-slate-600 hover:bg-slate-100 gap-1"
              onClick={() => onLike?.(comment.id)}
            >
              <ThumbsUp
                className={`h-3.5 w-3.5 ${comment.userLiked ? "fill-blue-600 text-blue-600" : ""}`}
              />
              <span>{comment.likes > 0 && comment.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-slate-600 hover:bg-slate-100 gap-1"
              onClick={() => onReply?.(comment.id)}
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Reply</span>
            </Button>

            {isOwnComment && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-slate-600 hover:bg-slate-100 gap-1"
                onClick={() => onEdit?.(comment.id)}
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Button>
            )}
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 ml-3 border-l-2 border-slate-200 pl-3 space-y-4">
              {comment.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  parentCommentId={comment.id}
                  onLike={() => onReplyLike?.(reply.id)}
                  onEdit={() => onEdit?.(reply.id)}
                  onDelete={() => onDelete?.(reply.id)}
                  onReport={() => onReport?.(reply.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReplyItem({
  reply,
  parentCommentId,
  onLike,
  onEdit,
  onDelete,
  onReport,
}: {
  reply: CommentReply;
  parentCommentId: string;
  onLike?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}) {
  const isOwnComment = reply.author.id === mockCurrentUser.id;

  return (
    <div className="flex gap-3">
      <Avatar className="h-7 w-7 flex-shrink-0">
        <img
          src={reply.author.avatar}
          alt={reply.author.name}
          className="h-full w-full object-cover"
        />
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{reply.author.name}</span>
              <span className="text-xs text-slate-500">{formatTimeAgo(reply.createdAt)}</span>
              {reply.isEdited && (
                <span className="text-xs text-slate-400">(edited)</span>
              )}
            </div>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">
              {reply.content}
            </p>
          </div>

          <CommentMenu
            commentId={reply.id}
            isOwnComment={isOwnComment}
            status="active"
            onEdit={onEdit}
            onDelete={onDelete}
            onReport={onReport}
          />
        </div>

        <div className="flex items-center gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-slate-600 hover:bg-slate-100 gap-1"
            onClick={onLike}
          >
            <ThumbsUp
              className={`h-3.5 w-3.5 ${reply.userLiked ? "fill-blue-600 text-blue-600" : ""}`}
            />
            <span>{reply.likes > 0 && reply.likes}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
