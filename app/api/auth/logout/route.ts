import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Clear the JWT cookie by setting it to empty and expired
  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Expire immediately
    path: '/',
  });
  return response;
}