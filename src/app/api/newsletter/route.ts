import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('newsletters')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ subscribers: (data || []).map(toApiRow) });
  } catch (error) {
    console.error('GET newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const normalized = email.toLowerCase();

    const { data: existing } = await db
      .from('newsletters')
      .select('*')
      .eq('email', normalized)
      .maybeSingle();

    if (existing) {
      if (!existing.is_active) {
        const { data, error } = await db
          .from('newsletters')
          .update({ is_active: true })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ message: 'Subscription reactivated', subscriber: toApiRow(data) });
      }
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
    }

    const { data, error } = await db
      .from('newsletters')
      .insert({ email: normalized })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ subscriber: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
