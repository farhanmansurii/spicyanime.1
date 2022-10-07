/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk'],
        'damion': ['Damion'],
      }
    }
  },
  daisyui: {
    themes: ["halloween"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"), require('tailwind-scrollbar-hide')],
};
