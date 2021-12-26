module.exports = {
  purge: ['./public/index.html', './src/**/*.js', './src/**/*.jsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light: '#fff4ee',
        dark: '#171717',
        'post-light': '#ffffff',
        'post-dark': '#070707',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
