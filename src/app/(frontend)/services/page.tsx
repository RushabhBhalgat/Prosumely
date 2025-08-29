import { Suspense } from 'react'
import ServicesPageContent from '@/components/ServicesPageContent'
import { getServicesMode } from '@/utilities/getSettings'

const ServicesPage = async () => {
  const servicesMode = await getServicesMode()

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesPageContent servicesMode={servicesMode} />
      </Suspense>
    </>
  )
}

export const metadata = {
  title: 'Resume Writing Services | ATS-Optimized CVs & Career Tools | Prosumely',
  description:
    "Explore Prosumely's full suite of resume writing services: ATS resumes, executive CVs, cover letters, LinkedIn makeovers, SOPs, and more. Get expert help to land your dream job faster!",
  keywords: [
    'resume writing services',
    'ATS resume',
    'executive resume',
    'cover letter',
    'LinkedIn profile',
    'SOP writing',
    'career tools',
    'Prosumely',
    'job search',
  ],
  openGraph: {
    title: 'Resume Writing Services | ATS-Optimized CVs & Career Tools | Prosumely',
    description:
      "Explore Prosumely's full suite of resume writing services: ATS resumes, executive CVs, cover letters, LinkedIn makeovers, SOPs, and more. Get expert help to land your dream job faster!",
    url: 'https://www.prosumely.com/services',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Resume Writing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Writing Services | ATS-Optimized CVs & Career Tools | Prosumely',
    description:
      "Explore Prosumely's full suite of resume writing services: ATS resumes, executive CVs, cover letters, LinkedIn makeovers, SOPs, and more. Get expert help to land your dream job faster!",
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/services',
  },
}

export default ServicesPage
