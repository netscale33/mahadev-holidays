import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Destination from '@/lib/models/Destination';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { readDb, saveDestination } from '@/lib/jsonDb';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  const payload = verifyToken(token);
  return payload !== null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    await connect();
    const filter: Record<string, unknown> = {};

    if (category && ['domestic', 'international', 'weekend'].includes(category)) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') filter.isFeatured = true;

    const skip = (page - 1) * limit;
    const [destinations, total] = await Promise.all([
      Destination.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Destination.countDocuments(filter),
    ]);

    return NextResponse.json({
      destinations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.warn('MongoDB connection failed in GET destinations, falling back to local JSON DB:', error);
    
    // Fallback to local JSON database
    const allLocal = readDb().destinations || [];
    let filtered = [...allLocal];

    if (category) {
      filtered = filtered.filter((d: any) => String(d.category).toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((d: any) => 
        String(d.title).toLowerCase().includes(q) || 
        String(d.location).toLowerCase().includes(q) || 
        String(d.description).toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      filtered = filtered.filter((d: any) => d.isFeatured === true);
    }

    const total = filtered.length;
    const skip = (page - 1) * limit;
    const destinations = filtered.slice(skip, skip + limit);

    return NextResponse.json({
      destinations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
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

    try {
      await connect();
      const existing = await Destination.findOne({ slug: body.slug });
      if (existing) {
        return NextResponse.json({ error: 'A destination with this slug already exists' }, { status: 409 });
      }

      const destination = await Destination.create(body);
      return NextResponse.json({ destination }, { status: 201 });
    } catch (dbError) {
      console.warn('MongoDB connection failed in POST destination, falling back to local JSON DB:', dbError);
      
      const allLocal = readDb().destinations || [];
      const existing = allLocal.find((d: any) => d.slug === body.slug);
      if (existing) {
        return NextResponse.json({ error: 'A destination with this slug already exists' }, { status: 409 });
      }

      const newId = String(Date.now());
      const destination = {
        ...body,
        id: newId,
        _id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      saveDestination(destination);
      return NextResponse.json({ destination }, { status: 201 });
    }
  } catch (error) {
    console.error('POST destinations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}