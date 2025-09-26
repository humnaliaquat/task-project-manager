import React, { useState, type ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "../assets/logo.jpg";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";
type LoginInfo = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();
      if (response.ok) {
        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        });
        handleSuccess(data.message || "Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleError(data.message || "Something went wrong");
      }
    } catch (error: any) {
      handleError(error.message || "Network error");
    }
  };
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
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
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="name"
                name="email"
                value={loginInfo.email}
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
                onChange={handleChange}
                value={loginInfo.password}
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
              Login
            </button>
          </form>

          {/* Switch to Login */}
          <p className="mt-4 text-left text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/register"
              className="text-violet-500 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Hero */}
      <div className="hidden md:flex flex-col items-center justify-center bg-violet-500 rounded-3xl m-5 text-white p-10">
        <h1 className="text-3xl lg:text-4xl font-medium mb-4 text-center">
          Manage Your Work Smarter
        </h1>
        <p className="text-base lg:text-lg text-center max-w-md">
          Organize your projects, track tasks, and boost productivity with our
          Task & Project Manager.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
