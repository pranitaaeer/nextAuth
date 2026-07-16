"use client";

import { User } from "@/app/models/user";
import { myInfo } from "@/app/services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user,setUser]=useState<User>()

  const getUser = async () => {
    try {
      const data = await myInfo();
      setUser(data);
      console.log("data:",data)
    } catch (error) {
      console.log(error);
    }
  };
    useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden relative">

      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse top-10 left-10"></div>

      <div className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-bounce bottom-10 right-10"></div>


      {/* Dashboard Card */}
      <div className="relative z-10 w-full max-w-xl mx-5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-10 text-center shadow-2xl animate-fadeIn">


        {/* Avatar */}
        <div className="mx-auto w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-lg animate-bounce">
          👋
        </div>


        <h1 className="mt-8 text-4xl font-bold text-white">
          Welcome Back, {user?.username || "User"} 🎉
        </h1>


        <p className="mt-4 text-lg text-white/90">
          We are happy to see you again.
        </p>


        <p className="mt-2 text-white/80">
          Explore your dashboard and manage your account easily.
        </p>


        {/* User Info */}
        <div className="mt-8 bg-white/20 rounded-2xl p-5 text-white">

          <h2 className="text-xl font-semibold">
            User Dashboard
          </h2>

          <p className="mt-2 text-sm">
            Your profile and activities will appear here.
          </p>

        </div>


        {/* Button */}
        <button
          className="mt-8 px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          Get Started 🚀
        </button>


      </div>

    </div>
  );
}