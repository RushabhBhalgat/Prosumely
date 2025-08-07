import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const CoverLetterWritingPageContent = dynamic(
  () => import('../../../components/industry-content/CoverLetterWritingPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const CoverLetterPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Cover Letter Writing Service</PageHeading>Loading...
        </div>
      }
    >
      <CoverLetterWritingPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: "Cover Letter Writing Service | Professional Cover Letters | Prosumely's",
  description:
    "Get a custom, job-winning cover letter written by Prosumely's experts. Make a strong first impression and complement your resume with a tailored, impactful cover letter.",
  keywords: [
    'cover letter writing',
    'cover letter service',
    'professional cover letter',
    'Prosumely',
    'resume writing',
    'job search',
    'ATS resume',
  ],
  openGraph: {
    title: "Cover Letter Writing Service | Professional Cover Letters | Prosumely's",
    description:
      "Get a custom, job-winning cover letter written by Prosumely's experts. Make a strong first impression and complement your resume with a tailored, impactful cover letter.",
    url: 'https://www.prosumely.com/cover-letter-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-cover-letter-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Cover Letter Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cover Letter Writing Service | Professional Cover Letters | Prosumely's",
    description:
      "Get a custom, job-winning cover letter written by Prosumely's experts. Make a strong first impression and complement your resume with a tailored, impactful cover letter.",
    images: ['/prosumely-cover-letter-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/cover-letter-writing-service',
  },
}

export default CoverLetterPage
