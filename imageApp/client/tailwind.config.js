export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#22C55E",
          "dark-green": "#16A34A",
          "light-green": "#DCFCE7",
        },
        background: "#FFFFFF",
        "card-bg": "#F9FAFB",
        text: "#111827",
        border: "#E5E7EB",
        dark: {
          bg: "#0B0F0C",
          card: "#111827",
          text: "#F3F4F6",
          accent: "#4ADE80",
        },
      },
    },
  },
  plugins: [],
};