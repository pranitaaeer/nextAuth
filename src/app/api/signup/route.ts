"use client"
import connectDB from '@/app/lib/db'
import UserModel from '@/app/models/user'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
await connectDB()
export default async function POST(request: NextRequest) {
    try {
        // get raw data from user
        //  check user is already exist
        //  hash password
        // assign token
        //save into coookies
        // signup new user


        const { username, email, password } = await request.json()

        if (!username || !email || !password) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 })
        }

        const existedUser = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        })

        if (existedUser) {
            return NextResponse.json({ error: "user already exists, please login" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        const response = NextResponse.json({ message: "signup successful", token }, { status: 201 })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
        })

    } catch (err: any) {
        console.log("err in signin route", err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }



}
