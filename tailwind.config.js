module.exports = {
  purge: {
    enabled: true,
    content: [
      './pages/**/*.js',
      './components/**/*.js',
      './node_modules/react-day-picker/**/*.css',
    ],
    options: {
      whitelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
        // 'primary-blue': '#245688',
        // 'secondary-blue': '#0CB3FA',
        'primary-blue': '#2C5282',
        'secondary-blue': '#4299E1',
      },
      opacity: {
        40: '.4',
        90: '.9',
      },
      fontSize: {
        '12xl': '10rem',
        '16xl': '14rem',
      },
      fontFamily: {
        body: ['Source Sans Pro'],
      },
      inset: {
        '1/4': '0.25rem',
        '1/2': '0.5rem',
        '3/4': '0.75rem',
      },
      height: {
        0.2: '0.05rem',
      },
      zIndex: {
        100: 100,
        200: 200,
      },
      screens: {
        xs: '375px',
        xxl: '1520px',
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
