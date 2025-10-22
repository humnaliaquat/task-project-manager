import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Jan", completed: 5 },
  { week: "Feb", completed: 8 },
  { week: "Mar", completed: 3 },
  { week: "Apr", completed: 10 },
  { week: "May", completed: 7 },
  { week: "Jun", completed: 3 },
  { week: "Jul", completed: 6 },
  { week: "Aug", completed: 9 },
];

export default function ProgressTrends() {
  return (
    <div className="bg-[var(--cards-bg)]  p-3 border rounded-xl border-[var(--border)]">
      <p className="text-lg font-medium  mb-4 ">Tasks Completed Per Month</p>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart
          data={data}
          barCategoryGap="10%"
          style={{ color: "var(--light-text)" }}
        >
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            style={{ color: "var(--light-text)" }}
          />

          <Tooltip />
          {/* Removed <Legend /> */}
          <Bar
            dataKey="completed"
            fill="var(--violet-text)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
