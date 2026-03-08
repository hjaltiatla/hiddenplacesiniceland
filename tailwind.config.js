/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        iceland: {
          blue: '#003F87',
          red: '#DC1E35',
          light: '#E8F0FB',
        },
      },
    },
  },
  plugins: [],
};
