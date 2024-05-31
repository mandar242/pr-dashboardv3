/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'tw-',
  corePlugins: { // needed to avoid error when using mui
    preflight: false,
  },
  important: '#root', // needed to avoid error when using mui
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

