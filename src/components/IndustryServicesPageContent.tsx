'use client'

import Link from 'next/link'
import { limitedServices } from '@/data/limitedServicesData'

// Full services from existing ServicesPageContent component
const fullServices = [
  {
    id: 1,
    name: 'ATS Resume',
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
    name: "Jobseekers's Combo",
    tagline: 'Everything you need to succeed',
    price: '$50',
    color: 'bg-blue-800',
    popular: true,
    description:
      'The Jobseekers Combo is your all-in-one career branding kit—consisting of ATS friendly Executive CV, Cover letter, LinkedIn profile makeover, and a personalized career roadmap.',
    bestFor: 'Mid/Senior level professionals & leadership roles',
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
  {
    id: 5,
    name: 'LinkedIn Profile',
    tagline: 'Optimize your professional presence',
    price: '$20',
    color: 'bg-blue-800',
    popular: false,
    description:
      'We optimize your profile to attract recruiters. This service includes a complete profile review, keyword optimization, and content enhancement.',
    bestFor: 'Professionals looking to enhance their online presence',
    path: '/linkedin-profile-makeover',
  },
  {
    id: 6,
    name: 'SOP',
    tagline: 'Statement of Purpose Writing',
    price: '$25',
    color: 'bg-blue-800',
    popular: false,
    description:
      'We help you articulate your goals, experiences, and aspirations effectively. Includes a personalized SOP tailored to your academic and career objectives.',
    bestFor: 'Graduate school applicants, international students',
    path: '/sop-writing-service',
  },
  {
    id: 7,
    name: 'Career Roadmap',
    tagline: 'Plan bold, Move smart. Achieve more.',
    price: '$20',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Turn your ambition into an actionable career roadmap. We design step-by-step plans tailored to your long-term goals. Follow the roadmap—and move confidently toward your dream career.',
    bestFor: 'Mid-level professionals, career changers',
    path: '/career-roadmap-service',
  },
  {
    id: 8,
    name: 'Cover Letter',
    tagline: 'Craft a compelling introduction',
    price: '$10',
    color: 'bg-blue-800',
    popular: false,
    description:
      'A well-crafted cover letter that complements your resume and highlights your unique qualifications and experiences. Tailored to the job you are applying for.',
    bestFor: 'Job seekers looking to make a strong first impression',
    path: '/cover-letter-writing-service',
  },
  {
    id: 9,
    name: 'Interview Coaching',
    tagline: 'Crack interviews with confidence.',
    price: '$20',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Our personalized coaching helps you master answers, body language, and mindset. Stand out, stay sharp, and land your dream job with ease.',
    bestFor: 'Anyone preparing for job interviews',
    path: '/interview-coaching-service',
  },
  {
    id: 10,
    name: 'Academic CV Writing',
    tagline: 'Reflect your scholarly excellence.',
    price: '$30',
    color: 'bg-blue-800',
    popular: false,
    description:
      'We craft detailed, structured CVs tailored for research, grants, fellowships, and faculty roles. Position yourself as a credible scholar.',
    bestFor: 'Researchers, Professors and PHD candidates',
    path: '/academic-cv-writing-service',
  },
  {
    id: 11,
    name: 'Membership Application',
    tagline: 'Gateway to prestigious memberships',
    price: '$30',
    color: 'bg-blue-800',
    popular: false,
    description:
      'We craft applications for elite professional bodies, industry associations, & academic societies. We position you for acceptance.',
    bestFor: 'Candidates seeking membership in industry bodies.',
    path: '/membership-application-service',
  },
]

// Industry-specific data
const industryData = {
  construction: {
    title: 'Our Services for Professionals in Construction Industry',
    subtitle:
      'Specialized resume writing services tailored for construction professionals to help you build your career foundation',
    profiles: [
      'Construction Manager',
      'Project Manager',
      'Contract Manager',
      'Site Supervisor',
      'Civil Engineer',
      'Structural Engineer',
      'Construction Estimator',
      'Safety Manager',
      'Quality Control Inspector',
      'Construction Coordinator',
    ],
  },
  'energy-oil-gas': {
    title: 'Our Services for Professionals in Energy - Oil and Gas',
    subtitle:
      'Expert resume writing services for energy sector professionals to fuel your career growth',
    profiles: [
      'Petroleum Engineer',
      'Drilling Engineer',
      'Production Engineer',
      'Reservoir Engineer',
      'HSE Manager',
      'Operations Manager',
      'Geologist',
      'Field Engineer',
      'Process Engineer',
      'Pipeline Engineer',
    ],
  },
  'hospitality-tourism': {
    title: 'Our Services for Professionals in Hospitality & Tourism',
    subtitle:
      'Specialized resumes for hospitality professionals to create exceptional career experiences',
    profiles: [
      'Hotel Manager',
      'Front Office Manager',
      'Food & Beverage Manager',
      'Event Manager',
      'Travel Consultant',
      'Tour Guide',
      'Restaurant Manager',
      'Guest Relations Manager',
      'Housekeeping Manager',
      'Revenue Manager',
    ],
  },
  'engineering-manufacturing': {
    title: 'Our Services for Professionals in Engineering & Manufacturing',
    subtitle: 'Technical resume writing services for engineers and manufacturing professionals',
    profiles: [
      'Mechanical Engineer',
      'Manufacturing Engineer',
      'Quality Engineer',
      'Production Manager',
      'Process Engineer',
      'Design Engineer',
      'Plant Manager',
      'Maintenance Engineer',
      'Industrial Engineer',
      'Automation Engineer',
    ],
  },
  'logistics-supply-chain': {
    title: 'Our Services for Professionals in Logistics & Supply Chain',
    subtitle: 'Professional resume writing services for logistics and supply chain professionals',
    profiles: [
      'Supply Chain Manager',
      'Logistics Coordinator',
      'Warehouse Manager',
      'Transportation Manager',
      'Procurement Manager',
      'Inventory Manager',
      'Distribution Manager',
      'Freight Forwarder',
      'Operations Analyst',
      'Demand Planner',
    ],
  },
  // Add more industry data as needed
}

interface IndustryServicesPageContentProps {
  industry: string
  industryDisplayName: string
  servicesMode: 'full' | 'limited'
}

const ProfilesSection = ({ profiles }: { profiles: string[] }) => {
  return (
    <div className="bg-white py-6 px-6 border-t border-b border-gray-100 mb-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-1.5 max-w-4xl mx-auto">
          {profiles.map((profile, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded-md border border-blue-200 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
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
}

export default function IndustryServicesPageContent({
  industry,
  industryDisplayName,
  servicesMode,
}: IndustryServicesPageContentProps) {
  // Get services based on mode
  const services = servicesMode === 'limited' ? limitedServices : fullServices

  // Get industry-specific data
  const industryInfo = industryData[industry as keyof typeof industryData]

  // Create service URLs with industry context
  const getServiceUrl = (servicePath: string) => {
    if (servicesMode === 'limited') {
      // For limited services, use the new URL structure
      const serviceSlug = servicePath.split('/').pop()
      return `/${industry}-industry/services/${serviceSlug}`
    } else {
      // For full services, use traditional structure with query params
      return `${servicePath}?industry=${industry}`
    }
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services for Professionals in{' '}
            <span className="text-blue-800">{industryDisplayName}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {industryInfo?.subtitle ||
              `Professional resume writing services tailored for ${industryDisplayName.toLowerCase()} professionals`}
          </p>
        </div>

        {/* Industry Profiles Section */}
        {industryInfo && <ProfilesSection profiles={industryInfo.profiles} />}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service) => {
            const serviceUrl = getServiceUrl(service.path)

            return (
              <div
                key={service.id}
                className={`relative bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  service.popular ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6">
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
                  <div className="mb-8">
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Link href={serviceUrl} className="block w-full">
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

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to advance your career in {industryDisplayName}?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the service that best fits your career goals and let our experts help you create
            professional materials that get results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Us for Custom Solutions
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
