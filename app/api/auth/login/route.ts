import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.get('password') as string);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = jwt.sign(
      { id: user.get('id'), email: user.get('email'), role: user.get('role') },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    const response = NextResponse.json({ message: 'Login successful', user: { id: user.get('id'), email: user.get('email'), role: user.get('role') } }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}