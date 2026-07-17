"use client";

import { useState } from "react";
import { signupUser } from "@/app/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
            const response = await signupUser(formData);

            console.log(response);

            alert("Signup successful");
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

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Sign up to get started
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
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


                    {/* Button */}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                    >
                        Sign up
                    </Button>

                </form>


                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
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