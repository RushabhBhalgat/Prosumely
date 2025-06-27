import Link from 'next/link'
import path from 'path'
const services = [
  {
    id: 1,
    name: 'ATS Resume ',
    tagline: 'Perfect for entry-level professionals',
    price: '$20',
    color: 'bg-blue-600',
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
    color: 'bg-blue-700',
    popular: false,
    description:
      'Position yourself as a leader with a powerful, achievement-driven executive resume. Crafted for senior roles, it highlights your impact, vision, and executive presence.',
    bestFor: 'Mid-level professionals, career changers',
    path: '/executive-resume-writing-service',
  },
  {
    id: 3,
    name: 'Visual Resume',
    tagline: 'Resume for creative professionals',
    price: '$25',
    color: 'bg-blue-700',
    popular: false,
    description:
      'This is a resume that is designed to be visually appealing and creative, showcasing your skills and experience in a unique way. Perfect for professionals in creative fields.',
    bestFor: 'Mid-level professionals, career changers',
    path: '/visual-resume-writing-service',
  },
  {
    id: 4,
    name: "Jobseekers's Combo",
    tagline: 'Everything you need to succeed',
    price: '$50',
    color: 'bg-blue-700',
    popular: true,
    description:
      'The Jobseekers Combo is your all-in-one career branding kit—consisting of ATS/Executive CV, cover letter and email, an optimized LinkedIn profile, and a personalized career roadmap.',
    bestFor: 'Senior managers, executives, directors',
    path: '/jobseekers-combo-service',
  },
  {
    id: 5,
    name: 'Career Portfolio',
    tagline: 'A visual journey through your projects',
    price: '$40',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Showcase your expertise with a polished project portfolio. Perfect for professionals in  construction, project management, architects, tech, design, and freelance.',
    bestFor: 'Serious job seekers, career transformation',
    path: '/career-portfolio',
  },
  {
    id: 6,
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
    id: 7,
    name: 'SOP',
    tagline: 'Statement of Purpose Writing',
    price: '$25',
    color: 'bg-blue-800',
    popular: false,
    description:
      'We help you articulate your goals, experiences, and aspirations effectively. Includes a personalized SOP tailored to your academic and career objectives.',
    bestFor: 'Graduate school applicants, international students',
    path: '/',
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
    path: '/',
  },
]

const ServicesPage = () => {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">NOW AT MOST AFFORDABLE PRICE</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
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
    </>
  )
}

export default ServicesPage
