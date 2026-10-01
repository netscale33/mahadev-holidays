import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, toApiRow } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
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
    const db = getSupabaseAdmin();

    const { data: row } = await db.from('media').select('url').eq('id', id).maybeSingle();

    const { data, error } = await db
      .from('media')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Best-effort: also remove the file from the `media` storage bucket
    try {
      const url = String((row as { url?: string } | null)?.url || '');
      const marker = '/storage/v1/object/public/media/';
      const idx = url.indexOf(marker);
      if (idx !== -1) {
        const path = url.slice(idx + marker.length).split('?')[0];
        if (path) await db.storage.from('media').remove([path]);
      }
    } catch {
      // ignore storage cleanup errors
    }

    return NextResponse.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('DELETE media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
