import { auth } from "@/app/lib/auth";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const userId=await auth(request)

    const user=await UserModel.findById(userId).select("-password -__v -createdAt -updatedAt")
    if(!user){
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
  return NextResponse.json({ user }, { status: 200 });
  }catch (error) {

    return NextResponse.json({ error: 'error in fetching userInfo' }, { status: 500 });
  } 
}
