import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, company, phone } = await req.json();
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role, company, phone });
    // Generate JWT
    const token = jwt.sign(
      { id: user.get('id'), email: user.get('email'), role: user.get('role') },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    // Set JWT as cookie
    const response = NextResponse.json({ message: 'Signup successful', user: { id: user.get('id'), email: user.get('email'), role: user.get('role') } }, { status: 201 });
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
