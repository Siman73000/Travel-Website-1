import { Sparkles } from "@/src/components/Sparkles";

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Aurora mesh */}
      <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-fuchsia-500/22 blur-3xl animate-floaty animate-hue" />
      <div className="absolute top-52 -left-56 h-[740px] w-[740px] rounded-full bg-sky-500/18 blur-3xl animate-floaty" />
      <div className="absolute -bottom-72 right-[-220px] h-[820px] w-[820px] rounded-full bg-emerald-500/16 blur-3xl animate-floaty animate-hue" />
      <div className="absolute bottom-24 left-[58%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-amber-400/14 blur-3xl animate-floaty" />

      {/* Soft conic wash */}
      <div className="absolute inset-0 opacity-[0.22] animate-gradientShift"
        style={{
          backgroundImage:
            "conic-gradient(from 220deg at 50% 45%, rgba(236,72,153,0.30), rgba(99,102,241,0.28), rgba(56,189,248,0.26), rgba(16,185,129,0.22), rgba(236,72,153,0.30))",
          backgroundSize: "140% 140%",
        }}
      />

      {/* Aurora ribbons */}
      <div className="absolute left-[-10%] top-[18%] h-40 w-[120%] rotate-[-8deg] blur-3xl opacity-[0.35] animate-drift"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(236,72,153,0.0), rgba(236,72,153,0.35), rgba(56,189,248,0.35), rgba(16,185,129,0.25), rgba(236,72,153,0.0))",
        }}
      />
      <div className="absolute left-[-8%] top-[42%] h-44 w-[116%] rotate-[6deg] blur-3xl opacity-[0.25] animate-drift"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(56,189,248,0.0), rgba(56,189,248,0.32), rgba(99,102,241,0.28), rgba(236,72,153,0.22), rgba(56,189,248,0.0))",
          animationDirection: "alternate-reverse",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      {/* Sparkles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]">
          <div className="absolute inset-0 [&>div>span]:animate-twinkle">
            <Sparkles />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
