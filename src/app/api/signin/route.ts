import connectDB from "@/app/lib/db";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/app/lib/mailer";

await connectDB();

export async function POST(request: NextRequest) {
  try {

    const { identifiers, password } = await request.json();

    if (!identifiers || !password) {
      return NextResponse.json(
        { error: "all fields are required" },
        { status: 400 }
      );
    }


    // Find user by username or email
    const user = await UserModel.findOne({
      $or: [
        { username: identifiers },
        { email: identifiers }
      ]
    });


    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }


    // Compare password first
    const comparePassword = await bcrypt.compare(
      password,
      user.password
    );


    if (!comparePassword) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 }
      );
    }


    // If user is not verified, send verification code
    if (!user.isVerified) {

      const VerifyCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const VerifyCodeExpiry = new Date(
        Date.now() + 3600000
      );


      user.verifyToken = VerifyCode;
      user.verifyTokenExpiry = VerifyCodeExpiry;

      await user.save();


      await sendEmail({
        email: user.email,
        emailType: "VERIFY",
        userId: user._id.toString(),
        otp:VerifyCode
      });


      return NextResponse.json(
        {
          error: "Email not verified. Verification code sent."
        },
        { status: 403 }
      );
    }


    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d"
      }
    );


    const response = NextResponse.json(
      {
        message: "login successful",
        token
      },
      {
        status: 200
      }
    );


    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });


    return response;


  } catch (err: any) {

    console.log("err in signin route", err);

    return NextResponse.json(
      {
        error: err.message
      },
      {
        status: 500
      }
    );
  }
}