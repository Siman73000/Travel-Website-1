-- Run this in Supabase SQL editor (adjust as desired)

-- 1) Profiles (roles)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'editor', -- 'admin' or 'editor'
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read/create their own profile row (but cannot escalate role).
create policy "profiles_select_own" on public.profiles
for select to authenticated
using (id = auth.uid());

create policy "profiles_insert_own" on public.profiles
for insert to authenticated
with check (id = auth.uid());

-- 2) Locations
create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text not null,
  country text,
  blurb text,
  highlights text[] default '{}'::text[],
  featured boolean default false,
  sort int default 100,
  created_at timestamptz not null default now()
);

alter table public.locations enable row level security;

-- Public can read locations
create policy "locations_select_public" on public.locations
for select to anon, authenticated
using (true);

-- Only admins can insert/update/delete locations
create policy "locations_insert_admin" on public.locations
for insert to authenticated
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "locations_update_admin" on public.locations
for update to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "locations_delete_admin" on public.locations
for delete to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 3) Storage bucket policies for photos
-- Create a public bucket named: photos
-- Then set policies on storage.objects:

-- Public read
create policy "photos_public_read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'photos');

-- Authenticated upload
create policy "photos_auth_insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'photos');

-- Optional: only admins can delete
create policy "photos_admin_delete" on storage.objects
for delete to authenticated
using (
  bucket_id = 'photos'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
