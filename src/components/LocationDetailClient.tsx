"use client";

import { motion } from "framer-motion";
import type { LocationEntry } from "@/src/lib/types";
import { Gallery } from "@/src/components/Gallery";
import { usePhotos } from "@/src/hooks/usePhotos";
import { RegionChip } from "@/src/components/RegionChip";
import { useMotionPrefs } from "@/src/components/motion";

export function LocationDetailClient({ loc }: { loc: LocationEntry }) {
  const { reduce, ease } = useMotionPrefs();
  const { photos, loading } = usePhotos(loc.slug);

  return (
    <motion.div
      className="glass rounded-[28px] p-6 sm:p-8 soft-shadow border-aurora ring-aurora"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.35, ease }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <RegionChip region={loc.region as any} />
            {loc.country ? <span className="text-sm text-zinc-100/75">{loc.country}</span> : null}
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-100 sm:text-4xl">{loc.name}</h1>
          {loc.blurb ? <p className="mt-3 text-zinc-100/80">{loc.blurb}</p> : null}
        </div>
      </div>

      {Array.isArray(loc.highlights) && loc.highlights.length ? (
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {loc.highlights.map((h) => (
            <div key={h} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100/80">
              {h}
            </div>
          ))}
        </div>
      ) : null}

      <Gallery
        photos={photos}
        title={loading ? "Photos (loading…)" : "Photos"}
        emptyText="No photos have been added for this place yet."
      />
    </motion.div>
  );
}
