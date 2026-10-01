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
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const db = getSupabaseAdmin();
    let query = db.from('destinations').select('*', { count: 'exact' });

    if (category && ['domestic', 'international', 'weekend'].includes(category)) {
      query = query.eq('category', category);
    }
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,location.ilike.%${search}%,description.ilike.%${search}%`
      );
    }
    if (featured === 'true') query = query.eq('is_featured', true);

    const from = (page - 1) * limit;
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    const destinations = (data || []).map(toApiRow);
    const total = count ?? destinations.length;

    return NextResponse.json({
      destinations,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET destinations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.title || !body.slug || !body.location || !body.description || !body.longDescription || !body.price || !body.duration || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data: existing } = await db
      .from('destinations')
      .select('id')
      .eq('slug', body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'A destination with this slug already exists' }, { status: 409 });
    }

    const { data, error } = await db
      .from('destinations')
      .insert(toTableRow('destinations', body))
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ destination: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST destinations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
