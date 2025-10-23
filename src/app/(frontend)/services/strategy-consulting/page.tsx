import type { Metadata } from 'next'
import Link from 'next/link'
import { limitedServices } from '@/data/limitedServicesData'
import { getServicesMode } from '@/utilities/getSettings'

const industry = 'strategy-consulting'
const industryDisplayName = 'Strategy & Consulting'

const industryProfiles = [
  'Management Consultant',
  'Strategy Consultant',
  'Business Analyst',
  'Operations Consultant',
  'IT Consultant',
  'Financial Consultant',
  'HR Consultant',
  'Change Management Consultant',
  'Digital Transformation Consultant',
  'Risk Consultant',
]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${industryDisplayName} Resume Services | Professional Career Tools | Prosumely`,
    description: `Specialized resume writing and career services for ${industryDisplayName} professionals. Complete career branding solutions tailored to help you advance in consulting.`,
    openGraph: {
      title: `${industryDisplayName} Services | Prosumely`,
      description: `Professional resume writing services for ${industryDisplayName} professionals`,
      images: [{ url: '/prosumely-pricing-and-services-opengraph.jpg', width: 1200, height: 630, alt: `Prosumely ${industryDisplayName} Services` }],
      locale: 'en_US',
      type: 'website',
    },
    alternates: { canonical: `https://www.prosumely.com/services/strategy-consulting` },
  }
}

const ProfilesSection = ({ profiles }: { profiles: string[] }) => (
  <div className="bg-white py-6 px-6 border-t border-b border-gray-100 mb-12">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-1.5 max-w-4xl mx-auto">
        {profiles.map((profile, index) => (
          <span key={index} className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded-md border border-blue-200">
            <div className="w-1 h-1 bg-blue-600 rounded-full mr-1.5 animate-pulse"></div>
            {profile}
          </span>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">+ 50+ more professional roles</p>
      </div>
    </div>
  </div>
)

export default async function StrategyConsultingServicesPage() {
  const servicesMode = await getServicesMode()

  if (servicesMode !== 'limited') {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Page Not Available</h1>
          <p className="text-xl text-gray-600 mb-8">This page is only available in limited services mode.</p>
          <Link href="/services" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services for Professionals in <span className="text-blue-800">{industryDisplayName}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional resume writing services for strategy and consulting professionals
          </p>
        </div>

        <ProfilesSection profiles={industryProfiles} />

        <div className="flex flex-wrap justify-center gap-6 px-4 max-w-7xl mx-auto mb-12">
          {limitedServices.map((service) => {
            const serviceSlug = service.path.split('/').pop()
            const formUrl = `/services/${serviceSlug}/form`

            return (
              <div key={service.id} className="relative bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm min-w-[280px]">
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-500 italic">{service.tagline}</p>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">{service.price}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mb-6">
                    <p className="text-blue-700 font-medium text-sm">Perfect for: {service.bestFor}</p>
                  </div>
                  <div className="mb-8">
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <Link href={formUrl} className="block w-full">
                    <button className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 ${service.color}`}>
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Need help choosing the right service for your consulting career?</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
