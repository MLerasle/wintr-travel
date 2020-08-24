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
        'sm:items-start',
        'text-3xl',
        'sm:text-4xl',
        'leading-loose',
        'sm:py-10',
        'py-10',
        'px-10',
        'pb-6',
        'pb-16',
        'mx-4',
        'mx-8',
        'sm:my-12',
        'mb-6',
        'mb-20',
        'mt-4',
        'mt-12',
        '-my-16',
        'border-b',
        'border-t',
        'w-56',
        'sm:border-b-0',
        'bg-gray-200',
        'bg-gray-800',
        'border-t-2',
        'sm:bg-transparent',
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'max-w-screen-lg',
        'max-w-md',
        'shadow',
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
