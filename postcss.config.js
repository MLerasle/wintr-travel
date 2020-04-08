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
        whitelist: ['sm:max-w-3xl', 'justify-center', 'text-3xl', 'text-lg', 'text-center'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }
    ],
    'cssnano'
  ]
}