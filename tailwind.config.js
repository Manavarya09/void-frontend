/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00FF41',
        'neon-pink': '#FF00FF',
        'neon-yellow': '#FFFF00',
        'neon-cyan': '#00FFFF',
        'neon-red': '#FF003C',
        'void-black': '#050505',
        'void-gray': '#1a1a1a',
        'y2k-pink': '#FF007F',
        'y2k-blue': '#00F0FF',
        'y2k-purple': '#B026FF',
        'y2k-silver': '#c0c0c0',
      },
      fontFamily: {
        anton: ['Anton'],
        marker: ['PermanentMarker'],
        mono: ['JetBrainsMono'],
        inter: ['Inter'],
        sans: ['Inter'],
      }
    },
  },
  plugins: [],
}
