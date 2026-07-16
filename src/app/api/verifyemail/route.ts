import connectDB from "@/app/lib/db";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";


await connectDB();

export async function POST(request: NextRequest) {
  try {
    const { otp } = await request.json();

    if (!otp) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    const user=await UserModel.findOne({ verifyToken: otp, verifyTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    
    await user.save();
    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) { 
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });   
  }
}