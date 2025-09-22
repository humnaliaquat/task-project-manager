// Projects.tsx
import React from "react";
import DashboardHeader from "../components/layout/DashboardHeader";

import ProjectCards from "../components/cards/ProjectCards";
import ProjectsOverview from "../components/cards/ProjectsOverview";

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <DashboardHeader
        title="Projects"
        subtitle="Track and organize all your projects at one place"
      />

      {/* Overview Section */}
      <div className="">
        <ProjectsOverview />
      </div>

      {/* Projects List / Cards */}
      <div className="flex flex-col p-4 pt-0">
        <ProjectCards />
      </div>
    </div>
  );
}
