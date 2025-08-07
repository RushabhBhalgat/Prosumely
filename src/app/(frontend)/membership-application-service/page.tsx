import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const MembershipApplicationPageContent = dynamic(
  () => import('../../../components/industry-content/MembershipApplicationPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const MembershipApplicationPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Membership Application Service</PageHeading>Loading...
        </div>
      }
    >
      <MembershipApplicationPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Membership Application Service | Professional Associations | Prosumely',
  description:
    'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
  keywords: [
    'membership application',
    'professional association',
    'industry membership',
    'academic society',
    'Prosumely',
    'resume writing',
    'career advancement',
  ],
  openGraph: {
    title: 'Membership Application Service | Professional Associations | Prosumely',
    description:
      'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
    url: 'https://www.prosumely.com/membership-application-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-membership-application-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Membership Application Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Membership Application Service | Professional Associations | Prosumely',
    description:
      'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
    images: ['/prosumely-membership-application-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/membership-application-service',
  },
}

export default MembershipApplicationPage
