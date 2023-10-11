module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'],
  darkMode: 'media',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
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
      }
    },
  },
  plugins: [],
}
