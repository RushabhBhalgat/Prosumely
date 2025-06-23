export default function ServicesSection() {
  const services = [
    {
      id: 1,
      name: 'ATS Resume ',
      tagline: 'Perfect for entry-level professionals',
      price: '$20',
      color: 'bg-blue-600',
      popular: false,
      description:
        'Get a professionally written resume that beats Applicant Tracking Systems(ATS) and gets you shortlisted. Optimized with the right keywords, formatting, and structure.',
      bestFor: 'Recent graduates, career starters',
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
    },
    {
      id: 3,
      name: "Jobseekers's Combo",
      tagline: 'Everything you need to succeed',
      price: '$50',
      color: 'bg-blue-700',
      popular: true,
      description:
        'The Jobseekers Combo is your all-in-one career branding kit—consisting of ATS/Executive CV, cover letter and email, an optimized LinkedIn profile, and a personalized career roadmap.',
      bestFor: 'Senior managers, executives, directors',
    },
    {
      id: 4,
      name: 'Project Portfolio',
      tagline: 'A visual journey through your projects',
      price: '$40',
      color: 'bg-blue-800',
      popular: false,
      description:
        'Showcase your expertise with a polished project portfolio. Perfect for professionals in  construction, project management, architects, tech, design, and freelance.',
      bestFor: 'Serious job seekers, career transformation',
    },
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional resume writing services tailored to your career level and goals
          </p>
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
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 ${service.color}`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
