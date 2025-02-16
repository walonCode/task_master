import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";


const protectedPaths = ['/dashboard', '/profile', '/task', '/project'];

export async function middleware(request: NextRequest) {
  const isProtectedRoute = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    console.log(isUserAuthenticated)

    if (!isUserAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard', 
    '/profile',  
    '/project/:path*',
    '/task/:path*'
],
};
