/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Inter",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "50%": { width: "50%" },
          "80%": { width: "80%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        progress: " progress 5s linear ",
      },
    },
  },
  plugins: [],
};
