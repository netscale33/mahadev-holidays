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
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const from = (page - 1) * limit;

    const db = getSupabaseAdmin();
    let query = db.from('blog_posts').select('*', { count: 'exact' });

    if (category) query = query.eq('category', category);
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`
      );
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    const posts = (data || []).map(toApiRow);
    const total = count ?? posts.length;

    return NextResponse.json({
      posts,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.title || !body.slug || !body.excerpt || !body.content || !body.coverImage || !body.author || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data: existing } = await db
      .from('blog_posts')
      .select('id')
      .eq('slug', body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    const { data, error } = await db
      .from('blog_posts')
      .insert(toTableRow('blog_posts', body))
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ post: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
