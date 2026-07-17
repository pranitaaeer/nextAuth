import nodemailer from "nodemailer";
import UserModel from "../models/user";

export interface EmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
  otp: string;
}


export const sendEmail = async ({
  email,
  emailType,
  userId,
  otp
}: EmailProps) => {

  try {

    if (emailType === "VERIFY") {

      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: otp,
        verifyTokenExpiry: Date.now() + 3600000,
      });

    } 
    else if (emailType === "RESET") {

      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: otp,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
     
    }
const resetUrl = `${process.env.DOMAIN}/reset-pass`;

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

    });


    const emailData = {
  from: process.env.EMAIL,
  to: email,

  subject:
    emailType === "VERIFY"
      ? "Verify your Email"
      : "Reset Your Password",

  html:
    emailType === "VERIFY"
      ? `
        <div style="font-family: Arial;">
          <h2>Email Verification</h2>

          <p>Your OTP code is:</p>

          <h1 style="letter-spacing:5px;">
            ${otp}
          </h1>

          <p>This OTP will expire in 1 hour.</p>
        </div>
      `
      : `
        <div style="font-family: Arial;">
          <h2>Reset Your Password</h2>

          <p>Click the button below to reset your password.</p>

          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            Or copy this link:
          </p>

          <p>${resetUrl}</p>

          <p>This link will expire in 1 hour.</p>
        </div>
      `,
};


    const response = await transporter.sendMail(emailData);

    console.log("Email sent:", response.messageId);

    return response;


  } catch(error:any){

    console.log("Email error:", error);

    throw new Error(error.message);

  }
};