
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

const PROTECTED_ROUTES = ['/admin'];
const ADMIN_EMAIL = 'abrar@sashaspath.com';

async function verifyToken(token: string): Promise<DecodedIdToken | null> {
    // This part requires firebase-admin setup on the server, 
    // which is not possible in this environment.
    // For this prototype, we'll simulate a token check by looking at the email claim.
    // IN A REAL APP: Use `auth.verifyIdToken(token)`
    try {
        // Super simplified "decode" for prototype purposes.
        const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return decodedToken as DecodedIdToken;
    } catch (e) {
        return null;
    }
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (PROTECTED_ROUTES.some(path => pathname.startsWith(path))) {
    const loginUrl = new URL('/login', request.url);
    const authCookie = request.cookies.get('firebase-auth-state');

    if (!authCookie) {
         return NextResponse.redirect(loginUrl);
    }
    
    // In a real app, you would verify the token against Firebase Admin SDK
    // For this prototype, we will just check the email on the client-side decoded user object
    try {
        const user = JSON.parse(authCookie.value);
        if (user?.email !== ADMIN_EMAIL) {
            // Redirect non-admin users away from admin pages
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (error) {
        // If cookie is malformed, redirect to login
        return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
