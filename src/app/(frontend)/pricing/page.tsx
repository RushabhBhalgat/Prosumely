import Link from 'next/link'
import { getServicesMode } from '@/utilities/getSettings'
import { limitedServices } from '@/data/limitedServicesData'

export const metadata = {
  title: 'Resume Writing Pricing | Affordable ATS Resume Services | Prosumely',
  description:
    'Discover transparent pricing for Prosumely’s professional resume writing services. Get ATS-optimized, keyword-rich resumes, cover letters, LinkedIn makeovers, and more at competitive rates. Boost your job search today!',
  keywords: [
    'resume writing pricing',
    'ATS resume cost',
    'professional resume services',
    'cover letter pricing',
    'LinkedIn profile pricing',
    'Prosumely',
    'affordable resume writing',
    'job search',
  ],
  openGraph: {
    title: 'Resume Writing Pricing | Affordable ATS Resume Services | Prosumely',
    description:
      "Discover transparent pricing for Prosumely's professional resume writing services. Get ATS-optimized, keyword-rich resumes, cover letters, LinkedIn makeovers, and more at competitive rates. Boost your job search today!",
    url: 'https://www.prosumely.com/pricing',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Resume Writing Pricing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Writing Pricing | Affordable ATS Resume Services | Prosumely',
    description:
      'Discover transparent pricing for Prosumely’s professional resume writing services. Get ATS-optimized, keyword-rich resumes, cover letters, LinkedIn makeovers, and more at competitive rates. Boost your job search today!',
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/pricing',
  },
}

export default async function PricingPage() {
  const servicesMode = await getServicesMode()

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
        'Impressive and engaging design presenting each project with a visually compelling layout, highlighting key achievements and captivating viewers with infographics',
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

  const services = servicesMode === 'limited' ? limitedServices : fullServices

  return (
    <section className="bg-gray-50 py-2 md:py-10 lg:py-16 mt-8 md:mt-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10 lg:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional resume writing services tailored to your career level and goals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-2 md:mb-4 lg:mb-8">
          {services.map((service) => {
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
                  <Link href={service.path} className="block w-full">
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
