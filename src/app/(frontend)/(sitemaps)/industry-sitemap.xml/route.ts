import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getIndustryRoutes } from '@/utilities/getIndustryRoutes'

const getIndustrySitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // Ensure production URL always uses www.prosumely.com for canonical consistency
    let siteUrl = SITE_URL
    if (siteUrl.includes('prosumely.com') && !siteUrl.includes('www.')) {
      siteUrl = siteUrl.replace('prosumely.com', 'www.prosumely.com')
    }

    // Add https if not present
    if (!siteUrl.startsWith('http')) {
      siteUrl = `https://${siteUrl}`
    }

    const dateFallback = new Date().toISOString()

    // Get all industry-specific routes
    const industryRoutes = getIndustryRoutes()
    const industrySitemap = industryRoutes.map((route) => ({
      loc: `${siteUrl}${route}`,
      lastmod: dateFallback,
      changefreq: 'weekly' as const,
      priority: 0.7,
    }))

    return industrySitemap
  },
  ['industry-sitemap'],
  {
    tags: ['industry-sitemap'],
    revalidate: 3600, // Cache for 1 hour
  },
)

export async function GET() {
  const sitemap = await getIndustrySitemap()

  return getServerSideSitemap(sitemap)
}
