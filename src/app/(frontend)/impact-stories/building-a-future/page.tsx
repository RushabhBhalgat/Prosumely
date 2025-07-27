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
} from 'lucide-react'

export const metadata = {
  title: 'Building a Future | Construction Career Success | Prosumely',
  description:
    'How a Resume Overhaul Helped a Mid-Level Professional Break into the UAE Construction Sector with significant career advancement.',
  keywords: [
    'UAE construction jobs',
    'resume transformation',
    'career breakthrough',
    'engineering careers',
    'Middle East employment',
    'construction project engineer',
    'Gulf construction market',
    'ATS optimization',
  ],
  openGraph: {
    title: 'Building a Future | Construction Career Success | Prosumely',
    description:
      'How a Resume Overhaul Helped a Mid-Level Professional Break into the UAE Construction Sector',
    url: 'https://www.prosumely.com/impact-stories/building-a-future',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'UAE Construction Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}

export default function BuildingAFuturePage() {
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
              Construction Industry Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Building a Future: UAE Construction Breakthrough
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a Resume Overhaul Helped a Mid-Level Professional Break into the UAE Construction
              Sector
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Construction Industry | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10+ Years</div>
              <div className="text-sm text-gray-600">Construction Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10 Days</div>
              <div className="text-sm text-gray-600">To First Shortlist</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2 Firms</div>
              <div className="text-sm text-gray-600">Interview Calls</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">Dubai</div>
              <div className="text-sm text-gray-600">New Position</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop&crop=center"
            alt="UAE Construction Site"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Starting Point */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Starting Point: An Outdated Resume and a Stalled Career
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              For over a decade, Rakesh (name changed for confidentiality) worked his way up in
              India's construction sector—from junior site engineer to mid-level project
              coordinator. His portfolio included multi-story residential towers, commercial
              complexes, and turnkey civil projects.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              But when he set his sights on the UAE construction market, the momentum stopped.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "I knew I had the experience. But weeks went by without a single recruiter showing
                interest. Something wasn't working."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              Rakesh realized that his outdated resume wasn't showcasing his skills the way
              international recruiters expected. He needed a change—a professional touch. That's
              when he turned to Prosumely.
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
                <span className="text-gray-800">Old-fashioned formatting and layout</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">Overuse of passive language</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">
                  Missing role-specific and region-specific keywords
                </span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <span className="text-gray-800">
                  No mention of UAE regulations, codes, or project types
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Despite solid experience, the resume didn't reflect leadership, project ownership, or
            knowledge of the Gulf construction ecosystem.
          </p>
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
            The Transformation Process
          </h2>

          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 1: Industry-Centric Storytelling
              </h3>
              <p className="text-blue-800 mb-4">
                The Prosumely team sat down with Rakesh to deep dive into:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• Key project milestones: budgets, timelines, and scale</li>
                <li>
                  • Technologies and construction methods used (AutoCAD, BIM, MEP coordination)
                </li>
                <li>• On-site leadership, safety protocols, vendor and subcontractor management</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: Regional Relevance
              </h3>
              <p className="text-blue-800 mb-4">
                We then embedded region-specific construction terms and insights, such as:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• UAE Building Codes and Compliance</li>
                <li>• Familiarity with DM and Trakhees regulations</li>
                <li>• MEP coordination and site safety standards in the Gulf</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Visual and Language Enhancement
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• A clean, modern format tailored for engineering and construction roles</li>
                <li>• Rewriting bullet points to showcase impact, scale, and KPIs</li>
                <li>
                  • Adding strong action verbs like "delivered," "led," "coordinated," and
                  "executed"
                </li>
              </ul>
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
            The Results: A Resume That Finally Worked
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">
              Just weeks after sharing his updated resume on Gulf job portals:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  • Rakesh began receiving shortlist emails within 10 days
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  • Got interview calls from two major UAE-based civil engineering firms
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  • Landed a new job in Dubai as a Construction Project Engineer, with a significant
                  pay upgrade and site responsibility
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "I realized it wasn't my experience that was holding me back—it was how I presented
              it. The new resume was a total game-changer."
            </p>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Key UAE Construction Keywords We Used
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">
              To align with recruiter expectations, the final resume included:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "GCC Construction Standards"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "UAE Municipality Approval"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Trakhees / DM Compliance"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">
                  • "BIM / AutoCAD / Civil 3D Proficiency"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">• "Safety & Site Supervision"</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">
                  • "Vendor & Contractor Coordination"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-blue-900">
                  • "Project Handover / Snag List / QA/QC"
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Prosumely Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-blue-600" />
            Why Prosumely Works for Mid-Level Professionals
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-800 mb-6">
              Mid-level professionals often get stuck between junior-level templates and
              executive-level strategies. Prosumely understands the sweet spot:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">• We highlight your growth</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We align your expertise with regional demand
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  • We balance technical capability with managerial maturity
                </span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://www.prosumely.com/ats-resume-writing-service"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore our resume services for mid-career professionals
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Future Like Rakesh?</h2>
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
