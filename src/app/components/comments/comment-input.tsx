"use client";

import { useState } from "react";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Bold, Link, AtSign, Send, X } from "lucide-react";
import { mockCurrentUser } from "./types";
import { toast } from "sonner";

interface CommentInputProps {
  parentCommentId?: string;
  onSubmit: (content: string, parentCommentId?: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function CommentInput({
  parentCommentId,
  onSubmit,
  onCancel,
  isLoading = false,
  placeholder = "Add a comment...",
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const [showFormatting, setShowFormatting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    onSubmit(content, parentCommentId);
    setContent("");
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector(
      `[data-comment-input]`
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newContent =
      content.substring(0, start) +
      before +
      selected +
      after +
      content.substring(end);

    setContent(newContent);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  return (
    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          <img
            src={mockCurrentUser.avatar}
            alt={mockCurrentUser.name}
            className="h-full w-full object-cover"
          />
        </Avatar>

        {/* Input Area */}
        <div className="flex-1 space-y-2">
          <Textarea
            data-comment-input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="min-h-24 resize-none border-slate-300 focus:ring-blue-500"
          />

          {/* Formatting Toolbar */}
          {showFormatting && (
            <div className="flex items-center gap-1 p-2 bg-white rounded border border-slate-200">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 gap-1 text-xs"
                onClick={() => insertMarkdown("**", "**")}
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-3.5 w-3.5" />
                Bold
              </Button>

              <div className="w-px h-5 bg-slate-200" />

              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 gap-1 text-xs"
                onClick={() => insertMarkdown("@")}
                title="Mention (@)"
              >
                <AtSign className="h-3.5 w-3.5" />
                Mention
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 gap-1 text-xs"
                onClick={() => insertMarkdown("[", "](url)")}
                title="Link"
              >
                <Link className="h-3.5 w-3.5" />
                Link
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs text-slate-600"
              onClick={() => setShowFormatting(!showFormatting)}
            >
              {showFormatting ? "Hide formatting" : "Show formatting"}
            </Button>

            <div className="flex items-center gap-2">
              {parentCommentId && onCancel && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </Button>
              )}

              <Button
                size="sm"
                className="h-8 gap-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={isLoading || !content.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Comment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
