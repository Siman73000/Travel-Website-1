import { notFound } from "next/navigation";
import { locations } from "@/src/data/locations";
import { LocationDetailClient } from "@/src/components/LocationDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

// Next.js 15+: params is a Promise in app routes.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  return { title: loc ? `${loc.name} • Wanderlog` : "Not found • Wanderlog" };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();
  return <LocationDetailClient loc={loc} />;
}
