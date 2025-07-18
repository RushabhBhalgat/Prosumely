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
  AlertTriangle as Alert,
  Eye,
  Zap,
  MessageSquare,
  Search,
} from 'lucide-react'

export const metadata = {
  title: 'From Cairo to Career Growth | Middle East Success | Prosumely',
  description:
    'How a Resume & LinkedIn Makeover Got One Egyptian Professional Noticed Fast with immediate career transformation.',
  keywords: [
    'Egypt careers',
    'Gulf opportunities',
    'consulting careers',
    'Middle East jobs',
    'regional growth',
    'LinkedIn optimization',
    'resume makeover',
    'ATS optimization',
  ],
  openGraph: {
    title: 'From Cairo to Career Growth | Middle East Success | Prosumely',
    description: 'How a Resume & LinkedIn Makeover Got One Egyptian Professional Noticed Fast',
    url: 'https://prosumely.com/impact-stories/from-cairo-to-career-growth',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Egypt Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}

export default function FromCairoToCareerGrowthPage() {
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
              Egypt Career Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Cairo to Career Growth
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a Resume & LinkedIn Makeover Got One Egyptian Professional Noticed Fast
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Story by Prosumely | Egypt | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10 Days</div>
              <div className="text-sm text-gray-600">First Results</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">15%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Recruiter Messages</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Search className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">ATS</div>
              <div className="text-sm text-gray-600">Optimized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1539650116574-75c0c6d82d63?w=1200&h=600&fit=crop&crop=center"
            alt="Cairo Professional Success"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-emerald-600" />
            Overview: A Quiet Job Hunt in a Noisy Market
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              In today's fast-paced Egyptian job market, visibility is everything. Amir (name
              changed for privacy), a talented mid-career professional in operations and project
              support, was doing everything right—applying regularly, networking occasionally—but
              still receiving no traction.
            </p>
            <div className="bg-gray-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-6">
              <Quote className="w-6 h-6 text-emerald-600 mb-2" />
              <p className="text-gray-700 italic">
                "I knew I had potential, but my resume wasn't getting me any callbacks. My LinkedIn
                didn't look updated or compelling either."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Tired of watching his applications disappear into black holes, Amir found Prosumely's
              free resume review and decided to take control.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                Get your resume reviewed for free:
              </h4>
              <a
                href="https://www.prosumely.com/free-resume-review"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                www.prosumely.com/free-resume-review
              </a>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              What followed was a career-defining shift.
            </p>
          </div>
        </div>

        {/* Objective */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Objective: Stand Out in the Egypt Job Market
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6 font-medium">Amir had one goal—visibility.</p>
            <p className="text-blue-800 mb-6">He needed:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  • A modern, well-structured CV tailored for Egyptian recruiters
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  • A LinkedIn profile that reflected his strengths
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  • Keyword optimization to show up in recruiter searches
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">• A more confident professional brand</span>
              </div>
            </div>
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
              <Quote className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-blue-800 italic">
                "I wanted something recruiters could not ignore."
              </p>
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Alert className="w-8 h-8 mr-3 text-red-600" />
            The Challenges: Low Visibility, Generic Positioning
          </h2>
          <div className="bg-red-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">
              When we conducted our initial resume and LinkedIn audit, here's what we found:
            </h3>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-red-900 mb-2">1. Generic Formatting</h4>
                <p className="text-red-800">
                  His resume lacked visual structure and used outdated formatting that made it hard
                  to skim. LinkedIn had no banner, summary, or featured section.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-red-900 mb-2">2. No ATS Optimization</h4>
                <p className="text-red-800 mb-3">
                  Critical Egypt job market keywords like project coordination, vendor management,
                  and operational support were missing. ATS score: 39%.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-blue-800 text-sm flex items-start">
                    <Globe className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Want an ATS-optimized resume? Build an ATS CV from a professional:{' '}
                    <a
                      href="https://www.prosumely.com/ats-resume-writing-service"
                      className="underline ml-1"
                    >
                      www.prosumely.com/ats-resume-writing-service
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-red-900 mb-2">3. Poor Branding</h4>
                <p className="text-red-800 mb-3">His resume sounded passive and task-based:</p>
                <div className="bg-gray-100 rounded p-3 mb-3">
                  <p className="text-gray-700 italic">
                    "Responsible for various operational tasks."
                  </p>
                </div>
                <p className="text-red-800 mb-3">We replaced it with:</p>
                <div className="bg-green-100 rounded p-3">
                  <p className="text-green-800 italic">
                    "Supported end-to-end project execution across 4+ departments, improving vendor
                    response time by 30%."
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-red-900 mb-2">4. Outdated LinkedIn</h4>
                <p className="text-red-800">
                  No summary. No keywords. No visual appeal. Recruiters were skipping it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 mr-3 text-green-600" />
            The Solution: Resume + LinkedIn Makeover by Prosumely
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            We rebuilt Amir's professional image across both platforms.
          </p>

          <div className="space-y-8">
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" /> Step 1: Strategic Resume Redesign
              </h3>
              <ul className="space-y-2 text-green-800">
                <li>• New executive headline</li>
                <li>• Summary with metrics</li>
                <li>• Bullet points with impact</li>
                <li>• Visual formatting tailored for Egypt hiring norms</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Step 2: ATS Keyword Integration
              </h3>
              <p className="text-blue-800 mb-4">
                • We embedded high-demand Egypt-specific keywords using our proprietary job scan
                tool
              </p>
              <p className="text-blue-800 mb-4">• Keywords like:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                <div className="bg-white rounded-lg p-4">
                  <span className="font-medium text-blue-900">o Operational coordination</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="font-medium text-blue-900">o Supply chain reporting</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="font-medium text-blue-900">
                    o Cross-functional communication
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="font-medium text-blue-900">o Workflow automation</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Step 3: LinkedIn Profile Upgrade
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• SEO-focused headline</li>
                <li>• 200-word summary with relevant hashtags</li>
                <li>• Projects added to Featured section</li>
                <li>• Experience updated with strong action verbs</li>
              </ul>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
                <Quote className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-blue-800 italic">
                  "They didn't just copy-paste from my resume—they reimagined my LinkedIn to attract
                  the right people."
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Step 4: Responsive Edits & Support
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Our team provided 3 revision cycles with same-day turnaround</li>
                <li>• Amir had direct support through WhatsApp and email</li>
                <li>• We even gave tips on when and how to start applying</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What Prosumely Delivers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            What Prosumely Delivers
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">
              Prosumely isn't a resume mill. It's a results-driven career branding service designed
              to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">• Increase ATS scores</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">• Make LinkedIn searchable</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">• Highlight measurable achievements</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">• Help you stand out—locally & globally</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">We used:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">• ATS Compatibility Tools</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  • EES Formatting (Effective, Elegant, Structured)
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">• LinkedIn Optimization Templates</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">• Grammar & Language Polishing</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">• Quantification Coaching</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-green-600" /> The Results: Immediate Attention
          </h2>
          <div className="bg-green-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-green-900 mb-6">Within 10 days:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <User className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  • Amir's resume got 3 recruiter messages on LinkedIn
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  • He received 2 email callbacks from job portals
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <Star className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-medium">
                  • One HR rep commented: "Your profile is very clear and professional."
                </p>
              </div>
            </div>
            <p className="text-green-800 font-medium">
              All this… within one week of publishing his new resume + LinkedIn.
            </p>
          </div>
          <div className="bg-gray-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-gray-700 italic">
              "Prosumely gave me confidence. The price was affordable, and the value was 10x what I
              paid."
            </p>
          </div>
        </div>

        {/* Why It Worked */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            Why It Worked: Key Shifts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="font-semibold text-gray-900">Executive Positioning</h3>
              </div>
              <p className="text-gray-800">From passive to powerful language</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="font-semibold text-gray-900">LinkedIn Magnetism</h3>
              </div>
              <p className="text-gray-800">Our upgrade got Amir visible fast</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="font-semibold text-gray-900">Keyword Relevance</h3>
              </div>
              <p className="text-gray-800">Egypt-specific job terms added</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="font-semibold text-gray-900">Affordable Excellence</h3>
              </div>
              <p className="text-gray-800">A high-quality result without breaking the bank</p>
            </div>
          </div>
        </div>

        {/* Real Career Change */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-600" />
            Real Career Change. Real Results.
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">Prosumely has helped over 2,500 professionals in:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Regions:</h4>
                <ul className="space-y-2 text-blue-800">
                  <li>• Egypt, UAE, Qatar & Saudi Arabia</li>
                  <li>• Construction, Oil & Gas, Finance, Retail</li>
                  <li>• IT, Hospitality, Healthcare, and more</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Services:</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.prosumely.com/free-resume-review"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Want a high-impact resume like this? www.prosumely.com/free-resume-review
                  </a>
                  <a
                    href="https://www.prosumely.com/ats-resume-writing-service"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Need a LinkedIn that recruiters find?
                    www.prosumely.com/ats-resume-writing-service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Word */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            Final Word
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              At Prosumely, we don't just create resumes—we craft career breakthroughs.
            </p>
            <p className="text-gray-800 leading-relaxed mb-6">
              If your resume or LinkedIn isn't working, it's time to let us help you rewrite your
              story.
            </p>
            <a
              href="https://www.prosumely.com"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              <Globe className="w-4 h-4 mr-2" />
              Learn more: www.prosumely.com
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Noticed Like Amir?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Transform your career visibility with our expert resume and LinkedIn services
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
