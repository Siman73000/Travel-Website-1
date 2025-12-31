import type { LocationEntry } from "@/src/lib/types";
export type { LocationEntry } from "@/src/lib/types";

/**
 * Fallback (no Supabase configured):
 * These locations show up when you run the site using only /public/photos/<slug>/...
 * If you configure Supabase, the site will load locations from the database instead.
 */
export const locations: LocationEntry[] = [
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    region: "Europe",
    blurb: "Old-town charm, parks, and cozy cafés between museum afternoons.",
    highlights: ["Marienplatz", "English Garden", "Nymphenburg Palace"],
    featured: true,
    sort: 10,
  },
  {
    slug: "cancun",
    name: "Cancún",
    country: "Mexico",
    region: "North America",
    blurb: "Warm turquoise water, beach sunsets, and unreal street food.",
    highlights: ["Beach days", "Snorkeling", "Night markets + tacos"],
    featured: true,
    sort: 20,
  },
  {
    slug: "playa-hermosa",
    name: "Playa Hermosa",
    country: "Costa Rica",
    region: "Central America",
    blurb: "Soft sand, palm-lined shorelines, and slow ocean mornings.",
    highlights: ["Golden hour swims", "Beach walks", "Sunset views"],
    featured: true,
    sort: 30,
  },
  {
    slug: "baltimore",
    name: "Baltimore",
    country: "United States",
    region: "North America",
    blurb: "Harbor views, historic neighborhoods, and great food spots.",
    highlights: ["Inner Harbor", "Fells Point", "National Aquarium"],
    featured: true,
    sort: 40,
  },
];
