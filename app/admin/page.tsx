"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase";
import { useSession } from "@/src/hooks/useSession";
import { useLocations } from "@/src/hooks/useLocations";
import { useRole } from "@/src/hooks/useRole";
import type { LocationEntry } from "@/src/lib/types";

const regionOptions = [
  "North America",
  "Central America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
  "Middle East",
] as const;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  const { session, user, loading } = useSession();
  const { role, loading: roleLoading } = useRole();
  const { items, refresh } = useLocations();

  const enabled = !!supabase;
  const [tab, setTab] = useState<"places" | "photos">("photos");

  // place form
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [region, setRegion] = useState<(typeof regionOptions)[number]>("Europe");
  const [country, setCountry] = useState("");
  const [blurb, setBlurb] = useState("");
  const [highlights, setHighlights] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // upload form
  const [selectedSlug, setSelectedSlug] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!slug && name) setSlug(slugify(name));
  }, [name, slug]);

  const slugs = useMemo(() => (items ?? []).map((l) => l.slug), [items]);

  useEffect(() => {
    if (!selectedSlug && slugs.length) setSelectedSlug(slugs[0]);
  }, [slugs, selectedSlug]);

  useEffect(() => {
    // Default tab: editors only see uploads; admins can manage places.
    if (role === "admin") setTab("places");
    else setTab("photos");
  }, [role]);

  async function createPlace(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (role !== "admin") {
      setStatus("Only admins can add or edit places.");
      return;
    }

    setStatus(null);

    const entry: LocationEntry = {
      slug: slugify(slug || name),
      name: name.trim(),
      region,
      country: country.trim() || null,
      blurb: blurb.trim() || null,
      highlights: highlights
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      featured,
    };

    const { error } = await supabase.from("locations").insert(entry as any);
    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Place created!");
    setName("");
    setSlug("");
    setCountry("");
    setBlurb("");
    setHighlights("");
    setFeatured(false);
    await refresh();
  }

  async function toggleFeatured(l: any) {
    if (!supabase) return;
    if (role !== "admin") return;

    const { error } = await supabase.from("locations").update({ featured: !l.featured }).eq("slug", l.slug);
    if (error) setStatus(error.message);
    else await refresh();
  }

  async function uploadPhotos(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !files || !selectedSlug) return;

    setUploading(true);
    setStatus(null);

    for (const file of Array.from(files)) {
      const safeName = file.name.replaceAll(" ", "-");
      const path = `${selectedSlug}/${Date.now()}-${safeName}`;

      const { error } = await supabase.storage.from("photos").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });

      if (error) {
        setStatus(error.message);
        setUploading(false);
        return;
      }
    }

    setStatus("Upload complete!");
    setFiles(null);
    const input = document.getElementById("file-input") as HTMLInputElement | null;
    if (input) input.value = "";
    setUploading(false);
  }

  if (!enabled) {
    return (
      <main className="min-h-[calc(100svh-72px)]">
        <section className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
          <div className="glass rounded-[28px] p-7 soft-shadow border-aurora ring-aurora">
            <h1 className="text-2xl font-semibold text-zinc-100">Admin</h1>
            <p className="mt-2 text-sm text-zinc-100/70">
              Admin requires Supabase configuration. See <code className="rounded bg-white/5 px-1.5 py-0.5">.env.example</code>.
            </p>
            <div className="mt-6">
              <Link href="/" className="text-sm text-zinc-100/70 hover:text-zinc-100">
                ← Back to site
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (loading || roleLoading) {
    return (
      <main className="min-h-[calc(100svh-72px)]">
        <section className="mx-auto max-w-2xl px-4 sm:px-6 py-10 text-zinc-100/80">Loading…</section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-[calc(100svh-72px)]">
        <section className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
          <div className="glass rounded-[28px] p-7 soft-shadow border-aurora ring-aurora">
            <h1 className="text-2xl font-semibold text-zinc-100">Contributors</h1>
            <p className="mt-2 text-sm text-zinc-100/70">Sign in to upload photos (and manage places if you’re an admin).</p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/20"
              >
                Sign in
              </Link>
              <Link href="/" className="text-sm self-center text-zinc-100/70 hover:text-zinc-100">
                Back to site
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const isAdmin = role === "admin";

  return (
    <main className="min-h-[calc(100svh-72px)]">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="glass rounded-[28px] p-7 soft-shadow border-aurora ring-aurora">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100">{isAdmin ? "Admin" : "Uploader"}</h1>
              <p className="mt-1 text-sm text-zinc-100/70">
                Signed in as {user?.email} • Role: <span className="font-semibold text-zinc-100">{role}</span>
              </p>
              {!isAdmin ? (
                <p className="mt-1 text-sm text-zinc-100/60">
                  To manage places, set your role to <span className="font-semibold">admin</span> in the Supabase <code className="rounded bg-white/5 px-1.5 py-0.5">profiles</code> table.
                </p>
              ) : null}
            </div>
            <div className="flex gap-2">
              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => setTab("places")}
                  className={
                    "rounded-2xl border px-4 py-2 text-sm " +
                    (tab === "places" ? "border-white/25 bg-white/10 text-zinc-100" : "border-white/10 bg-white/5 text-zinc-100/80")
                  }
                >
                  Places
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setTab("photos")}
                className={
                  "rounded-2xl border px-4 py-2 text-sm " +
                  (tab === "photos" ? "border-white/25 bg-white/10 text-zinc-100" : "border-white/10 bg-white/5 text-zinc-100/80")
                }
              >
                Upload photos
              </button>
              <button
                type="button"
                onClick={() => supabase?.auth.signOut()}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100/80 hover:border-white/20"
              >
                Sign out
              </button>
            </div>
          </div>

          {status ? <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-100/80">{status}</div> : null}

          {tab === "places" && isAdmin ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <form onSubmit={createPlace} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-sm font-semibold text-zinc-100">Add a place</h2>

                <label className="mt-4 block text-sm text-zinc-100/80">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                  placeholder="Cancún"
                  required
                />

                <label className="mt-4 block text-sm text-zinc-100/80">Slug (URL id)</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                  placeholder="cancun"
                />

                <label className="mt-4 block text-sm text-zinc-100/80">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as any)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                >
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <label className="mt-4 block text-sm text-zinc-100/80">Country (optional)</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                  placeholder="Mexico"
                />

                <label className="mt-4 block text-sm text-zinc-100/80">Short description (optional)</label>
                <textarea
                  value={blurb}
                  onChange={(e) => setBlurb(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                  rows={3}
                  placeholder="A bright coastal city with turquoise water and late-night street food."
                />

                <label className="mt-4 block text-sm text-zinc-100/80">Highlights (comma-separated)</label>
                <input
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
                  placeholder="Beach sunrise, Street tacos, Snorkeling"
                />

                <label className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-100/80">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                  Featured on home
                </label>

                <button className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 hover:border-white/20">
                  Create place
                </button>
              </form>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-sm font-semibold text-zinc-100">Existing places</h2>
                <div className="mt-4 grid gap-3">
                  {(items ?? []).map((l: any) => (
                    <div key={l.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-zinc-100">{l.name}</div>
                          <div className="mt-1 text-xs text-zinc-100/65">{l.slug}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFeatured(l)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-100/80 hover:border-white/20"
                        >
                          {l.featured ? "Unfeature" : "Feature"}
                        </button>
                      </div>
                      {l.blurb ? <div className="mt-2 text-sm text-zinc-100/70 line-clamp-2">{l.blurb}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={uploadPhotos} className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold text-zinc-100">Upload photos</h2>
              <p className="mt-1 text-sm text-zinc-100/70">Choose a place, then upload images. They appear on the site immediately.</p>

              <label className="mt-4 block text-sm text-zinc-100/80">Place</label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
              >
                {slugs.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <label className="mt-4 block text-sm text-zinc-100/80">Files</label>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 outline-none focus:border-white/25"
              />

              <button
                disabled={uploading || !files || !files.length}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 hover:border-white/20 disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>

              <div className="mt-6 text-sm">
                <Link href="/locations" className="text-zinc-100/70 hover:text-zinc-100">
                  View site
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
