import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname;


    const isPublicPath =
        path === "/signin" ||
        path === "/signup" ||
        path === "/verifyemail" ||
        path === "/forgot-pass" 
        path === "/reset-pass";


    const token = request.cookies.get("token")?.value;


    // user logged in hai aur login/signup pages open kar raha hai
    // if (isPublicPath && token) {
    //     return NextResponse.redirect(
    //         new URL("/", request.url)
    //     );
    // }


    // user logged in nahi hai aur protected route open kar raha hai
    if (!isPublicPath && !token) {
        return NextResponse.redirect(
            new URL("/signin", request.url)
        );
    }


    return NextResponse.next();
}



export const config = {
    matcher: [
        "/signin",
        "/signup",
        "/verifyemail",
        "/forgot-pass",
        "/reset-pass",
        "/",
    ],
};