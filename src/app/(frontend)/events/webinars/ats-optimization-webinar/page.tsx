import Link from 'next/link'
import React from 'react'
import { ArrowLeft, Calendar, Clock, Users, Play, Shield, Search, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon | Prosumely Webinar',
  description:
    'Master ATS optimization and beat applicant tracking systems. Learn the secrets to making your resume visible to human recruiters in the digital age.',
  keywords: [
    'ATS optimization',
    'applicant tracking system',
    'resume formatting',
    'ATS friendly resume',
    'keyword optimization',
    'resume scanning',
    'ATS bypass',
    'prosumely webinar',
  ],
  openGraph: {
    title: 'The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon',
    description:
      'Master ATS optimization and beat applicant tracking systems. Learn the secrets to making your resume visible to human recruiters in the digital age.',
    url: 'https://www.prosumely.com/events/webinars/ats-optimization-webinar',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://www.prosumely.com/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'ATS Optimization Webinar by Prosumely',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon',
    description:
      'Master ATS optimization and beat applicant tracking systems. Learn the secrets to making your resume visible to human recruiters in the digital age.',
    images: ['https://www.prosumely.com/prosumely-ats-resume-writing-opengraph.jpg'],
  },
}

export default function ATSOptimizationWebinarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-slate-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Technical Masterclass
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Master the invisible gatekeeper that decides whether your resume reaches human eyes
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center bg-slate-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2" />
              <span>April 5, 2025</span>
            </div>
            <div className="flex items-center bg-slate-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>55 minutes</span>
            </div>
            <div className="flex items-center bg-slate-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              <span>2,200+ views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Is an ATS?</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-slate-900 mb-2">The Digital Gatekeeper</h3>
                <p>
                  An ATS—or Applicant Tracking System—is software companies use to manage job
                  applications. It scans resumes, ranks them based on keyword match, and forwards
                  only the top few to human recruiters.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">The Harsh Reality</h3>
                <p>
                  If your resume isn't ATS-friendly, it might never even be seen by a human. This
                  invisible system is your first—and often most challenging—hurdle.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Scans</h3>
                  <p className="text-gray-600 text-sm">
                    Analyzes resume content for relevant keywords
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ranks</h3>
                  <p className="text-gray-600 text-sm">
                    Scores resumes based on job description match
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Filters</h3>
                  <p className="text-gray-600 text-sm">Forwards only top-scoring candidates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Resume Pitfalls</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                    ✗
                  </span>
                  ATS Killers
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Text boxes, tables, and columns (break parsing)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fancy design templates that confuse the system
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Wrong file format (avoid PDFs in some systems)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Missing keywords from job description
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                    ✓
                  </span>
                  ATS Winners
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Clean, single-column layout
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Standard fonts (Arial, Calibri, Times New Roman)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    .docx format (when possible)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Strategic keyword integration
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keywords = Currency</h2>

            <div className="space-y-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-orange-900 mb-2">
                  The Keyword Disconnect Example
                </h3>
                <p>
                  If you're applying for a data analyst role and your resume doesn't mention "SQL,"
                  "Tableau," or "data visualization," you'll get filtered out—even if you have the
                  skills.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-red-900 mb-3">❌ Generic Language</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>"Digital marketing experience"</li>
                    <li>"Online branding"</li>
                    <li>"Web analytics"</li>
                    <li>"Social media management"</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-3">✅ ATS-Optimized Keywords</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>"SEO, SEM, PPC campaigns"</li>
                    <li>"Campaign strategy and execution"</li>
                    <li>"Google Analytics, Adobe Analytics"</li>
                    <li>"Facebook Ads, LinkedIn Ads"</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-3">Pro Tip: Use Tools</h3>
                <p className="text-gray-700">
                  Use tools like Jobscan or manually analyze job descriptions to identify important
                  keywords. Integrate them naturally into your bullet points.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keep It Simple</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-green-900 mb-4">
                  ✅ Structure Your Resume With:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Clear headings: Summary, Experience, Education, Skills
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Standard fonts: Arial, Calibri, Times New Roman
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Bullet points with action + result format
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Simple, single-column layout
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-4">❌ Avoid:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">
                      ✗
                    </span>
                    Columns and tables
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">
                      ✗
                    </span>
                    Logos, icons, or graphics
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">
                      ✗
                    </span>
                    Headers/footers with important info
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">
                      ✗
                    </span>
                    Creative fonts or unusual formatting
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Success Story: From 0 to 5 Interviews
            </h2>

            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">The Problem</h3>
                  <p className="text-gray-700 mb-4">
                    One of our clients applied to 40 jobs over 3 months without a single response.
                    His resume was well-written but completely failed ATS screening.
                  </p>

                  <h3 className="font-semibold text-slate-900 mb-3">What Was Wrong</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Creative template with columns</li>
                    <li>• Missing industry keywords</li>
                    <li>• Generic job descriptions</li>
                    <li>• PDF format in .docx-preferred systems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-green-900 mb-3">The Solution</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Added missing keywords from job postings
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Fixed formatting for clean parsing
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Rewrote bullets with measurable outcomes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Tested resume in ATS simulators
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="font-semibold text-green-700">
                      Result: 5 interviews in the next 10 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dual Optimization Strategy</h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Your resume has to beat the bots AND impress humans. We design for both.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-3">Step 1: ATS Readability</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Clean formatting structure</li>
                    <li>• Strategic keyword placement</li>
                    <li>• Standard section headings</li>
                    <li>• Proper file format</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-3">Step 2: Human Appeal</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Compelling storytelling</li>
                    <li>• Visual flow and hierarchy</li>
                    <li>• Achievement-focused content</li>
                    <li>• Professional presentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Q&A Highlights</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-slate-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: Should I use graphics or charts in my resume?
                </h3>
                <p className="text-gray-700">
                  A: Not in your main resume. Save those for a portfolio or website. ATS can't read
                  visuals, and they often break the parsing process.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: I'm applying for different types of jobs. Should I have multiple resumes?
                </h3>
                <p className="text-gray-700">
                  A: Yes! Create 2–3 tailored versions, each optimized for different roles.
                  One-size-fits-all doesn't work in the ATS era.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Make Your Resume ATS-Proof</h2>
            <p className="text-slate-100 mb-6 text-lg">
              You could be the perfect candidate—but if your resume isn't ATS-optimized, no one will
              know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ats-resume-writing-service"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              >
                Get ATS-Optimized Resume
              </Link>
              <Link
                href="/free-resume-review"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
              >
                Free ATS Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Webinars</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/events/webinars/resume-interviews-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 mb-2">
                Why Your Resume Isn't Getting You Interviews — And What to Do About It
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                The perfect follow-up to ATS optimization—learn what happens after you pass the
                initial screening
              </p>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>

            <Link
              href="/events/webinars/mid-career-reinvention-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 mb-2">
                From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Apply ATS principles to career transitions and industry changes
              </p>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
