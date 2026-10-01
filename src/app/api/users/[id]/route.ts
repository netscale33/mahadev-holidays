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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const db = getSupabaseAdmin();

    const patch: Record<string, unknown> = {};
    if (body.name !== undefined) patch.name = body.name;
    if (body.email !== undefined) patch.email = String(body.email).toLowerCase();
    if (body.username !== undefined) patch.username = body.username;
    if (body.role !== undefined) patch.role = body.role;
    if (body.avatar !== undefined) patch.avatar = body.avatar;
    if (body.password) patch.password = await hashPassword(body.password);

    const { data, error } = await db
      .from('users')
      .update(patch)
      .eq('id', id)
      .select('id,name,email,username,role,avatar,created_at,updated_at')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(stripPassword(toApiRow(data as Record<string, unknown>)));
  } catch (error) {
    console.error('PUT user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('users')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('DELETE user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
