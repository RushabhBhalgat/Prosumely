import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const ExecutiveResumePageContent = dynamic(
  () => import('../../../components/industry-content/ExecutiveResumePageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const ExecutiveResumePage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Executive Resume Writing Service</PageHeading>Loading...
        </div>
      }
    >
      <ExecutiveResumePageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Executive Resume Writing Service | Leadership CVs | Prosumely',
  description:
    'Position yourself as a leader with a powerful, achievement-driven executive resume from Prosumely. Highlight your impact, vision, and executive presence for senior roles.',
  keywords: [
    'executive resume writing',
    'leadership CV',
    'senior resume',
    'executive CV',
    'Prosumely',
    'resume writing',
    'job search',
  ],
  openGraph: {
    title: 'Executive Resume Writing Service | Leadership CVs | Prosumely',
    description:
      'Position yourself as a leader with a powerful, achievement-driven executive resume from Prosumely. Highlight your impact, vision, and executive presence for senior roles.',
    url: 'https://www.prosumely.com/executive-resume-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-execuitve-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Executive Resume Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Resume Writing Service | Leadership CVs | Prosumely',
    description:
      'Position yourself as a leader with a powerful, achievement-driven executive resume from Prosumely. Highlight your impact, vision, and executive presence for senior roles.',
    images: ['/prosumely-execuitve-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/executive-resume-writing-service',
  },
}

export default ExecutiveResumePage
