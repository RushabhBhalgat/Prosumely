'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { limitedServices } from '@/data/limitedServicesData'

// Industry-specific data
const industryData = {
  'construction-industry': {
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
    subtitle: 'Strategic resume writing for supply chain and logistics professionals',
    profiles: [
      'Supply Chain Manager',
      'Logistics Coordinator',
      'Warehouse Manager',
      'Procurement Manager',
      'Transportation Manager',
      'Inventory Manager',
      'Distribution Manager',
      'Operations Analyst',
      'Freight Coordinator',
      'Vendor Manager',
    ],
  },
  'tech-it': {
    title: 'Our Services for Professionals in Tech & IT',
    subtitle: 'Cutting-edge resume writing services for technology and IT professionals',
    profiles: [
      'Software Engineer',
      'Data Scientist',
      'Product Manager',
      'DevOps Engineer',
      'IT Manager',
      'Cybersecurity Analyst',
      'Frontend Developer',
      'Backend Developer',
      'Cloud Architect',
      'QA Engineer',
    ],
  },
  'banking-financial-services-insurance': {
    title: 'Our Services for Professionals in BFSI',
    subtitle: 'Professional resume writing for banking, financial services, and insurance experts',
    profiles: [
      'Investment Banker',
      'Financial Analyst',
      'Risk Manager',
      'Insurance Underwriter',
      'Credit Analyst',
      'Portfolio Manager',
      'Compliance Officer',
      'Relationship Manager',
      'Actuary',
      'Treasury Manager',
    ],
  },
  'healthcare-pharma': {
    title: 'Our Services for Professionals in Healthcare & Pharma',
    subtitle: 'Specialized resume writing for healthcare and pharmaceutical professionals',
    profiles: [
      'Medical Doctor',
      'Pharmacist',
      'Clinical Research Associate',
      'Nurse Practitioner',
      'Medical Device Engineer',
      'Pharmaceutical Sales Rep',
      'Healthcare Administrator',
      'Clinical Data Manager',
      'Regulatory Affairs Manager',
      'Medical Writer',
    ],
  },
  'strategy-consulting': {
    title: 'Our Services for Professionals in Strategy & Consulting',
    subtitle: 'Executive resume writing for strategy consultants and advisory professionals',
    profiles: [
      'Management Consultant',
      'Strategy Consultant',
      'Business Analyst',
      'Senior Associate',
      'Principal Consultant',
      'Partner',
      'Engagement Manager',
      'Research Analyst',
      'Project Leader',
      'Change Management Consultant',
    ],
  },
  'sales-marketing': {
    title: 'Our Services for Professionals in Sales & Marketing',
    subtitle: 'Dynamic resume writing services for sales and marketing professionals',
    profiles: [
      'Sales Manager',
      'Marketing Manager',
      'Account Executive',
      'Brand Manager',
      'Digital Marketing Specialist',
      'Sales Representative',
      'Marketing Analyst',
      'Business Development Manager',
      'Content Marketing Manager',
      'Customer Success Manager',
    ],
  },
  'media-entertainment': {
    title: 'Our Services for Professionals in Media & Entertainment',
    subtitle: 'Creative resume writing for media and entertainment industry professionals',
    profiles: [
      'Content Creator',
      'Producer',
      'Director',
      'Editor',
      'Screenwriter',
      'Cinematographer',
      'Sound Engineer',
      'Marketing Coordinator',
      'Talent Agent',
      'Production Assistant',
    ],
  },
  'human-resources': {
    title: 'Our Services for Professionals in Human Resources',
    subtitle: 'Strategic resume writing for HR professionals and people leaders',
    profiles: [
      'HR Manager',
      'Talent Acquisition Specialist',
      'HR Business Partner',
      'Compensation Analyst',
      'Training Manager',
      'Employee Relations Specialist',
      'HR Generalist',
      'Recruiter',
      'Organizational Development Specialist',
      'Benefits Administrator',
    ],
  },
  'fmcg-retail': {
    title: 'Our Services for Professionals in FMCG & Retail',
    subtitle: 'Consumer-focused resume writing for FMCG and retail professionals',
    profiles: [
      'Brand Manager',
      'Category Manager',
      'Retail Manager',
      'Merchandiser',
      'Store Manager',
      'Supply Chain Coordinator',
      'Product Manager',
      'Sales Executive',
      'Visual Merchandiser',
      'Buyer',
    ],
  },
  'legal-compliance': {
    title: 'Our Services for Professionals in Legal & Compliance',
    subtitle: 'Professional resume writing for legal and compliance experts',
    profiles: [
      'Corporate Lawyer',
      'Compliance Officer',
      'Legal Counsel',
      'Paralegal',
      'Contract Manager',
      'Risk Analyst',
      'Legal Secretary',
      'Litigation Attorney',
      'Regulatory Specialist',
      'Legal Advisor',
    ],
  },
  'public-sector-government': {
    title: 'Our Services for Professionals in Public Sector & Government',
    subtitle: 'Specialized resume writing for government and public sector professionals',
    profiles: [
      'Policy Analyst',
      'Government Relations Manager',
      'Public Administrator',
      'Project Coordinator',
      'Program Manager',
      'Civil Servant',
      'Research Officer',
      'Communications Specialist',
      'Budget Analyst',
      'Urban Planner',
    ],
  },
  'chemicals-materials': {
    title: 'Our Services for Professionals in Chemicals & Materials',
    subtitle: 'Technical resume writing for chemicals and materials industry professionals',
    profiles: [
      'Chemical Engineer',
      'Materials Scientist',
      'Process Engineer',
      'Quality Control Chemist',
      'R&D Scientist',
      'Production Supervisor',
      'Environmental Engineer',
      'Lab Technician',
      'Plant Engineer',
      'Safety Engineer',
    ],
  },
}

const fullServices = [
  {
    id: 1,
    name: 'ATS Resume ',
    tagline: 'Perfect for entry-level professionals',
    price: '$20',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Get a professionally written resume that beats Applicant Tracking Systems (ATS) and gets you shortlisted. Optimized with the right keywords, formatting, and structure.',
    bestFor: 'Recent graduates, career starters',
    path: '/ats-resume-writing-service',
  },
  {
    id: 2,
    name: 'Executive Resume',
    tagline: 'Most popular choice',
    price: '$30',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Position yourself as a leader with a powerful, achievement-driven executive resume. Crafted for senior roles, it highlights your detailed impact, vision, and value proposition.',
    bestFor: 'Mid-level professionals, career changers',
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
    bestFor: 'Serious job seekers, career transformation',
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
      'A well-crafted cover letter that complements your resume and highlights your unique qualifications and experiences. Tailored to the job you are applying for. ',
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

const ProfilesSection = ({
  profiles,
  industryName: _industryName,
}: {
  profiles: string[]
  industryName?: string
}) => {
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

const ServicesPageContent = ({ servicesMode = 'full' }: { servicesMode?: 'full' | 'limited' }) => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Get services based on mode
  const services = servicesMode === 'limited' ? limitedServices : fullServices

  // Get industry-specific data
  const industryInfo = industry ? industryData[industry as keyof typeof industryData] : null

  // Industry name mappings for highlighting
  const industryHighlights = {
    'construction-industry': 'Construction Industry',
    'energy-oil-gas': 'Energy - Oil and Gas',
    'hospitality-tourism': 'Hospitality & Tourism',
    'engineering-manufacturing': 'Engineering & Manufacturing',
    'logistics-supply-chain': 'Logistics & Supply Chain',
    'tech-it': 'Tech & IT',
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

  // Determine header content
  const headerTitle = industryInfo?.title || 'Our Services'
  const headerSubtitle =
    industryInfo?.subtitle ||
    'Professional resume writing services tailored to your career level and goals'

  // Create highlighted title for all industries
  const getHighlightedTitle = () => {
    if (!industry || !industryInfo) return headerTitle

    const industryName = industryHighlights[industry as keyof typeof industryHighlights]
    if (industryName) {
      return (
        <>
          Our Services for Professionals in <span className="text-blue-800">{industryName}</span>
        </>
      )
    }

    return headerTitle
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {getHighlightedTitle()}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{headerSubtitle}</p>
        </div>

        {/* Industry Profiles Section */}
        {industryInfo && (
          <ProfilesSection
            profiles={industryInfo.profiles}
            industryName={
              (industry && industryHighlights[industry as keyof typeof industryHighlights]) ||
              'Your Industry'
            }
          />
        )}

        {/* Services Grid */}
        <div className={`max-w-7xl mx-auto mb-12 ${
          servicesMode === 'limited' 
            ? 'flex flex-wrap justify-center gap-6 px-4' 
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
        }`}>
          {services.map((service) => {
            // Create service URL with query parameters if industry is present
            const serviceUrl = industry ? `${service.path}?industry=${industry}` : service.path

            return (
              <div
                key={service.id}
                className={`relative bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  servicesMode === 'limited' ? 'w-full max-w-sm min-w-[280px] mt-4' : ''
                } ${
                  service.popular ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
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
      </div>
    </section>
  )
}

export default ServicesPageContent
