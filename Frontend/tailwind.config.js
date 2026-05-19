/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          faint: "var(--ink-faint)",
        },
        clay: {
          DEFAULT: "var(--clay)",
          deep: "var(--clay-deep)",
        },
        edge: "var(--border)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Hanken Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(33, 30, 26, 0.04), 0 8px 24px -12px rgba(33, 30, 26, 0.12)",
        lift: "0 2px 4px rgba(33, 30, 26, 0.06), 0 18px 40px -16px rgba(33, 30, 26, 0.22)",
      },
      keyframes: {
        "blink-dot": {
          "0%, 80%, 100%": { opacity: "0.2", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-3px)" },
        },
      },
      animation: {
        "blink-dot": "blink-dot 1.4s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
