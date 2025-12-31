"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { withBasePath } from "@/src/lib/basePath";
import { useMotionPrefs } from "@/src/components/motion";
import { useSession } from "@/src/hooks/useSession";

const links = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
];

export function Nav() {
  const pathname = usePathname();
  const { reduce, ease } = useMotionPrefs();
  const { session } = useSession();

  const active = (href: string) => (pathname === href ? true : pathname?.startsWith(href) && href !== "/" ? true : false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/55 backdrop-blur pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <span className="h-4 w-4 rounded-full bg-[conic-gradient(from_210deg,rgba(236,72,153,0.8),rgba(56,189,248,0.75),rgba(16,185,129,0.7),rgba(236,72,153,0.8))]" />
          </span>
          <span className="text-sm font-semibold text-zinc-100">
            Wanderlog <span className="ml-2 hidden text-xs font-normal text-zinc-300/80 sm:inline">adventures</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <div className="relative flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.18),transparent_52%)]" />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "relative rounded-xl px-3 py-2 text-sm transition " +
                  (active(l.href) ? "text-zinc-100" : "text-zinc-100/70 hover:text-zinc-100")
                }
              >
                {active(l.href) ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 34, duration: reduce ? 0 : 0.2, ease }}
                  />
                ) : null}
                {l.label}
              </Link>
            ))}
          </div>

          {session ? (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-100/80 hover:border-white/20"
              title="Admin"
            >
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
