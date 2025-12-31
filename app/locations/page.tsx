"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLocations } from "@/src/hooks/useLocations";
import { RegionChip } from "@/src/components/RegionChip";
import { TiltCard } from "@/src/components/TiltCard";
import { LocationDetailClient } from "@/src/components/LocationDetailClient";
import { useMotionPrefs } from "@/src/components/motion";

const regions = [
  "All",
  "North America",
  "Central America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
  "Middle East",
] as const;

export default function LocationsPage() {
  const { reduce, ease } = useMotionPrefs();
  const { items, loading } = useLocations();
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get("place") || "";

  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const filtered = useMemo(() => {
    const list = items ?? [];
    if (region === "All") return list;
    return list.filter((l) => l.region === region);
  }, [items, region]);

  const current = useMemo(() => {
    const list = items ?? [];
    return list.find((l) => l.slug === selected) ?? null;
  }, [items, selected]);

  useEffect(() => {
    // If the selected location isn't in the filtered set, clear selection back to /locations
    if (selected && !filtered.some((l) => l.slug === selected)) {
      router.replace("/locations");
    }
  }, [selected, filtered, router]);


  return (
    <main className="min-h-[calc(100svh-72px)]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">Locations</h1>
            <p className="mt-1 text-sm text-zinc-100/70">
              {loading ? "Loading places…" : "Tap a place to see details and photos."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (r === region
                    ? "border-white/25 bg-white/10 text-zinc-100"
                    : "border-white/10 bg-white/5 text-zinc-100/75 hover:border-white/20")
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.slug}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduce ? 0 : 0.25, ease }}
              className="mb-6"
            >
              <LocationDetailClient loc={current as any} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => {
            const active = l.slug === current?.slug;
            return (
              <button
                key={l.slug}
                type="button"
                onClick={() => router.push(`/locations?place=${l.slug}`)}
                className="text-left"
              >
                <TiltCard className={"h-full transition " + (active ? "ring-2 ring-white/20" : "")}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <RegionChip region={l.region as any} />
                      </div>
                      <div className="mt-2 text-lg font-semibold text-zinc-100">{l.name}</div>
                      {l.country ? <div className="mt-1 text-sm text-zinc-100/70">{l.country}</div> : null}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-100/70">
                      View
                    </div>
                  </div>

                  {l.blurb ? <p className="mt-3 line-clamp-3 text-sm text-zinc-100/75">{l.blurb}</p> : null}
                </TiltCard>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
