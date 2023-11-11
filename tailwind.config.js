/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sidebar-pressed": "#1d4ed8",
      },
      fontFamily: {
        raleway: ["Raleway", "sans"],
      },
    },
  },
  plugins: [],
};
