import React from "react";
import DashboardHeader from "../components/layout/DashboardHeader";
import ProjectsOverview from "../components/cards/Projectsoverview";
import ProjectCards from "../components/cards/ProjectCards";

export default function Projects() {
  return (
    <div className="min-h-screen rounded-2xl ">
      <DashboardHeader
        title="Projects"
        subtitle="Track and organize all your projects at one place"
      />
      <ProjectsOverview />
      <div className="flex w-full gap-4 p-4 pt-0 ">
        <ProjectCards />
      </div>
    </div>
  );
}
