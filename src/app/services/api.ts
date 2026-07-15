import api from "@/app/lib/axios";


// Signup API
export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/signup", data);
  return response.data;
};


// Login API
export const loginUser = async (data: {
  identifiers: string;
  password: string;
}) => {
  const response = await api.post("/login", data);
  return response.data;
};


// Verify Email
export const verifyEmail = async (data: {
  token: string;
}) => {
  const response = await api.post("/verify-email", data);
  return response.data;
};


// Forgot Password
export const forgotPassword = async (data: {
  email: string;
}) => {
  const response = await api.post("/forgot-password", data);
  return response.data;
};


// Reset Password
export const resetPassword = async (data: {
  Newpassword: string;
}) => {
  const response = await api.post("/reset-password", data);
  return response.data;
};