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
  Settings,
} from 'lucide-react'

export const metadata = {
  title: 'From Generic to Global | Saudi Arabia Oil & Gas Success | Prosumely',
  description:
    "How a Resume Revamp Opened Doors in Saudi Arabia's Oil & Gas Sector for a mechanical engineer.",
  keywords: [
    'Saudi Arabia oil gas',
    'mechanical engineer KSA',
    'ARAMCO careers',
    'SABIC jobs',
    'upstream downstream',
    'refinery experience',
    'piping pressure systems',
    'ATS resume writing',
  ],
  openGraph: {
    title: 'From Generic to Global | Saudi Arabia Oil & Gas Success | Prosumely',
    description: "How a Resume Revamp Opened Doors in Saudi Arabia's Oil & Gas Sector",
    url: 'https://prosumely.com/impact-stories/from-generic-to-global',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Saudi Arabia Oil & Gas Career Success Story',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}

export default function GenericToGlobalPage() {
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
              <Settings className="w-4 h-4 mr-2 text-blue-600" />
              Oil & Gas Success
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              From Generic to Global: Saudi Arabia Oil & Gas Breakthrough
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              How a Resume Revamp Opened Doors in Saudi Arabia's Oil & Gas Sector
            </p>

            <div className="text-sm text-gray-500 mt-4">
              Client Impact Story by Prosumely | Oil & Gas | July 2025
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">14+ Years</div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">10 Days</div>
              <div className="text-sm text-gray-600">Interview Calls</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-gray-600">Global Contractors</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">KSA</div>
              <div className="text-sm text-gray-600">Target Market</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16">
          <Image
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop"
            alt="Saudi Arabia Oil & Gas Success Story"
            width={800}
            height={400}
            className="w-full h-64 md:h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Problem Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-600" />
            The Problem: A Resume That Didn't Reflect the Real Value
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              When Raj (name changed), a seasoned mechanical engineer with over 14 years in upstream
              and downstream operations, decided to pivot toward Saudi Arabia's thriving oil & gas
              industry, he expected opportunities to pour in.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              But despite strong field exposure, project experience in refineries, and
              certifications in piping and pressure systems, the interview calls weren't coming.
              Something wasn't right.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <Quote className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-700 italic">
                "My resume had the facts. But it didn't have the story. It looked outdated, lacked
                structure, and didn't feel aligned with what global recruiters expect."
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              That's when Raj discovered Prosumely, through a LinkedIn recommendation. Within days,
              his career narrative took a major turn.
            </p>
          </div>
        </div>

        {/* Assignment Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            The Assignment: Understand What Employers in KSA Want
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6">
              Raj signed up for the ATS Resume Writing Service, aiming to stand out in a
              hyper-competitive energy sector.
            </p>
            <p className="text-blue-800 mb-6">The Prosumely team immediately began dissecting:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">Raj's current resume</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Job postings from Aramco, Sabic, and Petro Rabigh
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Core keywords in project management, EPCM, and plant maintenance
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <span className="text-blue-800">
                  Regional compliance norms and leadership expectations
                </span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Build a Saudi Arabia-optimized, ATS-compliant resume
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
            The Transformation: Technical. Tactical. Targeted.
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 1: Role Repositioning
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>
                  • Defined Raj's profile as a Mechanical Project Lead with cross-border exposure
                </li>
                <li>
                  • Elevated his narrative from tasks to strategic impact and operations oversight
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Step 2: Region-Specific Keywords
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>
                  • Added Saudi Arabia-relevant terms like "ARAMCO Standards," "SABIC Compliance,"
                  "SAP-PM Modules," and "Turnaround Maintenance Planning"
                </li>
                <li>• Mapped keywords from KSA job boards (Bayt, Naukrigulf, LinkedIn Gulf)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Step 3: Executive Formatting & Flow
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Modernized the resume layout for a clean, command-driven visual hierarchy</li>
                <li>
                  • Introduced strong metrics: "Led shutdown of 3 processing units saving $1.2M,"
                  "Reduced unplanned downtime by 36%"
                </li>
                <li>
                  • Emphasized leadership: vendor negotiations, compliance audits, team mentoring
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mt-8">
            <h4 className="font-semibold text-blue-900 mb-4">What made the biggest difference?</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-blue-900">Grammar Review process</span>
                  <span className="text-blue-800">
                    {' '}
                    ensured every sentence Raj presented was crisp, clear, and error-free—leaving no
                    room for ambiguity.
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-blue-900">Quantified Impact</span>
                  <span className="text-blue-800">
                    {' '}
                    tied his experience to measurable KPIs, making his results impossible to ignore.
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-blue-900">Action Verbs</span>
                  <span className="text-blue-800">
                    {' '}
                    like "orchestrated," "engineered," and "streamlined" breathed life into formerly
                    dull bullet points.
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-blue-900">EES Formatting approach</span>
                  <span className="text-blue-800">
                    {' '}
                    gave Raj's resume a structured presentation that made each section easy to scan
                    and compelling to read.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "They didn't just rewrite my resume. They rebranded my experience."
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-600" />
            The Results: High-Impact Resume. Instant Credibility.
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-blue-800 mb-6 font-medium">After receiving his new resume:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Raj applied to four key roles in Saudi Arabia's eastern province
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Clock className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Within 10 days, he got interview calls from two global contractors
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-blue-800">
                  Recruiters specifically complimented the clarity, structure, and relevance of his
                  resume
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            He was so impressed, he referred two of his peers from the oil & gas field.
          </p>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <Quote className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-gray-700 italic">
              "This resume finally sounds like me, but at a global level. It's professional, sharp,
              and speaks the language of decision-makers."
            </p>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-600" />
            Keywords We Used to Align with Saudi Job Market
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"ARAMCO Approved Vendor"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"EPCM Project Oversight"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Shutdown & Turnaround Management"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Downstream Operations Supervision"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"SABIC Plant Compliance"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Maintenance & Reliability Engineering"
                </span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">"Rotating Equipment Overhaul"</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <span className="font-medium text-blue-900">
                  "Commissioning & Start-Up Coordination"
                </span>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Request your free resume review
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
        </div>

        {/* What Prosumely Delivers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Settings className="w-8 h-8 mr-3 text-blue-600" />
            What Prosumely Delivers in Every Resume
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 mb-6">
              When Prosumely rewrites your resume, it's more than words — it's a full career
              presentation system designed for outcomes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  ATS Compatibility – Optimized for tracking systems used by top recruiters
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Quantified Impact – Every bullet includes data-driven achievements
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Keywords – Tailored to job roles, locations, and industries
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Visually Appealing Design – Clean layouts with professional aesthetics
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Active Voice Formatting – Engaging and authoritative tone
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  EES Formatting – Structured with Effective, Elegant, and Strategic layouts
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">Grammar Review – Error-free, polished content</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Structure & Consistency – Logical flow and formatting
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Strengthening Content – Enhanced to bring out your value
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-800">
                  Action Verbs – Energizing your experience with dynamic language
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
              Raj's original resume showed experience, but lacked presentation and region alignment.
            </p>
            <p className="text-gray-800 mb-6">Prosumely fixed that by:</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">Localizing language to Saudi oil & gas norms</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">Embedding high-relevance KPIs and results</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  Designing a layout suited for Gulf recruiters and ATS filters
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  Applying Structure & Consistency to ensure logical storytelling from start to
                  finish
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-800">
                  Incorporating Strengthening Content strategies to enhance credibility across
                  leadership points
                </span>
              </div>
            </div>
            <p className="text-gray-800 mt-6 font-medium">
              The result? A confident, career-ready, region-ready resume.
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
              Prosumely is India's trusted resume writing and career branding platform helping
              professionals break into international markets. We specialize in creating
              industry-specific, keyword-enriched, ATS-optimized resumes that open doors in regions
              like Saudi Arabia, UAE, and Qatar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With proven results across oil & gas, construction, engineering, finance, and tech,
              Prosumely helps turn raw experience into polished opportunity.
            </p>
            <div className="mt-6">
              <a
                href="https://www.prosumely.com"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore more at www.prosumely.com
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career Like Raj?</h2>
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
