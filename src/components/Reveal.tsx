"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useMotionPrefs } from "@/src/components/motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { reduce, ease } = useMotionPrefs();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.78, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
