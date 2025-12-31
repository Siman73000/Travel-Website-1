"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

// Ultra-reliable: no animation wrapper (prevents blank screens on navigation).
export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  // Always start at the top when navigating so Locations are immediately visible.
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return <>{children}</>;
}
