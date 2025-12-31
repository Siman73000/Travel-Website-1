import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="glass rounded-3xl p-8 soft-shadow border-aurora ring-aurora">
          <h1 className="text-3xl font-semibold text-aurora animate-gradientShift" style={{ backgroundSize: "200% 200%" }}>
            Page not found
          </h1>
          <p className="mt-3 text-zinc-100/85">That route doesn’t exist (yet).</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500/45 via-sky-500/35 to-emerald-500/35 px-4 py-2 text-sm text-zinc-100 hover:border-white/20">
              Go home
            </Link>
            <Link href="/locations" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/20">
              View locations
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
