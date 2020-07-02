module.exports = {
  purge: {
    enabled: true,
    content: [
      './pages/**/*.js',
      './components/**/*.js',
      './node_modules/react-day-picker/**/*.css',
    ],
    options: {
      whitelist: [
        'text-center',
        'text-3xl',
        'py-10',
        'pb-6',
        'mx-4',
        'mb-6',
        'mt-4',
        'border-b',
        'w-56',
        'sm:border-b-0',
        'bg-gray-200',
        'sm:bg-transparent',
      ],
    },
  },
  theme: {
    extend: {
      colors: {
        'primary-blue': '#245688',
        'secondary-blue': '#0CB3FA',
      },
      opacity: {
        '40': '.4',
        '90': '.9',
      },
      fontSize: {
        '12xl': '10rem',
        '16xl': '14rem',
      },
      fontFamily: {
        title: ['Montserrat'],
      },
      inset: {
        '1/4': '0.25rem',
        '1/2': '0.5rem',
        '3/4': '0.75rem',
      },
      height: {
        '0.2': '0.05rem',
      },
      zIndex: {
        '100': 100,
        '200': 200,
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
};
