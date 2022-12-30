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
        'sans': ['HelveticaNeue'],
        'damion': ['Gotham'],
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "secondary": "#cc2936",
          "primary": "#F1E0C5",
          "accent": "#9a031e",
          "neutral": "#444444",
          "base-100": "#111111",
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
