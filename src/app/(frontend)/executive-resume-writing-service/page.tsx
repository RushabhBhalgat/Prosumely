import { Suspense } from 'react'
import ExecutiveResumePageContent from '../../../components/industry-content/ExecutiveResumePageContent'

const ExecutiveResumePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    url: 'https://prosumely.com/executive-resume-writing-service',
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
    canonical: 'https://prosumely.com/executive-resume-writing-service',
  },
}

export default ExecutiveResumePage
