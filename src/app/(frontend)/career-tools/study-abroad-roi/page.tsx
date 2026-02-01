import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import StudyAbroadROI from '@/components/career-tools/StudyAbroadROI'

export const metadata: Metadata = {
  title:
    'Free Study Abroad ROI Calculator - International Education Investment Analysis | Prosumely',
  description:
    'Calculate return on investment for studying abroad. Analyze tuition costs, living expenses, salary boost, career opportunities, and break-even timeline to make informed decisions about international education.',
  keywords: [
    'study abroad ROI',
    'international education cost calculator',
    'study abroad investment analysis',
    'university abroad calculator',
    'international degree ROI',
    'study abroad financial planning',
    'education loan calculator',
    'overseas education cost',
    'student visa cost calculator',
    'international student budget',
    'study abroad payback period',
    'foreign degree return on investment',
    'study overseas cost analysis',
    'international tuition calculator',
  ],
  openGraph: {
    title: 'Free Study Abroad ROI Calculator - International Education Investment Analysis',
    description:
      'AI-powered ROI calculator for studying abroad. Get comprehensive financial analysis including costs, salary boost, payback period, and career opportunities.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/study-abroad-roi',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/study-abroad-roi',
  },
}

export default function StudyAbroadROIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <StudyAbroadROI />

        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Study Abroad ROI Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Make Data-Driven Education Investment Decisions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Studying abroad is one of the biggest financial decisions you'll make. Our AI-powered
              calculator provides comprehensive ROI analysis by evaluating total costs (tuition,
              living, visa, travel), comparing against salary increases, career opportunities, and
              calculating your exact break-even timeline. Stop guessing whether international
              education is worth the investment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The tool analyzes your specific program, country, and career goals to provide
              personalized insights on salary premiums for international degrees, immigration
              pathways, debt affordability, and realistic payback periods. You'll see exactly how
              much you need to earn post-graduation to make your investment worthwhile.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Total Investment Breakdown:</strong> Direct costs, opportunity costs, and
                financing costs with detailed itemization
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Salary Boost Analysis:</strong> Expected international degree premium and
                lifetime earnings increase
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Payback Period:</strong> Exact timeline to break even on your education
                investment
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Immigration Benefits:</strong> Post-study work visa opportunities and path
                to permanent residency
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Financial Viability:</strong> Affordability rating with debt-to-income
                analysis and monthly loan payment estimates
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Alternative Scenarios:</strong> Compare against domestic degrees and online
                programs
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
          <div className="bg-emerald-50 rounded-xl p-6 mb-8">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>International Students:</strong> Evaluating whether to pursue education
                  abroad
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Parents:</strong> Making informed decisions about children's education
                  investment
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Working Professionals:</strong> Considering MBA or graduate programs
                  abroad
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Career Changers:</strong> Assessing retraining through international
                  education
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Scholarship Applicants:</strong> Understanding how much scholarship
                  funding is needed for positive ROI
                </span>
              </li>
            </ul>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200 mt-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Essential Tools for Your International Education Journey
            </h3>
            <p className="text-gray-700 text-center mb-6">
              Maximize your study abroad success with these complementary tools
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/career-tools/cost-of-living-calculator"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Cost of Living Calculator</h4>
                <p className="text-sm text-gray-600">
                  Compare living expenses across study destinations to budget accurately
                </p>
              </Link>

              <Link
                href="/career-tools/salary-comparison"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Comparison</h4>
                <p className="text-sm text-gray-600">
                  Compare post-graduation salaries in your home country vs. study destination
                </p>
              </Link>

              <Link
                href="/career-tools/global-opportunity-heatmap"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Global Opportunity Heatmap</h4>
                <p className="text-sm text-gray-600">
                  Explore career opportunities by country and identify the best locations for your
                  field
                </p>
              </Link>

              <Link
                href="/cover-letter-generator"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Cover Letter Generator</h4>
                <p className="text-sm text-gray-600">
                  Create compelling cover letters for international job applications
                </p>
              </Link>

              <Link
                href="/career-tools/skill-gap-analyzer"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Skill Gap Analyzer</h4>
                <p className="text-sm text-gray-600">
                  Identify skills to develop during your studies for maximum career impact
                </p>
              </Link>

              <Link
                href="/career-tools/career-roadmap-builder"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Career Roadmap Generator</h4>
                <p className="text-sm text-gray-600">
                  Plan your career progression after graduation to maximize ROI
                </p>
              </Link>

              <Link
                href="/career-tools/future-skills-identifier"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Future Skills Identifier</h4>
                <p className="text-sm text-gray-600">
                  Discover emerging skills to focus on during your international education
                </p>
              </Link>
            </div>
          </div>

          {/* CTAs Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* SOP Creation Button */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Craft a Winning SOP</h3>
                <p className="text-lg mb-6 text-white/90">
                  Stand out in university admissions with a professionally written Statement of
                  Purpose tailored to your goals.
                </p>
                <Link
                  href="/sop-creation"
                  className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
                >
                  <span style={{ color: '#3b82f6' }}>Create My SOP</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    style={{ color: '#3b82f6' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Fresher CV Button */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Build Your Fresher CV</h3>
                <p className="text-lg mb-6 text-white/90">
                  Create a compelling CV optimized for international job markets and post-study work
                  opportunities.
                </p>
                <Link
                  href="/fresher-cv"
                  className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
                >
                  <span style={{ color: '#10b981' }}>Get My Fresher CV</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    style={{ color: '#10b981' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Free Resume Review CTA */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Get a Free Resume Review</h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Maximize your job prospects after graduation. Get expert feedback on your resume—free.
            </p>
            <Link
              href="/resume-review"
              className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
            >
              <span style={{ color: '#7c3aed' }}>Get Free Review</span>
              <svg
                className="w-5 h-5 ml-2"
                style={{ color: '#7c3aed' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Executive CV CTA */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Professional CV Writing</h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Maximize your study abroad ROI with an executive-level CV that commands premium
              salaries in international markets.
            </p>
            <Link
              href="/executive-resume-writing-service"
              className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
            >
              <span style={{ color: '#ea580c' }}>Get Professional Help</span>
              <svg
                className="w-5 h-5 ml-2"
                style={{ color: '#ea580c' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
