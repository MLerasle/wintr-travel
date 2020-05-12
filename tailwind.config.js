module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js',
    './node_modules/react-day-picker/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#245688',
        'secondary-blue': '#0CB3FA'
      },
      opacity: {
        '40': '.4',
        '90': '.9'
      },
      fontSize: {
        '12xl': '10rem',
        '16xl': '14rem',
      },
      fontFamily: {
        'title': ['Montserrat']
      },
      inset: {
        '1/2': '0.5rem'
      }
    }
  }
}