"use client";

import { useState } from "react";
import { loginUser } from "@/app/services/api";
export default function LoginPage() {

  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log(response);

      alert("login successful");

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.error || "Something went wrong"
      );

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>


        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Username / Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>

            <input
              type="text"
              name="identifiers"
              value={formData.identifiers}
              onChange={handleChange}
              placeholder="Enter username or email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Forgot Password */}
          <div className="flex justify-end">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>


        </form>


        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>


      </div>

    </div>
  );
}