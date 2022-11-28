/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    content: ['./src/**/*.js'],
    safelist: [
      'grid-cols-4',
      'grid-cols-5',
      'grid-cols-6',
      'grid-cols-7',
      'grid-cols-8',
      'grid-cols-9',
      'grid-rows-4',
      'grid-rows-5',
      'grid-rows-6',
      'grid-rows-7',
      'grid-rows-8',
      'grid-rows-9'
    ]
  }
}
