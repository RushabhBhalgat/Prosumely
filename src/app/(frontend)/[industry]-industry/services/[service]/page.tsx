import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServicesMode } from '@/utilities/getSettings'

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

// Service mapping
const serviceMapping: Record<string, string> = {
  'ats-resume': 'ATS Resume Writing',
  'executive-resume': 'Executive Resume Writing',
  'academic-cv': 'Academic CV Writing',
  'cover-letter': 'Cover Letter Writing',
  'linkedin-profile': 'LinkedIn Profile Makeover',
  'project-portfolio': 'Project Portfolio',
  'jobseekers-combo': 'Jobseeker\'s Combo',
  'interview-coaching': 'Interview Coaching',
  'sop-writing': 'SOP Writing',
  'career-roadmap': 'Career Roadmap',
  'membership-application': 'Membership Application',
}

interface Params {
  industry: string
  service: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industry, service } = await params
  const industryDisplayName = industryMapping[industry]
  const serviceDisplayName = serviceMapping[service]
  
  if (!industryDisplayName || !serviceDisplayName) {
    return {
      title: 'Service Not Found | Prosumely',
    }
  }

  return {
    title: `${serviceDisplayName} for ${industryDisplayName} | Prosumely`,
    description: `Professional ${serviceDisplayName.toLowerCase()} services specifically tailored for ${industryDisplayName} professionals. Expert career services to advance your career.`,
    openGraph: {
      title: `${serviceDisplayName} for ${industryDisplayName} | Prosumely`,
      description: `Professional ${serviceDisplayName.toLowerCase()} services for ${industryDisplayName} professionals`,
      images: [
        {
          url: '/prosumely-pricing-and-services-opengraph.jpg',
          width: 1200,
          height: 630,
          alt: `Prosumely ${serviceDisplayName} for ${industryDisplayName}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceDisplayName} for ${industryDisplayName} | Prosumely`,
      description: `Professional ${serviceDisplayName.toLowerCase()} services for ${industryDisplayName} professionals`,
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
  const industryDisplayName = industryMapping[industry]
  const serviceDisplayName = serviceMapping[service]
  
  if (!industryDisplayName || !serviceDisplayName) {
    notFound()
  }

  const servicesMode = await getServicesMode()

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {serviceDisplayName} for {industryDisplayName}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional {serviceDisplayName.toLowerCase()} services specifically tailored for {industryDisplayName} professionals.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <p className="text-blue-700">
            This service is currently being developed. Please visit our main services page to explore our available offerings.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Services
          </a>
        </div>
      </div>
    </div>
  )
}