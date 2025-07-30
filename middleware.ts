import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/login', '/signup', '/api/auth/login', '/api/auth/signup'];
const ADMIN_PATHS = ['/users', '/api/user'];
const PROFILE_PATHS = ['/profile', '/api/auth/user'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_jwt_secret');

async function getUserFromToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    // Get JWT from cookie
    const token = req.cookies.get('token')?.value;
  const user = await getUserFromToken(token);
  console.log(user)
  // If not authenticated, redirect to login for protected routes
  if (!user) {
    if (ADMIN_PATHS.some(path => pathname.startsWith(path)) || PROFILE_PATHS.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }
  // If user is logged in and tries to access login/signup, redirect to home/profile
  if ((pathname === '/login' || pathname === '/signup') && user) {
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/users', req.url));
    } else {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }
  // If user is not admin and tries to access admin paths, redirect to profile
  if (user.role !== 'admin' && ADMIN_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }
  // If user is not user and tries to access profile paths, redirect to users
  if (user.role === 'admin' && PROFILE_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/users', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/users",
    "/api/:path*",
  ],
};