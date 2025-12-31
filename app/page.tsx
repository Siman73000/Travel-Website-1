"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLocations } from "@/src/hooks/useLocations";
import { Reveal } from "@/src/components/Reveal";
import { RegionChip } from "@/src/components/RegionChip";
import { TiltCard } from "@/src/components/TiltCard";
import { useMotionPrefs } from "@/src/components/motion";

export default function HomePage() {
  const { reduce, ease } = useMotionPrefs();
  const { items } = useLocations();

  const featured = useMemo(() => {
    const list = items ?? [];
    const f = list.filter((l) => !!l.featured);
    return (f.length ? f : list).slice(0, 6);
  }, [items]);

  return (
    <main className="min-h-[calc(100vh-72px)]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 pb-10">
        <Reveal>
          <div className="glass rounded-[28px] p-7 md:p-10 soft-shadow border-aurora ring-aurora">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm tracking-wide text-zinc-200/80">Simon&apos;s Travel Journal</p>

                <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
                  My adventures,
                  <span className="block text-aurora animate-gradientShift" style={{ backgroundSize: "200% 200%" }}>
                    archived.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-zinc-100/85">
                  Explore the places I've seen around the world, open a location to see photos and descriptions.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/locations"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-white/20"
                  >
                    Browse locations
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-200/80">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Places: <span className="text-zinc-100">{items.length}</span>
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Photos: <span className="text-zinc-100">gallery view</span>
                  </span>
                </div>
              </div>

              <motion.div
                className="relative w-full max-w-md"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : 0.05 }}
              >
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle,rgba(56,189,248,0.25),rgba(236,72,153,0.18),transparent_60%)] blur-2xl" />
                  <div className="relative">
                    <p className="text-sm font-semibold text-zinc-100">Featured</p>
                    <p className="mt-1 text-sm text-zinc-100/70">Tap any card to open it.</p>
                    <div className="mt-4 grid gap-3">
                      {featured.slice(0, 3).map((l) => (
                        <Link key={l.slug} href={`/locations?place=${l.slug}`} className="block">
                          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:border-white/20">
                            <div className="flex items-center gap-2">
                              <RegionChip region={l.region as any} />
                              <span className="text-sm font-semibold text-zinc-100">{l.name}</span>
                            </div>
                            {l.country ? <div className="mt-1 text-xs text-zinc-100/65">{l.country}</div> : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Featured locations</h2>
            <Link href="/locations" className="text-sm text-zinc-100/70 hover:text-zinc-100">
              View all →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <Link key={l.slug} href={`/locations?place=${l.slug}`} className="block">
                <TiltCard className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <RegionChip region={l.region as any} />
                      </div>
                      <div className="mt-2 text-lg font-semibold text-zinc-100">{l.name}</div>
                      {l.country ? <div className="mt-1 text-sm text-zinc-100/70">{l.country}</div> : null}
                    </div>
                  </div>
                  {l.blurb ? <p className="mt-3 line-clamp-3 text-sm text-zinc-100/75">{l.blurb}</p> : null}
                </TiltCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
