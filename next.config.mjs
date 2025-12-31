// next.config.mjs
// Vercel-first config (no static export / no GitHub Pages basePath).
// Works with dynamic routes and Supabase auth/uploads.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Leave defaults for routing on Vercel.
  // If you later use next/image with Supabase Storage, add images.remotePatterns here.
};

export default nextConfig;
