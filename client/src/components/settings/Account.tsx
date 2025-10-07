import React, { useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="m-4 border border-gray-200 rounded-2xl p-6 bg-white space-y-10 shadow-sm">
      {/* Header */}
      <div className="">
        <p className="text-xl font-semibold text-gray-900">Account</p>
        <p className="text-sm text-gray-500">
          Update your personal information and security details.
        </p>
      </div>

      {/* Change Email Section */}
      <section className="space-y-4">
        <p className=" text-lg font-medium border-b border-gray-300 pb-2 text-gray-800">
          Change Email
        </p>

        <p className="text-gray-600">
          Your current email is{" "}
          <span className="font-medium">test@gmail.com</span>
        </p>

        <div className="flex flex-col sm:w-1/2">
          <label
            htmlFor="newemail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Email Address
          </label>
          <input
            type="email"
            id="newemail"
            name="newemail"
            placeholder="Enter new email..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500"
          />
        </div>
      </section>

      {/* Change Password Section */}
      <section className="space-y-5">
        <p className="text-lg font-medium border-b border-gray-300 pb-2 text-gray-800">
          Change Password
        </p>

        {/* Password Fields */}
        {[
          {
            label: "Current Password",
            state: showPassword,
            setState: setShowPassword,
            name: "currentpassword",
            placeholder: "Enter current password...",
          },
          {
            label: "New Password",
            state: showNewPassword,
            setState: setShowNewPassword,
            name: "newpassword",
            placeholder: "Enter new password...",
          },
          {
            label: "Confirm Password",
            state: showConfirmPassword,
            setState: setShowConfirmPassword,
            name: "confirmpassword",
            placeholder: "Re-enter new password...",
          },
        ].map((field, i) => (
          <div key={i} className="flex flex-col sm:w-1/2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.state ? "text" : "password"}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={() => field.setState((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {field.state ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Delete Account */}
      <section className="space-y-3">
        <p className=" font-medium border-b text-lg border-gray-300 pb-2 text-gray-800">
          Delete Account
        </p>
        <p className="text-gray-600">
          Once you delete your account, there's{" "}
          <span className="font-semibold text-red-500">no going back</span>.
          Please be certain.
        </p>
        <button
          type="button"
          className="flex items-center gap-2 text-red-600 hover:text-white border border-red-500 cursor-pointer hover:bg-red-500 transition rounded-lg px-4 py-2 font-medium w-fit"
        >
          <Trash2 size={16} />
          Delete your account
        </button>
      </section>

      {/* Footer Buttons */}
      <div className="pt-6 flex justify-end gap-3  border-gray-200">
        <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 px-6 py-2.5 cursor-pointer rounded-lg font-medium transition">
          Cancel
        </button>
        <button className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white px-6 py-2.5 rounded-lg cursor-pointer font-medium transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
