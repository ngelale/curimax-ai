"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card } from "../../../../../components/ui/card";
import { Collaborator, UserRole } from "../types";
import { getRoleDescription } from "../permissions";
import { Trash2 } from "lucide-react";

interface CollaboratorsListProps {
  collaborators: Collaborator[];
  currentUserId: string;
  canManageCollaborators: boolean;
  onRemove?: (collaboratorId: string) => void;
}

const roleColors: Record<UserRole, string> = {
  owner: "bg-purple-100 text-purple-800 border-purple-300",
  editor: "bg-blue-100 text-blue-800 border-blue-300",
  commenter: "bg-green-100 text-green-800 border-green-300",
  viewer: "bg-gray-100 text-gray-800 border-gray-300",
};

export function CollaboratorsList({
  collaborators,
  currentUserId,
  canManageCollaborators,
  onRemove,
}: CollaboratorsListProps) {
  // Sort by role (owner first)
  const sorted = [...collaborators].sort((a, b) => {
    const roleOrder = { owner: 0, editor: 1, commenter: 2, viewer: 3 };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Collaborators ({collaborators.length})</h3>
      <div className="space-y-3">
        {sorted.map((collaborator) => {
          const initials = collaborator.name
            .split(" ")
            .map((n) => n[0])
            .join("");
          const isCurrentUser = collaborator.id === currentUserId;

          return (
            <div
              key={collaborator.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {collaborator.name}
                    {isCurrentUser && <span className="text-xs text-muted-foreground ml-2">(You)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{collaborator.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="outline" className={`${roleColors[collaborator.role]} border`}>
                  {collaborator.role.charAt(0).toUpperCase() + collaborator.role.slice(1)}
                </Badge>
                {canManageCollaborators && !isCurrentUser && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                    onClick={() => onRemove?.(collaborator.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Information */}
      <div className="mt-6 pt-6 border-t space-y-2">
        <p className="font-medium text-sm mb-3">Role Permissions:</p>
        <div className="space-y-2 text-xs">
          {(["owner", "editor", "commenter", "viewer"] as UserRole[]).map((role) => (
            <p key={role} className="text-muted-foreground">
              <strong>{role.charAt(0).toUpperCase() + role.slice(1)}:</strong> {getRoleDescription(role)}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
}
