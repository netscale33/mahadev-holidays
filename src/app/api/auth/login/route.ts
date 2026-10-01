import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';
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

    if (username === envUsername && password === envPassword) {
      const token = generateToken({ userId: username, email: username, role: 'super-admin' });
      return NextResponse.json({ token, user: { username, role: 'super-admin' } });
    }

    try {
      const db = getSupabaseAdmin();
      const { data: dbUser, error } = await db
        .from('users')
        .select('*')
        .or(`username.eq.${username},email.eq.${username}`)
        .maybeSingle();

      if (error || !dbUser) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const isValid = await comparePassword(password, String(dbUser.password));
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = generateToken({
        userId: String(dbUser.id),
        email: String(dbUser.email),
        role: String(dbUser.role),
      });

      const apiUser = toApiRow(dbUser as Record<string, unknown>);
      const { password: _omit, ...safeUser } = apiUser;

      return NextResponse.json({ token, user: safeUser });
    } catch {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
