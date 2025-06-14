/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#39FF14',
        glitch: '#9D00FF',
        holo: '#00F0FF',
        cyber: '#0F0F0F',
      },
      fontFamily: {
        techno: ['Orbitron', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 20px #39FF14, 0 0 40px #9D00FF',
      },
    },
  },
  plugins: [],
};
