# Wanderlog

A colorful travel journal built with Next.js + Tailwind, designed to be easy for non-technical visitors.

## Local dev

```bash
npm install
npm run dev
```

## Images (local fallback)

If you **aren’t** using Supabase yet, put photos here:

```
public/photos/<place-slug>/
```

Then run:

```bash
npm run photos
npm run dev
```

## Multi-user login + uploads (recommended)

Because GitHub Pages is static hosting, logins and photo uploads require a hosted backend.
This project supports **Supabase** for:

- Email login (magic link)
- Multi-user access
- Photo uploads to Storage
- Places stored in Postgres (shows up on the site immediately)

### 1) Create Supabase project
Create a Supabase project, then create:

- **Storage bucket**: `photos` (set it to Public)
- **Table**: `locations`

### 2) Add environment variables
Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3) Open Admin
Run locally, then visit:

- `/login` to sign in
- `/admin` to add places and upload photos

### 4) GitHub Pages deploy
Add two repository secrets (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The GitHub Actions workflow will inject them into the build.


### Roles

By default, new sign-ins get a `profiles` row with role `editor` (can upload photos). To make someone an admin, set their role to `admin` in the Supabase dashboard.

See `supabase/schema.sql` for the exact tables + RLS policies.
