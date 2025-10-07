import DashboardHeader from "../components/layout/DashboardHeader";
import ProgressTrends from "../components/cards/PreogressTrends";
import AssignedTasks from "../components/cards/AssignedTasks";
import Notepad from "../components/cards/Notepad";
import AddThings from "../components/cards/AddThings";
import WeeklyProjectsChart from "../components/cards/WeeklyProjectsChart";
import TasksCreatedToday from "../components/cards/TasksCreatedToday";

export default function Dashboard() {
  return (
    <div className="min-h-screen rounded-2xl  ">
      <DashboardHeader
        title="Dashboard"
        subtitle="Monitor all of your projects and tasks here"
        showSearch={false}
      />
      <AddThings />
      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3 pt-1 p-4">
        <AssignedTasks />
        <ProgressTrends />
        <WeeklyProjectsChart />
      </div>
      <div className="grid grid-cols-3 gap-4 p-4 pb-3 pt-2">
        {/* Chart takes 2/3 of width */}
        <div className="col-span-2">
          <TasksCreatedToday />
        </div>

        {/* Notepad takes 1/3 of width */}
        <div className="col-span-1">
          <Notepad />
        </div>
      </div>
    </div>
  );
}
