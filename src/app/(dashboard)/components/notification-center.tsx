"use client";

import { useState } from "react";
import { X, Check, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";

interface Notification {
  id: string;
  type: "comment" | "approval" | "analysis" | "share" | "invitation" | "mention" | "action" | "milestone" | "report" | "request";
  avatar: string;
  avatarFallback: string;
  name: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}

const notificationIcons: Record<string, string> = {
  comment: "🔵",
  approval: "✅",
  analysis: "🔄",
  share: "📤",
  invitation: "👤",
  mention: "💬",
  action: "⚠️",
  milestone: "🎉",
  report: "📄",
  request: "❌",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "SC",
    name: "Sarah Chen",
    title: '"Sustainable Finance" project',
    message: '"These salary numbers look great..."',
    time: "2h ago",
    read: false,
    action: { label: "View Comment", href: "#" },
  },
  {
    id: "2",
    type: "approval",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "LT",
    name: "Lisa Thompson",
    title: "Your report is ready to generate",
    message: "",
    time: "5h ago",
    read: false,
    action: { label: "Generate Report", href: "#" },
  },
  {
    id: "3",
    type: "analysis",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "SYS",
    name: "System",
    title: '"AI Machine Learning" is ready',
    message: "Analysis complete",
    time: "Yesterday",
    read: true,
    action: { label: "View Results", href: "#" },
  },
  {
    id: "4",
    type: "share",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "MR",
    name: "Mike Rodriguez",
    title: 'Your project "Cybersecurity Cert"',
    message: "viewed",
    time: "Yesterday",
    read: true,
  },
  {
    id: "5",
    type: "invitation",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "JU",
    name: "john@university.edu",
    title: "Your invitation to collaborate",
    message: "accepted",
    time: "2 days ago",
    read: true,
    action: { label: "View Project", href: "#" },
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const groupedNotifications = {
    today: notifications.filter((n) => n.time.includes("ago") && !n.time.includes("Yesterday") && !n.time.includes("days")),
    yesterday: notifications.filter((n) => n.time.includes("Yesterday")),
    older: notifications.filter((n) => n.time.includes("days")),
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[420px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="font-semibold text-slate-900">Notifications</h2>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs"
                onClick={handleMarkAllRead}
              >
                Mark all read
              </Button>
            )}
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[420px]">
          <div className="divide-y">
            {/* Today */}
            {groupedNotifications.today.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-slate-600">Today</div>
                {groupedNotifications.today.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}

            {/* Yesterday */}
            {groupedNotifications.yesterday.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-slate-600">Yesterday</div>
                {groupedNotifications.yesterday.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}

            {/* Older */}
            {groupedNotifications.older.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-slate-600">Earlier</div>
                {groupedNotifications.older.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}

            {notifications.length === 0 && (
              <div className="flex h-32 items-center justify-center text-center">
                <div>
                  <p className="text-sm font-medium text-slate-900">No notifications</p>
                  <p className="text-xs text-slate-600">You're all caught up!</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t px-4 py-3">
            <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationItem({ notification, onRead, onDelete }: NotificationItemProps) {
  const icon = notificationIcons[notification.type] || "📌";

  return (
    <div
      className={`group relative px-4 py-3 transition-colors hover:bg-slate-50 ${
        !notification.read ? "bg-blue-50" : ""
      }`}
      onMouseEnter={() => !notification.read && onRead(notification.id)}
    >
      <div className="flex gap-3">
        <div className="mt-1 text-lg">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback className="text-xs">
                {notification.avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                {notification.name}
              </p>
              <p className="text-xs text-slate-600">
                {notification.title}
              </p>
              {notification.message && (
                <p className="text-xs text-slate-500 italic">
                  "{notification.message}"
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">{notification.time}</span>
            {notification.action && (
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {notification.action.label}
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!notification.read && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                onRead(notification.id);
              }}
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
