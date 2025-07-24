// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // if you ever stash JSX in other folders, add them here
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['var(--font-bodoni)', 'serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
