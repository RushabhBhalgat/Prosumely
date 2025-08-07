import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const SOPWritingPageContent = dynamic(
  () => import('../../../components/industry-content/SOPWritingPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const SOPWritingPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Statement of Purpose Writing</PageHeading>Loading...
        </div>
      }
    >
      <SOPWritingPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'SOP Writing Service | Statement of Purpose Experts | Prosumely',
  description:
    'Get a compelling Statement of Purpose (SOP) written by Prosumely’s expert writers. Perfect for university, visa, and job applications. Stand out with a personalized, impactful SOP.',
  keywords: [
    'SOP writing',
    'statement of purpose',
    'SOP service',
    'university application',
    'visa SOP',
    'Prosumely',
    'resume writing',
  ],
  openGraph: {
    title: 'SOP Writing Service | Statement of Purpose Experts | Prosumely',
    description:
      "Get a compelling Statement of Purpose (SOP) written by Prosumely's expert writers. Perfect for university, visa, and job applications. Stand out with a personalized, impactful SOP.",
    url: 'https://www.prosumely.com/sop-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-sop-writing-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely SOP Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOP Writing Service | Statement of Purpose Experts | Prosumely',
    description:
      "Get a compelling Statement of Purpose (SOP) written by Prosumely's expert writers. Perfect for university, visa, and job applications. Stand out with a personalized, impactful SOP.",
    images: ['/prosumely-sop-writing-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/sop-writing-service',
  },
}

export default SOPWritingPage
