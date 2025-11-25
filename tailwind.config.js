/** @type {import('tailwindcss').Config} */
// 🚨 CHANGED TO ESM SYNTAX (export default) 🚨
export default {
  // IMPORTANT: Tell Tailwind where to find your class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};