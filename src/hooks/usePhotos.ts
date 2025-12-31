"use client";

import * as React from "react";
import { supabase } from "@/src/lib/supabase";
import { withBasePath } from "@/src/lib/basePath";
import { photosForSlug } from "@/src/data/photoManifest";

function sortNice(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export function usePhotos(slug: string) {
  const [items, setItems] = React.useState<string[]>(photosForSlug(slug));
  const [loading, setLoading] = React.useState<boolean>(!!supabase);

  const refresh = React.useCallback(async () => {
    if (!slug) return;

    // Fallback: local static photos (public/photos)
    if (!supabase) {
      setItems(photosForSlug(slug));
      setLoading(false);
      return;
    }

    setLoading(true);

    // Supabase Storage: list everything under photos/<slug> (non-recursive)
    const { data, error } = await supabase.storage.from("photos").list(slug, {
      limit: 200,
      sortBy: { column: "name", order: "asc" },
    });

    if (error || !data) {
      setItems([]);
      setLoading(false);
      return;
    }

    const files = data
      .filter((d) => d.name && !d.id?.endsWith("/") && !d.name.endsWith("/"))
      .map((d) => `${slug}/${d.name}`)
      .sort(sortNice);

    const urls = files
      .map((path) => {
        const { data } = supabase.storage.from("photos").getPublicUrl(path);
        return data.publicUrl;
      })
      .filter(Boolean);

    setItems(urls);
    setLoading(false);
  }, [slug]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  // When using local fallback, items are filenames; convert to basePath urls.
  const normalized = React.useMemo(() => {
    if (!items.length) return [];
    if (items[0].startsWith("http")) return items;
    return items.map((file) => withBasePath(`/photos/${slug}/${file}`));
  }, [items, slug]);

  return { photos: normalized, loading, refresh };
}
