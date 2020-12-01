module.exports = {
  siteUrl: 'https://www.wintr.travel',
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
        disallow: ['/api', '/booking', '/waiting-list', '/404'],
      },
    ],
  },
};
