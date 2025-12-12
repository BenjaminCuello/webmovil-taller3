import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./frontend/app/**/*.{ts,tsx}",
    "./frontend/components/**/*.{ts,tsx}",
    "./frontend/charts/**/*.{ts,tsx}",
    "./frontend/redux/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#e2ebff",
          200: "#cad9ff",
          300: "#a8c0ff",
          400: "#7b9eff",
          500: "#4c79ff",
          600: "#3259db",
          700: "#2543a8",
          800: "#1f3785",
          900: "#192c69"
        }
      }
    }
  },
  plugins: []
};

export default config;
