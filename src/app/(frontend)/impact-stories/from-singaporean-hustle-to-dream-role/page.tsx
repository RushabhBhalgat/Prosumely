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
  title: 'From Singaporean Hustle to Dream Role | Singapore Tech Success | Prosumely',
  description:
    "A Resume Rewrite That Changed Everything for a technology professional in Singapore's competitive job market.",
  keywords: [
    'Singapore jobs',
    'tech careers Singapore',
    'digital transformation',
    'APAC technology',
    'smart nation initiatives',
    'Singapore resume',
    'ATS resume writing',
    'fintech Singapore',
  ],
  openGraph: {
    title: 'From Singaporean Hustle to Dream Role | Singapore Tech Success | Prosumely',
    description: 'A Resume Rewrite That Changed Everything for a technology professional',
    url: 'https://prosumely.com/impact-stories/from-singaporean-hustle-to-dream-role',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Singapore Technology Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Singaporean Hustle to Dream Role | Singapore Tech Success | Prosumely',
    description: 'A Resume Rewrite That Changed Everything for a technology professional',
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/impact-stories/from-singaporean-hustle-to-dream-role',
  },
}

export default function FromSingaporeanHustleToDreamRolePage() {
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
              Singapore Tech Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Singaporean Hustle to Dream Role
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A Resume Rewrite That Changed Everything for a Technology Professional in a
              Competitive Market
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Technology Industry | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">~10 Years</div>
              <div className="text-sm text-gray-600">Tech Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10 Days</div>
              <div className="text-sm text-gray-600">To First Shortlist</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">30%</div>
              <div className="text-sm text-gray-600">Salary Hike</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">Singapore</div>
              <div className="text-sm text-gray-600">New Role Secured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=1200&h=600&fit=crop&crop=center"
            alt="Singapore tech professionals collaborating"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Starting Point: Overlooked in a Competitive Market
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              In Singapore's competitive and fast-evolving job market, professionals often find
              themselves overlooked despite strong credentials. For Deepak (name changed), a
              mid-career technology professional with nearly a decade of experience, job hunting had
              become a series of rejections.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I kept asking myself—what am I doing wrong? My resume had all the details, but
                somehow I just wasn't landing interviews."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              Then, Deepak stumbled upon Prosumely's free resume review, and it marked the beginning
              of a completely new career chapter.
            </p>
          </div>
        </div>

        {/* Resume Review */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-gray-600" />
            Resume Review: Missing the Mark
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Our free audit revealed key issues holding him back:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Generic framing, not specific to Singapore</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Listed duties, not measurable achievements</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Low ATS visibility (Score: 42%)</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Lacked keywords for tech and innovation</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Start with a free resume review now
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
            The Transformation: A Singapore-Specific Strategy
          </h2>
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 1: Customized Brand Narrative
              </h3>
              <p className="text-blue-800">
                We repositioned Deepak from a generalist to a strategic leader. For example, "Worked
                on multiple projects" became "Led cross-functional delivery of 4 major IT
                initiatives, cutting operational costs by 23% and improving platform uptime by
                99.9%."
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: Keyword Optimization for Singapore's Tech Scene
              </h3>
              <p className="text-blue-800">
                We embedded language from top local job portals (JobStreet, MyCareersFuture),
                focusing on terms like "digital transformation," "APAC stakeholder alignment," and
                "Smart Nation initiatives." The final ATS score jumped to 93%.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Sleek, Professional Layout
              </h3>
              <p className="text-gray-800">
                The resume was redesigned to be visually clean, mobile-friendly, ATS-parsable, and
                easy for a hiring manager to scan in under 8 seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            The Results: Dream Job Secured in 3 Weeks
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">
              After circulating his new, strategic resume:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">Shortlisted by 2 fintech companies within 10 days.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Received an offer from a global MNC headquartered in Singapore.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Landed his dream job with a significant 30% salary hike.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "The new resume changed everything. The design was world-class. For the first time, I
              saw my experience looking... strategic. Executive."
            </p>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Key Singapore Tech Keywords We Used
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Smart Nation Initiatives"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "APAC Stakeholder Alignment"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "PDPA Compliance"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Agile / Scrum Methodology"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Scalable Architecture"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Fintech & Digital Platforms"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Prosumely Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            Why Prosumely Works for Tech Professionals
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              Singapore's job market values precision, innovation, and clarity. Prosumely ensures
              your resume reflects exactly that.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We translate technical skills into business value.
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We align your expertise with local market demand.
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We optimize for local ATS like JobStreet and MyCareersFuture.
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
              A resume isn't just a document. It's your career story—engineered to get results. At
              Prosumely, we combine deep regional hiring expertise, ATS optimization, and strategic
              content writing to highlight your career wins.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Next Move in Singapore?</h2>
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
