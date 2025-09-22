import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, Tooltip } from "recharts";

export default function WeeklyProjectsChart() {
  // Example data (completed vs target projects in a week)
  const data = [
    {
      name: "Completed",
      value: 7, // completed projects
      fill: "#7c3aed", // violet-600
    },
    {
      name: "Remaining",
      value: 3, // remaining (if target is 10 per week)
      fill: "#e5e7eb", // gray-200
    },
  ];

  return (
    <div className="flex flex-col p-2 pl-4 bg-white rounded-xl border border-gray-200">
      {/* Title aligned to left */}
      <p className="text-xl font-medium text-gray-800 dark:text-white mb-3 text-left">
        Weekly Projects
      </p>

      {/* Chart centered */}
      <div className="flex justify-center">
        <RadialBarChart
          width={250}
          height={190}
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 10]} tick={false} />
          <RadialBar cornerRadius={10} background dataKey="value" />
          <Tooltip />
        </RadialBarChart>
      </div>

      {/* Progress text under chart, centered */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
        <span className="font-semibold text-violet-600">7</span> / 10 projects
      </p>
    </div>
  );
}
