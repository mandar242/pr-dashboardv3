/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

