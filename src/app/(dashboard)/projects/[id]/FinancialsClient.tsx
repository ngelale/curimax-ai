"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Download, Save } from "lucide-react";

const scenarios = {
  conservative: {
    tuitionPerStudent: 45000,
    year1Enrollment: 50,
    year2Enrollment: 120,
    year3Enrollment: 250,
    retentionRate: 75,
    facultyCosts: 400000,
    facilitiesCosts: 150000,
    marketingCosts: 80000,
    administrativeCosts: 120000,
    technologyCosts: 60000,
  },
  likely: {
    tuitionPerStudent: 65000,
    year1Enrollment: 100,
    year2Enrollment: 280,
    year3Enrollment: 500,
    retentionRate: 90,
    facultyCosts: 600000,
    facilitiesCosts: 200000,
    marketingCosts: 120000,
    administrativeCosts: 180000,
    technologyCosts: 100000,
  },
  aggressive: {
    tuitionPerStudent: 85000,
    year1Enrollment: 200,
    year2Enrollment: 450,
    year3Enrollment: 800,
    retentionRate: 95,
    facultyCosts: 800000,
    facilitiesCosts: 300000,
    marketingCosts: 200000,
    administrativeCosts: 250000,
    technologyCosts: 150000,
  },
};

export default function FinancialsClient() {
  const [activeScenario, setActiveScenario] = useState<"conservative" | "likely" | "aggressive" | "custom">(
    "likely"
  );

  const [formData, setFormData] = useState(scenarios.likely);
  const [customData, setCustomData] = useState(scenarios.likely);

  const currentData = activeScenario === "custom" ? customData : formData;

  const updateField = (field: string, value: number) => {
    if (activeScenario === "custom") {
      setCustomData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const switchScenario = (scenario: "conservative" | "likely" | "aggressive") => {
    setActiveScenario(scenario);
    setFormData(scenarios[scenario]);
  };

  // Financial calculations
  const financialData = useMemo(() => {
    const year1Revenue = currentData.year1Enrollment * currentData.tuitionPerStudent;
    const year2Enrollment = Math.round(
      currentData.year1Enrollment * (currentData.retentionRate / 100) +
        currentData.year2Enrollment * (1 - currentData.retentionRate / 100)
    );
    const year2Revenue = year2Enrollment * currentData.tuitionPerStudent;

    const year3Enrollment = Math.round(
      year2Enrollment * (currentData.retentionRate / 100) +
        currentData.year3Enrollment * (1 - currentData.retentionRate / 100)
    );
    const year3Revenue = year3Enrollment * currentData.tuitionPerStudent;

    const totalAnnualCosts =
      currentData.facultyCosts +
      currentData.facilitiesCosts +
      currentData.marketingCosts +
      currentData.administrativeCosts +
      currentData.technologyCosts;

    const year1Profit = year1Revenue - totalAnnualCosts;
    const year2Profit = year2Revenue - totalAnnualCosts;
    const year3Profit = year3Revenue - totalAnnualCosts;

    const totalRevenue = year1Revenue + year2Revenue + year3Revenue;
    const totalCosts = totalAnnualCosts * 3;
    const netProfit = totalRevenue - totalCosts;

    // Break-even calculation (simplified: months to cover first year costs)
    const monthlyProfit = year1Profit / 12;
    const breakEvenMonths =
      monthlyProfit > 0
        ? Math.ceil(totalAnnualCosts / (year1Revenue / 12))
        : 60;

    const roi = ((netProfit / totalCosts) * 100).toFixed(1);

    return {
      year1Revenue,
      year2Revenue,
      year3Revenue,
      year1Profit,
      year2Profit,
      year3Profit,
      totalRevenue,
      totalCosts,
      netProfit,
      totalAnnualCosts,
      breakEvenMonths,
      roi,
      monthlyProfit,
    };
  }, [currentData]);

  const errors: string[] = [];
  const warnings: string[] = [];

  if (
    currentData.facultyCosts < 0 ||
    currentData.facilitiesCosts < 0 ||
    currentData.marketingCosts < 0 ||
    currentData.administrativeCosts < 0 ||
    currentData.technologyCosts < 0
  ) {
    errors.push("❌ All costs must be non-negative");
  }

  if (financialData.breakEvenMonths > 60) {
    warnings.push("⚠️ High risk: Break-even takes over 5 years");
  }

  return (
    <div className="space-y-6">
      {/* Warnings/Errors */}
      {errors.length > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          {errors.map((err, i) => (
            <div key={i} className="text-sm text-red-800">
              {err}
            </div>
          ))}
        </div>
      )}
      {warnings.length > 0 && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          {warnings.map((warn, i) => (
            <div key={i} className="text-sm text-yellow-800">
              {warn}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* Left Panel - Input Calculator */}
        <div className="col-span-1 rounded-md border p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Scenario</h3>
            <div className="flex gap-2">
              {(["conservative", "likely", "aggressive"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => switchScenario(s)}
                  className={`px-3 py-2 text-xs rounded-md border transition ${
                    activeScenario === s
                      ? "bg-blue-100 border-blue-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveScenario("custom")}
              className={`mt-2 w-full px-3 py-2 text-xs rounded-md border transition ${
                activeScenario === "custom"
                  ? "bg-blue-100 border-blue-300"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              Custom
            </button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Revenue Assumptions</h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-muted-foreground">Tuition per student</label>
                  <span className="font-semibold text-sm">
                    ${(currentData.tuitionPerStudent / 1000).toFixed(0)}K
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={currentData.tuitionPerStudent}
                  onChange={(e) => updateField("tuitionPerStudent", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-muted-foreground">Year 1 enrollment</label>
                  <span className="font-semibold text-sm">{currentData.year1Enrollment}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={currentData.year1Enrollment}
                  onChange={(e) => updateField("year1Enrollment", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-muted-foreground">Year 2 enrollment</label>
                  <span className="font-semibold text-sm">{currentData.year2Enrollment}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={currentData.year2Enrollment}
                  onChange={(e) => updateField("year2Enrollment", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-muted-foreground">Year 3 enrollment</label>
                  <span className="font-semibold text-sm">{currentData.year3Enrollment}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={currentData.year3Enrollment}
                  onChange={(e) => updateField("year3Enrollment", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-muted-foreground">Retention rate</label>
                  <span className="font-semibold text-sm">{currentData.retentionRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentData.retentionRate}
                  onChange={(e) => updateField("retentionRate", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Cost Assumptions</h4>

            <div className="space-y-2 text-sm">
              <div>
                <label className="text-muted-foreground">Faculty costs</label>
                <input
                  type="number"
                  value={currentData.facultyCosts}
                  onChange={(e) => updateField("facultyCosts", parseInt(e.target.value))}
                  className="w-full px-2 py-1 border rounded-md text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Facilities costs</label>
                <input
                  type="number"
                  value={currentData.facilitiesCosts}
                  onChange={(e) => updateField("facilitiesCosts", parseInt(e.target.value))}
                  className="w-full px-2 py-1 border rounded-md text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Marketing costs</label>
                <input
                  type="number"
                  value={currentData.marketingCosts}
                  onChange={(e) => updateField("marketingCosts", parseInt(e.target.value))}
                  className="w-full px-2 py-1 border rounded-md text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Administrative costs</label>
                <input
                  type="number"
                  value={currentData.administrativeCosts}
                  onChange={(e) => updateField("administrativeCosts", parseInt(e.target.value))}
                  className="w-full px-2 py-1 border rounded-md text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-muted-foreground">Technology costs</label>
                <input
                  type="number"
                  value={currentData.technologyCosts}
                  onChange={(e) => updateField("technologyCosts", parseInt(e.target.value))}
                  className="w-full px-2 py-1 border rounded-md text-xs mt-1"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={() => setFormData(scenarios.likely)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm">
              <Download className="w-4 h-4" />
              Export to Excel
            </button>
          </div>
        </div>

        {/* Right Panel - Visualizations */}
        <div className="col-span-2 space-y-6">
          {/* Chart 1: Break-Even Analysis */}
          <div className="rounded-md border p-4">
            <h4 className="font-semibold mb-3 text-sm">Break-Even Analysis</h4>
            <div className="h-40 flex items-end gap-1">
              {Array.from({ length: 60 }).map((_, month) => {
                const cumulativeProfit =
                  (financialData.monthlyProfit * (month + 1)) - financialData.totalAnnualCosts;
                const height = Math.max(
                  5,
                  Math.min(
                    100,
                    ((cumulativeProfit + financialData.totalAnnualCosts) /
                      (financialData.totalAnnualCosts * 2)) *
                      100
                  )
                );
                const isBE = month === Math.round(financialData.breakEvenMonths);
                return (
                  <div
                    key={month}
                    className={`flex-1 rounded-t transition ${
                      isBE
                        ? "bg-red-500"
                        : cumulativeProfit > 0
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    style={{ height: `${height}%` }}
                    title={`Month ${month + 1}: $${(cumulativeProfit / 1000).toFixed(1)}K`}
                  />
                );
              })}
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              Break-even: Month {Math.round(financialData.breakEvenMonths)}
            </div>
          </div>

          {/* Chart 2: 3-Year Revenue vs Costs */}
          <div className="rounded-md border p-4">
            <h4 className="font-semibold mb-3 text-sm">3-Year Revenue vs. Costs</h4>
            <div className="flex items-end gap-4 h-40">
              {[
                { year: 1, revenue: financialData.year1Revenue, profit: financialData.year1Profit },
                { year: 2, revenue: financialData.year2Revenue, profit: financialData.year2Profit },
                { year: 3, revenue: financialData.year3Revenue, profit: financialData.year3Profit },
              ].map(({ year, revenue, profit }) => {
                const maxVal = Math.max(
                  financialData.year1Revenue,
                  financialData.year2Revenue,
                  financialData.year3Revenue
                );
                const revenueHeight = (revenue / maxVal) * 100;
                const costHeight = (financialData.totalAnnualCosts / maxVal) * 100;
                return (
                  <div key={year} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-end gap-0.5">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${revenueHeight}%` }}
                      />
                      <div
                        className="w-full bg-orange-500"
                        style={{ height: `${costHeight}%` }}
                      />
                    </div>
                    <div className="text-xs font-semibold mt-2 text-green-600">
                      +${(profit / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">Year {year}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded" />
                Revenue
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded" />
                Costs
              </div>
            </div>
          </div>

          {/* Chart 3: ROI Gauge */}
          <div className="rounded-md border p-4">
            <h4 className="font-semibold mb-3 text-sm">ROI Gauge</h4>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <svg viewBox="0 0 100 100" className="w-32 h-32">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      parseFloat(financialData.roi) > 100
                        ? "#22c55e"
                        : parseFloat(financialData.roi) > 50
                        ? "#eab308"
                        : "#ef4444"
                    }
                    strokeWidth="8"
                    strokeDasharray={`${(parseFloat(financialData.roi) / 200) * 282.7} 282.7`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                  {/* Center text */}
                  <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-base font-bold">
                    {financialData.roi}%
                  </text>
                </svg>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>High: &gt;100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span>Medium: 50-100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Low: &lt;50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border p-3 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-xs text-muted-foreground">Total Revenue (3yr)</div>
              <div className="text-xl font-bold text-blue-900">
                ${(financialData.totalRevenue / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="rounded-md border p-3 bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-xs text-muted-foreground">Total Costs (3yr)</div>
              <div className="text-xl font-bold text-orange-900">
                ${(financialData.totalCosts / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="rounded-md border p-3 bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-xs text-muted-foreground">Net Profit (3yr)</div>
              <div className="text-xl font-bold text-green-900">
                ${(financialData.netProfit / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="rounded-md border p-3 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-xs text-muted-foreground">Break-Even</div>
              <div className="text-xl font-bold text-purple-900">Month {Math.round(financialData.breakEvenMonths)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
