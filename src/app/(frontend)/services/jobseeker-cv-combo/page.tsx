import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import ServiceProductPage from '@/components/ServiceProductPage'

const serviceData = limitedServicesData.jobseekerCvCombo

export const metadata: Metadata = {
  title: "Jobseeker's CV Combo | Complete Career Branding Kit | Prosumely",
  description:
    "Get the ultimate jobseeker's combo: ATS-friendly Executive CV, Cover letter, LinkedIn profile makeover, and project portfolio. Complete career branding kit for $130.",
  openGraph: {
    title: "Jobseeker's CV Combo | Complete Career Branding Kit | Prosumely",
    description:
      'Ultimate career branding package with Executive CV, Cover Letter, LinkedIn makeover, and Project Portfolio for ambitious professionals.',
    images: [
      {
        url: '/prosumely-jobseekers-combo-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: "Prosumely Jobseeker's CV Combo Service",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jobseeker's CV Combo | Complete Career Branding Kit | Prosumely",
    description:
      'Ultimate career branding package with Executive CV, Cover Letter, LinkedIn makeover, and Project Portfolio.',
    images: ['/prosumely-jobseekers-combo-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/services/jobseeker-cv-combo',
  },
}

export default function JobseekerCvComboPage() {
  return <ServiceProductPage {...serviceData} />
}
