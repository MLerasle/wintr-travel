module.exports = {
  purge: {
    enabled: true,
    content: ['./pages/**/*.js', './components/**/*.js'],
  },
  theme: {
    extend: {
      boxShadow: {
        'custom-outline': '0 0 0 3px rgba(56,148,105,0.5)',
      },
      fontFamily: {
        body: ['Source Sans Pro'],
      },
      inset: {
        '-2': '-2rem',
        '-1': '-1rem',
        '1/4': '0.25rem',
        '1/2': '0.5rem',
        '3/4': '0.75rem',
      },
      height: {
        0.2: '0.05rem',
      },
      zIndex: {
        200: 200,
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'active', 'focus-within'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
};
