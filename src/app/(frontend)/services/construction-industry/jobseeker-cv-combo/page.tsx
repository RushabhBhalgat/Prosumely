import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import IndustryServiceProductPage from '@/components/IndustryServiceProductPage'
import { getServicesMode } from '@/utilities/getSettings'
import { redirect } from 'next/navigation'

const serviceData = limitedServicesData.jobseekerCvCombo
const industry = 'construction'
const industryDisplayName = 'Construction Industry'

export const metadata: Metadata = {
  title: `Jobseeker's CV Combo for ${industryDisplayName} | Prosumely`,
  description: `Get the ultimate jobseeker's combo for construction professionals: ATS-friendly Executive CV, Cover letter, LinkedIn profile makeover, and project portfolio. Complete career branding kit for construction industry.`,
  openGraph: {
    title: `Jobseeker's CV Combo for ${industryDisplayName} | Prosumely`,
    description: `Ultimate career branding package for construction professionals with Executive CV, Cover Letter, LinkedIn makeover, and Project Portfolio.`,
    images: [
      {
        url: '/prosumely-jobseekers-combo-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: `Prosumely Jobseeker's CV Combo Service for Construction Industry`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Jobseeker's CV Combo for ${industryDisplayName} | Prosumely`,
    description: `Ultimate career branding package for construction professionals.`,
    images: ['/prosumely-jobseekers-combo-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: `https://www.prosumely.com/services/construction-industry/jobseeker-cv-combo`,
  },
}

export default async function ConstructionJobseekerCvComboPage() {
  const servicesMode = await getServicesMode()

  // Only show this page in limited services mode
  if (servicesMode !== 'limited') {
    redirect('/services')
  }

  // Update the redirect link to use general form (not industry-specific)
  const constructionServiceData = {
    ...serviceData,
    redirectLink: '/services/jobseeker-cv-combo/form',
  }

  return (
    <IndustryServiceProductPage
      {...constructionServiceData}
      industry={industry}
      industryDisplayName={industryDisplayName}
    />
  )
}
