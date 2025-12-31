import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        hue: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(18deg)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.9)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        drift: {
          "0%": { transform: "translate3d(-4%, 0, 0)" },
          "100%": { transform: "translate3d(4%, 0, 0)" },
        },
      },
      animation: {
        floaty: "floaty 11s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        hue: "hue 14s ease-in-out infinite alternate",
        gradientShift: "gradientShift 10s ease-in-out infinite",
        twinkle: "twinkle 3.6s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
