import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const InterviewCoachingPageContent = dynamic(
  () => import('../../../components/industry-content/InterviewCoachingPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const InterviewCoachingPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Interview Coaching Service</PageHeading>Loading...
        </div>
      }
    >
      <InterviewCoachingPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: "Interview Coaching Service | Crack Job Interviews | Prosumely's",
  description:
    "Master your next job interview with Prosumely's personalized interview coaching. Get expert tips, mock interviews, and confidence-boosting strategies to land your dream job.",
  keywords: [
    'interview coaching',
    'job interview tips',
    'mock interview',
    'Prosumely',
    'resume writing',
    'job search',
    'career coaching',
  ],
  openGraph: {
    title: "Interview Coaching Service | Crack Job Interviews | Prosumely's",
    description:
      "Master your next job interview with Prosumely's personalized interview coaching. Get expert tips, mock interviews, and confidence-boosting strategies to land your dream job.",
    url: 'https://www.prosumely.com/interview-coaching-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-interview-coaching-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Interview Coaching Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Interview Coaching Service | Crack Job Interviews | Prosumely's",
    description:
      "Master your next job interview with Prosumely's personalized interview coaching. Get expert tips, mock interviews, and confidence-boosting strategies to land your dream job.",
    images: ['/prosumely-interview-coaching-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/interview-coaching-service',
  },
}

export default InterviewCoachingPage
