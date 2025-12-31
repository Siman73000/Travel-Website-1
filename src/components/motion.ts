"use client";
import { useReducedMotion } from "framer-motion";

export function useMotionPrefs() {
  const reduce = useReducedMotion();
  return {
    reduce,
    ease: [0.22, 1, 0.36, 1] as const,
  };
}
