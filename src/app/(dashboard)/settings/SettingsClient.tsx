"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Upload, Check } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  organizationName: string;
  organizationType: string;
  role: string;
  avatar?: string;
}

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

interface NotificationData {
  analysisComplete: boolean;
  reportReady: boolean;
  weeklySummary: boolean;
  productUpdates: boolean;
}

const passwordStrengthCheck = (
  password: string
): { strength: "weak" | "medium" | "strong"; score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push("At least 8 characters");
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 25;
  } else {
    feedback.push("Mix of uppercase and lowercase");
  }

  if (/\d/.test(password)) {
    score += 25;
  } else {
    feedback.push("Include numbers");
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 25;
  } else {
    feedback.push("Include special characters");
  }

  const strength = score < 50 ? "weak" : score < 75 ? "medium" : "strong";
  return { strength, score, feedback };
};

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "integrations">(
    "profile"
  );

  // Profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    organizationName: "ARBPC Inc.",
    organizationType: "Higher Education",
    role: "Program Director",
  });

  // Security state
  const [securityData, setSecurityData] = useState<SecurityData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  // Notifications state
  const [notificationData, setNotificationData] = useState<NotificationData>({
    analysisComplete: true,
    reportReady: true,
    weeklySummary: false,
    productUpdates: true,
  });

  const passwordStrength = securityData.newPassword ? passwordStrengthCheck(securityData.newPassword) : null;

  const tabs = [
    { id: "profile" as const, label: "Profile" },
    { id: "security" as const, label: "Security" },
    { id: "notifications" as const, label: "Notifications" },
    { id: "integrations" as const, label: "Integrations" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6 py-6">
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Change Avatar</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={profileData.organizationName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      organizationName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Type
                </label>
                <select
                  value={profileData.organizationType}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      organizationType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Higher Education</option>
                  <option>K-12</option>
                  <option>Corporate</option>
                  <option>Non-Profit</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) =>
                    setProfileData({ ...profileData, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6 py-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Change Password</h3>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={securityData.currentPassword}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={securityData.newPassword}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {passwordStrength && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          passwordStrength.score >= i * 25
                            ? passwordStrength.strength === "weak"
                              ? "bg-red-500"
                              : passwordStrength.strength === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-medium">
                    {passwordStrength.strength === "weak" && (
                      <span className="text-red-600">Weak password</span>
                    )}
                    {passwordStrength.strength === "medium" && (
                      <span className="text-yellow-600">Medium strength</span>
                    )}
                    {passwordStrength.strength === "strong" && (
                      <span className="text-green-600">Strong password</span>
                    )}
                  </div>

                  {passwordStrength.feedback.length > 0 && (
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {passwordStrength.feedback.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={securityData.confirmPassword}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">
              Update Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() =>
                  setSecurityData({
                    ...securityData,
                    twoFactorEnabled: !securityData.twoFactorEnabled,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  securityData.twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    securityData.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {securityData.twoFactorEnabled && !showTwoFactorSetup && (
              <button
                onClick={() => setShowTwoFactorSetup(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Set up authenticator app
              </button>
            )}

            {showTwoFactorSetup && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 space-y-3">
                <p className="text-sm font-medium">Set up with authenticator app</p>
                <div className="bg-white p-4 rounded border text-center">
                  <div className="text-2xl font-mono">█ █ █ █ █</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    QR Code Placeholder
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Backup codes (keep these safe):
                  </p>
                  <div className="space-y-1 text-xs font-mono bg-white p-3 rounded border">
                    <div>1234 5678 9012 3456</div>
                    <div>2345 6789 0123 4567</div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm">
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowTwoFactorSetup(false)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Verify & Enable
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Analysis Complete</p>
                <p className="text-xs text-muted-foreground">
                  Notify when analysis finishes
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationData({
                    ...notificationData,
                    analysisComplete: !notificationData.analysisComplete,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationData.analysisComplete
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationData.analysisComplete
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div>
                <p className="font-medium text-sm">Report Ready</p>
                <p className="text-xs text-muted-foreground">
                  Notify when reports are generated
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationData({
                    ...notificationData,
                    reportReady: !notificationData.reportReady,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationData.reportReady ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationData.reportReady
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div>
                <p className="font-medium text-sm">Weekly Summary</p>
                <p className="text-xs text-muted-foreground">
                  Receive weekly activity summary
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationData({
                    ...notificationData,
                    weeklySummary: !notificationData.weeklySummary,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationData.weeklySummary ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationData.weeklySummary
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div>
                <p className="font-medium text-sm">Product Updates</p>
                <p className="text-xs text-muted-foreground">
                  Learn about new features and improvements
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationData({
                    ...notificationData,
                    productUpdates: !notificationData.productUpdates,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationData.productUpdates ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationData.productUpdates
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === "integrations" && (
        <div className="space-y-6 py-6">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Integration options will be available in Q2 2025
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
