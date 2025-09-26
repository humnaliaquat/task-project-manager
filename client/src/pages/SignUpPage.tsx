import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "../assets/logo.jpg";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";
type SignUpInfo = {
  email: string;
  password: string;
  name: string;
};
export default function SignUp() {
  const [signupInfo, setSignUpInfo] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }

    try {
      const url = "http://localhost:3000/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(data.message || "Something went wrong");
      }
    } catch (error: any) {
      handleError(error.message || "Network error");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("signupInfo -> ", signupInfo);
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
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoFocus
                value={signupInfo.name}
                onChange={handleChange}
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
                name="email"
                id="email"
                value={signupInfo.email}
                onChange={handleChange}
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
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
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
      <ToastContainer />
    </div>
  );
}
