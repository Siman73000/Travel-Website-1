import type { LocationEntry } from "@/src/lib/types";

/**
 * Fallback (no Supabase configured):
 * These locations show up when you run the site using only /public/photos/<slug>/...
 * If you configure Supabase, the site will load locations from the database instead.
 */
export const locations: LocationEntry[] = [
  {
    slug: "cancun",
    name: "Cancún",
    country: "Mexico",
    region: "Central America",
    blurb: "Warm turquoise water, beach sunsets, and late-night street food.",
    highlights: ["Beach sunrise walks", "Snorkeling day trip", "Tacos al pastor"],
    featured: true,
    sort: 10,
  },
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    region: "Europe",
    blurb: "Old-town charm, parks, and pretzels between museum afternoons.",
    highlights: ["Marienplatz", "English Garden", "Beer hall classics"],
    featured: true,
    sort: 20,
  },
  {
    slug: "chicago",
    name: "Chicago",
    country: "United States",
    region: "North America",
    blurb: "Lakefront walks, skyline nights, and the best food spots.",
    highlights: ["Riverwalk", "Architecture tour", "Deep dish vs tavern-style"],
    featured: true,
    sort: 30,
  },
  {
    slug: "costarica",
    name: "Costa Rica",
    country: "Costa Rica",
    region: "Central America",
    blurb: "Rainforest hikes and beach towns with slow mornings.",
    highlights: ["Waterfalls", "Wildlife", "Coffee stops"],
    featured: false,
    sort: 40,
  },
];
