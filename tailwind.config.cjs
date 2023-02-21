/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./frontend/index.html",
    "./frontend/*.{js,ts,jsx,tsx}",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")],
};
