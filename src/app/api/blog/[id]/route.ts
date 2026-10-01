import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow, toTableRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getSupabaseAdmin();

    let post = null;
    if (isUuid(id)) {
      const { data } = await db.from('blog_posts').select('*').eq('id', id).maybeSingle();
      post = data;
    }
    if (!post) {
      const { data } = await db.from('blog_posts').select('*').eq('slug', id).maybeSingle();
      post = data;
    }

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: toApiRow(post) });
  } catch (error) {
    console.error('GET blog post error:', error);
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
      .from('blog_posts')
      .update(toTableRow('blog_posts', body))
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: toApiRow(data) });
  } catch (error) {
    console.error('PUT blog post error:', error);
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
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('DELETE blog post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
