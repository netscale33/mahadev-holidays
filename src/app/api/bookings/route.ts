import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow, toTableRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

const VALID_STATUS = ['new', 'in-progress', 'confirmed', 'completed', 'cancelled'];

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const db = getSupabaseAdmin();
    let query = db.from('bookings').select('*', { count: 'exact' });

    if (status && VALID_STATUS.includes(status)) query = query.eq('status', status);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,destination_title.ilike.%${search}%`
      );
    }

    const from = (page - 1) * limit;
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    const bookings = (data || []).map(toApiRow);
    const total = count ?? bookings.length;

    return NextResponse.json({
      bookings,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET bookings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.destinationId || !body.destinationTitle || !body.packageType || !body.travelDate || !body.travelers || !body.totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('bookings')
      .insert({ ...toTableRow('bookings', body), status: body.status || 'new' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: toApiRow(data) }, { status: 201 });
  } catch (error) {
    console.error('POST booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
