import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow, toTableRow } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');

    const db = getSupabaseAdmin();
    let query = db.from('testimonials').select('*');
    if (approved === 'true') query = query.eq('is_approved', true);
    else if (approved === 'false') query = query.eq('is_approved', false);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;

    return NextResponse.json({ testimonials: (data || []).map(toApiRow) });
  } catch (error) {
    console.error('GET testimonials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.location || !body.rating || !body.content || !body.destinationName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('testimonials')
      .insert(toTableRow('testimonials', body))
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ testimonial: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST testimonial error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
