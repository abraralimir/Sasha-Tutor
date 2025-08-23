
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const PROTECTED_ROUTES = ['/admin'];
// const ADMIN_EMAIL = 'abrar@sashaspath.com';

export async function middleware(request: NextRequest) {
  // Temporarily disabling auth as requested.
  // The original logic is commented out below for future reference.
  return NextResponse.next();

  /*
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(path => pathname.startsWith(path));
  
  if (isProtectedRoute && pathname !== '/admin/login') {
    const loginUrl = new URL('/admin/login', request.url);
    const authCookie = request.cookies.get('firebase-auth-state');

    if (!authCookie) {
         return NextResponse.redirect(loginUrl);
    }
    
    try {
        const user = JSON.parse(authCookie.value);
        if (user?.email !== ADMIN_EMAIL) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (error) {
        return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ['/admin/:path*'],
};
