import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken, hashPassword } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

function stripPassword(row: Record<string, unknown>): Record<string, unknown> {
  const { password: _omit, ...rest } = row;
  return rest;
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('users')
      .select('id,name,email,username,role,avatar,created_at,updated_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json((data || []).map((u) => stripPassword(toApiRow(u as Record<string, unknown>))));
  } catch (error) {
    console.error('GET users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.username || !body.password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('users')
      .insert({
        name: body.name,
        email: String(body.email).toLowerCase(),
        username: body.username,
        password: await hashPassword(body.password),
        role: body.role || 'editor',
        avatar: body.avatar || null,
      })
      .select('id,name,email,username,role,avatar,created_at,updated_at')
      .single();

    if (error) {
      if (String(error.message || '').toLowerCase().includes('duplicate')) {
        return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json(stripPassword(toApiRow(data as Record<string, unknown>)), { status: 201 });
  } catch (error) {
    console.error('POST users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
