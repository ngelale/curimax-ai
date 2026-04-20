"use client";

import { useState } from "react";
import { MoreVertical, Plus, Shield, Users, Mail, Clock, Trash2, Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { InviteCollaboratorDialog } from "./_components/invite-dialog";
import { SharingSettingsSection } from "./_components/sharing-settings";
import { toast } from "sonner";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarFallback: string;
  role: "owner" | "editor" | "viewer" | "approver";
  permissions: string[];
  lastActive: string;
  joinedDate: string;
  status?: string;
}

interface PendingInvitation {
  id: string;
  email: string;
  role: "editor" | "viewer" | "approver" | "comment";
  sentAt: string;
  expiresIn: number;
}

const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@university.edu",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "JD",
    role: "owner",
    permissions: ["All permissions"],
    lastActive: "Now",
    joinedDate: "Dec 28, 2024",
    status: "owner",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "SC",
    role: "editor",
    permissions: ["Can edit all sections"],
    lastActive: "2 hours ago",
    joinedDate: "Jan 5, 2025",
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    email: "mike.r@university.edu",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "MR",
    role: "viewer",
    permissions: ["Read-only access"],
    lastActive: "5 hours ago",
    joinedDate: "Jan 4, 2025",
  },
  {
    id: "4",
    name: "Lisa Thompson",
    email: "lisa.t@university.edu",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "LT",
    role: "approver",
    permissions: ["Can approve reports"],
    lastActive: "Yesterday",
    joinedDate: "Jan 3, 2025",
    status: "pending-approval",
  },
];

const mockPendingInvitations: PendingInvitation[] = [
  {
    id: "inv-1",
    email: "john@university.edu",
    role: "editor",
    sentAt: "2 hours ago",
    expiresIn: 28,
  },
  {
    id: "inv-2",
    email: "mary@university.edu",
    role: "comment",
    sentAt: "5 hours ago",
    expiresIn: 28,
  },
];

const roleConfig = {
  owner: {
    label: "Owner",
    color: "bg-purple-100 text-purple-700",
    icon: "👑",
  },
  editor: {
    label: "Can Edit",
    color: "bg-blue-100 text-blue-700",
    icon: "✏️",
  },
  viewer: {
    label: "Can View",
    color: "bg-slate-100 text-slate-700",
    icon: "👁️",
  },
  approver: {
    label: "Approver",
    color: "bg-green-100 text-green-700",
    icon: "✅",
  },
};

export default function ProjectSharePage({ params }: { params: { id: string } }) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(mockCollaborators);
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>(mockPendingInvitations);
  const [inviteOpen, setInviteOpen] = useState(false);

  const handleChangeRole = (id: string, newRole: "editor" | "viewer" | "approver") => {
    setCollaborators(
      collaborators.map((c) =>
        c.id === id
          ? {
              ...c,
              role: newRole,
              permissions: getRolePermissions(newRole),
            }
          : c
      )
    );
  };

  const handleRemove = (id: string) => {
    if (confirm("Are you sure you want to remove this collaborator from the project?")) {
      setCollaborators(collaborators.filter((c) => c.id !== id));
    }
  };

  const handleResendInvitation = (id: string) => {
    toast.success("Invitation resent successfully!");
  };

  const handleCancelInvitation = (id: string) => {
    if (confirm("Are you sure you want to cancel this invitation?")) {
      setPendingInvitations(pendingInvitations.filter((inv) => inv.id !== id));
      toast.success("Invitation cancelled");
    }
  };

  const getRolePermissions = (role: string): string[] => {
    const permissionsMap = {
      editor: ["Can edit all sections"],
      viewer: ["Read-only access"],
      approver: ["Can approve reports"],
    };
    return permissionsMap[role as keyof typeof permissionsMap] || [];
  };

  const owner = collaborators.find((c) => c.role === "owner");
  const otherCollaborators = collaborators.filter((c) => c.role !== "owner");

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Project Collaboration</h1>
          {owner && <Badge className="bg-purple-100 text-purple-700 border-0">Owner</Badge>}
        </div>
        <p className="text-slate-600">Manage team access, permissions, and approvals</p>
      </div>

      {/* Collaborators Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-600" />
            <h2 className="text-xl font-semibold text-slate-900">
              Project Team ({collaborators.length} members)
            </h2>
          </div>
          <Button
            onClick={() => setInviteOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Invite More
          </Button>
        </div>

        {/* Collaborators List */}
        <div className="space-y-3">
          {owner && (
            <CollaboratorCard
              collaborator={owner}
              isOwner={true}
              onChangeRole={handleChangeRole}
              onRemove={handleRemove}
            />
          )}

          {otherCollaborators.map((collaborator) => (
            <CollaboratorCard
              key={collaborator.id}
              collaborator={collaborator}
              onChangeRole={handleChangeRole}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>

      {/* Pending Invitations Section */}
      {pendingInvitations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-slate-600" />
            <h2 className="text-xl font-semibold text-slate-900">
              Pending Invitations ({pendingInvitations.length})
            </h2>
          </div>

          <div className="space-y-3">
            {pendingInvitations.map((invitation) => (
              <PendingInvitationCard
                key={invitation.id}
                invitation={invitation}
                onResend={handleResendInvitation}
                onCancel={handleCancelInvitation}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sharing Settings Section */}
      <SharingSettingsSection collaborators={collaborators} />

      {/* Invite Dialog */}
      <InviteCollaboratorDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        projectId={params.id}
      />
    </div>
  );
}

interface CollaboratorCardProps {
  collaborator: Collaborator;
  isOwner?: boolean;
  onChangeRole: (id: string, role: "editor" | "viewer" | "approver") => void;
  onRemove: (id: string) => void;
}

function CollaboratorCard({
  collaborator,
  isOwner = false,
  onChangeRole,
  onRemove,
}: CollaboratorCardProps) {
  const config = roleConfig[collaborator.role];
  const roleLabel = isOwner ? "Owner" : config.label;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={collaborator.avatar} />
              <AvatarFallback className="text-xs font-semibold">
                {collaborator.avatarFallback}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900">{collaborator.name}</h3>
                {collaborator.status === "owner" && (
                  <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                    You
                  </Badge>
                )}
                {collaborator.status === "pending-approval" && (
                  <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                    ⚠️ Pending approval
                  </Badge>
                )}
              </div>

              <p className="text-sm text-slate-600 mb-2">{collaborator.email}</p>

              <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                <span className="font-medium">
                  {collaborator.permissions.join(" • ")}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Last active: {collaborator.lastActive}</span>
                <span>•</span>
                <span>Joined: {collaborator.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={`${config.color} border-0 text-sm`}>
              {config.icon} {roleLabel}
            </Badge>

            {!isOwner && (
              <CollaboratorMenu
                collaborator={collaborator}
                onChangeRole={onChangeRole}
                onRemove={onRemove}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface CollaboratorMenuProps {
  collaborator: Collaborator;
  onChangeRole: (id: string, role: "editor" | "viewer" | "approver") => void;
  onRemove: (id: string) => void;
}

function CollaboratorMenu({
  collaborator,
  onChangeRole,
  onRemove,
}: CollaboratorMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-semibold text-slate-600">
          Permissions
        </DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          checked={collaborator.role === "editor"}
          onCheckedChange={() => {
            onChangeRole(collaborator.id, "editor");
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <span className="mr-2">✏️</span>
          <span>Can Edit</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={collaborator.role === "viewer"}
          onCheckedChange={() => {
            onChangeRole(collaborator.id, "viewer");
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <span className="mr-2">👁️</span>
          <span>Can View</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={collaborator.role === "approver"}
          onCheckedChange={() => {
            onChangeRole(collaborator.id, "approver");
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <span className="mr-2">✅</span>
          <span>Approver</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-semibold text-slate-600">
          Actions
        </DropdownMenuLabel>

        <DropdownMenuItem className="cursor-pointer text-slate-700">
          <span>📬 Resend invitation</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-slate-700">
          <span>📋 View activity history</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onSelect={() => onRemove(collaborator.id)}
        >
          <span>🗑️ Remove from project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface PendingInvitationCardProps {
  invitation: PendingInvitation;
  onResend: (id: string) => void;
  onCancel: (id: string) => void;
}

function PendingInvitationCard({
  invitation,
  onResend,
  onCancel,
}: PendingInvitationCardProps) {
  const roleLabels = {
    editor: "✏️ Edit",
    viewer: "👁️ View",
    approver: "✅ Approve",
    comment: "💬 Comment",
  };

  const roleBadgeColors = {
    editor: "bg-blue-100 text-blue-700",
    viewer: "bg-slate-100 text-slate-700",
    approver: "bg-green-100 text-green-700",
    comment: "bg-purple-100 text-purple-700",
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <h3 className="font-semibold text-slate-900 break-all">
                {invitation.email}
              </h3>
              <Badge className="bg-amber-100 text-amber-700 border-0 text-xs flex-shrink-0">
                ⏳ Pending
              </Badge>
            </div>

            <div className="space-y-1.5 mb-3">
              <p className="text-sm text-slate-600">
                Invited to <span className="font-medium">{roleLabels[invitation.role]}</span> • Sent{" "}
                <span className="font-medium">{invitation.sentAt}</span>
              </p>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Expires in {invitation.expiresIn} days
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0 ml-4">
            <Badge className={`${roleBadgeColors[invitation.role]} border-0`}>
              {roleLabels[invitation.role]}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-slate-700 hover:text-slate-900"
            onClick={() => onResend(invitation.id)}
          >
            <Send className="h-3.5 w-3.5" />
            Resend
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50"
            onClick={() => onCancel(invitation.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}