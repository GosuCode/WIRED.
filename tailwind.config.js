/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 5px theme('colors.purple.200'), 0 0 20px theme('colors.purple.700') ",
        purple: "0 0 5px theme('colors.purple.200'), 0 0 10px theme('colors.purple.700') ",
        emerald: "0 0 15px theme('colors.emerald.200'), 0 0 20px theme('colors.emerald.700') ",
        green: "0 0 5px theme('colors.emerald.200'), 0 0 8px theme('colors.emerald.700') ",
      }
    },
  },
  plugins: [],
}

