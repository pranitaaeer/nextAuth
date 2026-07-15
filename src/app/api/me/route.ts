import { auth } from "@/app/lib/auth";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export async function GET(request: NextRequest) {
  try {
    const userId=await auth(request)
  console.log("userId:",userId)
    const user=await UserModel.findById(userId)
    console.log("user",user)

    if(!user){
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
  return NextResponse.json({ user }, { status: 200 });
  }catch (error) {

    return NextResponse.json({ error: 'error in fetching userInfo' }, { status: 500 });
  } 
}
