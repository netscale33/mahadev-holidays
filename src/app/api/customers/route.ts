import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Booking from '@/lib/models/Booking';
import Contact from '@/lib/models/Contact';
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

    await connect();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const exportCsv = searchParams.get('export') === 'csv';

    const [bookingCustomers, contactCustomers] = await Promise.all([
      Booking.find().select('name email phone createdAt').lean(),
      Contact.find().select('name email phone createdAt').lean(),
    ]);

    const emailMap = new Map<string, {
      name: string;
      email: string;
      phone: string;
      firstContact: Date;
      bookingCount: number;
      messageCount: number;
    }>();

    for (const b of bookingCustomers) {
      const key = b.email.toLowerCase();
      const existing = emailMap.get(key);
      if (existing) {
        existing.bookingCount++;
        if (new Date(b.createdAt) < new Date(existing.firstContact)) {
          existing.firstContact = b.createdAt;
        }
      } else {
        emailMap.set(key, {
          name: b.name,
          email: b.email,
          phone: b.phone || '',
          firstContact: b.createdAt,
          bookingCount: 1,
          messageCount: 0,
        });
      }
    }

    for (const c of contactCustomers) {
      const key = c.email.toLowerCase();
      const existing = emailMap.get(key);
      if (existing) {
        existing.messageCount++;
        if (c.createdAt && new Date(c.createdAt) < new Date(existing.firstContact)) {
          existing.firstContact = c.createdAt;
        }
      } else {
        emailMap.set(key, {
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          firstContact: c.createdAt,
          bookingCount: 0,
          messageCount: 1,
        });
      }
    }

    let customers = Array.from(emailMap.values()).sort(
      (a, b) => new Date(b.firstContact).getTime() - new Date(a.firstContact).getTime()
    );

    if (search) {
      const s = search.toLowerCase();
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          c.phone.includes(s)
      );
    }

    if (exportCsv) {
      const header = 'Name,Email,Phone,First Contact,Bookings,Messages\n';
      const rows = customers
        .map(
          (c) =>
            `"${c.name}","${c.email}","${c.phone}","${c.firstContact.toISOString().split('T')[0]}",${c.bookingCount},${c.messageCount}`
        )
        .join('\n');

      return new NextResponse(header + rows, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="customers.csv"',
        },
      });
    }

    return NextResponse.json({ customers, total: customers.length });
  } catch (error) {
    console.error('GET customers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}