"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../../components/ui/button";
import { Card } from "../../../../../components/ui/card";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Label } from "../../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../../components/ui/radio-group";
import { NotificationPreferences, NotificationFrequency } from "../types";

interface NotificationPreferencesProps {
  preferences: NotificationPreferences;
  onSave: (preferences: NotificationPreferences) => void;
  isLoading?: boolean;
}

export function NotificationPreferencesComponent({
  preferences: initialPreferences,
  onSave,
  isLoading = false,
}: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleEmailChange = (key: keyof typeof preferences.email, value: boolean) => {
    setPreferences({
      ...preferences,
      email: {
        ...preferences.email,
        [key]: value,
      },
    });
  };

  const handleInAppChange = (key: keyof typeof preferences.inApp, value: boolean) => {
    setPreferences({
      ...preferences,
      inApp: {
        ...preferences.inApp,
        [key]: value,
      },
    });
  };

  const handleFrequencyChange = (frequency: NotificationFrequency) => {
    setPreferences({
      ...preferences,
      frequency,
    });
  };

  const handleSave = () => {
    onSave(preferences);
    toast.success("Notification preferences saved");
  };

  return (
    <Card className="p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Collaboration Notifications</h3>

        {/* Email Notifications */}
        <div className="space-y-3 mb-6">
          <p className="font-medium text-sm">Email me when:</p>
          <div className="space-y-2 ml-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="onInvite"
                checked={preferences.email.onInvite}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onInvite", checked as boolean)
                }
              />
              <Label htmlFor="onInvite" className="font-normal cursor-pointer">
                Someone invites me to a project
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="onComment"
                checked={preferences.email.onComment}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onComment", checked as boolean)
                }
              />
              <Label htmlFor="onComment" className="font-normal cursor-pointer">
                Someone comments on my project
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="onMention"
                checked={preferences.email.onMention}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onMention", checked as boolean)
                }
              />
              <Label htmlFor="onMention" className="font-normal cursor-pointer">
                Someone mentions me (@mention)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="onApproval"
                checked={preferences.email.onApproval}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onApproval", checked as boolean)
                }
              />
              <Label htmlFor="onApproval" className="font-normal cursor-pointer">
                Someone approves/rejects my approval request
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="onView"
                checked={preferences.email.onView}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onView", checked as boolean)
                }
              />
              <Label htmlFor="onView" className="font-normal cursor-pointer">
                Someone views my project (can be noisy)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="onEdit"
                checked={preferences.email.onEdit}
                onCheckedChange={(checked: boolean | string) =>
                  handleEmailChange("onEdit", checked as boolean)
                }
              />
              <Label htmlFor="onEdit" className="font-normal cursor-pointer">
                Someone edits my project
              </Label>
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="space-y-3 mb-6 border-t pt-6">
          <p className="font-medium text-sm">In-app notifications:</p>
          <div className="space-y-2 ml-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="desktopNotifications"
                checked={preferences.inApp.desktopNotifications}
                onCheckedChange={(checked: boolean | string) =>
                  handleInAppChange("desktopNotifications", checked as boolean)
                }
              />
              <Label htmlFor="desktopNotifications" className="font-normal cursor-pointer">
                Show desktop notifications (requires browser permission)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="playSoundOnMention"
                checked={preferences.inApp.playSoundOnMention}
                onCheckedChange={(checked: boolean | string) =>
                  handleInAppChange("playSoundOnMention", checked as boolean)
                }
              />
              <Label htmlFor="playSoundOnMention" className="font-normal cursor-pointer">
                Play sound for @mentions
              </Label>
            </div>
          </div>
        </div>

        {/* Digest Settings */}
        <div className="space-y-3 border-t pt-6">
          <p className="font-medium text-sm">Digest settings:</p>
          <RadioGroup value={preferences.frequency} onValueChange={handleFrequencyChange}>
            <div className="flex items-center gap-2 ml-2">
              <RadioGroupItem value="real-time" id="realTime" />
              <Label htmlFor="realTime" className="font-normal cursor-pointer">
                Real-time (as they happen)
              </Label>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="font-normal cursor-pointer">
                Daily digest (9:00 AM)
              </Label>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="font-normal cursor-pointer">
                Weekly digest (Monday 9:00 AM)
              </Label>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <RadioGroupItem value="off" id="off" />
              <Label htmlFor="off" className="font-normal cursor-pointer">
                Off (no emails)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6 pt-6 border-t">
          <Button onClick={handleSave} disabled={isLoading}>
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  );
}
