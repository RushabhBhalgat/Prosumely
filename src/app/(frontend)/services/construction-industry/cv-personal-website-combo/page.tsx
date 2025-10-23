import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import IndustryServiceProductPage from '@/components/IndustryServiceProductPage'
import { getServicesMode } from '@/utilities/getSettings'
import { redirect } from 'next/navigation'

const serviceData = limitedServicesData.cvPersonalWebsiteCombo
const industry = 'construction'
const industryDisplayName = 'Construction Industry'

export const metadata: Metadata = {
  title: `CV and Personal Website Combo for ${industryDisplayName} | Prosumely`,
  description: `Ultimate personal branding package for construction professionals! Get Executive CV, Cover Letter, LinkedIn makeover, Project Portfolio, and a professional website. Complete career transformation.`,
  openGraph: {
    title: `CV and Personal Website Combo for ${industryDisplayName} | Prosumely`,
    description: `Ultimate personal branding package for construction industry professionals with CV and website.`,
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: `Prosumely CV and Website Combo for Construction Industry`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `CV and Personal Website Combo for ${industryDisplayName} | Prosumely`,
    description: `Ultimate personal branding package for construction professionals.`,
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: `https://www.prosumely.com/services/construction-industry/cv-personal-website-combo`,
  },
}

export default async function ConstructionCvPersonalWebsiteComboPage() {
  const servicesMode = await getServicesMode()

  // Only show this page in limited services mode
  if (servicesMode !== 'limited') {
    redirect('/services')
  }

  // Update the redirect link to use general form (not industry-specific)
  const constructionServiceData = {
    ...serviceData,
    redirectLink: '/services/cv-personal-website-combo/form',
  }

  return (
    <IndustryServiceProductPage
      {...constructionServiceData}
      industry={industry}
      industryDisplayName={industryDisplayName}
    />
  )
}
