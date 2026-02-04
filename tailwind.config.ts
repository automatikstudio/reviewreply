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
        brand: {
          emerald: "#059669",
          "emerald-light": "#10B981",
          "emerald-dark": "#047857",
          orange: "#EA580C",
          "orange-light": "#F97316",
          bg: "#FEFCE8",
          surface: "#FFFFFF",
          text: "#18181B",
          "text-light": "#52525B",
          "text-muted": "#A1A1AA",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
        card: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
