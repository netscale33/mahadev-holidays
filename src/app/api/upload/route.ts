import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('Authorization') || undefined);
  if (!token) return false;
  return verifyToken(token) !== null;
}

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

/** POST /api/upload — admin uploads an image/video, stores it in Supabase
 *  Storage bucket `media`, returns a permanent public URL. Auth required. */
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided (field: file)' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }
    if (file.type && !ALLOWED.has(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase().slice(0, 8);
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await db.storage.from('media').upload(path, bytes, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

    if (error) throw error;

    const { data } = db.storage.from('media').getPublicUrl(path);

    return NextResponse.json(
      {
        url: data.publicUrl,
        path,
        type: file.type.startsWith('video') ? 'video' : 'image',
        size: file.size,
        alt: file.name.replace(/\.[^/.]+$/, ''),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
