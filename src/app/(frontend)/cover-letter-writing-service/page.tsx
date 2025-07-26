import CoverLetterWritingPageContent from '../../../components/industry-content/CoverLetterWritingPageContent'
import { Suspense } from 'react'

const CoverLetterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    url: 'https://prosumely.com/cover-letter-writing-service',
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
    canonical: 'https://prosumely.com/cover-letter-writing-service',
  },
}

export default CoverLetterPage
