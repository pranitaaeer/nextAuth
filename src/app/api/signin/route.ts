import connectDB from '@/app/lib/db'
import UserModel from '@/app/models/user'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmail } from '@/app/lib/mailer'

await connectDB()

export async function POST(request: NextRequest) {
    try {

        // get raw data from user
        const { identifiers, password } = await request.json()

        if (!identifiers || !password) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 })
        }

        const VerifyCode = Math.floor(100000 + Math.random() * 900000).toString();
       const VerifyCodeExpiry = new Date(Date.now() + 3600000);
       
        //  check user is already exist
        const UserWithUsername = await UserModel.findOne({ username: identifiers, isVerified: true })
        if (UserWithUsername) {
            return
        }

        const UserWithEmail = await UserModel.findOne({ email: identifiers })
        if (UserWithEmail && UserWithEmail.isVerified) {
            return
        } else {
            UserWithEmail!.verifyToken = VerifyCode
            UserWithEmail!.verifyTokenExpiry = VerifyCodeExpiry
            await UserWithEmail!.save()
        }

        
        //  compare password
        const comparePassword = await bcrypt.compare(password, UserWithEmail!.password)
        if (!comparePassword) {
            return NextResponse.json({ error: "invalid credentials" }, { status: 404 })
        }
        
        // assign token
        const token = jwt.sign({ id: UserWithEmail!._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        const response = NextResponse.json({ message: "login successful", token }, { status: 200 })
        //save into coookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
        })
       
        //send email with verification code
        await sendEmail({ email: UserWithEmail!.email, emailType: "VERIFY", userId: UserWithEmail!._id.toString() })

    } catch (err: any) {
        console.log("err in signin route", err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }



}
