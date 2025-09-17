import React from "react";
import Image from "../assets/logo.jpg";

export default function SignUp() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center px-6 py-3 sm:px-10 lg:px-16">
        <div className="w-full max-w-md rounded-2xl">
          {/* Logo + Title */}
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-violet-600">Planora</h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Get Started Now
          </h2>
          <p className="text-gray-500 mb-5 text-sm sm:text-base">
            Enter your details to create your account
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer text-sm sm:text-base">
              Sign up with Google
            </button>
            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer text-sm sm:text-base">
              Sign up with Facebook
            </button>
          </div>

          <div className="text-center text-gray-400 text-sm mb-3">or</div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 accent-violet-500 cursor-pointer"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-violet-500 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit */}
            <button className="w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition cursor-pointer text-sm sm:text-base">
              Sign Up
            </button>
          </form>

          {/* Switch to Login */}
          <p className="mt-4 text-left text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-violet-500 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Hero */}
      <div className="hidden md:flex flex-col items-center justify-center bg-violet-500 rounded-3xl m-5 text-white p-10">
        <h1 className="text-3xl lg:text-4xl font-medium mb-4 text-center">
          Manage tasks with ease
        </h1>
        <p className="text-base lg:text-lg text-center max-w-md">
          Planora helps you stay productive, whether you’re a freelancer,
          agency, or part of a team.
        </p>
      </div>
    </div>
  );
}
