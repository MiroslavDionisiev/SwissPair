/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'gray-dark': '#8B8B8B',
        'gray-light': '#E6E9EF',
        'white': '#FFFFFF',
        'yellow-light': '#FFFCCF',
        'yellow-dark': '#FFEE08',
        'red-custom': '#FD0130',
        'green-custom': '#02F272',
      },
    },
  },
  plugins: [],
}