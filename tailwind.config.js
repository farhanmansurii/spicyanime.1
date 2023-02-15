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
        'damion': ['HelveticaNeue'],
        'sans': ["'Karla', sans-serif"],
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "secondary": "#ba181b",
          "primary": "#F1E0C5",
          "accent": "#ba181b",
          "neutral": "#444444",
          "base-100": "#0b090a",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"), require('tailwind-scrollbar-hide')],
};
