"use client";

import { Download } from "lucide-react";

export default function BlueprintClient() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-8 max-w-md text-center space-y-4">
        <div className="text-4xl">🚀</div>
        <h2 className="text-xl font-semibold">Coming soon</h2>
        <p className="text-sm text-muted-foreground">
          This feature will be available in <strong>Q2 2025</strong>
        </p>

        <div className="border-t border-amber-200 pt-4 mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            For now, use our template library to design your curriculum.
          </p>
          <a
            href="#"
            download="curriculum-template.xlsx"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download Templates
          </a>
        </div>

        <div className="border-t border-amber-200 pt-4 mt-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">
            Planned Features:
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ Module builder (drag-and-drop)</li>
            <li>✓ Learning outcomes editor</li>
            <li>✓ Credit hour calculator</li>
            <li>✓ Assessment strategy planner</li>
            <li>✓ WIL component designer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
