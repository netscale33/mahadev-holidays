import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';
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

    const db = getSupabaseAdmin();
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString();

    const [
      bookingsCount,
      destinationsCount,
      testimonialsApproved,
      blogPublished,
      messagesCount,
      recent,
      newThisYear,
      popular,
      trends,
    ] = await Promise.all([
      db.from('bookings').select('id', { count: 'exact', head: true }),
      db.from('destinations').select('id', { count: 'exact', head: true }),
      db.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_approved', true),
      db.from('blog_posts').select('id', { count: 'exact', head: true }).eq('is_published', true),
      db.from('contacts').select('id', { count: 'exact', head: true }),
      db.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
      db.from('bookings').select('id', { count: 'exact', head: true }).gte('created_at', startOfYear),
      db.from('bookings').select('destination_title'),
      db.from('bookings').select('created_at,total_price').gte('created_at', sixMonthsAgo),
    ]);

    if (
      bookingsCount.error || destinationsCount.error || testimonialsApproved.error ||
      blogPublished.error || messagesCount.error || recent.error ||
      newThisYear.error || popular.error || trends.error
    ) {
      throw (
        bookingsCount.error || destinationsCount.error || testimonialsApproved.error ||
        blogPublished.error || messagesCount.error || recent.error ||
        newThisYear.error || popular.error || trends.error
      );
    }

    const group: Record<string, number> = {};
    for (const b of popular.data || []) {
      const title = String((b as { destination_title?: string }).destination_title || 'Unknown');
      group[title] = (group[title] || 0) + 1;
    }
    const popularDestinations = Object.entries(group)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const monthMap = new Map<string, { year: number; month: number; count: number; revenue: number }>();
    for (const b of trends.data || []) {
      const row = b as { created_at?: string; total_price?: number };
      const d = new Date(row.created_at || '');
      if (Number.isNaN(d.getTime())) continue;
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const entry = monthMap.get(key) || { year: d.getFullYear(), month: d.getMonth() + 1, count: 0, revenue: 0 };
      entry.count += 1;
      entry.revenue += Number(row.total_price || 0);
      monthMap.set(key, entry);
    }
    const monthlyTrends = [...monthMap.values()].sort((a, b) =>
      a.year === b.year ? a.month - b.month : a.year - b.year
    );

    return NextResponse.json({
      stats: {
        totalBookings: bookingsCount.count ?? 0,
        totalDestinations: destinationsCount.count ?? 0,
        totalTestimonials: testimonialsApproved.count ?? 0,
        totalBlogPosts: blogPublished.count ?? 0,
        totalMessages: messagesCount.count ?? 0,
        newBookingsThisYear: newThisYear.count ?? 0,
      },
      recentBookings: (recent.data || []).map(toApiRow),
      popularDestinations,
      monthlyTrends,
    });
  } catch (error) {
    console.error('GET stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
