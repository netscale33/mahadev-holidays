import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow, toTableRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getSupabaseAdmin();
    const { data, error } = await db.from('contacts').select('*').eq('id', id).maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: toApiRow(data) });
  } catch (error) {
    console.error('GET contact message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
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

    const { data, error } = await db
      .from('contacts')
      .update(toTableRow('contacts', body))
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: toApiRow(data) });
  } catch (error) {
    console.error('PUT contact message error:', error);
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
      .from('contacts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('DELETE contact message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
