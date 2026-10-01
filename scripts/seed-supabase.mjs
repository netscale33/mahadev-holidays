// One-time seed: inserts the existing static catalog (same 10 destinations the
// site already shows) into Supabase. Safe to re-run (upserts by slug).
// Usage: node scripts/seed-supabase.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadEnv() {
  const env = {};
  const raw = fs.readFileSync(path.join(root, '.env.local'), 'utf-8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const env = loadEnv();
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const local = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'db_local.json'), 'utf-8'));
const items = local.destinations || [];

let ok = 0;
for (const d of items) {
  const row = {
    title: d.title,
    slug: d.slug,
    location: d.location,
    description: d.description || '',
    long_description: d.longDescription || d.description || '',
    images: d.image ? [d.image] : (d.images || []),
    price: d.price,
    duration: d.duration || '',
    itinerary: d.itinerary || [],
    inclusions: d.inclusions || [],
    exclusions: d.exclusions || [],
    category: String(d.category || 'domestic').toLowerCase(),
    tags: d.tags || [],
    rating: d.rating || 0,
    review_count: d.reviewCount || 0,
    is_available: d.isAvailable ?? true,
    is_featured: d.isFeatured ?? false,
    is_popular: false,
    seo_metadata: {},
  };
  const { error } = await db.from('destinations').upsert(row, { onConflict: 'slug' });
  if (error) {
    console.error('FAIL', d.slug, error.message);
  } else {
    ok++;
    console.log('OK', d.slug);
  }
}
console.log(`Seeded ${ok}/${items.length} destinations`);
