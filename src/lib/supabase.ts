import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function missingEnv(): string[] {
  const missing: string[] = [];
  if (!SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!SUPABASE_ANON_KEY) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  return missing;
}

let adminClient: SupabaseClient | null = null;

/** Server-side client with service_role — bypasses RLS. Use ONLY in API routes. */
export function getSupabaseAdmin(): SupabaseClient {
  const missing = missingEnv();
  if (missing.length > 0) {
    throw new Error(`Missing Supabase env vars: ${missing.join(', ')}`);
  }
  if (!adminClient) {
    adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

/** Public client (anon key) — for public reads if ever needed client-side. */
export function getSupabasePublic(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase public env vars');
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Map a snake_case Supabase row to the camelCase API shape the frontend expects.
 *  Keeps both `id` and `_id` so old normalizeId logic keeps working. */
export function toApiRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camel = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    out[camel] = value;
  }
  if (out.id !== undefined) {
    out._id = out.id;
  }
  return out;
}

/** Map camelCase API payload back to snake_case for Supabase writes. */
export function toDbRow(payload: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key === 'id' || key === '_id' || key === 'createdAt' || key === 'updatedAt') continue;
    if (value === undefined) continue;
    const snake = key.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`);
    out[snake] = value;
  }
  return out;
}

/** Column allowlists — drops stray frontend-only keys (e.g. `type`, `image`)
 *  so Supabase never sees an unknown column. */
const TABLE_COLUMNS: Record<string, string[]> = {
  destinations: [
    'title', 'slug', 'location', 'description', 'long_description', 'images',
    'price', 'original_price', 'duration', 'itinerary', 'inclusions', 'exclusions',
    'category', 'tags', 'rating', 'review_count', 'is_available', 'is_featured',
    'is_popular', 'seo_metadata',
  ],
  bookings: [
    'name', 'email', 'phone', 'destination_id', 'destination_title', 'package_type',
    'travel_date', 'travelers', 'special_requests', 'status', 'total_price',
  ],
  testimonials: [
    'name', 'location', 'avatar', 'rating', 'content', 'destination_name',
    'is_approved', 'is_featured',
  ],
  blog_posts: [
    'title', 'slug', 'excerpt', 'content', 'cover_image', 'author', 'category',
    'tags', 'published_at', 'is_published', 'seo_metadata',
  ],
  contacts: ['name', 'email', 'phone', 'subject', 'message', 'is_read'],
  media: ['url', 'alt', 'type', 'size', 'dimensions'],
  newsletters: ['email', 'is_active'],
  users: ['name', 'email', 'username', 'password', 'role', 'avatar'],
};

/** toDbRow + drop any key that is not a real column of `table`. */
export function toTableRow(table: keyof typeof TABLE_COLUMNS, payload: Record<string, unknown>): Record<string, unknown> {
  const row = toDbRow(payload);
  const allowed = new Set(TABLE_COLUMNS[table]);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    if (allowed.has(key)) out[key] = value;
  }
  return out;
}
