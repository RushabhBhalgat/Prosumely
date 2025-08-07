import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const LinkedInProfilePageContent = dynamic(
  () => import('../../../components/industry-content/LinkedInProfilePageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const LinkedInProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">LinkedIn Profile Optimization</PageHeading>Loading...
        </div>
      }
    >
      <LinkedInProfilePageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
  description:
    "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
  keywords: [
    'LinkedIn profile makeover',
    'LinkedIn optimization',
    'professional branding',
    'Prosumely',
    'resume writing',
    'job search',
    'career growth',
  ],
  openGraph: {
    title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
    description:
      "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
    url: 'https://www.prosumely.com/linkedin-profile-makeover',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-linkedin-profile-makeover-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely LinkedIn Profile Makeover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
    description:
      "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
    images: ['/prosumely-linkedin-profile-makeover-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/linkedin-profile-makeover',
  },
}

export default LinkedInProfilePage
