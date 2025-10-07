import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="m-4 border border-gray-200 rounded-2xl p-6 bg-white space-y-6">
      {/* Title */}
      <div>
        <p className="text-xl font-semibold text-gray-900">Profile</p>
        <p className="text-sm text-gray-500">
          Update your personal information and profile details
        </p>
      </div>

      {/* Profile photo */}
      <div className="flex items-center gap-4 ">
        <span className="w-24 h-24 bg-violet-500 border-4 border-white rounded-full shadow-md flex items-center justify-center text-white text-xl font-semibold">
          HL
        </span>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="bg-violet-500 hover:bg-violet-600 px-3 py-1.5 rounded text-white text-sm transition cursor-pointer"
          >
            Change Picture
          </button>
          <button
            type="button"
            className="border cursor-pointer border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded text-sm transition"
          >
            Delete Picture
          </button>
        </div>
      </div>

      {/* Details grid */}
      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-800"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="Hamna"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 "
          />{" "}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Liaquat"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 "
          />
        </div>

        {/* ✉️ Email field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none  focus:border-violet-500"
          />
        </div>

        {/* 🔒 Password field */}
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="new-password"
              autoComplete="new-password"
              placeholder="•••••••"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-nonefocus:border-violet-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer hover:text-violet-500"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Profession
          </label>
          <input
            type="text"
            id="role"
            name="role"
            autoComplete="off"
            placeholder="Full Stack Developer"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          placeholder="Write something about yourself..."
          className="border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-violet-500"
        ></textarea>
      </div>

      {/* Save and cancel buttons */}
      <div className="pt-2 flex justify-end gap-3">
        <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100  cursor-pointer px-6 py-2.5 rounded-lg font-medium transition">
          Cancel
        </button>
        <button className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-lg cursor-pointer font-medium transition">
          Save Changes
        </button>
      </div>
    </form>
  );
}
