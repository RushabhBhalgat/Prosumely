import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const JobseekersComboPageContent = dynamic(
  () => import('../../../components/industry-content/JobseekersComboPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const JobseekersComboPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Job Seekers Combo Package</PageHeading>Loading...
        </div>
      }
    >
      <JobseekersComboPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
  description:
    "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
  keywords: [
    'jobseekers combo',
    'career kit',
    'ATS resume',
    'executive CV',
    'cover letter',
    'LinkedIn profile',
    'career roadmap',
    'Prosumely',
    'resume writing',
    'job search',
  ],
  openGraph: {
    title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
    description:
      "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
    url: 'https://www.prosumely.com/jobseekers-combo-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-jobseekers-combo-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Jobseekers Combo Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
    description:
      "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
    images: ['/prosumely-jobseekers-combo-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/jobseekers-combo-service',
  },
}

export default JobseekersComboPage
