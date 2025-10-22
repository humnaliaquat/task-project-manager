import React, { useState } from "react";

export default function Notifications() {
  const [taskReminders, setTaskReminders] = useState(true);
  const [dueDateAlerts, setDueDateAlerts] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="m-4 border border-[var(--border)] rounded-2xl p-6 bg-[var(--cards-bg)] space-y-8">
      {/* Title */}
      <div>
        <p className="text-xl font-semibold ">Notifications</p>
        <p className="text-sm text-[var(--light-text)]">
          Manage your notification preferences and how you receive updates.
        </p>
      </div>

      {/* Notification Toggles */}
      <div className="space-y-6">
        {/* Task Reminders */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-base font-medium ">Task Reminders</p>
            <p className="text-sm text-[var(--light-text)]">
              Get reminders when tasks are due soon.
            </p>
          </div>

          <button
            onClick={() => setTaskReminders((prev) => !prev)}
            className={`relative w-12 h-6 cursor-pointer rounded-full transition-colors ${
              taskReminders ? "bg-violet-500" : "bg-[var(--light-text)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--bg)] rounded-full shadow-md transform transition-transform ${
                taskReminders ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>

        {/* Due Date Alerts */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-base font-medium ">Due Date Alerts</p>
            <p className="text-sm text-[var(--light-text)]">
              Receive alerts for approaching or missed due dates.
            </p>
          </div>

          <button
            onClick={() => setDueDateAlerts((prev) => !prev)}
            className={`cursor-pointer relative w-12 h-6 rounded-full transition-colors ${
              dueDateAlerts ? "bg-violet-500" : "bg-[var(--light-text)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--bg)] rounded-full shadow-md transform transition-transform ${
                dueDateAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>

        {/* Email Updates */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-base font-medium ">Email Updates</p>
            <p className="text-sm text-[var(--light-text)]">
              Stay informed about new tasks, comments, and activity summaries.
            </p>
          </div>

          <button
            onClick={() => setEmailUpdates((prev) => !prev)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
              emailUpdates ? "bg-violet-500" : "bg-[var(--light-text)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--bg)] rounded-full shadow-md transform transition-transform ${
                emailUpdates ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end gap-3 ">
        <button className="w-full sm:w-auto border border-[var(--border)] hover:bg-[var(--hover-bg)]  cursor-pointer px-6 py-2.5 rounded-lg font-medium transition">
          Cancel
        </button>
        <button className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  );
}
