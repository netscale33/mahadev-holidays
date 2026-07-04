import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';

export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');

    const filter: Record<string, unknown> = {};
    if (approved === 'true') filter.isApproved = true;
    else if (approved === 'false') filter.isApproved = false;

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('GET testimonials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();

    if (!body.name || !body.location || !body.rating || !body.content || !body.destinationName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('POST testimonial error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}