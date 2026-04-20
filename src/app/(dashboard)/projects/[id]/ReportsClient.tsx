"use client";

import React, { useState } from "react";
import { Project } from "../types";
import { Download, Eye, RotateCcw, Upload, X } from "lucide-react";

interface ReportOption {
  type: "pdf" | "powerpoint" | "excel";
  icon: string;
  title: string;
  description: string;
  details: string;
}

interface GeneratedReport {
  id: string;
  filename: string;
  type: "PDF" | "PowerPoint" | "Excel";
  size: string;
  generated: string;
  downloads: number;
  expiresAt: string;
  expired: boolean;
}

const reportOptions: ReportOption[] = [
  {
    type: "pdf",
    icon: "📄",
    title: "PDF Report",
    description: "Comprehensive",
    details: "20-30 pages",
  },
  {
    type: "powerpoint",
    icon: "📊",
    title: "PowerPoint",
    description: "Executive Deck",
    details: "10-15 slides",
  },
  {
    type: "excel",
    icon: "📈",
    title: "Excel Model",
    description: "Financial",
    details: "5-tab workbook",
  },
];

const defaultSections = [
  { id: "executive", label: "Executive Summary", checked: true, disabled: true },
  { id: "evidence", label: "Evidence Analysis", checked: true, disabled: false },
  {
    id: "demand",
    label: "Demand Score Details",
    checked: true,
    disabled: false,
  },
  { id: "market", label: "Job Market Analysis", checked: true, disabled: false },
  {
    id: "skills",
    label: "Skills Gap Analysis",
    checked: false,
    disabled: false,
  },
  {
    id: "competitors",
    label: "Competitive Landscape",
    checked: true,
    disabled: false,
  },
  {
    id: "financial",
    label: "Financial Projections",
    checked: true,
    disabled: false,
  },
  {
    id: "curriculum",
    label: "Curriculum Blueprint (Phase 2)",
    checked: false,
    disabled: true,
  },
  { id: "recommendations", label: "Recommendations", checked: true, disabled: false },
];

const mockReportHistory: GeneratedReport[] = [
  {
    id: "1",
    filename: "ARBPC_Sustainable_Finance.pdf",
    type: "PDF",
    size: "12.5 MB",
    generated: "Jan 6, 2025",
    downloads: 3,
    expiresAt: "April 6, 2025 (90 days)",
    expired: false,
  },
  {
    id: "2",
    filename: "ESG_Executive_Summary.pptx",
    type: "PowerPoint",
    size: "8.2 MB",
    generated: "Dec 20, 2024",
    downloads: 1,
    expiresAt: "March 20, 2025",
    expired: true,
  },
  {
    id: "3",
    filename: "Financial_Projections_Model.xlsx",
    type: "Excel",
    size: "2.1 MB",
    generated: "Dec 15, 2024",
    downloads: 5,
    expiresAt: "March 15, 2025",
    expired: true,
  },
];

export default function ReportsClient({ project }: { project: Project }) {
  const [step, setStep] = useState<"type" | "sections" | "branding" | "generating" | "complete">(
    "type"
  );
  const [selectedReportType, setSelectedReportType] = useState<
    "pdf" | "powerpoint" | "excel" | null
  >(null);
  const [sections, setSections] = useState(defaultSections);
  const [progress, setProgress] = useState(0);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleReportTypeSelect = (type: "pdf" | "powerpoint" | "excel") => {
    setSelectedReportType(type);
    setStep("sections");
  };

  const handleSectionToggle = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleSelectAll = () => {
    setSections((prev) =>
      prev.map((s) => ({ ...s, checked: !s.disabled || s.checked }))
    );
  };

  const handleClearAll = () => {
    setSections((prev) =>
      prev.map((s) => ({ ...s, checked: s.disabled ? s.checked : false }))
    );
  };

  const handleGenerateReport = () => {
    setStep("generating");
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("complete");
          setGeneratedReport({
            id: Date.now().toString(),
            filename: `ARBPC_${selectedReportType}_Report_${Date.now()}.${
              selectedReportType === "pdf" ? "pdf" : selectedReportType === "powerpoint" ? "pptx" : "xlsx"
            }`,
            type:
              selectedReportType === "pdf"
                ? "PDF"
                : selectedReportType === "powerpoint"
                ? "PowerPoint"
                : "Excel",
            size: selectedReportType === "pdf" ? "12.5 MB" : selectedReportType === "powerpoint" ? "8.2 MB" : "2.1 MB",
            generated: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            downloads: 0,
            expiresAt: "90 days",
            expired: false,
          });
          setShowSuccessToast(true);
          setTimeout(() => setShowSuccessToast(false), 3000);
          return 100;
        }
        return p + Math.random() * 30;
      });
    }, 500);
  };

  const resetFlow = () => {
    setStep("type");
    setSelectedReportType(null);
    setSections(defaultSections);
    setProgress(0);
    setGeneratedReport(null);
  };

  const evidenceIncomplete = project.status === "draft";

  // Prerequisites warning
  if (evidenceIncomplete) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900">Complete evidence analysis first</h3>
              <p className="text-sm text-yellow-800 mt-1">
                You need to complete the evidence analysis before generating reports.
              </p>
            </div>
            <button className="px-3 py-2 text-sm font-medium text-yellow-900 border border-yellow-300 rounded-md hover:bg-yellow-100">
              Go to Evidence
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success toast
  {
    showSuccessToast && (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-md shadow-lg z-50">
        ✓ Report ready!
      </div>
    );
  }

  // Step 1: Report Type Selection
  if (step === "type") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Select Report Type</h2>
          <div className="grid grid-cols-3 gap-4">
            {reportOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleReportTypeSelect(option.type)}
                className="rounded-md border-2 p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <h3 className="font-semibold text-sm">{option.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                <p className="text-xs text-muted-foreground">{option.details}</p>
                <button className="mt-4 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">
                  Select
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Section Selector
  if (step === "sections") {
    return (
      <div className="space-y-6 max-w-2xl">
        <button
          onClick={() => setStep("type")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Select Sections</h2>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAll}
                className="text-xs px-3 py-1.5 border rounded-md hover:bg-gray-50"
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                className="text-xs px-3 py-1.5 border rounded-md hover:bg-gray-50"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-3">
            {sections.map((section) => (
              <label
                key={section.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={section.checked}
                  onChange={() => handleSectionToggle(section.id)}
                  disabled={section.disabled}
                  className="rounded"
                />
                <span
                  className={`text-sm ${
                    section.disabled ? "text-muted-foreground" : ""
                  }`}
                >
                  {section.label}
                  {section.disabled && <span className="text-xs"> (unavailable)</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStep("type")}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
          >
            Back
          </button>
          <button
            onClick={() => setStep("branding")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Branding & Generate
  if (step === "branding" || step === "generating" || step === "complete") {
    return (
      <div className="space-y-6 max-w-2xl">
        <button
          onClick={() => setStep("sections")}
          className="text-sm text-blue-600 hover:underline"
          disabled={step !== "branding"}
        >
          ← Back
        </button>

        {step === "branding" && (
          <>
            <div>
              <h2 className="text-lg font-semibold mb-4">Branding (Optional)</h2>
              <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Upload Logo
                  </label>
                  <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-white text-sm">
                    <Upload className="w-4 h-4" />
                    Choose File (max 2MB)
                  </button>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, or GIF
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">
                    Primary Color
                  </label>
                  <input type="color" defaultValue="#3b82f6" className="h-10 w-20 rounded cursor-pointer" />
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    Preview will show on generated report
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep("sections")}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Back
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Generate Report
              </button>
            </div>
          </>
        )}

        {step === "generating" && (
          <div className="rounded-md border p-6 bg-blue-50 space-y-4">
            <h3 className="font-semibold">Generating Your Report</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>🔄 Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-medium">Current step: Filling template</div>
              <div className="text-muted-foreground">Estimated time: 1 minute</div>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Minimize
            </button>
          </div>
        )}

        {step === "complete" && generatedReport && (
          <>
            {showSuccessToast && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3">
                <p className="text-sm text-green-800">✓ Report ready!</p>
              </div>
            )}

            <div className="rounded-md border p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-sm">{generatedReport.filename}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {generatedReport.size} • Generated {generatedReport.generated}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-white text-xs font-medium">
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-white text-xs font-medium">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-white text-xs font-medium">
                    <RotateCcw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>

                <div className="text-xs text-muted-foreground border-t pt-2">
                  Expires: {generatedReport.expiresAt}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetFlow}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                Generate Another Report
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}

export function ReportsWithHistory({ project }: { project: Project }) {
  const [step, setStep] = useState<"type" | "sections" | "branding" | "generating" | "complete">(
    "type"
  );
  const [selectedReportType, setSelectedReportType] = useState<
    "pdf" | "powerpoint" | "excel" | null
  >(null);
  const [sections, setSections] = useState(defaultSections);
  const [progress, setProgress] = useState(0);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);

  const handleReportTypeSelect = (type: "pdf" | "powerpoint" | "excel") => {
    setSelectedReportType(type);
    setStep("sections");
  };

  const handleSectionToggle = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleSelectAll = () => {
    setSections((prev) =>
      prev.map((s) => ({ ...s, checked: !s.disabled || s.checked }))
    );
  };

  const handleClearAll = () => {
    setSections((prev) =>
      prev.map((s) => ({ ...s, checked: s.disabled ? s.checked : false }))
    );
  };

  const handleGenerateReport = () => {
    setStep("generating");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("complete");
          setGeneratedReport({
            id: Date.now().toString(),
            filename: `ARBPC_${selectedReportType}_Report_${Date.now()}.${
              selectedReportType === "pdf" ? "pdf" : selectedReportType === "powerpoint" ? "pptx" : "xlsx"
            }`,
            type:
              selectedReportType === "pdf"
                ? "PDF"
                : selectedReportType === "powerpoint"
                ? "PowerPoint"
                : "Excel",
            size: selectedReportType === "pdf" ? "12.5 MB" : selectedReportType === "powerpoint" ? "8.2 MB" : "2.1 MB",
            generated: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            downloads: 0,
            expiresAt: "90 days",
            expired: false,
          });
          return 100;
        }
        return p + Math.random() * 30;
      });
    }, 500);
  };

  const resetFlow = () => {
    setStep("type");
    setSelectedReportType(null);
    setSections(defaultSections);
    setProgress(0);
    setGeneratedReport(null);
  };

  const evidenceIncomplete = project.status === "draft";

  if (evidenceIncomplete) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900">Complete evidence analysis first</h3>
              <p className="text-sm text-yellow-800 mt-1">
                You need to complete the evidence analysis before generating reports.
              </p>
            </div>
            <button className="px-3 py-2 text-sm font-medium text-yellow-900 border border-yellow-300 rounded-md hover:bg-yellow-100">
              Go to Evidence
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ReportsClient project={project} />

      {/* Report History */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">Report History</h3>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Size</th>
                  <th className="px-4 py-3 text-left font-medium">Downloads</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockReportHistory.map((report) => (
                  <tr
                    key={report.id}
                    className={`border-b hover:bg-gray-50 ${
                      report.expired ? "opacity-50 line-through" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{report.type}</td>
                    <td className="px-4 py-3">{report.generated}</td>
                    <td className="px-4 py-3">{report.size}</td>
                    <td className="px-4 py-3">{report.downloads}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">
                          {report.expired ? "Expired" : "Download"}
                        </button>
                        {!report.expired && (
                          <>
                            <span className="text-gray-300">•</span>
                            <button className="text-xs text-blue-600 hover:underline">
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
