import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateSEOMeta(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/prosumely-ats-resume-writing-opengraph.jpg',
    url,
    noindex = false,
    nofollow = false,
    canonical,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config

  const baseUrl = getServerSideURL()
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const canonicalUrl = canonical || fullUrl
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  // Ensure title follows proper format
  const formattedTitle = title?.includes('Prosumely')
    ? title
    : title
      ? `${title} | Prosumely`
      : 'Prosumely | Professional Resume Writing Services'

  const metadata: Metadata = {
    title: formattedTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'Prosumely' }],
    creator: 'Prosumely',
    publisher: 'Prosumely',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: fullUrl,
      siteName: 'Prosumely',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Prosumely Professional Resume Writing Services',
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [imageUrl],
      creator: '@prosumely',
      site: '@prosumely',
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

// Utility to generate structured data for different page types
export function generateStructuredData(config: {
  type: 'Organization' | 'Article' | 'Service' | 'FAQPage' | 'BreadcrumbList'
  data: any
}) {
  const baseUrl = getServerSideURL()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': config.type,
    ...config.data,
  }

  if (config.type === 'Organization') {
    return {
      ...structuredData,
      name: 'Prosumely',
      url: baseUrl,
      logo: `${baseUrl}/prosumely-logo-lg.png`,
      description:
        'Professional resume writing services and career consulting to help you land your dream job.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91 7559112241', // Replace with actual phone
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.linkedin.com/company/prosumely',
        'https://twitter.com/prosumely',
        // Add other social media URLs
      ],
    }
  }

  return structuredData
}
