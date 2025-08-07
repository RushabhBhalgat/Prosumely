import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const AcademicCVWritingPageContent = dynamic(
  () => import('../../../components/industry-content/AcademicCVWritingPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const AcademicCVPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Academic CV Writing Service</PageHeading>Loading...
        </div>
      }
    >
      <AcademicCVWritingPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
  description:
    "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
  keywords: [
    'academic CV writing',
    'academic resume',
    'PhD CV',
    'research CV',
    'Prosumely',
    'scholarly resume',
    'resume writing',
  ],
  openGraph: {
    title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
    description:
      "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
    url: 'https://www.prosumely.com/academic-cv-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-academic-cv-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Academic CV Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
    description:
      "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
    images: ['/prosumely-academic-cv-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/academic-cv-writing-service',
  },
}

export default AcademicCVPage
