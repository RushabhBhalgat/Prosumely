import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const VisualResumePageContent = dynamic(
  () => import('../../../components/industry-content/VisualResumePageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const VisualResumePage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Visual Resume Design Service</PageHeading>Loading...
        </div>
      }
    >
      <VisualResumePageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
  description:
    'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
  keywords: [
    'visual resume',
    'ATS resume',
    'resume design',
    'professional CV',
    'Prosumely',
    'job search',
    'resume writing',
  ],
  openGraph: {
    title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
    description:
      'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
    url: 'https://www.prosumely.com/visual-resume-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Visual Resume Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
    description:
      'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/visual-resume-writing-service',
  },
}

export default VisualResumePage
