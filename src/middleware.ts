import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req:NextRequest){
    const path = req.nextUrl.pathname;

    const isPublic = path === '/login' || path === '/signup'

    const token = req.cookies.get("user")?.value || ""
    if(isPublic && token){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login',req.nextUrl))
    }
}

export const config = {
    matcher : [
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup'
    ]
}