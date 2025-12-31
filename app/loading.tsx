export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="glass rounded-3xl p-6 soft-shadow border-aurora ring-aurora">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-4 h-10 w-2/3 rounded bg-white/10" />
        <div className="mt-2 h-10 w-1/2 rounded bg-white/10" />
        <div className="mt-6 h-1 w-full overflow-hidden rounded bg-white/10">
          <div className="h-full w-1/3 bg-gradient-to-r from-fuchsia-400/70 via-sky-400/55 to-emerald-400/55 animate-shimmer" />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-3xl border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
