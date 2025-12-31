"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPrefs } from "@/src/components/motion";

export function Gallery({
  photos,
  title = "Photos",
  emptyText = "No photos have been added for this place yet.",
}: {
  photos: string[];
  title?: string;
  emptyText?: string;
}) {
  const { reduce, ease } = useMotionPrefs();
  const [active, setActive] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState<Record<string, boolean>>({});

  const shown = photos.filter((p) => !failed[p]);

  if (photos.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-100/85 soft-shadow">
        <div className="font-semibold text-zinc-100">{title}</div>
        <p className="mt-2 text-zinc-100/75">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
        <div className="text-xs text-zinc-100/60">
          Showing {shown.length}/{photos.length}
        </div>
      </div>

      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {photos.map((src) => {
          const isFailed = !!failed[src];
          return (
            <button
              key={src}
              type="button"
              onClick={() => (isFailed ? undefined : setActive(src))}
              className="mb-3 block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left hover:border-white/20"
              aria-label="Open photo"
            >
              {isFailed ? (
                <div className="p-3">
                  <div className="text-xs font-semibold text-zinc-100">Couldn’t load</div>
                  <div className="mt-1 break-all text-xs text-zinc-100/70">{src}</div>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt="Travel photo"
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
                  loading="lazy"
                  onError={() => setFailed((p) => ({ ...p, [src]: true }))}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-black/60 backdrop-blur"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.985 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: reduce ? 0 : 0.25, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="text-sm font-semibold text-zinc-100">Photo</div>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-100 hover:border-white/20"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>

              <div className="max-h-[78vh] overflow-auto p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active} alt="Selected travel photo" className="h-auto w-full rounded-2xl object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
