-- Mahadev Holidays — Supabase schema (all-in-one: DB + Auth tables + Storage)
-- Run this once in Supabase Dashboard → SQL Editor → New query → Paste → Run.
-- Storage bucket `media` is created below. Image uploads go via POST /api/upload.

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Destinations ─────────────────────────────────────────────────────────────
create table if not exists destinations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  location text not null,
  description text not null,
  long_description text not null default '',
  images text[] not null default '{}',
  price numeric not null,
  original_price numeric,
  duration text not null default '',
  itinerary jsonb not null default '[]',
  inclusions text[] not null default '{}',
  exclusions text[] not null default '{}',
  category text not null default 'domestic' check (category in ('domestic','international','weekend')),
  tags text[] not null default '{}',
  rating numeric not null default 0,
  review_count numeric not null default 0,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_popular boolean not null default false,
  seo_metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists destinations_category_idx on destinations (category);
create index if not exists destinations_featured_idx on destinations (is_featured);
create index if not exists destinations_popular_idx on destinations (is_popular);

-- ── Bookings ─────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  destination_id text not null,
  destination_title text not null,
  package_type text not null,
  travel_date timestamptz not null,
  travelers int not null check (travelers >= 1),
  special_requests text,
  status text not null default 'new'
    check (status in ('new','in-progress','confirmed','completed','cancelled')),
  total_price numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists bookings_email_idx on bookings (email);
create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_created_idx on bookings (created_at desc);

-- ── Testimonials ─────────────────────────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  avatar text,
  rating int not null check (rating >= 1 and rating <= 5),
  content text not null,
  destination_name text not null,
  is_approved boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists testimonials_approved_idx on testimonials (is_approved);
create index if not exists testimonials_featured_idx on testimonials (is_featured);

-- ── Blog posts ───────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text not null,
  author text not null,
  category text not null,
  tags text[] not null default '{}',
  published_at timestamptz,
  is_published boolean not null default false,
  seo_metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on blog_posts (is_published, published_at desc);
create index if not exists blog_posts_category_idx on blog_posts (category);

-- ── Users (admin panel accounts, bcrypt-hashed passwords) ────────────────────
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  username text not null unique,
  password text not null,
  role text not null default 'editor'
    check (role in ('super-admin','editor','manager')),
  avatar text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists users_email_idx on users (email);
create index if not exists users_username_idx on users (username);

-- ── Contacts ─────────────────────────────────────────────────────────────────
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists contacts_read_idx on contacts (is_read);
create index if not exists contacts_created_idx on contacts (created_at desc);

-- ── Media ────────────────────────────────────────────────────────────────────
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text not null,
  type text not null check (type in ('image','video')),
  size numeric,
  dimensions jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Newsletters ──────────────────────────────────────────────────────────────
create table if not exists newsletters (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists newsletters_active_idx on newsletters (is_active);

-- ── updated_at auto-touch ────────────────────────────────────────────────────
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_destinations_touch on destinations;
create trigger trg_destinations_touch before update on destinations
for each row execute function touch_updated_at();

drop trigger if exists trg_bookings_touch on bookings;
create trigger trg_bookings_touch before update on bookings
for each row execute function touch_updated_at();

drop trigger if exists trg_testimonials_touch on testimonials;
create trigger trg_testimonials_touch before update on testimonials
for each row execute function touch_updated_at();

drop trigger if exists trg_blog_posts_touch on blog_posts;
create trigger trg_blog_posts_touch before update on blog_posts
for each row execute function touch_updated_at();

drop trigger if exists trg_users_touch on users;
create trigger trg_users_touch before update on users
for each row execute function touch_updated_at();

drop trigger if exists trg_contacts_touch on contacts;
create trigger trg_contacts_touch before update on contacts
for each row execute function touch_updated_at();

drop trigger if exists trg_media_touch on media;
create trigger trg_media_touch before update on media
for each row execute function touch_updated_at();

drop trigger if exists trg_newsletters_touch on newsletters;
create trigger trg_newsletters_touch before update on newsletters
for each row execute function touch_updated_at();

-- ── Row Level Security (API uses service_role which bypasses RLS;
--    public read policies below allow direct anon reads if ever needed) ───────
alter table destinations enable row level security;
alter table bookings enable row level security;
alter table testimonials enable row level security;
alter table blog_posts enable row level security;
alter table users enable row level security;
alter table contacts enable row level security;
alter table media enable row level security;
alter table newsletters enable row level security;

drop policy if exists "public read destinations" on destinations;
create policy "public read destinations" on destinations for select using (true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials
for select using (is_approved = true);

drop policy if exists "public read blog" on blog_posts;
create policy "public read blog" on blog_posts
for select using (is_published = true);

drop policy if exists "public read media" on media;
create policy "public read media" on media for select using (true);

-- ── Storage bucket for admin uploads ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media bucket" on storage.objects;
create policy "public read media bucket" on storage.objects
for select using (bucket_id = 'media');

drop policy if exists "service role writes media bucket" on storage.objects;
create policy "service role writes media bucket" on storage.objects
for all using (bucket_id = 'media')
with check (bucket_id = 'media');
