import type { LocationEntry } from "@/src/data/locations";

const regionClass: Record<LocationEntry["region"], string> = {
  "North America": "from-sky-400/45 via-emerald-400/25 to-emerald-300/10",
  "Central America": "from-emerald-400/45 via-sky-400/25 to-sky-300/10",
  "South America": "from-emerald-400/45 via-amber-400/25 to-amber-300/10",
  Europe: "from-fuchsia-400/45 via-sky-400/25 to-sky-300/10",
  Africa: "from-amber-400/45 via-fuchsia-400/25 to-fuchsia-300/10",
  Asia: "from-violet-400/45 via-fuchsia-400/25 to-fuchsia-300/10",
  Oceania: "from-sky-400/45 via-violet-400/25 to-violet-300/10",
};

export function RegionChip({ region }: { region: LocationEntry["region"] }) {
  return (
    <span
      className={
        "rounded-full border border-white/10 bg-gradient-to-r px-2 py-0.5 text-xs text-zinc-100 " +
        regionClass[region]
      }
    >
      {region}
    </span>
  );
}
