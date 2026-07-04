import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Booking from '@/lib/models/Booking';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/jsonDb';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    await connect();

    const filter: Record<string, unknown> = {};

    if (status && ['new', 'in-progress', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { destinationTitle: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Booking.countDocuments(filter),
    ]);

    return NextResponse.json({
      bookings,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.warn('MongoDB connection failed in GET bookings, falling back to local JSON DB:', error);

    const db = readDb();
    let bookingsList = db.bookings || [];

    if (status) {
      bookingsList = bookingsList.filter((b: any) => String(b.status).toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      bookingsList = bookingsList.filter((b: any) => 
        String(b.customerName || b.name).toLowerCase().includes(q) ||
        String(b.customerEmail || b.email).toLowerCase().includes(q) ||
        String(b.customerPhone || b.phone).toLowerCase().includes(q) ||
        String(b.destinationTitle).toLowerCase().includes(q)
      );
    }

    const total = bookingsList.length;
    const skip = (page - 1) * limit;
    const bookings = bookingsList.slice(skip, skip + limit);

    return NextResponse.json({
      bookings,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.destinationId || !body.destinationTitle || !body.packageType || !body.travelDate || !body.travelers || !body.totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
      await connect();
      const booking = await Booking.create(body);
      return NextResponse.json({ booking }, { status: 201 });
    } catch (dbError) {
      console.warn('MongoDB connection failed in POST booking, falling back to local JSON DB:', dbError);
      
      const db = readDb();
      if (!db.bookings) db.bookings = [];

      const booking = {
        ...body,
        id: `bk-${Date.now()}`,
        _id: `bk-${Date.now()}`,
        status: body.status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.bookings.unshift(booking);
      writeDb(db);

      return NextResponse.json({ booking }, { status: 201 });
    }
  } catch (error) {
    console.error('POST booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}