import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IndustryServicesPageContent from '@/components/IndustryServicesPageContent'
import { getServicesMode } from '@/utilities/getSettings'

// Define valid industries
const validIndustries = [
  'construction',
  'energy-oil-gas',
  'hospitality-tourism',
  'engineering-manufacturing',
  'logistics-supply-chain',
  'tech-it',
  'banking-financial-services-insurance',
  'healthcare-pharma',
  'strategy-consulting',
  'sales-marketing',
  'media-entertainment',
  'human-resources',
  'fmcg-retail',
  'legal-compliance',
  'public-sector-government',
  'chemicals-materials',
]

// Industry display names
const industryDisplayNames: Record<string, string> = {
  construction: 'Construction Industry',
  'energy-oil-gas': 'Energy - Oil and Gas',
  'hospitality-tourism': 'Hospitality & Tourism',
  'engineering-manufacturing': 'Engineering & Manufacturing',
  'logistics-supply-chain': 'Logistics & Supply Chain',
  'tech-it': 'Tech & IT',
  'banking-financial-services-insurance': 'Banking, Financial Services & Insurance',
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

type Params = {
  industry: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industry } = await params

  if (!validIndustries.includes(industry)) {
    return {
      title: 'Industry Not Found',
    }
  }

  const industryName = industryDisplayNames[industry] || industry
  const servicesMode = await getServicesMode()
  const serviceCount = servicesMode === 'limited' ? '3' : '11'

  return {
    title: `${industryName} Services | Professional Resume Writing | Prosumely`,
    description: `Specialized resume writing and career services for ${industryName} professionals. ${serviceCount} services tailored to help you advance your career in ${industryName.toLowerCase()}.`,
    openGraph: {
      title: `${industryName} Services | Prosumely`,
      description: `Professional resume writing services for ${industryName} professionals`,
      images: [
        {
          url: '/prosumely-pricing-and-services-opengraph.jpg',
          width: 1200,
          height: 630,
          alt: `Prosumely ${industryName} Services`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industryName} Services | Prosumely`,
      description: `Professional resume writing services for ${industryName} professionals`,
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

  // Validate industry
  if (!validIndustries.includes(industry)) {
    notFound()
  }

  const servicesMode = await getServicesMode()
  const industryDisplayName = industryDisplayNames[industry] || industry

  return (
    <IndustryServicesPageContent
      industry={industry}
      industryDisplayName={industryDisplayName}
      servicesMode={servicesMode}
    />
  )
}

// Generate static params for build time
export async function generateStaticParams() {
  return validIndustries.map((industry) => ({
    industry,
  }))
}
