import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow, toTableRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const from = (page - 1) * limit;

    const db = getSupabaseAdmin();
    let query = db.from('media').select('*', { count: 'exact' });
    if (type && ['image', 'video'].includes(type)) query = query.eq('type', type);

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    const media = (data || []).map(toApiRow);
    const total = count ?? media.length;

    return NextResponse.json({
      media,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.url || !body.alt || !body.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['image', 'video'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid media type' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('media')
      .insert(toTableRow('media', body))
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ media: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
