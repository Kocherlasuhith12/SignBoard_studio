import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        brand: {
          red: {
            DEFAULT: "#B5121B",
            deep: "#800B12",
            glow: "#E51E28",
            subtle: "rgba(181, 18, 27, 0.15)",
          },
          black: {
            DEFAULT: "#111111",
            pure: "#070707",
            card: "#141414",
            surface: "#1A1A1A",
            border: "#262626",
            highlight: "#333333",
          },
          orange: {
            DEFAULT: "#F06A28",
            glow: "#FF7D3C",
            subtle: "rgba(240, 106, 40, 0.15)",
          },
          muted: "#888888",
          subtle: "#555555",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(181, 18, 27, 0.3)" },
          "50%": { borderColor: "rgba(240, 106, 40, 0.5)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "border-glow": "border-glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        "radial-gradient-hero": "radial-gradient(circle at 50% 30%, rgba(181, 18, 27, 0.22) 0%, rgba(240, 106, 40, 0.08) 35%, rgba(10, 10, 10, 0) 70%)",
        "radial-red": "radial-gradient(circle, rgba(181, 18, 27, 0.2) 0%, transparent 70%)",
        "radial-orange": "radial-gradient(circle, rgba(240, 106, 40, 0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;

