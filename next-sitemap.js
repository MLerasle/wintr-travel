module.exports = {
  siteUrl: 'https://beta.wintr.travel',
  generateRobotsTxt: true,
  exclude: [
    '/booking/details',
    '/booking/checkout',
    '/booking/confirmation',
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api', '/booking', '/404'],
      },
    ],
  },
};
