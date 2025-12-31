"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase";
import { useSession } from "@/src/hooks/useSession";
import { withBasePath } from "@/src/lib/basePath";

export default function LoginPage() {
  const { session, user, loading } = useSession();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const enabled = !!supabase;

  const redirectTo = useMemo(() => {
    // Supabase needs an absolute URL. We compute it at runtime.
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    // Redirect to admin after login
    return `${origin}${withBasePath("/admin")}`;
  }, []);

  useEffect(() => {
    if (user) setMsg(null);
  }, [user]);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setMsg(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) setMsg(error.message);
    else setSent(true);
  }

  return (
    <main className="min-h-[calc(100svh-72px)]">
      <section className="mx-auto max-w-lg px-4 sm:px-6 py-10">
        <div className="glass rounded-[28px] p-7 soft-shadow border-aurora ring-aurora">
          <h1 className="text-2xl font-semibold text-zinc-100">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-100/70">
            This is for contributors (uploading photos and managing places).
          </p>

          {!enabled ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-100/80">
              Supabase is not configured yet. Add{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5">.env.local</code>.
            </div>
          ) : session ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-100/80">
              You’re signed in as <span className="font-semibold text-zinc-100">{user?.email}</span>.
              <div className="mt-4 flex gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/20"
                >
                  Go to Admin
                </Link>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-zinc-100/80 hover:border-white/20"
                  onClick={() => supabase?.auth.signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={sendLink} className="mt-6">
              <label className="block text-sm text-zinc-100/80">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-100/40 outline-none focus:border-white/25"
                required
              />

              <button
                disabled={loading || sent}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 hover:border-white/20 disabled:opacity-60"
              >
                {sent ? "Check your email" : "Send magic link"}
              </button>

              {msg ? <p className="mt-3 text-sm text-rose-200">{msg}</p> : null}
              {sent ? (
                <p className="mt-3 text-sm text-zinc-100/70">
                  We sent you a sign-in link. Open it on this device to finish signing in.
                </p>
              ) : null}
            </form>
          )}

          <div className="mt-6 text-sm">
            <Link href="/" className="text-zinc-100/70 hover:text-zinc-100">
              ← Back to site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
