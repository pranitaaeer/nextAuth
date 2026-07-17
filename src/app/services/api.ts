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
  const response = await api.post("/signin", data);
  return response.data;
};


// Verify Email
export const verifyEmail = async (data: {
  otp: string;
}) => {
  const response = await api.post("/verifyemail", data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (data: {
  email: string;
}) => {
  const response = await api.post("/forget-pass", data);
  return response.data;
};


// Reset Password
export const resetPassword = async (data: {
  Newpassword: string;
}) => {
  const response = await api.post("/reset-pass", data);
  return response.data;
};

//me
export const myInfo = async () => {
  const response = await api.get("/me");
  return response.data.user;
};