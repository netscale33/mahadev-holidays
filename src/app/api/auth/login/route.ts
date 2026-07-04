import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken, comparePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    console.log('Login attempt:', { username, password, envUsername, envPassword, match: username === envUsername && password === envPassword });

    if (username === envUsername && password === envPassword) {
      const token = generateToken({ userId: username, email: username, role: 'super-admin' });
      return NextResponse.json({ token, user: { username, role: 'super-admin' } });
    }

    try {
      await connect();
      const dbUser = await User.findOne({
        $or: [{ username }, { email: username }],
      }).select('+password');

      if (!dbUser) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const isValid = await comparePassword(password, dbUser.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = generateToken({
        userId: dbUser._id.toString(),
        email: dbUser.email,
        role: dbUser.role,
      });

      return NextResponse.json({
        token,
        user: {
          id: dbUser._id,
          name: dbUser.name,
          email: dbUser.email,
          username: dbUser.username,
          role: dbUser.role,
          avatar: dbUser.avatar,
        },
      });
    } catch {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
