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
        //  compare password
        // assign token
        //save into coookies
        // login new user


        const { identifiers, password } = await request.json()

        if (!identifiers || password) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 })
        }

        const existedUser = await UserModel.findOne({
            $or: [{ username: identifiers }, { email: identifiers }]
        })

        if (!existedUser) {
            return NextResponse.json({ error: "invalid credentials,please signup" }, { status: 404 })
        }

        const comparePassword = await bcrypt.compare(password, existedUser.password)

        if (!comparePassword) {
            return NextResponse.json({ error: "invalid credentials" }, { status: 404 })
        }

        const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        const response = NextResponse.json({ message: "login successful", token }, { status: 200 })

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
