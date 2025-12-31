"use client";

import { useMemo } from "react";

type Sparkle = {
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
};

// Tiny deterministic RNG so positions don't change every render (and no hydration weirdness).
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(r: number, min: number, max: number) {
  return min + (max - min) * r;
}

export function Sparkles({ count = 70 }: { count?: number }) {
  const sparkles = useMemo<Sparkle[]>(() => {
    const rand = mulberry32(1337);
    const arr: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      const r1 = rand();
      const r2 = rand();
      const r3 = rand();
      const r4 = rand();
      const r5 = rand();

      const size = Math.round(lerp(r3, 1, 3));
      arr.push({
        left: `${(r1 * 100).toFixed(2)}%`,
        top: `${(r2 * 100).toFixed(2)}%`,
        size,
        opacity: Number(lerp(r4, 0.35, 0.85).toFixed(2)),
        duration: `${lerp(r5, 2.8, 6.2).toFixed(2)}s`,
        delay: `${lerp(rand(), 0, 2.2).toFixed(2)}s`,
      });
    }
    return arr;
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.65]">
      <div className="absolute inset-0">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 blur-[0.3px] animate-twinkle mix-blend-screen"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
