/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"),   require('tailwind-scrollbar-hide')],
};
