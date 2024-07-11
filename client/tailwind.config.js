/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f172a',
        'secondary': '#1e293b',
        'accent': '#38bdf8',
      },
      boxShadow: {
        'default': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'md': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'full': '9999px',
        'lg': '1rem',
      },
    },
  },
  plugins: [],
};
