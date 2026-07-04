import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Booking from '@/lib/models/Booking';
import Destination from '@/lib/models/Destination';
import Testimonial from '@/lib/models/Testimonial';
import Blog from '@/lib/models/Blog';
import Contact from '@/lib/models/Contact';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { readDb } from '@/lib/jsonDb';

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

    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    try {
      await connect();

      const [
        totalBookings,
        totalDestinations,
        totalTestimonials,
        totalBlogPosts,
        totalMessages,
        recentBookings,
      ] = await Promise.all([
        Booking.countDocuments(),
        Destination.countDocuments(),
        Testimonial.countDocuments({ isApproved: true }),
        Blog.countDocuments({ isPublished: true }),
        Contact.countDocuments(),
        Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

      const popularDestinations = await Booking.aggregate([
        { $group: { _id: '$destinationTitle', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);

      const newBookingsThisYear = await Booking.countDocuments({
        createdAt: { $gte: startOfYear },
      });

      const monthlyTrends = await Booking.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
            revenue: { $sum: '$totalPrice' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);

      return NextResponse.json({
        stats: {
          totalBookings,
          totalDestinations,
          totalTestimonials,
          totalBlogPosts,
          totalMessages,
          newBookingsThisYear,
        },
        recentBookings,
        popularDestinations,
        monthlyTrends: monthlyTrends.map((t) => ({
          year: t._id.year,
          month: t._id.month,
          count: t.count,
          revenue: t.revenue,
        })),
      });
    } catch (dbError) {
      console.warn('MongoDB connection failed in GET stats, falling back to local JSON DB:', dbError);
      
      const db = readDb();
      const destinationsList = db.destinations || [];
      const bookingsList = db.bookings || [];
      const testimonialsList = db.testimonials || [];
      const contactsList = db.contacts || [];
      const blogsList = db.blogs || [];

      const totalBookings = bookingsList.length;
      const totalDestinations = destinationsList.length;
      const totalTestimonials = testimonialsList.length;
      const totalBlogPosts = blogsList.length;
      const totalMessages = contactsList.length;

      const recentBookings = [...bookingsList]
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      const popularDestinations: any[] = [];
      const groupDest: Record<string, number> = {};
      bookingsList.forEach((b: any) => {
        const title = b.destinationTitle || 'Unknown';
        groupDest[title] = (groupDest[title] || 0) + 1;
      });
      Object.keys(groupDest).forEach((title) => {
        popularDestinations.push({ _id: title, count: groupDest[title] });
      });
      popularDestinations.sort((a, b) => b.count - a.count);

      const newBookingsThisYear = bookingsList.filter((b: any) => 
        new Date(b.createdAt).getTime() >= startOfYear.getTime()
      ).length;

      return NextResponse.json({
        stats: {
          totalBookings,
          totalDestinations,
          totalTestimonials,
          totalBlogPosts,
          totalMessages,
          newBookingsThisYear,
        },
        recentBookings,
        popularDestinations: popularDestinations.slice(0, 5),
        monthlyTrends: [],
      });
    }
  } catch (error) {
    console.error('GET stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}