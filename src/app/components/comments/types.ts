export type CommentStatus = "active" | "resolved" | "flagged";

export interface CommentReply {
  id: string;
  parentCommentId: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  userLiked: boolean;
  mentions?: string[];
  isEdited: boolean;
}

export interface Comment {
  id: string;
  threadId: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  userLiked: boolean;
  status: CommentStatus;
  replies: CommentReply[];
  mentions?: string[];
  isEdited: boolean;
}

export interface CommentThread {
  id: string;
  resourceType: "evidence" | "model" | "report" | "general";
  resourceId: string;
  resourceName: string;
  comments: Comment[];
  showResolved: boolean;
}

// Mock current user
export const mockCurrentUser = {
  id: "user-1",
  name: "You",
  email: "you@university.edu",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
};

// Mock users for mentions
export const mockUsers = [
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "user-3",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: "user-4",
    name: "Lisa Thompson",
    email: "lisa.thompson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  },
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    threadId: "thread-1",
    author: mockUsers[0],
    content:
      "These salary numbers look great! Can we get more data on skills required?",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 2,
    userLiked: false,
    status: "active",
    isEdited: false,
    replies: [
      {
        id: "reply-1",
        parentCommentId: "comment-1",
        author: mockCurrentUser,
        content:
          "Good idea! I'll add that to the next analysis.",
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        likes: 1,
        userLiked: true,
        isEdited: false,
      },
    ],
  },
  {
    id: "comment-2",
    threadId: "thread-1",
    author: mockUsers[1],
    content: "@Sarah - The BLS data supports this trend",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 1,
    userLiked: false,
    status: "active",
    isEdited: false,
    mentions: ["user-2"],
    replies: [],
  },
  {
    id: "comment-3",
    threadId: "thread-1",
    author: mockUsers[2],
    content:
      "This analysis is incomplete. We need to verify the sources.",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 0,
    userLiked: false,
    status: "resolved",
    isEdited: true,
    replies: [],
  },
];

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}
