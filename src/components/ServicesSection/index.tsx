import Link from 'next/link'
import { getServicesMode } from '@/utilities/getSettings'
import { limitedServices } from '@/data/limitedServicesData'

export default async function ServicesSection() {
  const servicesMode = await getServicesMode()

  const fullServices = [
    {
      id: 1,
      name: 'ATS Resume ',
      tagline: 'Get shortlisted. At speed!',
      price: '$20',
      color: 'bg-blue-800',
      popular: false,
      description:
        'Get a professionally written resume that beats Applicant Tracking Systems(ATS) and gets you shortlisted. Optimized with the right keywords, formatting, and structure.',
      bestFor: 'Junior and mid-level professionals',
      path: '/ats-resume-writing-service',
    },
    {
      id: 2,
      name: 'Executive Resume',
      tagline: 'Land leadership interviews, faster!',
      price: '$30',
      color: 'bg-blue-800',
      popular: false,
      description:
        'Position yourself as a leader with a powerful, achievement-driven executive resume. Crafted for senior roles, it highlights your detailed impact, vision, and value proposition.',
      bestFor: 'Senior-level professionals & leadership roles',
      path: '/executive-resume-writing-service',
    },
    {
      id: 3,
      name: "Jobseeker's Combo",
      tagline: 'Everything you need to succeed',
      price: '$50',
      color: 'bg-blue-800',
      popular: true,
      description:
        'The Jobseekers Combo is your all-in-one career branding kit—consisting of ATS friendly Executive CV, Cover letter, LinkedIn profile makeover, and a personalized career roadmap.',
      bestFor: 'Mid/Senior level professionals and executives',
      path: '/jobseekers-combo-service',
    },
    {
      id: 4,
      name: 'Project Portfolio',
      tagline: 'A visual journey through your projects',
      price: '$40',
      color: 'bg-blue-800',
      popular: false,
      description:
        'Impressive and engaging design presenting each project with a visually compelling layout, highlighting key achievements and captivating viewers with infographics.',
      bestFor: 'Professionals with project based roles',
      path: '/project-portfolio',
    },
  ]

  const services = servicesMode === 'limited' ? limitedServices : fullServices

  return (
    <section className="bg-gray-50 py-2 md:py-10 lg:py-16 mt-8 md:mt-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10 lg:mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional resume writing services tailored to your career level and goals
          </p>
        </div>

        {/* Services Grid */}
        <div
          className={
            servicesMode === 'limited'
              ? 'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 justify-center items-center max-w-4xl mx-auto mb-2 md:mb-4 lg:mb-8'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-2 md:mb-4 lg:mb-8'
          }
        >
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className={`relative bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                  service.popular ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
                } ${servicesMode === 'limited' ? 'min-h-[480px]' : ''}`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Service Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.tagline}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">{service.price}</span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mb-6">
                    <p className="text-blue-700 font-medium text-sm">
                      Perfect for: {service.bestFor}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8 flex-1">
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Link href={service.path} className="block w-full mt-auto">
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 ${service.color}`}
                    >
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
