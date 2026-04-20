"use client";

import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";

interface CreateCustomTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEnterpriseOnly?: boolean;
}

export function CreateCustomTemplateModal({
  isOpen,
  onClose,
  isEnterpriseOnly = true,
}: CreateCustomTemplateModalProps) {
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic-programs");
  const [baseOption, setBaseOption] = useState("scratch");
  const [sharing, setSharing] = useState("organization");

  const handleCreate = () => {
    if (!templateName.trim()) {
      toast.error("Template name is required");
      return;
    }

    // TODO: Implement actual template creation API
    toast.success("Template created successfully!");
    
    // Reset form
    setTemplateName("");
    setDescription("");
    setCategory("academic-programs");
    setBaseOption("scratch");
    setSharing("organization");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Custom Template</DialogTitle>
          {isEnterpriseOnly && (
            <DialogDescription>Enterprise only - Create custom templates for your organization</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Name */}
          <div>
            <Label htmlFor="template-name" className="font-medium">
              Template Name *
            </Label>
            <Input
              id="template-name"
              placeholder="e.g., Master's in Sustainable Finance"
              value={templateName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what this template is for..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="mt-2 resize-none"
              rows={4}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="font-medium">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic-programs">Academic Programs</SelectItem>
                <SelectItem value="corporate-training">Corporate Training</SelectItem>
                <SelectItem value="government-workforce">Government Workforce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Base Template */}
          <div>
            <Label className="font-medium mb-3 block">Base this template on:</Label>
            <RadioGroup value={baseOption} onValueChange={setBaseOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current-project" id="current-project" />
                <Label htmlFor="current-project" className="font-normal cursor-pointer">
                  Current project: "Sustainable Finance"
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scratch" id="scratch" />
                <Label htmlFor="scratch" className="font-normal cursor-pointer">
                  Start from scratch
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sharing Options */}
          <div>
            <Label className="font-medium mb-3 block">Sharing</Label>
            <RadioGroup value={sharing} onValueChange={setSharing}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="font-normal cursor-pointer">
                  Private (only you)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization" id="organization" />
                <Label htmlFor="organization" className="font-normal cursor-pointer">
                  Organization (visible to your team)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="font-normal cursor-pointer">
                  Public (available to all ARBPC users)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
