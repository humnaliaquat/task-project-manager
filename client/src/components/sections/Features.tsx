import React from "react";
import { CheckCircle, Calendar, Users, BarChart3, Layers } from "lucide-react";

export default function Features() {
  const featuresTop = [
    {
      icon: <CheckCircle className="w-10 h-10 text-violet-600" />,
      title: "Smart Task Management",
      desc: "Easily add, organize, and track tasks so nothing slips through the cracks.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-pink-500" />,
      title: "Project Scheduling",
      desc: "Stay ahead with clear deadlines and milestones using a simple calendar view.",
    },
  ];

  const featuresBottom = [
    {
      icon: <Users className="w-10 h-10 text-emerald-500" />,
      title: "Team Collaboration",
      desc: "Work together seamlessly by sharing projects, assigning tasks, and updating progress.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-amber-500" />,
      title: "Progress Tracking",
      desc: "Track performance with visual insights and stay on top of your goals.",
    },
    {
      icon: <Layers className="w-10 h-10 text-indigo-500" />,
      title: "All-in-One Workspace",
      desc: "Manage tasks, projects, and teams in one single, organized platform.",
    },
  ];

  return (
    <section
      id="features"
      className="mt-20 py-4 px-6 md:px-12 lg:px-24  rounded-3xl w-[88%]"
    >
      <div className="text-center mb-12 justify-center flex items-center flex-col gap-2">
        <p className="inline-block px-4 py-2 mb-4 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          Features
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Everything you need to stay productive
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          From daily tasks to big projects — Planora gives you the tools to
          organize work, collaborate with your team, and achieve more.
        </p>
      </div>

      {/* Top Row (2 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {featuresTop.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row (3 items) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresBottom.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
