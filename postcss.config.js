module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.js',
          './components/**/*.js',
          './node_modules/react-day-picker/**/*.css'
        ],
        whitelistPatterns: [/(p|m)(x|y|t|r|b|l|)-[1-9]+/],
        whitelist: ['sm:max-w-3xl', 'sm:flex-row', 'sm:mb-0', 'justify-center', 'text-3xl', 'text-lg', 'text-center', 'font-medium', 'border-t', 'sm:text-sm', 'fixed', 'overflow-auto', 'md:mb-0'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }
    ],
    'cssnano'
  ]
}