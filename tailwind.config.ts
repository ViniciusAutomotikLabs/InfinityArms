import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070b14",
          900: "#0c1220",
          800: "#121a2e",
          700: "#1a2744",
          600: "#243556",
        },
        gold: {
          DEFAULT: "#c4a574",
          light: "#e0c9a0",
          dim: "#8a7349",
        },
        steel: {
          DEFAULT: "#9aa4b5",
          light: "#c5ccd8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(196,165,116,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,116,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
