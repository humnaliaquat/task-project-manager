import { useState, useEffect, useRef } from "react";

import DashboardHeader from "../components/layout/DashboardHeader";
import TrashSection from "../components/sections/TrashSection";

type TrashTask = {
  id: number;
  name: string;
  deletedOn: string;
  originalStatus: "To Do" | "In Progress" | "Completed";
};

type TrashProject = {
  id: number;
  name: string;
  deletedOn: string;
  originalStatus: "Active" | "Completed" | "On Hold";
};

export default function Trash() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <DashboardHeader
        title="Trash"
        subtitle="View, restore, or permanently delete items."
        showSearch={false}
      />
      <div className="p-4">
        <TrashSection />
      </div>
    </div>
  );
}
