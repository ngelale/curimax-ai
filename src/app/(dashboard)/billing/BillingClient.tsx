"use client";

import React, { useState } from "react";
import { CreditCard, Download, X, AlertTriangle, CheckCircle, Lock } from "lucide-react";

interface BillingHistory {
  date: string;
  description: string;
  amount: string;
  invoiceUrl: string;
}

interface PlanFeatures {
  evidence: boolean;
  financials: boolean;
  competitors: boolean;
  collaborate: boolean;
  templates: string;
  branding: boolean;
  api: boolean;
  sso: boolean;
}

interface PlanDetails {
  name: string;
  price: string;
  period: string;
  current: boolean;
  projects: string | number;
  reports: string;
  analysis: string;
  storage: string;
  support: string;
  features: PlanFeatures;
}

const mockBillingHistory: BillingHistory[] = [
  {
    date: "Dec 1, 2024",
    description: "Accelerator Plan - Annual",
    amount: "$25,000.00",
    invoiceUrl: "#",
  },
  {
    date: "Dec 1, 2023",
    description: "Accelerator Plan - Annual",
    amount: "$25,000.00",
    invoiceUrl: "#",
  },
  {
    date: "Nov 15, 2023",
    description: "Additional API Credits",
    amount: "$500.00",
    invoiceUrl: "#",
  },
];

const planTiers: PlanDetails[] = [
  {
    name: "Trial",
    price: "Free",
    period: "",
    current: false,
    projects: 1,
    reports: "3/project",
    analysis: "1 refresh",
    storage: "100MB",
    support: "Email",
    features: {
      evidence: true,
      financials: true,
      competitors: false,
      collaborate: false,
      templates: "None",
      branding: false,
      api: false,
      sso: false,
    },
  },
  {
    name: "Sprint",
    price: "$8,500",
    period: "/year",
    current: false,
    projects: 1,
    reports: "∞",
    analysis: "∞",
    storage: "1GB",
    support: "Email",
    features: {
      evidence: true,
      financials: true,
      competitors: true,
      collaborate: false,
      templates: "Basic",
      branding: false,
      api: false,
      sso: false,
    },
  },
  {
    name: "Accelerator",
    price: "$25,000",
    period: "/year",
    current: true,
    projects: 3,
    reports: "∞",
    analysis: "∞",
    storage: "10GB",
    support: "Priority",
    features: {
      evidence: true,
      financials: true,
      competitors: true,
      collaborate: true,
      templates: "Advanced",
      branding: false,
      api: false,
      sso: false,
    },
  },
  {
    name: "Portfolio",
    price: "$50,000",
    period: "/year",
    current: false,
    projects: 5,
    reports: "∞",
    analysis: "∞",
    storage: "50GB",
    support: "Dedicated",
    features: {
      evidence: true,
      financials: true,
      competitors: true,
      collaborate: true,
      templates: "Advanced",
      branding: true,
      api: true,
      sso: false,
    },
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    current: false,
    projects: "Unlimited",
    reports: "∞",
    analysis: "∞",
    storage: "Unlimited",
    support: "White-glove",
    features: {
      evidence: true,
      financials: true,
      competitors: true,
      collaborate: true,
      templates: "Custom",
      branding: true,
      api: true,
      sso: true,
    },
  },
];

type ScalarPlanKey = "projects" | "reports" | "analysis" | "storage" | "support" | "templates";
type BooleanFeatureKey = "evidence" | "financials" | "competitors" | "collaborate" | "branding" | "api" | "sso";

type CompareRow =
  | { label: string; type: "price" }
  | { label: string; type: "scalar"; key: ScalarPlanKey }
  | { label: string; type: "boolean"; key: BooleanFeatureKey };

const compareRows: CompareRow[] = [
  { label: "Price", type: "price" },
  { label: "Projects", type: "scalar", key: "projects" },
  { label: "Reports", type: "scalar", key: "reports" },
  { label: "Analysis", type: "scalar", key: "analysis" },
  { label: "Storage", type: "scalar", key: "storage" },
  { label: "Support", type: "scalar", key: "support" },
  { label: "Evidence", type: "boolean", key: "evidence" },
  { label: "Financials", type: "boolean", key: "financials" },
  { label: "Competitors", type: "boolean", key: "competitors" },
  { label: "Collaborate", type: "boolean", key: "collaborate" },
  { label: "Templates", type: "scalar", key: "templates" },
  { label: "Branding", type: "boolean", key: "branding" },
  { label: "API", type: "boolean", key: "api" },
  { label: "SSO", type: "boolean", key: "sso" },
];

const upgradePlans = [
  {
    name: "Accelerator",
    price: "$25,000",
    period: "/year",
    current: true,
    features: [
      "3 concurrent projects",
      "Unlimited analyses",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "$50,000",
    period: "/year",
    current: false,
    features: [
      "10 concurrent projects",
      "Unlimited analyses",
      "Dedicated support",
      "Custom integrations",
      "Advanced analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    current: false,
    features: [
      "Unlimited projects",
      "Unlimited analyses",
      "24/7 support",
      "Custom development",
      "SLA guarantee",
      "White-label options",
    ],
  },
];

function renderCompareCell(row: CompareRow, plan: PlanDetails): React.ReactNode {
  if (row.type === "price") {
    return (
      <span className="font-semibold">
        {plan.price}
        {plan.period}
      </span>
    );
  }
  if (row.type === "scalar") {
    const value = row.key === "templates" ? plan.features.templates : plan[row.key];
    return <span>{String(value)}</span>;
  }
  // boolean feature
  return plan.features[row.key] ? (
    <span className="text-green-600 font-bold">✓</span>
  ) : (
    <span className="text-gray-300">−</span>
  );
}

export default function BillingClient() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showComparePlans, setShowComparePlans] = useState(false);
  const [showUpgradeConfirm, setShowUpgradeConfirm] = useState(false);
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);
  const [showPaymentUpdate, setShowPaymentUpdate] = useState(false);
  const [showPaymentFailed, setShowPaymentFailed] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockBillingHistory.length / itemsPerPage);

  const paginatedHistory = mockBillingHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpgradeClick = (planName: string) => {
    setSelectedUpgradePlan(planName);
    setShowUpgradeConfirm(true);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Card */}
      <div className="rounded-lg border p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Accelerator Plan</h2>
            <div className="text-3xl font-bold text-blue-900 mt-2">
              $25,000<span className="text-lg font-normal">/year</span>
            </div>
          </div>

          <ul className="space-y-2">
            <li className="text-sm text-blue-900">• 3 concurrent projects</li>
            <li className="text-sm text-blue-900">• Unlimited analyses</li>
            <li className="text-sm text-blue-900">• Priority support</li>
          </ul>

          <div className="border-t border-blue-200 pt-4">
            <p className="text-sm text-blue-900">
              Next renewal: <strong>Dec 1, 2025</strong>
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowComparePlans(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Compare Plans
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-sm font-medium"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Usage Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground mb-2">Projects Used</div>
            <div className="text-2xl font-bold mb-2">2 of 3</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-2/3" />
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground mb-2">
              Reports This Month
            </div>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">Unlimited available</p>
          </div>

          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground mb-2">API Calls</div>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground mt-2">of 10,000 this month</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Visa card ending in ••••4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2026</p>
              </div>
            </div>
            <button
              onClick={() => setShowPaymentUpdate(true)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
            >
              Update Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHistory.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 font-medium">{item.amount}</td>
                    <td className="px-4 py-3">
                      <a
                        href={item.invoiceUrl}
                        className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border rounded hover:bg-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border rounded hover:bg-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Options */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upgrade Options</h3>
        <div className="grid grid-cols-3 gap-4">
          {upgradePlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 space-y-4 ${
                plan.current
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div>
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                {plan.current && (
                  <span className="text-xs font-medium text-blue-600">Current Plan</span>
                )}
              </div>

              <div>
                <div className="text-2xl font-bold">
                  {plan.price}
                  {plan.period && (
                    <span className="text-sm font-normal text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {!plan.current && (
                <button
                  onClick={() => {
                    if (plan.name === "Enterprise") {
                      setShowContactModal(true);
                    } else {
                      handleUpgradeClick(plan.name);
                    }
                  }}
                  className={`w-full py-2 rounded-md text-sm font-medium transition ${
                    plan.name === "Enterprise"
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Contact Sales</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Company name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <textarea
                placeholder="Tell us about your needs"
                className="w-full px-3 py-2 border rounded-md text-sm h-24"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Plans Modal */}
      {showComparePlans && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Compare Plans</h2>
              <button
                onClick={() => setShowComparePlans(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold p-3 border-r">Feature</th>
                      {planTiers.map((plan) => (
                        <th key={plan.name} className="text-center font-semibold p-3 min-w-[140px]">
                          <div className="font-bold text-base">{plan.name}</div>
                          <div className="text-lg mt-1">
                            {plan.price}
                            {plan.period && <span className="text-xs">{plan.period}</span>}
                          </div>
                          {!plan.current && plan.name !== "Trial" && (
                            <button
                              onClick={() => {
                                handleUpgradeClick(plan.name);
                                setShowComparePlans(false);
                              }}
                              className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 w-full"
                            >
                              Upgrade
                            </button>
                          )}
                          {plan.current && (
                            <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded w-full text-center">
                              Current
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {compareRows.map((row) => (
                      <tr key={row.label}>
                        <td className="p-3 font-medium border-r">{row.label}</td>
                        {planTiers.map((plan) => (
                          <td key={`${plan.name}-${row.label}`} className="p-3 text-center">
                            {renderCompareCell(row, plan)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Confirmation Modal */}
      {showUpgradeConfirm && selectedUpgradePlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upgrade to {selectedUpgradePlan}</h2>
              <button
                onClick={() => setShowUpgradeConfirm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg space-y-3 text-sm">
              <p>
                You&apos;re upgrading from <strong>Accelerator</strong> to{" "}
                <strong>{selectedUpgradePlan}</strong>
              </p>

              <div className="border-t pt-3">
                <h4 className="font-semibold mb-2">What&apos;s changing:</h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Projects: 3 → 5 concurrent</li>
                  <li>• Storage: 10GB → 50GB</li>
                  <li>• Support: Priority → Dedicated account manager</li>
                  <li>• New: Custom branding, API access</li>
                </ul>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-semibold mb-2">Pricing:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Current plan:</span>
                    <span>$25,000/year (annual)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New plan:</span>
                    <span>$50,000/year (annual)</span>
                  </div>
                  <div className="border-t pt-1 mt-1 flex justify-between font-semibold">
                    <span>Prorated charge today:</span>
                    <span>$10,416.67</span>
                  </div>
                  <p className="text-gray-600 text-xs italic mt-1">
                    Covers remaining 5 months of billing cycle
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs">
                  <strong>Next renewal:</strong> Dec 1, 2025 at $50,000
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs">
                  <strong>Payment method:</strong> Visa ending in 4242
                </p>
                <button className="text-blue-600 hover:underline text-xs mt-1">
                  Change payment method
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button
                onClick={() => setShowUpgradeConfirm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUpgradeConfirm(false);
                  setShowUpgradeSuccess(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Success Modal */}
      {showUpgradeSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold">Upgrade Successful! 🎉</h2>

            <div className="bg-green-50 p-4 rounded-lg text-left space-y-3">
              <p className="text-sm font-semibold">Welcome to {selectedUpgradePlan} tier!</p>
              <p className="text-sm text-gray-700">Your new features are active immediately:</p>
              <ul className="space-y-1 text-sm">
                {[
                  "5 concurrent projects",
                  "50GB storage",
                  "Dedicated account manager",
                  "Custom branding",
                  "API access",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-600 pt-2">
                Receipt emailed to jane@university.edu
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowUpgradeSuccess(false)}
                className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                View Invoice
              </button>
              <button
                onClick={() => setShowUpgradeSuccess(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Update Modal */}
      {showPaymentUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Update Payment Method</h2>
              <button
                onClick={() => setShowPaymentUpdate(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Billing Address</label>
                <input
                  type="text"
                  placeholder="123 University Ave"
                  className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Boston, MA 02115"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Set as default payment method</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Save for future use</span>
                </label>
              </div>

              <div className="bg-blue-50 p-3 rounded flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-900">Secured by Stripe</span>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowPaymentUpdate(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Save Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Failed Payment Modal */}
      {showPaymentFailed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-lg font-semibold">Payment Failed</h2>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg space-y-3 text-sm">
              <p>
                Your payment of <strong>$25,000</strong> for the{" "}
                <strong>Accelerator plan</strong> could not be processed.
              </p>
              <p>
                <strong>Reason:</strong> Insufficient funds
              </p>
              <p className="text-gray-700">
                We&apos;ll retry in 3 days. If payment fails 3 times, your account will be
                downgraded to Trial tier.
              </p>
              <p className="text-xs text-gray-600">
                To avoid service interruption, please update your payment method immediately.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowPaymentFailed(false);
                  setShowPaymentUpdate(true);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Update Payment Method
              </button>
              <button
                onClick={() => setShowPaymentFailed(false)}
                className="w-full px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Retry Payment Now
              </button>
              <button
                onClick={() => setShowPaymentFailed(false)}
                className="w-full px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Contact Billing Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cancel Subscription?</h2>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your subscription will remain active until the end of your billing period (Dec 1,
              2025). You can reactivate anytime.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Keep Subscription
              </button>
              <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
