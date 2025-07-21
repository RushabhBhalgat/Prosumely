import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  Quote,
  User,
  Briefcase,
  Globe,
  Star,
  Target,
  Award,
  Building,
  Users,
  Clock,
  Search,
} from 'lucide-react'

export const metadata = {
  title: 'From Delay to Dream Interview | Qatar Project Manager Success | Prosumely',
  description:
    'How a Qatar Project Manager Landed a Career Breakthrough with Prosumely despite a one-day delay in delivery.',
  keywords: [
    'Qatar project manager',
    'Middle East careers',
    'project management Qatar',
    'EPC contractor jobs',
    'FIDIC contracts',
    'Qatar construction',
    'ATS resume writing',
    'Gulf job market',
  ],
  openGraph: {
    title: 'From Delay to Dream Interview | Qatar Project Manager Success | Prosumely',
    description: 'How a Qatar Project Manager Landed a Career Breakthrough with Prosumely',
    url: 'https://prosumely.com/impact-stories/from-delay-to-dream-interview',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Qatar Project Manager Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}

export default function DelayToDreamInterviewPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/impact-stories"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Impact Stories
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Building className="w-4 h-4 mr-2 text-blue-600" />
              Project Management Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Delay to Dream Interview: Qatar Project Manager Success
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a Qatar Project Manager Landed a Career Breakthrough with Prosumely
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Project Management | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">12+ Years</div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2 Weeks</div>
              <div className="text-sm text-gray-600">To Interview</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Building className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">$40M</div>
              <div className="text-sm text-gray-600">Project Value</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">Qatar</div>
              <div className="text-sm text-gray-600">Dream Location</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=face"
            alt="Qatar Project Manager Success Story"
            width={800}
            height={400}
            className="w-full h-64 md:h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Context Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-600" />
            The Context: Competitive Field, International Dreams
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Ahmed (name changed for confidentiality), a mid-senior level project manager from
              India, had a clear goal: secure a leadership role in Qatar's booming infrastructure
              and construction sector.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Armed with over 12 years of cross-functional experience in engineering, vendor
              coordination, and site execution, he knew he had the credentials. But despite sending
              out dozens of applications to Qatar-based companies, nothing moved forward.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I had the qualifications and the experience, but still no calls. I suspected it was
                my resume. It just wasn't making the right impression internationally."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              That's when Ahmed discovered Prosumely's resume writing services tailored for the
              Middle East job market.
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            The Experience: A Professional Resume, Slightly Delayed
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6">
              Ahmed opted for Prosumely's ATS Resume Writing Service, hoping for a clean, impactful
              document that would resonate with hiring managers and HR systems alike.
            </p>
            <p className="text-blue-800 mb-6">
              While his expectations were high, he appreciated the team's commitment to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Understanding his industry and regional targets
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Gathering detailed project data and leadership achievements
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Crafting a resume tailored to Qatar's job descriptions
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "There was a one-day delay in delivery, but honestly, the resume quality made up for
              it. The communication and process were smooth."
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Build your own ATS-ready resume
            </h4>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              www.prosumely.com/ats-resume-writing-service
            </a>
          </div>
        </div>

        {/* Transformation Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            The Transformation: From Generic to Qatar-Ready
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Ahmed's original resume was solid but lacked specificity. Here's what Prosumely changed:
          </p>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Structure</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Rebuilt layout using a Middle East recruiter-friendly format</li>
                <li>• Clearly defined project scale, budgets, and stakeholders</li>
                <li>• Highlighted certifications, site experience, and reporting structure</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Language & Tone</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Replaced generic bullet points with metrics-driven achievements</li>
                <li>• Used active voice and impactful action verbs</li>
                <li>• Included GCC-specific project references</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Keyword Optimization</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Customized for Qatar-based job portals and ATS platforms</li>
                <li>
                  • Included phrases such as "FIDIC contracts," "project lifecycle," "site safety &
                  QA," and "contractor coordination"
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Get your resume customized for Gulf markets
            </h4>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Building className="w-4 h-4 mr-2" />
              www.prosumely.com/ats-resume-writing-service
            </a>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Result: Shortlisted in a Competitive Market
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">
              Within two weeks of sharing his new resume:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Ahmed was shortlisted by a large Qatar-based EPC contractor
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Users className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  He landed an interview for a Project Manager role overseeing a $40M development
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Recruiters praised his resume for its clarity, relevance, and format
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "Getting shortlisted felt amazing, especially knowing how competitive this field is.
              The resume did 90% of the talking."
            </p>
          </div>
        </div>

        {/* Qatar-Specific Enhancements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-600" />
            Qatar-Specific Resume Enhancements We Included
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">
              To ensure Ahmed's resume stood out in the Qatari job market, we focused on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Qatar Construction Supervision Experience"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"GCC Project Management Exposure"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"FIDIC Contract Administration"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Client & Stakeholder Liaison (Ashghal, Kahramaa, etc.)"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Budget Planning & Site Execution"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"HSE Compliance under QCS"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Turnkey and EPC Project Lifecycle Management"
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why It Worked */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            Why It Worked
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              Despite a one-day delay in final delivery, the resume exceeded expectations because:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">It was deeply customized for the Qatar market</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">It showed immediate relevance to the role</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">It conveyed maturity, scale, and leadership</span>
              </div>
            </div>
            <p className="text-gray-800 mt-6 font-medium">
              Ahmed didn't just get a new document. He received a career-altering tool.
            </p>
          </div>
        </div>

        {/* About Prosumely */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-600" />
            About Prosumely
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Prosumely is India's leading career branding and resume writing service helping
              professionals build region-specific, ATS-optimized, impact-driven resumes. Our
              services are trusted by job seekers targeting the UAE, Qatar, KSA, and other Gulf
              nations, delivering results through strategic content, industry keywords, and
              recruiter-friendly designs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're a project manager, site engineer, finance lead, or C-suite executive,
              we help your resume speak the language of opportunity.
            </p>
            <div className="mt-6">
              <a
                href="https://www.prosumely.com"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Learn more at www.prosumely.com
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Future Like Ahmed?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let our expert team help you break into your dream market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="inline-block">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto sm:mx-0">
                <Briefcase className="w-5 h-5 mr-2" />
                View Our Services
              </button>
            </Link>
            <Link href="/contact" className="inline-block">
              <button className="px-8 py-4 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center mx-auto sm:mx-0">
                <User className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
