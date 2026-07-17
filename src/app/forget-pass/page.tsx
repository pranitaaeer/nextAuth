"use client";

import { useState } from "react";
import { forgotPassword } from "@/app/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../components/ui/Button";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleforgetPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await forgotPassword({ email })
      console.log(response)
      //user ko redirect krenge reset password page pai
      router.push("/reset-pass");
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your email to reset your password
        </p>


        <form className="space-y-5" onSubmit={handleforgetPass}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>


          {/* Button */}
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>

        </form>


        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link href={"/signin"}>
            <span className="text-blue-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>


      </div>

    </div>
  );
}