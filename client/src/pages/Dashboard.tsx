import React from "react";
import DashboardHeader from "../components/layout/DashboardHeader";
import TasksOverview from "../components/cards/TasksOverview";
import ProgressTrends from "../components/cards/PreogressTrends";
import AssignedTasks from "../components/cards/AssignedTasks";
import Notepad from "../components/cards/Notepad";

export default function Dashboard() {
  return (
    <div className="min-h-screen rounded-2xl p-4 pt-2 pb-2">
      <DashboardHeader />

      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-3">
        <TasksOverview />
        <ProgressTrends />
        <AssignedTasks />
        <Notepad />
      </div>
    </div>
  );
}
