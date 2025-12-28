/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-dark": "#192633", // Sidebar/Cards
        "surface-highlight": "#233648", // Table headers/Inputs
        "card-dark": "#18212b",
        "card-hover": "#1e2a36",
        "text-secondary": "#92adc9",
        success: "#0bda5b",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
