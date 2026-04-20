"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Upload, Plus, CheckCircle, AlertCircle } from "lucide-react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ContactSupportModal = ({ isOpen, onOpenChange }: ContactSupportModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketNumber] = useState("12345");

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onOpenChange(false);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <DialogHeader>
            <DialogTitle>Support Ticket Created!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6">
            <p className="text-lg font-semibold">Ticket #{ticketNumber}</p>
            <p className="text-muted-foreground">
              Thank you for contacting us. We'll respond within 24 hours. Check your email for confirmation.
            </p>
            <p className="text-sm text-muted-foreground">
              You can view this ticket in <strong>Settings → Support</strong>
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input 
              id="subject" 
              placeholder="Question about financial model calculations" 
              className="text-base"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="technical">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="feature-request">Feature Request</SelectItem>
                  <SelectItem value="bug-report">Bug Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="normal" className="flex items-center space-x-3 pt-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-xs font-normal">Low</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="text-xs font-normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-xs font-normal">High</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="urgent" id="urgent" disabled />
                  <Label htmlFor="urgent" className="text-xs font-normal text-muted-foreground">Urgent*</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">*Enterprise only</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="I'm getting inconsistent break-even calculations when I change the enrollment numbers..." 
              rows={5}
              className="text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label>Attachments (optional)</Label>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" /> Upload Screenshot
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add File
                </Button>
            </div>
          </div>
           <div className="grid gap-2">
              <Label htmlFor="project">Related project (optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proj1">Sustainable Finance</SelectItem>
                  <SelectItem value="proj2">AI Machine Learning</SelectItem>
                  <SelectItem value="proj3">Cybersecurity Cert</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Auto-includes project ID in ticket</p>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="system-info" defaultChecked />
                <Label htmlFor="system-info" className="text-sm font-normal">Include system information (browser, version)</Label>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Submit Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};