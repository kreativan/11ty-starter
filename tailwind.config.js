const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      base: ['Jost', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    extend: {
      colors: {
        base: colors.zinc,
        primary: colors.sky,
      },
    },
  },
  plugins: [],
}