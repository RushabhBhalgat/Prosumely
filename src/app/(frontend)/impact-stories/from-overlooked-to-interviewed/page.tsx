import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  CheckCircle,
  Quote,
  Globe,
  Star,
  Target,
  Award,
  Building,
  Users,
  Clock,
  Search,
  Eye,
  PoundSterling,
  Calculator,
  FileText,
  BarChart3,
} from 'lucide-react'

export const metadata = {
  title: 'From Overlooked to Interviewed | UK Finance Executive Success | Prosumely',
  description:
    'How a UK Finance Resume Got Executive-Ready and Delivered Results with professional resume writing services.',
  keywords: [
    'UK finance careers',
    'executive resume UK',
    'finance leader jobs',
    'IFRS reporting',
    'treasury management',
    'UK job market',
    'ATS resume writing',
    'finance professional',
  ],
  openGraph: {
    title: 'From Overlooked to Interviewed | UK Finance Executive Success | Prosumely',
    description: 'How a UK Finance Resume Got Executive-Ready and Delivered Results',
    url: 'https://www.prosumely.com/impact-stories/from-overlooked-to-interviewed',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'UK Finance Executive Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Overlooked to Interviewed | UK Finance Executive Success | Prosumely',
    description: 'How a UK Finance Resume Got Executive-Ready and Delivered Results',
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/impact-stories/from-overlooked-to-interviewed',
  },
}

export default function FromOverlookedToInterviewedPage() {
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
              <PoundSterling className="w-4 h-4 mr-2 text-blue-600" />
              UK Finance Executive Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Overlooked to Interviewed: UK Finance Executive Success
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a UK Finance Resume Got Executive-Ready and Delivered Results
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | UK Finance Industry | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">12+ Years</div>
              <div className="text-sm text-gray-600">Finance Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">42% → 92%</div>
              <div className="text-sm text-gray-600">ATS Score Improvement</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">3 Calls</div>
              <div className="text-sm text-gray-600">Interview Invitations</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">3 Weeks</div>
              <div className="text-sm text-gray-600">To First Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=600&fit=crop&crop=center"
            alt="UK Finance Professional"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Starting Point: A Career Stuck in the Shadows
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              For many mid-career finance professionals, especially in competitive markets like the
              UK, job hunting can feel like shouting into the void. James (name changed), a seasoned
              finance leader with over 12 years in budgeting, treasury, and risk compliance, was
              hitting that wall.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Despite working with top firms and managing high-value portfolios, his applications
              yielded minimal responses.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I wasn't sure what was wrong. I had the experience—but no one was responding."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              That's when he came across Prosumely's free resume review offer and decided to take a
              leap.
            </p>
          </div>
        </div>

        {/* Resume Review */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-gray-600" />
            Resume Review: The Diagnosis
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Our free audit revealed multiple issues:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Outdated format with long paragraphs</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Low ATS score (42%)</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Missing UK finance keywords (IFRS, UKGAAP)</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Generic language with no metrics</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Despite solid experience, the resume didn't convey leadership or strategic value to UK
            finance recruiters.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
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
            The Transformation Process
          </h2>

          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 1: Define His Finance Brand
              </h3>
              <p className="text-blue-800 mb-4">
                We worked 1-on-1 with James to unpack his leadership story, resulting in:
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
                <p className="font-medium text-blue-900 mb-2">Headline:</p>
                <p className="text-blue-800 italic mb-4">
                  "Finance Leader | 12+ Years | Budgeting, Treasury & IFRS Excellence across UK
                  Markets"
                </p>
                <p className="font-medium text-blue-900 mb-2">Summary:</p>
                <p className="text-blue-800 italic">
                  "Results-driven finance professional with a decade of experience in streamlining
                  capital operations, leading regulatory compliance, and optimizing cash flow
                  management across multinational environments."
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: Inject Targeted Keywords & Metrics
              </h3>
              <p className="text-blue-800 mb-4">
                Using Prosumely's proprietary ATS tools, we matched 50+ job listings and inserted
                keywords like:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <BarChart3 className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-800">IFRS Reporting</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <Building className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-800">M&A Due Diligence</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <PoundSterling className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-800">Treasury & Liquidity Management</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <Calculator className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-800">Budgeting & Forecasting</span>
                </div>
              </div>
              <p className="text-blue-800 mt-4 font-medium">
                James' new resume scored 92% on ATS tools, up from 42%.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Executive Formatting & Design
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-800">EES Formatting: Logical, elegant structure</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-800">
                    Bold action verbs: "Revamped," "Directed," "Led"
                  </span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-800">Visually Appealing Design: Easy to scan</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-800">Quick Revision Cycles: Same-day updates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Want an ATS-compliant resume designed by experts?
            </h4>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              Build an ATS CV from a professional
            </a>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            The Results: From Zero Response to Top Interviews
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">
              Within 3 weeks of sending out the new resume:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">James was shortlisted by two FTSE-listed firms</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Star className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">Got a callback from a global consulting giant</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Received consistent praise on resume clarity and professionalism
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "The Prosumely team really understood what the UK job market expects. Every line on
              the new CV felt sharper, more confident, more executive."
            </p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            Resume Impact Metrics
          </h2>

          {/* Main Metrics Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transformation Results</h3>
              <p className="text-gray-600">Measurable improvements in just 3 weeks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ATS Score */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-white/50 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="mb-4">
                  <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-600 mb-3">
                    ATS Compatibility Score
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">42%</div>
                    <div className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded">Before</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <div className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">After</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-gradient-to-r from-red-500 to-blue-600 h-2 rounded-full"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-green-600 font-medium">+50% improvement</div>
                </div>
              </div>

              {/* Interview Calls */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-white/50 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="mb-4">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-600 mb-3">
                    Interview Invitations
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded">
                      2 months prior
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded">
                      3 weeks after
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-3 h-3 bg-green-500 rounded-full"></div>
                    ))}
                  </div>
                  <div className="text-xs text-green-600 font-medium mt-1">From zero to hero</div>
                </div>
              </div>

              {/* Success Rate */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-white/50 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="mb-4">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-600 mb-3">Success Rate</div>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">0%</div>
                    <div className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded">
                      Response rate
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <div className="text-xs text-gray-500 bg-purple-50 px-2 py-1 rounded">
                      Interview rate
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-purple-600 font-medium">Top-tier performance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-600">3 weeks</div>
              <div className="text-sm text-gray-600">Time to first interview</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <Building className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-indigo-600">2</div>
              <div className="text-sm text-gray-600">FTSE companies interested</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">300%</div>
              <div className="text-sm text-gray-600">Response rate increase</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-600">5/5</div>
              <div className="text-sm text-gray-600">Client satisfaction rating</div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-1">Total Impact</h4>
                <p className="text-gray-300 text-sm">
                  From invisible to irresistible in the UK finance market
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">1 Offer</div>
                <div className="text-sm text-gray-300">In negotiation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Prosumely Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            Why Prosumely Works for Finance Professionals
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              Finance professionals need resumes that speak the language of executive recruiters.
              Prosumely understands:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• We highlight your strategic impact</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We align your expertise with regional market demands
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We balance technical capability with leadership maturity
                </span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://www.prosumely.com/executive-resume-writing-service"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore our executive resume services
              </a>
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
              At Prosumely, we don't just format documents. We unlock opportunities. Our team
              specializes in crafting ATS-optimized, keyword-rich, professionally designed resumes
              that reflect your unique career story and speak the language recruiters want to hear.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're in finance, construction, engineering, tech, or hospitality—we help you
              land interviews, not just clicks.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career Like James?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let our expert team help you break into your dream market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-resume-review" className="inline-block">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto sm:mx-0">
                <FileText className="w-5 h-5 mr-2" />
                Free Resume Review
              </button>
            </Link>
            <Link href="/executive-resume-writing-service" className="inline-block">
              <button className="px-8 py-4 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center mx-auto sm:mx-0">
                <Award className="w-5 h-5 mr-2" />
                Executive Resume Service
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
