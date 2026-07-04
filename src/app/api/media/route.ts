import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Media from '@/lib/models/Media';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filter: Record<string, unknown> = {};
    if (type && ['image', 'video'].includes(type)) filter.type = type;

    const skip = (page - 1) * limit;
    const [media, total] = await Promise.all([
      Media.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Media.countDocuments(filter),
    ]);

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

    await connect();
    const body = await request.json();

    if (!body.url || !body.alt || !body.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['image', 'video'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid media type' }, { status: 400 });
    }

    const media = await Media.create(body);
    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error('POST media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}