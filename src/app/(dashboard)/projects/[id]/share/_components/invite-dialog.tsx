"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { toast } from "sonner";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

interface Invitee {
  id: string;
  email: string;
  role: "editor" | "viewer" | "approver";
}

export function InviteCollaboratorDialog({
  open,
  onOpenChange,
  projectId,
}: InviteDialogProps) {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "viewer" | "approver">("editor");

  const handleAddInvitee = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (invitees.some((i) => i.email === email)) {
      toast.error("This email is already added");
      return;
    }

    const newInvitee: Invitee = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
    };

    setInvitees([...invitees, newInvitee]);
    setEmail("");
    setRole("editor");
  };

  const handleRemoveInvitee = (id: string) => {
    setInvitees(invitees.filter((i) => i.id !== id));
  };

  const handleChangeRole = (id: string, newRole: "editor" | "viewer" | "approver") => {
    setInvitees(
      invitees.map((i) => (i.id === id ? { ...i, role: newRole } : i))
    );
  };

  const handleSendInvites = async () => {
    if (invitees.length === 0) {
      toast.error("Please add at least one collaborator");
      return;
    }

    try {
      // Mock API call
      await new Promise((res) => setTimeout(res, 500));
      toast.success(`Invitations sent to ${invitees.length} collaborator(s)`);
      setInvitees([]);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to send invitations");
    }
  };

  const roleDescriptions = {
    editor: "Can edit all project sections",
    viewer: "Read-only access to the project",
    approver: "Can approve reports and provide feedback",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Invite Collaborators</DialogTitle>
          <DialogDescription>
            Add team members to collaborate on this project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add Invitee Form */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Email Address
              </label>
              <Input
                placeholder="collaborator@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddInvitee();
                  }
                }}
                className="focus:border-blue-500 focus:ring-blue-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Role</label>
              <Select value={role} onValueChange={(v: any) => setRole(v)}>
                <SelectTrigger className="focus:border-blue-500 focus:ring-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">
                    <div className="flex flex-col">
                      <span>Can Edit</span>
                      <span className="text-xs text-slate-500">
                        {roleDescriptions.editor}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex flex-col">
                      <span>Can View</span>
                      <span className="text-xs text-slate-500">
                        {roleDescriptions.viewer}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="approver">
                    <div className="flex flex-col">
                      <span>Approver</span>
                      <span className="text-xs text-slate-500">
                        {roleDescriptions.approver}
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAddInvitee}
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Collaborator
            </Button>
          </div>

          {/* Invitees List */}
          {invitees.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Collaborators to invite ({invitees.length})
              </h3>
              <div className="space-y-2">
                {invitees.map((invitee) => (
                  <div
                    key={invitee.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {invitee.email}
                      </p>
                      <p className="text-xs text-slate-600">
                        {roleDescriptions[invitee.role]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        {invitee.role === "editor"
                          ? "✏️ Can Edit"
                          : invitee.role === "viewer"
                          ? "👁️ Can View"
                          : "✅ Approver"}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemoveInvitee(invitee.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvites}
              disabled={invitees.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Send {invitees.length > 0 ? `${invitees.length} Invitation` : "Invitations"}
              {invitees.length > 1 && "s"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
