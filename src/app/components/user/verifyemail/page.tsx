"use client";

import { useState } from "react";

export default function VerifyEmail() {

  const [token, setToken] = useState("");


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Verify Email
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the verification code sent to your email
        </p>


        <form className="space-y-5">

          {/* Verification Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>

            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter 6 digit code"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-center tracking-widest text-lg focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Verify Email
          </button>


        </form>


        <p className="text-center text-sm text-gray-500 mt-6">
          Didn't receive code?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Resend
          </span>
        </p>


      </div>

    </div>
  );
}