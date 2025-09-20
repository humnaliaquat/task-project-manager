import React from "react";
import DashboardHeader from "../components/layout/DashboardHeader";
import TasksOverview from "../components/cards/TasksOverview";
import ProgressTrends from "../components/cards/PreogressTrends";
import AssignedTasks from "../components/cards/AssignedTasks";
import Notepad from "../components/cards/Notepad";
import AddThings from "../components/cards/AddThings";
import WeeklyProjectsChart from "../components/cards/WeeklyProjectsChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen rounded-2xl  ">
      <DashboardHeader
        title="Dashboard"
        subtitle="Monitor all of your projects and tasks here"
      />
      <AddThings />
      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3 pt-2 p-4">
        <ProgressTrends />
        <WeeklyProjectsChart />
        <AssignedTasks />
        <Notepad />
      </div>
    </div>
  );
}
