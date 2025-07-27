import SOPWritingPageContent from '../../../components/industry-content/SOPWritingPageContent'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'
const SOPWritingPage = () => {
  return (
    <Suspense fallback={<div>
      <PageHeading as="h1">Statement of Purpose Writing</PageHeading>Loading...</div>}>
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
