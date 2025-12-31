"use client";

import * as React from "react";
import { supabase } from "@/src/lib/supabase";

export type Role = "admin" | "editor" | "viewer";

export function useRole() {
  const [role, setRole] = React.useState<Role>("viewer");
  const [loading, setLoading] = React.useState<boolean>(!!supabase);

  React.useEffect(() => {
    let active = true;

    async function run() {
      if (!supabase) {
        setLoading(false);
        setRole("viewer");
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) {
        setLoading(false);
        setRole("viewer");
        return;
      }

      // Try to load profile row. If missing, create it as "editor".
      const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      if (error) {
        setLoading(false);
        return;
      }

      if (!data) {
        await supabase.from("profiles").insert({ id: user.id, email: user.email, role: "editor" });
        if (!active) return;
        setRole("editor");
        setLoading(false);
        return;
      }

      if (!active) return;
      setRole((data.role as Role) || "editor");
      setLoading(false);
    }

    run();
    return () => {
      active = false;
    };
  }, []);

  return { role, loading };
}
