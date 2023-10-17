module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'],
  darkMode: 'media',
  theme: {
    screens: {
      'sm': '680px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
        'logo': ['Pinyon Script', 'cursive'],
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'chat': ['Fira Mono', 'monospace'],
      },
    extend: {
      colors: {
        main_bg: '#E4DDD3',
        white: '#FDFCFC',
        black: '#242320',
        lightgray: '#EBEAED',
        darkgray: '#91918F',
        beige: '#D6D1C2',
        gold: '#E0C66C'
      }
    },
  },
  plugins: [],
}
