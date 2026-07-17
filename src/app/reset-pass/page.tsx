"use client";

import { useState } from "react";
import { resetPassword } from "../services/api";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function ResetPassword() {

  const [formData, setFormData] = useState({
    Newpassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
  setIsLoading(true)
    try {
      if (formData.Newpassword !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await resetPassword({ Newpassword: formData.Newpassword })
      console.log(response)
      //user ko redirect krenge signin page pai
      router.push("/signin");
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your new password
        </p>


        <form className="space-y-5" onSubmit={handleResetPassword}>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>

            <input
              type="password"
              name="Newpassword"
              value={formData.Newpassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>


          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>


          {/* Button */}
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Reset Password
          </Button>

        </form>

      </div>

    </div>
  );
}