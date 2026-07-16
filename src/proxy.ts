import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname // apth nikalo

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
         //agar user public path pai hai aur token bhi hai toh apko kyu hi jana hai fhirse vha
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
         //agar apke pass token nahi hai aur ap private path pai ja rhe ho toh apko login page pai redirect karna chahiye
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

export const config = {
    matcher: ['/signin', '/signup', '/verify-code', '/reset-pass', '/forget-pass','/me'],
}