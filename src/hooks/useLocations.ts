"use client";

import * as React from "react";
import { supabase } from "@/src/lib/supabase";
import type { LocationEntry } from "@/src/lib/types";
import { locations as localLocations } from "@/src/data/locations";

export function useLocations() {
  const [items, setItems] = React.useState<LocationEntry[]>(localLocations as any);
  const [loading, setLoading] = React.useState<boolean>(!!supabase);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    if (!supabase) {
      setItems(localLocations as any);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("locations")
      .select("id,slug,name,region,country,blurb,highlights,featured,sort")
      .order("sort", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setItems((data ?? []) as any);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, loading, error, refresh };
}
