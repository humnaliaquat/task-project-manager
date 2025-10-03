import DashboardHeader from "../components/layout/DashboardHeader";
import TasksOverview from "../components/cards/TasksOverview";
import ViewsCombined from "../components/tasks/ViewsCombined";

export default function TasksPage() {
  return (
    <div className="min-h-screen rounded-2xl ">
      <DashboardHeader
        title="Tasks"
        subtitle="Create, track, and manage all your tasks easily"
        showSearch={false}
      />
      <TasksOverview />
      <div className="flex w-full gap-4 p-4 pt-0 ">
        <ViewsCombined />
      </div>
    </div>
  );
}
