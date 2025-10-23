import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import IndustryServiceProductPage from '@/components/IndustryServiceProductPage'
import { getServicesMode } from '@/utilities/getSettings'
import { redirect } from 'next/navigation'

const serviceData = limitedServicesData.jobseekerPersonalWebsite
const industry = 'construction'
const industryDisplayName = 'Construction Industry'

export const metadata: Metadata = {
  title: `Jobseeker's Personal Website for ${industryDisplayName} | Prosumely`,
  description: `Establish your digital presence as a construction professional with a professional personal website. Showcase your expertise, projects, and achievements in the construction industry.`,
  openGraph: {
    title: `Jobseeker's Personal Website for ${industryDisplayName} | Prosumely`,
    description: `Professional personal website for construction industry professionals. Your digital brand hub.`,
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: `Prosumely Personal Website Service for Construction Industry`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Jobseeker's Personal Website for ${industryDisplayName} | Prosumely`,
    description: `Professional personal website for construction industry professionals.`,
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: `https://www.prosumely.com/services/construction-industry/jobseeker-personal-website`,
  },
}

export default async function ConstructionJobseekerPersonalWebsitePage() {
  const servicesMode = await getServicesMode()

  // Only show this page in limited services mode
  if (servicesMode !== 'limited') {
    redirect('/services')
  }

  // Update the redirect link to use general form (not industry-specific)
  const constructionServiceData = {
    ...serviceData,
    redirectLink: '/services/jobseeker-personal-website/form',
  }

  return (
    <IndustryServiceProductPage
      {...constructionServiceData}
      industry={industry}
      industryDisplayName={industryDisplayName}
    />
  )
}
