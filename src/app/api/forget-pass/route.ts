import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/models/user";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/mailer";

await connectDB();

export async function POST(request: NextRequest) {
  try {

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate token
    const forgotPasswordToken = crypto.randomBytes(32).toString("hex");

    // Save token
    user.forgotPasswordToken = forgotPasswordToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 1000 * 60 * 30);

    await user.save();
 
    // Send email
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id.toString() ,
    });

    return NextResponse.json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}