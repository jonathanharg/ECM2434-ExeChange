/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./*.{js,ts,jsx,tsx}", "./*/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
