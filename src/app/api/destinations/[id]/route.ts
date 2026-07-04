import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Destination from '@/lib/models/Destination';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { readDb, saveDestination, deleteDestination } from '@/lib/jsonDb';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connect();

    const destination = await Destination.findOne({
      $or: [{ _id: id }, { slug: id }],
    });

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ destination });
  } catch (error) {
    console.warn('MongoDB connection failed in GET destination details, falling back to local JSON DB:', error);
    
    const allLocal = readDb().destinations || [];
    const destination = allLocal.find((d: any) => String(d.id) === String(id) || d.slug === id);
    
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ destination });
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

    try {
      await connect();
      const destination = await Destination.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }

      return NextResponse.json({ destination });
    } catch (dbError) {
      console.warn('MongoDB connection failed in PUT destination, falling back to local JSON DB:', dbError);
      
      const allLocal = readDb().destinations || [];
      const index = allLocal.findIndex((d: any) => String(d.id) === String(id));
      if (index === -1) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }

      const destination = {
        ...allLocal[index],
        ...body,
        id,
        _id: id,
        updatedAt: new Date().toISOString()
      };

      saveDestination(destination);
      return NextResponse.json({ destination });
    }
  } catch (error) {
    console.error('PUT destination error:', error);
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

    try {
      await connect();
      const destination = await Destination.findByIdAndDelete(id);
      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Destination deleted successfully' });
    } catch (dbError) {
      console.warn('MongoDB connection failed in DELETE destination, falling back to local JSON DB:', dbError);
      
      const allLocal = readDb().destinations || [];
      const exists = allLocal.some((d: any) => String(d.id) === String(id));
      if (!exists) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }

      deleteDestination(id);
      return NextResponse.json({ message: 'Destination deleted successfully' });
    }
  } catch (error) {
    console.error('DELETE destination error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}