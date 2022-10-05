/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["pastel"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
