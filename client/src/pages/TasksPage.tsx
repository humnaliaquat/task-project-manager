import React from "react";
import DashboardHeader from "../components/layout/DashboardHeader";
import TasksOverview from "../components/cards/TasksOverview";

export default function TasksPage() {
  return (
    <div className="min-h-screen rounded-2xl ">
      <DashboardHeader
        title="Projects"
        subtitle="Track and organize all your projects at one place"
      />
      <TasksOverview />
      <div className="flex w-full gap-4 p-4 pt-0 "></div>
    </div>
  );
}
