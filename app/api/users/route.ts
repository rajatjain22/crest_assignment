import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '../auth/user/route';
import User from '@/lib/models/User';

export async function GET(req: NextRequest) {
  try {
    const payload = await getUserFromToken(req);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestingUser = await User.findByPk(payload.id);
    if (!requestingUser || requestingUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await getUserFromToken(req);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await User.findByPk(payload.id);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {_id, userData:data} = await req.json();
    const userId = _id;

    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'company', 'role'];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(updateData)
    await user.update(updateData);

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const payload = await getUserFromToken(req);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only admin can delete users
  if (payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await user.destroy();

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}