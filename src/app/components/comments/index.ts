// Re-export all comment components
export { CommentThread } from "./comment-thread";
export { CommentItem } from "./comment-item";
export { CommentInput } from "./comment-input";
export { CommentMenu } from "./comment-menu";
export {
  type Comment,
  type CommentReply,
  type CommentThread as ICommentThread,
  type CommentStatus,
  mockComments,
  mockCurrentUser,
  mockUsers,
  formatTimeAgo,
} from "./types";
