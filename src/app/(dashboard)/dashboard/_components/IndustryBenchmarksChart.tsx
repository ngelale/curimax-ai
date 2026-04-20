"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", userScore: 6.2, industryAvg: 6.5 },
  { month: "Feb", userScore: 6.5, industryAvg: 6.6 },
  { month: "Mar", userScore: 7.0, industryAvg: 6.7 },
  { month: "Apr", userScore: 7.2, industryAvg: 6.8 },
  { month: "May", userScore: 7.5, industryAvg: 6.9 },
  { month: "Jun", userScore: 7.8, industryAvg: 7.0 },
];

export function IndustryBenchmarksChart() {
  return (
    <Card className="border border-slate-200/50 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="text-lg md:text-xl text-slate-900">Industry Benchmarks</CardTitle>
        <p className="text-xs md:text-sm text-slate-600 mt-1">
          Your demand score vs. industry average over time
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="w-full overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <ResponsiveContainer width={typeof window !== 'undefined' ? window.innerWidth - 80 : 500} height={300} minWidth={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[5, 8.5]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="userScore"
                stroke="#3b82f6"
                name="Your Score"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="industryAvg"
                stroke="#10b981"
                name="Industry Average"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
