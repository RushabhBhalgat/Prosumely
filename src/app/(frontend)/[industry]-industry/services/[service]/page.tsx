import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { limitedServicesData } from '@/data/limitedServicesData'
import ServiceProductPage from '@/components/ServiceProductPage'
import { getServicesMode } from '@/utilities/getSettings'

// Define valid industries and services
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

const validLimitedServices = [
  'jobseeker-cv-combo',
  'jobseeker-personal-website',
  'cv-personal-website-combo',
]

// Service slug to data key mapping
const serviceDataKeys: Record<string, keyof typeof limitedServicesData> = {
  'jobseeker-cv-combo': 'jobseekerCvCombo',
  'jobseeker-personal-website': 'jobseekerPersonalWebsite',
  'cv-personal-website-combo': 'cvPersonalWebsiteCombo',
}

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
  service: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industry, service } = await params

  // Validate parameters
  if (!validIndustries.includes(industry) || !validLimitedServices.includes(service)) {
    return {
      title: 'Service Not Found',
    }
  }

  const servicesMode = await getServicesMode()

  // Only show these routes when in limited services mode
  if (servicesMode !== 'limited') {
    return {
      title: 'Service Not Available',
    }
  }

  const industryName = industryDisplayNames[industry] || industry
  const serviceDataKey = serviceDataKeys[service]

  if (!serviceDataKey) {
    return {
      title: 'Service Not Found',
    }
  }

  const serviceData = limitedServicesData[serviceDataKey]

  return {
    title: `${serviceData.service.title} for ${industryName} | Prosumely`,
    description:
      `${serviceData.service.description.replace(/<[^>]*>/g, '')} Specialized for ${industryName} professionals.`.substring(
        0,
        160,
      ),
    openGraph: {
      title: `${serviceData.service.title} for ${industryName} | Prosumely`,
      description: `Professional ${serviceData.service.title.toLowerCase()} service for ${industryName} professionals`,
      images: [
        {
          url: '/prosumely-pricing-and-services-opengraph.jpg',
          width: 1200,
          height: 630,
          alt: `Prosumely ${serviceData.service.title} for ${industryName}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceData.service.title} for ${industryName} | Prosumely`,
      description: `Professional ${serviceData.service.title.toLowerCase()} service for ${industryName} professionals`,
      images: ['/prosumely-pricing-and-services-opengraph.jpg'],
      site: '@prosumely',
    },
    alternates: {
      canonical: `https://www.prosumely.com/${industry}-industry/services/${service}`,
    },
  }
}

export default async function IndustryServicePage({ params }: { params: Promise<Params> }) {
  const { industry, service } = await params

  // Validate parameters
  if (!validIndustries.includes(industry) || !validLimitedServices.includes(service)) {
    notFound()
  }

  const servicesMode = await getServicesMode()

  // Only show these routes when in limited services mode
  if (servicesMode !== 'limited') {
    notFound()
  }

  const industryDisplayName = industryDisplayNames[industry]
  const serviceDataKey = serviceDataKeys[service]

  if (!serviceDataKey) {
    notFound()
  }

  const serviceData = limitedServicesData[serviceDataKey]

  // Create industry-specific subtitle
  const industrySubtitle = `For ${industryDisplayName} Professionals`

  return <ServiceProductPage {...serviceData} industrySubtitle={industrySubtitle} />
}

// Generate static params for build time
export async function generateStaticParams() {
  const params = []

  for (const industry of validIndustries) {
    for (const service of validLimitedServices) {
      params.push({
        industry,
        service,
      })
    }
  }

  return params
}
