import type { Config } from "tailwindcss";

// === DESIGN SYSTEM MOOD2FIT ===
// Couleurs principales : #080010 (bg) / #f72585 (rose) / #7209b7 (violet)
// Accent cyan : #4cc9f0 | Accent jaune : #f8d210 | Accent mint : #06d6a0
// Police titres : Syne 700/800
// Police body : DM Sans 300/400/500
// Border-radius standard : 16px
// Espacements clés : 24px / 48px / 96px
// Gradient principal : linear-gradient(135deg, #f72585, #7209b7)
// ====================

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#080010",
          s1: "#0f0018",
          s2: "#160022",
        },
        primary: {
          rose: "#f72585",
          violet: "#7209b7",
          fuchsia: "#b5179e",
        },
        accent: {
          cyan: "#4cc9f0",
          yellow: "#f8d210",
          mint: "#06d6a0",
        },
        text: {
          main: "#faf4ff",
          muted: "rgba(250,244,255,0.55)",
        },
        border: {
          glow: "rgba(247,37,133,0.15)",
          cyan: "rgba(76,201,240,0.2)",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
        pill: "999px",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #f72585, #7209b7)",
        "gradient-brand-rev": "linear-gradient(135deg, #7209b7, #f72585)",
        "gradient-dark": "linear-gradient(180deg, transparent 0%, #080010 100%)",
        "gradient-hero": "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(114,9,183,0.35) 0%, rgba(247,37,133,0.15) 40%, rgba(8,0,16,0) 70%)",
        "gradient-card": "linear-gradient(135deg, rgba(247,37,133,0.08), rgba(114,9,183,0.08))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delay": "float 4s ease-in-out 1.5s infinite",
        "float-delay2": "float 4s ease-in-out 3s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "counter-spin": "spin 1s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(247,37,133,0.25)",
        "glow-cyan": "0 0 30px rgba(76,201,240,0.2)",
        "glow-violet": "0 0 50px rgba(114,9,183,0.3)",
        card: "0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(247,37,133,0.12)",
        phone: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(247,37,133,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
