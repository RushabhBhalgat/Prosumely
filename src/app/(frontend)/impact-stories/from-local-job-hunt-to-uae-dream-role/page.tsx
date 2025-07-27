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
  Users,
  Clock,
} from 'lucide-react'

export const metadata = {
  title: 'From Local Job Hunt to UAE Dream Role | Global Career Success | Prosumely',
  description:
    'A Resume Rewrite That Opened New Doors for an Indian professional targeting UAE job market.',
  keywords: [
    'UAE jobs',
    'Dubai careers',
    'Abu Dhabi jobs',
    'Middle East careers',
    'GCC compliance',
    'UAE resume writing',
    'international career',
    'ATS resume writing',
  ],
  openGraph: {
    title: 'From Local Job Hunt to UAE Dream Role | Global Career Success | Prosumely',
    description: 'A Resume Rewrite That Opened New Doors for UAE job market',
    url: 'https://www.prosumely.com/impact-stories/from-local-job-hunt-to-uae-dream-role',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'UAE Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Local Job Hunt to UAE Dream Role | Global Career Success | Prosumely',
    description: 'A Resume Rewrite That Opened New Doors for UAE job market',
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/impact-stories/from-local-job-hunt-to-uae-dream-role',
  },
}

export default function FromLocalJobHuntToUAEDreamRolePage() {
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
              <Globe className="w-4 h-4 mr-2 text-blue-600" />
              Global Career Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Local Job Hunt to UAE Dream Role
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a resume rewrite opened new doors for an Indian professional targeting the UAE job
              market.
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Global Careers | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10+ Years</div>
              <div className="text-sm text-gray-600">Domestic Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">3 Weeks</div>
              <div className="text-sm text-gray-600">To First Interview</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2 MNCs</div>
              <div className="text-sm text-gray-600">Interview Calls</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">UAE</div>
              <div className="text-sm text-gray-600">New Position Secured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1200&h=600&fit=crop&crop=center"
            alt="Professional working on a laptop"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Challenge: A Great Resume at Home, But Not Abroad
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              For many Indian professionals looking to work in the Middle East, especially the UAE,
              the biggest obstacle isn't experience, talent, or drive. It's localization. Our
              client, with over a decade of experience, had a CV that worked perfectly in India. But
              as he began applying for roles in Dubai and Abu Dhabi, something felt off.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I wasn't getting any callbacks. Not even acknowledgments. I knew I was
                qualified—but clearly, my resume didn't translate to the UAE job market."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              After three months of silence, he turned to Prosumely.
            </p>
          </div>
        </div>

        {/* Resume Review */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-gray-600" />
            Resume Review: What Went Wrong
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Our free analysis revealed the core issues:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Presented in a domestic-first format</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Lacked UAE-relevant keywords and job titles</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">No mention of GCC compliance or local tools</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">
                  Outdated layout with poor formatting hierarchy
                </span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Get your resume reviewed for free now
            </h4>
            <a
              href="https://www.prosumely.com/free-resume-review"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              www.prosumely.com/free-resume-review
            </a>
          </div>
        </div>

        {/* Transformation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 mr-3 text-blue-600" />
            The Fix: Tailoring the Resume for UAE Recruiters
          </h2>
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 1: Understanding Market Expectations
              </h3>
              <p className="text-blue-800 mb-4">
                Our career branding consultant conducted a strategy session to analyze job
                descriptions from leading UAE firms and understand HR screening patterns.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: Language Localization
              </h3>
              <p className="text-blue-800 mb-4">
                We translated his impact into UAE market language, ensuring keyword alignment for
                local hiring portals (Bayt, Naukrigulf) and compliance with ATS standards.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Visual and Structural Revamp
              </h3>
              <p className="text-gray-800">
                His resume was redesigned to be clean, minimalistic, and executive-friendly,
                featuring bold headlines and metrics-backed bullet points to highlight transferable
                skills.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Want to rebuild your resume with a pro?
            </h4>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              ATS Resume Writing for Professionals
            </a>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            The Outcome: One Resume. One Month. One Job.
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">
              Within 3 weeks of circulating his new Prosumely resume:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">Received interview calls from two UAE-based MNCs</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">Offered a role at a leading company in the Emirates</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">Completed visa processing within a month</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "I couldn't believe the difference. The resume opened every door that had been shut
              for months. It looked and felt international."
            </p>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Key UAE-Optimized Keywords We Used
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "UAE Market Experience"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "GCC Compliance"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Dubai-based Operations"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Cross-Functional Leadership"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Talent Acquisition UAE"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "VAT / UAE Labor Law"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            Key Takeaways for Global Job Seekers
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              If you're applying to roles in a new country and not seeing results, the issue might
              be your resume—not your experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• A good resume isn't always a global resume</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • Localize your language, design, and keyword strategy
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • Get expert help when transitioning between markets
                </span>
              </div>
            </div>
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
              Prosumely is India's trusted resume writing and career branding partner for
              professionals across industries and geographies. From fresh graduates to global
              executives, Prosumely specializes in crafting internationally relevant, ATS-optimized,
              recruiter-ready resumes that drive real outcomes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With services customized for UAE, Gulf, US, Canada, and Australia job markets,
              Prosumely ensures that every candidate is not only market-ready, but also
              region-ready.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Global Career?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let our expert team help you break into your dream market.
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
