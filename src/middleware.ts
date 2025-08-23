
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // This is a placeholder for actual auth check
  // In a real app, you'd check a session cookie or token
  const isAuthenticated = false; // Replace with real auth logic

  if (PROTECTED_ROUTES.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    // In a real app, you would verify a token from cookies
    // For this example, we'll just check for a simple cookie.
    const authCookie = request.cookies.get('firebase-auth-state');
    
    // A more robust check would involve verifying the token's validity
    if (!authCookie) {
         const loginUrl = new URL('/login', request.url)
         return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
