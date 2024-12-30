/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInUpWithBlur: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
            filter: 'blur(10px)',
          },
          '70%': {
            transform: 'translateY(0)',
            opacity: 0.8,
            filter: 'blur(4px)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
            filter: 'blur(0)',
          },
        },
      },
      animation: {
        slideInUpWithBlur: 'slideInUpWithBlur 1.5s ease-out',
      },
      fontFamily:{
        modak : ['"Modak"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
