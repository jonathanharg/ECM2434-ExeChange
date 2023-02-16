/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./*.{js,ts,jsx,tsx}", "./*/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('flowbite/plugin')],
};
