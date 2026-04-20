"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "../types";

export default function ProjectHubClient({ project }: { project: Project }) {
  const router = useRouter();
  const [title, setTitle] = useState(project.name);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const tabs = ["Evidence", "Competitors", "Blueprint", "Financials", "Reports"];
  const [activeTab, setActiveTab] = useState<string>("Evidence");

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const demandPercent = Math.max(0, Math.min(100, (project.demandScore / 10) * 100));
  const jobsPercent = Math.max(0, Math.min(100, (project.jobCount / 500) * 100));

  return (
    <main className="p-6 space-y-6">
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <nav className="text-sm text-muted-foreground">Projects &gt; {project.name}</nav>

            <div className="flex items-center gap-3 mt-2">
              <div className="relative group">
                {editing ? (
                  <input
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setTitle(project.name);
                        setEditing(false);
                      }
                      if (e.key === "Enter") setEditing(false);
                    }}
                    className="text-2xl font-bold border-b px-1"
                    aria-label="Edit project title"
                  />
                ) : (
                  <h1 className="text-2xl font-bold" onDoubleClick={() => setEditing(true)}>
                    {title}
                  </h1>
                )}

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="opacity-0 group-hover:opacity-100 ml-2 text-sm text-muted-foreground"
                  aria-label="Edit title"
                >
                  Edit
                </button>
              </div>

              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
          </div>

          <div>
            <details className="relative">
              <summary className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100" aria-haspopup="menu" aria-label="More">
                ⋮
              </summary>
              <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow z-10">
                <div className="px-3 py-2 text-sm text-muted-foreground">More</div>
                <ul className="divide-y">
                  <li>
                    <button className="w-full px-3 py-2 text-left text-sm">Edit intake</button>
                  </li>
                  <li>
                    <button className="w-full px-3 py-2 text-left text-sm">Duplicate project</button>
                  </li>
                  <li>
                    <button className="w-full px-3 py-2 text-left text-sm">Archive</button>
                  </li>
                  <li>
                    <button className="w-full px-3 py-2 text-left text-sm text-red-600">Delete</button>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        <section className="flex items-center gap-6 rounded-md border p-4">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Demand Score</div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">{project.demandScore}/10</div>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 rounded" style={{ width: `${demandPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Jobs Found</div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">{project.jobCount}</div>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-gray-500 rounded" style={{ width: `${jobsPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Avg Salary</div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">${project.avgSalary.toLocaleString()}</div>
              <div className="text-sm text-green-600">Trend: +12%</div>
            </div>
          </div>
        </section>
      </header>

      <nav aria-label="Project modules" className="border-b">
        <ul className="flex gap-6">
          {tabs.map((t) => (
            <li key={t}>
              <button
                onClick={() => {
                  if (t === "Evidence") {
                    router.push(`/projects/${project.id}/evidence`);
                  } else if (t === "Competitors") {
                    router.push(`/projects/${project.id}/competitors`);
                  } else if (t === "Blueprint") {
                    router.push(`/projects/${project.id}/blueprint`);
                  } else if (t === "Financials") {
                    router.push(`/projects/${project.id}/financials`);
                  } else if (t === "Reports") {
                    router.push(`/projects/${project.id}/reports`);
                  } else {
                    setActiveTab(t);
                  }
                }}
                className={`py-3 ${activeTab === t && t !== "Evidence" && t !== "Competitors" && t !== "Blueprint" && t !== "Financials" && t !== "Reports" ? "border-b-2 border-blue-600" : "text-muted-foreground"}`}
                aria-current={activeTab === t && t !== "Evidence" && t !== "Competitors" && t !== "Blueprint" && t !== "Financials" && t !== "Reports" ? "page" : undefined}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab !== "Evidence" && activeTab !== "Competitors" && activeTab !== "Blueprint" && activeTab !== "Financials" && (
        <section className="min-h-[200px] rounded-md border p-6">
          <h2 className="text-lg font-semibold">{activeTab}</h2>
          <p className="mt-4 text-sm text-muted-foreground">{activeTab} tab content (placeholder)</p>
        </section>
      )}
    </main>
  );
}
