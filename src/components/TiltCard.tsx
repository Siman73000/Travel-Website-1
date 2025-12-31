"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionPrefs } from "@/src/components/motion";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { reduce } = useMotionPrefs();

  // Disable tilt on touch devices/coarse pointers (mobile).
  const [tiltEnabled, setTiltEnabled] = React.useState(false);
  React.useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setTiltEnabled(ok && !reduce);
  }, [reduce]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 240, damping: 24 });
  const sy = useSpring(my, { stiffness: 240, damping: 24 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);

  function onMove(e: React.PointerEvent) {
    if (!tiltEnabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x);
    my.set(y);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={"group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 soft-shadow p-5 " + className}
      style={
        tiltEnabled
          ? {
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
            }
          : undefined
      }
    >
      {/* Glow ring */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(236,72,153,0.18),rgba(56,189,248,0.10),transparent_60%)]" />
      </div>

      <div style={tiltEnabled ? { transform: "translateZ(12px)" } : undefined}>{children}</div>
    </motion.div>
  );
}
