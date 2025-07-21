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
  Users,
  Clock,
  FileText,
  Flag,
} from 'lucide-react'

export const metadata = {
  title: 'Breaking Through Barriers | Toronto Canada Career Success | Prosumely',
  description:
    "How One Resume Helped Land Opportunities in Toronto's Tough Job Market for a skilled professional.",
  keywords: [
    'Toronto jobs',
    'Canada career',
    'Canadian resume',
    'Toronto job market',
    'Canadian workplace culture',
    'agile team collaboration',
    'cross-functional teamwork',
    'ATS resume writing',
  ],
  openGraph: {
    title: 'Breaking Through Barriers | Toronto Canada Career Success | Prosumely',
    description: "How One Resume Helped Land Opportunities in Toronto's Tough Job Market",
    url: 'https://prosumely.com/impact-stories/breaking-through-barriers',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Toronto Canada Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breaking Through Barriers | Toronto Canada Career Success | Prosumely',
    description: "How One Resume Helped Land Opportunities in Toronto's Tough Job Market",
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/impact-stories/breaking-through-barriers',
  },
}

export default function BreakingThroughBarriersPage() {
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
              <Flag className="w-4 h-4 mr-2 text-blue-600" />
              Canada Success Story
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Breaking Through Barriers: How One Resume Helped Land Opportunities in Toronto's Tough
              Job Market
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A skilled professional aiming to transition into corporate roles in Toronto broke
              through the competitive Canadian job market with expert resume help
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Canada | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">Toronto</div>
              <div className="text-sm text-gray-600">Target Market</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10 Days</div>
              <div className="text-sm text-gray-600">To First Callback</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2 Calls</div>
              <div className="text-sm text-gray-600">Toronto Companies</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">88%</div>
              <div className="text-sm text-gray-600">ATS Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&h=600&fit=crop&crop=center"
            alt="Toronto Skyline"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Starting Point: Job Hunting in a Competitive Canadian Market
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Toronto is one of the most competitive job markets in North America. For Aman (name
              changed), a skilled professional aiming to transition into a corporate role, finding
              the right opportunity felt like trying to break through a glass ceiling.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "The Canadian job market is tough, but this team knew exactly how to position my
                skills. My new resume opened doors I never thought possible."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              With limited local experience and a resume that didn't meet Canadian standards, Aman
              turned to Prosumely after finding their resume services online.
            </p>
          </div>
        </div>

        {/* Resume Review */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-gray-600" />
            Resume Review: The Challenges
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Here's what our resume audit found:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">
                  International formatting that didn't align with Canadian standards
                </span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Missing Canadian workplace culture keywords</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">ATS score of only 39%</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">No personal brand or impact metrics</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Want your resume reviewed for free?
            </h4>
            <a
              href="https://www.prosumely.com/free-resume-review"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              www.prosumely.com/free-resume-review
            </a>
          </div>
        </div>

        {/* Transformation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 mr-3 text-blue-600" />
            The Solution: Canadian Resume Strategy by Prosumely
          </h2>

          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 1: Personal Branding Rewrite
              </h3>
              <p className="text-blue-800 mb-4">We started with:</p>
              <ul className="space-y-2 text-blue-800">
                <li>• A compelling executive summary aligned with Toronto market demands</li>
                <li>• Headline featuring role, industry keywords, and unique strengths</li>
                <li>• Power verbs and results-driven bullet points</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: ATS Optimization for Canada
              </h3>
              <p className="text-blue-800 mb-4">
                After researching top job boards, we embedded essential keywords like:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• Cross-border coordination</li>
                <li>• Process improvement</li>
                <li>• Team-based outcomes</li>
                <li>• Time-sensitive project delivery</li>
              </ul>
              <p className="text-blue-800 mt-4 font-medium">Final ATS score: 88%</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Visual Layout Upgrade
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Easy reading on desktop and mobile</li>
                <li>• Highlighted skills section</li>
                <li>• Balanced white space and role-based structuring</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Need a Canadian-style resume?
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

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            The Results: Resume ROI in Just 10 Days
          </h2>
          <div className="bg-green-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">In less than 2 weeks:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  2 callbacks from Toronto-based companies
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  Shortlisted for a hybrid operations role
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  Referred by a recruiter who noticed him this time
                </p>
              </div>
            </div>
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-lg mt-6">
              <Quote className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-green-800 italic font-medium">
                "I'm beyond impressed. The investment was absolutely worth it."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to unlock job opportunities in Canada?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Even in a competitive city like Toronto, your resume can work harder than your job
            hunt—if it's built the right way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.prosumely.com/free-resume-review"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Resume Review
            </a>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Canadian Resume Service
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
