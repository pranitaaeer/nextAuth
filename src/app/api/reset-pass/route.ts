import { auth } from "@/app/lib/auth";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(request: NextRequest) {
    try {
        const userId = await auth(request)
        const user = await UserModel.findById(userId)

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }
        const { Newpassword } = await request.json()
        if (!Newpassword) {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(Newpassword, 10)
        user.password = hashedPassword
        await user.save()
        
        return NextResponse.json({ message: "Password reset successfully" })
    } catch (error) {
        return NextResponse.json({ error: 'error in reset password' }, { status: 500 });
    }
}