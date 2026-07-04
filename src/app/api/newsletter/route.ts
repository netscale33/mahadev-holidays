import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Newsletter from '@/lib/models/Newsletter';
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
    const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('GET newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return NextResponse.json({ message: 'Subscription reactivated', subscriber: existing });
      }
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
    }

    const subscriber = await Newsletter.create({ email });
    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (error) {
    console.error('POST newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}