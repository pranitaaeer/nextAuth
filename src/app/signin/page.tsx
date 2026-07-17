"use client";

import { useState } from "react";
import { loginUser } from "@/app/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
export default function LoginPage() {

  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false)

const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true)
  try {

    const response = await loginUser(formData);

    console.log(response);

    alert("Login successful");

    router.push("/");


  } catch (error: any) {

    console.log(error);


    // User email verified nahi hai
    if (error.response?.status === 403) {

      alert("Please verify your email first");

      router.push("/verifyemail");

      return;
    }


    alert(
      error.response?.data?.error || "Something went wrong"
    );

  }finally{
    setIsLoading(false)
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
           <Link href={"/forget-pass"}>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
           </Link>
          </div>


          {/* Login Button */}
           <Button
                      type="submit"
                      isLoading={isLoading}
                    >
                      Login
                    </Button>


        </form>


        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
         <Link href={"/signup"}>
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
         </Link>
        </p>


      </div>

    </div>
  );
}