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
      colors: {
        'primary-green': '#389469',
        'light-green': '#A6DDC4',
        'lighter-green': '#F0F9F5',
        'primary-blue': '#1381F6',
        'light-blue': '#C4DFFD',
        'lighter-blue': '#EBF4FE',
        'dark-blue': '#253D56',
        'primary-red': '#CA463F',
        'light-red': '#FBF0EF',
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
        0.4: '0.1rem',
        0.5: '0.125rem',
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
  plugins: [require('@tailwindcss/typography')],
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'active', 'focus-within'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
