"use client";

import { useState } from "react";
import { Copy, Check, Settings, Link as LinkIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { toast } from "sonner";

interface SharingSettings {
  linkSharing: "off" | "view" | "edit";
  linkExpiration: "never" | "7days" | "30days" | "90days";
  allowComments: boolean;
  notifyComments: boolean;
  requireCommentApproval: boolean;
  requireReportApproval: boolean;
  approvers: string[];
}

interface SharingSettingsSectionProps {
  collaborators: Array<{ id: string; name: string; email: string; role: string }>;
}

export function SharingSettingsSection({
  collaborators,
}: SharingSettingsSectionProps) {
  const [settings, setSettings] = useState<SharingSettings>({
    linkSharing: "view",
    linkExpiration: "never",
    allowComments: true,
    notifyComments: true,
    requireCommentApproval: false,
    requireReportApproval: true,
    approvers: ["4"], // Lisa Thompson
  });

  const [copied, setCopied] = useState(false);

  const shareLink = "https://app.curimax.com/share/proj_abc123xyz";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSettings = async () => {
    try {
      // Mock API call
      await new Promise((res) => setTimeout(res, 500));
      toast.success("Sharing settings saved!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  const approvers = collaborators.filter((c) => c.role === "approver");

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Sharing Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Link Sharing */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Link Sharing</h3>
            <RadioGroup value={settings.linkSharing} onValueChange={(value: any) => setSettings({ ...settings, linkSharing: value })}>
              <div className="flex items-center gap-3 mb-3">
                <RadioGroupItem value="off" id="link-off" />
                <label htmlFor="link-off" className="text-sm text-slate-700 cursor-pointer">
                  Off - Only invited people can access
                </label>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <RadioGroupItem value="view" id="link-view" />
                <label htmlFor="link-view" className="text-sm text-slate-700 cursor-pointer">
                  Anyone with link can view (read-only)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="edit" id="link-edit" />
                <label htmlFor="link-edit" className="text-sm text-slate-700 cursor-pointer">
                  Anyone with link can edit
                </label>
              </div>
            </RadioGroup>
          </div>

          {settings.linkSharing !== "off" && (
            <>
              <div className="flex gap-2 pt-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Link expires
                </label>
                <Select value={settings.linkExpiration} onValueChange={(value: any) => setSettings({ ...settings, linkExpiration: value })}>
                  <SelectTrigger className="w-full focus:border-blue-500 focus:ring-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="7days">In 7 days</SelectItem>
                    <SelectItem value="30days">In 30 days</SelectItem>
                    <SelectItem value="90days">In 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        {/* Comments */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="font-semibold text-slate-900">Comments</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="allow-comments"
                checked={settings.allowComments}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowComments: !!checked })
                }
              />
              <label htmlFor="allow-comments" className="text-sm text-slate-700 cursor-pointer">
                Allow collaborators to comment
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="notify-comments"
                checked={settings.notifyComments}
                disabled={!settings.allowComments}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notifyComments: !!checked })
                }
              />
              <label
                htmlFor="notify-comments"
                className={`text-sm cursor-pointer ${
                  !settings.allowComments ? "text-slate-400" : "text-slate-700"
                }`}
              >
                Notify me when someone comments
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="require-comment-approval"
                checked={settings.requireCommentApproval}
                disabled={!settings.allowComments}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireCommentApproval: !!checked })
                }
              />
              <label
                htmlFor="require-comment-approval"
                className={`text-sm cursor-pointer ${
                  !settings.allowComments ? "text-slate-400" : "text-slate-700"
                }`}
              >
                Require approval before comments are visible
              </label>
            </div>
          </div>
        </div>

        {/* Report Approvals */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="font-semibold text-slate-900">Report Approvals</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="require-report-approval"
                checked={settings.requireReportApproval}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireReportApproval: !!checked })
                }
              />
              <label htmlFor="require-report-approval" className="text-sm text-slate-700 cursor-pointer">
                Require approval before generating final reports
              </label>
            </div>

            {settings.requireReportApproval && approvers.length > 0 && (
              <div className="ml-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-medium text-slate-600 mb-2">
                  Approvers:
                </p>
                <div className="space-y-2">
                  {approvers.map((approver) => (
                    <div key={approver.id} className="flex items-center justify-between">
                      <span className="text-sm text-slate-900">{approver.name}</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Change
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
