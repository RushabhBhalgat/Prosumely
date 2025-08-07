import { PageHeading } from '@/components/SEO/PageHeading'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for large content component
const ATSResumePageContent = dynamic(
  () => import('../../../components/industry-content/ATSResumePageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const ATSResumePage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">ATS Resume Writing Service</PageHeading>Loading...
        </div>
      }
    >
      <ATSResumePageContent />
    </Suspense>
  )
}

export const metadata = {
  title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
  description:
    "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
  keywords: [
    'ATS resume writing',
    'ATS resume service',
    'applicant tracking system',
    'resume optimization',
    'Prosumely',
    'resume writing',
    'job search',
  ],
  openGraph: {
    title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
    description:
      "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
    url: 'https://www.prosumely.com/ats-resume-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely ATS Resume Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
    description:
      "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/ats-resume-writing-service',
  },
}

export default ATSResumePage
