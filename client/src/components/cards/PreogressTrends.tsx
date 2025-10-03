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
    <div className="bg-white dark:bg-gray-800  p-3 border rounded-xl border-gray-200">
      <p className="text-lg font-medium text-slate-800 mb-4 ">
        Tasks Completed Per Month
      </p>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} barCategoryGap="10%">
          <XAxis dataKey="week" tickLine={false} axisLine={false} />

          <Tooltip />
          {/* Removed <Legend /> */}
          <Bar dataKey="completed" fill="#7c3aed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
