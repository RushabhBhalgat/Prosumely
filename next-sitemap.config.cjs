let SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

// Ensure production URL always uses www.prosumely.com for canonical consistency
if (SITE_URL.includes('prosumely.com') && !SITE_URL.includes('www.')) {
  SITE_URL = SITE_URL.replace('prosumely.com', 'www.prosumely.com')
}

// Add https if not present
if (!SITE_URL.startsWith('http')) {
  SITE_URL = `https://${SITE_URL}`
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/industry-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/next/*',
    '/*/form',
    '/*/form/*',
    '/thank-you-for-choosing-prosumely',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/industry-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Skip dynamic routes and sitemap files
    if (path.includes('[') || path.includes('sitemap') || path.includes('robot')) {
      return null
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
