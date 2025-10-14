import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardHeader from "../components/layout/DashboardHeader";
import Profile from "../components/settings/Profile";
import Appearance from "../components/settings/Appearance";
import Notifications from "../components/settings/Notifications";
import Account from "../components/settings/Account";

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as
    | "Profile"
    | "Appearance"
    | "Notifications"
    | "Account"
    | null;

  const [activeTab, setActiveTab] = React.useState<
    "Profile" | "Appearance" | "Notifications" | "Account"
  >(tabParam || "Profile");

  // ✅ Sync URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // ✅ Sync tab when URL changes manually
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen rounded-2xl">
      <DashboardHeader
        title="Settings"
        subtitle="Manage your profile, preferences, and application settings"
        showSearch={false}
      />

      {/* Tabs */}
      <div className="m-4 border border-gray-200 rounded-2xl p-2 bg-white">
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {["Profile", "Appearance", "Notifications", "Account"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as "Profile" | "Appearance" | "Notifications" | "Account"
                )
              }
              className={`px-4 py-1.5 text-sm sm:text-base font-medium rounded-xl transition-all duration-200 flex-shrink-0 cursor-pointer
                ${
                  activeTab === tab
                    ? "bg-violet-50 text-violet-700 border border-violet-200"
                    : "text-gray-600 hover:text-violet-600 hover:bg-gray-100 border border-transparent"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Profile" && <Profile />}
      {activeTab === "Appearance" && <Appearance />}
      {activeTab === "Notifications" && <Notifications />}
      {activeTab === "Account" && <Account />}
    </div>
  );
}
