import type { Metadata } from 'next'
import IndustryServicesPageContent from '@/components/IndustryServicesPageContent'
import { getServicesMode } from '@/utilities/getSettings'
import { notFound } from 'next/navigation'

// Industry mapping
const industryMapping: Record<string, string> = {
  'hospitality-tourism': 'Hospitality & Tourism',
  'engineering-manufacturing': 'Engineering & Manufacturing',
  'logistics-supply-chain': 'Logistics & Supply Chain',
  'banking-financial-services-insurance': 'BFSI',
  'healthcare-pharma': 'Healthcare & Pharma',
  'strategy-consulting': 'Strategy & Consulting',
  'sales-marketing': 'Sales & Marketing',
  'media-entertainment': 'Media & Entertainment',
  'human-resources': 'Human Resources',
  'fmcg-retail': 'FMCG & Retail',
  'legal-compliance': 'Legal & Compliance',
  'public-sector-government': 'Public Sector & Government',
  'chemicals-materials': 'Chemicals & Materials',
}

interface Params {
  industry: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industry } = await params
  const industryDisplayName = industryMapping[industry]
  
  if (!industryDisplayName) {
    return {
      title: 'Industry Not Found | Prosumely',
    }
  }

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

export default async function IndustryServicesPage({ params }: { params: Promise<Params> }) {
  const { industry } = await params
  const industryDisplayName = industryMapping[industry]
  
  if (!industryDisplayName) {
    notFound()
  }

  const servicesMode = await getServicesMode()

  return (
    <IndustryServicesPageContent
      industry={industry}
      industryDisplayName={industryDisplayName}
      servicesMode={servicesMode}
    />
  )
}