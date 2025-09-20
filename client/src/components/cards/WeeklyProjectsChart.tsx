import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function WeeklyProjectsChart() {
  const completed = 7; // projects done
  const target = 10; // weekly target

  const data = [
    { name: "Remaining", value: target, fill: "#e5e7eb" }, // gray track
    { name: "Completed", value: completed, fill: "#7c3aed" }, // violet progress
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Weekly Projects
      </h3>

      <RadialBarChart
        width={250}
        height={250}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={20}
        startAngle={90}
        endAngle={-270}
        data={data}
      >
        <PolarAngleAxis type="number" domain={[0, target]} tick={false} />
        <RadialBar dataKey="value" stackId="a" cornerRadius={10} />
      </RadialBarChart>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-violet-600">{completed}</span> /{" "}
        {target} projects
      </p>
    </div>
  );
}
