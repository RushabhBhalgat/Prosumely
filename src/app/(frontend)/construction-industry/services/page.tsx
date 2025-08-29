import type { Metadata } from 'next'
import IndustryServicesPageContent from '@/components/IndustryServicesPageContent'
import { getServicesMode } from '@/utilities/getSettings'

const industry = 'construction'
const industryDisplayName = 'Construction Industry'

export async function generateMetadata(): Promise<Metadata> {
  const servicesMode = await getServicesMode()
  const serviceCount = servicesMode === 'limited' ? '3' : '11'

  return {
    title: `${industryDisplayName} Services | Professional Resume Writing | Prosumely`,
    description: `Specialized resume writing and career services for ${industryDisplayName} professionals. ${serviceCount} services tailored to help you advance your career in ${industryDisplayName.toLowerCase()}.`,
    openGraph: {
      title: `${industryDisplayName} Services | Prosumely`,
      description: `Professional resume writing services for ${industryDisplayName} professionals`,
      images: [
        {
          url: '/prosumely-pricing-and-services-opengraph.jpg',
          width: 1200,
          height: 630,
          alt: `Prosumely ${industryDisplayName} Services`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industryDisplayName} Services | Prosumely`,
      description: `Professional resume writing services for ${industryDisplayName} professionals`,
      images: ['/prosumely-pricing-and-services-opengraph.jpg'],
      site: '@prosumely',
    },
    alternates: {
      canonical: `https://www.prosumely.com/${industry}-industry/services`,
    },
  }
}

export default async function ConstructionIndustryServicesPage() {
  const servicesMode = await getServicesMode()

  return (
    <IndustryServicesPageContent
      industry={industry}
      industryDisplayName={industryDisplayName}
      servicesMode={servicesMode}
    />
  )
}