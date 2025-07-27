import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
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
  Clock,
  Eye,
  MessageCircle,
} from 'lucide-react'

export const metadata = {
  title: 'From Dubai Silence to Shortlist Success | UAE Resume Success | Prosumely',
  description:
    'How a UAE Resume Makeover Delivered Interview Calls in Just a Week for a Dubai-based professional.',
  keywords: [
    'Dubai jobs',
    'UAE careers',
    'project management UAE',
    'Dubai resume writing',
    'HSE documentation',
    'municipality coordination',
    'UAE job market',
    'ATS resume writing',
  ],
  openGraph: {
    title: 'From Dubai Silence to Shortlist Success | UAE Resume Success | Prosumely',
    description: 'How a UAE Resume Makeover Delivered Interview Calls in Just a Week',
    url: 'https://www.prosumely.com/impact-stories/from-dubai-silence-to-shortlist-success',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Dubai UAE Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}

export default function FromDubaiSilenceToShortlistSuccessPage() {
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
              UAE Success Story
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Dubai Silence to Shortlist Success
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a UAE Resume Makeover Delivered Interview Calls in Just a Week
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | UAE Career Success | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">7 Days</div>
              <div className="text-sm text-gray-600">To Interview Calls</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">91%</div>
              <div className="text-sm text-gray-600">ATS Score</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2 Calls</div>
              <div className="text-sm text-gray-600">Interview Invitations</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">Dubai</div>
              <div className="text-sm text-gray-600">Based Professional</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1444427169197-de497742b62d?w=1200&h=600&fit=crop&crop=center"
            alt="Dubai Professional Success"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Starting Point: Strong Profile, Zero Visibility
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              In the competitive UAE job market, even experienced professionals can go unnoticed if
              their resumes lack clarity, design, and market alignment. Rakesh (name changed), a
              project management professional based in Dubai, was sending applications daily—but
              with no response.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Despite having solid experience and skills, his resume just wasn't creating any
              impact.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I had experience and skills, but my resume just wasn't creating any impact."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              That changed when he discovered Prosumely's free resume review and realized his
              outdated resume needed a professional transformation.
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
              Our free audit revealed multiple critical issues:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Visual clutter and unstructured layout</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Missing ATS keywords (44% score)</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Task-based instead of impact-focused language</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">No UAE-specific industry terminology</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Despite solid experience, the resume didn't reflect leadership, strategic thinking, or
            knowledge of the UAE market dynamics.
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
                Step 1: Strategic Positioning & Clarity
              </h3>
              <p className="text-blue-800 mb-4">
                We positioned Rakesh as a leader in operations, not just a task executor:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>
                  • Headline: "Project Delivery Specialist | 10+ Years | UAE Infrastructure &
                  Compliance Excellence"
                </li>
                <li>
                  • Summary: "Results-focused project manager with 10+ years delivering complex
                  infrastructure initiatives across Dubai and Abu Dhabi"
                </li>
                <li>• Focus on operational excellence and driving 20-30% efficiency gains</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: ATS Optimization with UAE Keywords
              </h3>
              <p className="text-blue-800 mb-4">
                We used critical UAE market keywords to boost ATS compatibility:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• HSE Documentation and municipality coordination</li>
                <li>• Cost tracking, BOQ, and quality assurance protocols</li>
                <li>• Compliance documentation and audit management</li>
                <li>• Result: ATS score jumped from 44% to 91%</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Modern, Clean Design
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Clean, modern layout with strategic white space</li>
                <li>• Metrics-driven bullet points showing quantifiable impact</li>
                <li>• Professional visual hierarchy for 6-second recruiter scan</li>
                <li>• Industry-aligned formatting tailored for UAE recruiters</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Want an ATS-optimized resume for UAE market?
            </h4>
            <a
              href="https://www.prosumely.com/ats-resume-writing-service"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              ATS Resume Writing Service
            </a>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            The Results: Two Interviews in One Week
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">Within 7 days of using his new resume:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">• Got two interview calls from major UAE developers</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <MessageCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  • One recruiter said: "Your resume stood out clearly from the rest"
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "The value for money is incredible. I already recommended Prosumely to two friends."
            </p>
          </div>
        </div>

        {/* Why It Worked */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Why It Worked: The Success Formula
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">
              The transformation succeeded because of four key elements:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• Tailored to UAE Recruiters</span>
                <p className="text-blue-800 text-sm mt-1">Industry-aligned language and keywords</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• Clear Strategic Positioning</span>
                <p className="text-blue-800 text-sm mt-1">Strong leadership branding at the top</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• Polished Professional Writing</span>
                <p className="text-blue-800 text-sm mt-1">
                  Every bullet conveyed confidence and impact
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• Modern Visual Design</span>
                <p className="text-blue-800 text-sm mt-1">Built for the 6-second recruiter scan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Prosumely Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            What Prosumely Delivers
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              With Prosumely, resumes aren't just updated—they're engineered for visibility. Our
              comprehensive services include:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• ATS Optimization with industry keywords</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• Executive & Mid-Level Professional Branding</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• Clean, modern professional layouts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• Content polishing and strategic editing</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• Industry-specific keyword integration</span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://www.prosumely.com/ats-resume-writing-service"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore our resume services for professionals
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
              Prosumely is India's most trusted resume writing and career branding partner, helping
              professionals break into competitive job markets like the UAE. Our team specializes in
              crafting ATS-optimized, keyword-rich, professionally designed resumes that reflect
              your unique career story and speak the language recruiters want to hear.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're in construction, engineering, finance, tech, or hospitality—we help you
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
          <h2 className="text-3xl font-bold mb-4">Ready for Your Career Breakthrough?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let our expert team help you land interview calls in the UAE market
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
