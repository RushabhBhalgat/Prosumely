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
  Eye,
  Zap,
  FileText,
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
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/impact-stories"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Impact Stories
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-5 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Globe className="w-4 h-4 mr-2 text-blue-600" />
              Singapore Tech Success Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              From Singaporean Hustle to Dream Role: A Resume Rewrite That Changed Everything
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                July 2025
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Singapore
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />7 min read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Overview */}
        <section className="mb-16">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <div className="flex items-start">
              <Globe className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Overview: One Resume Away from a Life-Changing Opportunity
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  In Singapore's competitive and fast-evolving job market, professionals often find
                  themselves overlooked despite strong credentials. For Deepak (name changed), a
                  mid-career technology professional with nearly a decade of experience, job hunting
                  had become a series of rejections.
                </p>
                <div className="bg-white p-4 rounded-lg mt-4 border-l-4 border-blue-300">
                  <Quote className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-gray-800 italic">
                    "I kept asking myself—what am I doing wrong? My resume had all the details, but
                    somehow I just wasn't landing interviews."
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Then, Deepak stumbled upon Prosumely's free resume review, and it marked the
                  beginning of a completely new career chapter.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-900">
                Want your resume reviewed for free?
              </span>
            </div>
            <Link
              href="/free-resume-review"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              Free Resume Review
            </Link>
          </div>
        </section>

        {/* Objective Section */}
        <section className="mb-16">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Target className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                Objective: Break Through in the Singapore Job Market
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Deepak's dream was clear: work with a high-growth tech firm in Singapore. His goals
              included:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Build a resume aligned with Singapore's hiring standards
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Articulate his achievements in a results-oriented format
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Integrate industry-specific keywords for tech and innovation
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Present a professional, polished first impression
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg mt-6 border-l-4 border-blue-300">
              <Quote className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-gray-800 italic">
                "I needed a resume that made decision-makers stop and take notice."
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="mb-16">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Search className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                The Challenges: Missing the Mark in the Details
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-gray-900 mb-2">1. Lack of Market-Specific Framing</h3>
                <p className="text-gray-700">
                  The original resume was generic and globally focused. It didn't highlight
                  Singapore-specific strengths like compliance with PDPA, familiarity with
                  Agile/Scrum, or multicultural team collaboration.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-gray-900 mb-2">2. Weak Achievement Positioning</h3>
                <p className="text-gray-700">
                  Deepak's resume detailed his duties—but failed to show outcomes. It missed metrics
                  like:
                </p>
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">ROI improvement</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Delivery time reduction</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Headcount/budget management</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-gray-900 mb-2">3. Low ATS Visibility</h3>
                <p className="text-gray-700">With an ATS score of just 42%, the resume lacked:</p>
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Digital transformation</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Cross-functional leadership</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">SaaS/Cloud infrastructure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-lg p-6 mt-6">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">
                  Want a resume recruiters in Singapore will shortlist?
                </span>
              </div>
              <Link
                href="/ats-resume-writing-service"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Award className="w-4 h-4 mr-2" />
                ATS Resume Writing Service
              </Link>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-16">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Award className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                The Solution: Singapore-Specific Resume Strategy by Prosumely
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">Step 1: Customized Brand Narrative</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  We conducted a deep-dive discovery session to understand Deepak's goals, then
                  crafted:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-400">
                    <p className="text-gray-700">A sharp, personalized headline</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-400">
                    <p className="text-gray-700">
                      An executive summary focused on strategic outcomes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-400">
                    <p className="text-gray-700">Impact-led experience points</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-red-700 font-medium">Old:</p>
                    <p className="text-red-700 italic">
                      "Worked on multiple projects across departments."
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-green-700 font-medium">New:</p>
                    <p className="text-green-700 italic">
                      "Led cross-functional delivery of 4 major IT initiatives, cutting operational
                      costs by 23% and improving platform uptime by 99.9%."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">
                    Step 2: Keyword Optimization for Singapore's Tech Ecosystem
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  We embedded job-market language pulled from top Singaporean job portals:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Smart nation initiatives</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">B2B/B2C digital platforms</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Scalable architecture</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Stakeholder alignment across APAC</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 font-medium">Final ATS score: 93%</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <h3 className="font-bold text-gray-900">Step 3: Sleek, Professional Layout</h3>
                </div>
                <p className="text-gray-700 mb-4">His resume was redesigned to be:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Visually clean and mobile-friendly</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">ATS-parsable with clear headings</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">Easy to scan in 8 seconds or less</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg mt-6 border-l-4 border-blue-300">
              <Quote className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-gray-800 italic">
                "The design was world-class. For the first time, I saw my experience looking...
                strategic. Executive."
              </p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                The Results: Dream Job Secured in 3 Weeks
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-gray-700">
                  Got shortlisted by 2 fintech companies within 10 days
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-700">
                  Received an offer from a global MNC headquartered in Singapore
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-700">Landed his dream job with a 30% salary hike</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-300">
              <Quote className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-gray-800 italic">
                "This resume changed everything. Within weeks, I moved from silence to success."
              </p>
            </div>
          </div>
        </section>

        {/* Why It Worked */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 text-blue-600 mr-3" />
            Why It Worked
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Singapore Job Market Language</h3>
              <p className="text-gray-700">
                Included specific industry terms and regional expectations
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <TrendingUp className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Metrics That Matter</h3>
              <p className="text-gray-700">Every role quantified by business results</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <Eye className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Professional Visual Structure</h3>
              <p className="text-gray-700">Design that stood out in digital and printed formats</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <Star className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Confidence-Boosting Storytelling</h3>
              <p className="text-gray-700">His career trajectory was told like a success story</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make your next move in Singapore?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Singapore's job market values precision, innovation, and clarity. And that's exactly
            what your resume should reflect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/free-resume-review"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Free Resume Review
            </Link>
            <Link
              href="/ats-resume-writing-service"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200 inline-flex items-center"
            >
              <Award className="w-4 h-4 mr-2" />
              ATS Resume Service
            </Link>
          </div>
        </section>
      </article>

      {/* About Prosumely */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Prosumely</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            A resume isn't just a document. It's your career story—engineered to get results. At
            Prosumely, we combine deep regional hiring expertise, ATS optimization across platforms
            like JobStreet, LinkedIn, and MyCareersFuture, and strategic content writing to
            highlight your career wins.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Globe className="w-5 h-5 mr-2" />
            Learn more at Prosumely.com
          </Link>
        </div>
      </section>
    </main>
  )
}
