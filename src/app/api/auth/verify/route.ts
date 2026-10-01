import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const envUsername = process.env.ADMIN_USERNAME;
    if (envUsername && payload.userId === envUsername) {
      return NextResponse.json({
        user: { username: envUsername, role: 'super-admin' },
      });
    }

    try {
      const db = getSupabaseAdmin();
      const { data: user, error } = await db
        .from('users')
        .select('id,name,email,username,role,avatar')
        .eq('id', payload.userId)
        .maybeSingle();

      if (error || !user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ user: toApiRow(user as Record<string, unknown>) });
    } catch {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
