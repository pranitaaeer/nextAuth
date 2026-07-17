"use client";

import { useState } from "react";
import { verifyEmail } from "@/app/services/api";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
export default function VerifyEmail() {

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await verifyEmail({ otp });

      console.log(response);

      alert("user verified successful");
      router.push("/signin");
    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.error || "Something went wrong"
      );

    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Verify Email
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the verification code sent to your email
        </p>


        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Verification Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6 digit code"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-center tracking-widest text-lg focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Button */}
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Verify Email
          </Button>


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