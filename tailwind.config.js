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
    themes: [
      {
        mytheme: {

          "secondary": "#DA0037",
          "primary": "#FECEAB",
          "accent": "#F62A66",
          "neutral": "#444444",
          "base-100": "#171717",
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
