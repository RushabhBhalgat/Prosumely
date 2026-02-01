import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import CareerTransitionCalculator from '@/components/career-tools/CareerTransitionCalculator'

export const metadata: Metadata = {
  title: 'Career Transition Feasibility Calculator - Risk Assessment Tool | Prosumely',
  description:
    'Free AI-powered career change feasibility calculator. Get objective assessment of skill transferability, market demand, financial viability, and risk analysis. Receive detailed transition plan with timeline and milestones for your career pivot.',
  keywords: [
    'career transition calculator',
    'career change feasibility',
    'career pivot tool',
    'career change assessment',
    'career switch planner',
    'job transition analysis',
    'career change risk',
    'skill transferability',
    'career change roadmap',
    'career planning tool',
    'professional transition',
    'career switch calculator',
    'job change planner',
    'career pivot assessment',
    'transition planning',
    'career change success',
    'skill gap analysis',
    'career change timeline',
    'career transformation',
    'industry switch planner',
  ],
  openGraph: {
    title: 'Career Transition Feasibility Calculator - Plan Your Career Change',
    description:
      'Free AI tool evaluates your career change feasibility with risk assessment, skill analysis, and detailed transition roadmap. Get go/no-go recommendation with mitigation strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/career-transition-calculator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/career-transition-calculator',
  },
}

const CareerTransitionCalculatorPage = () => {
  return (
    <>
      <CareerTransitionCalculator />

      {/* SEO Content and Related Tools Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Essential Tools for Your Career Transition
          </h2>
          <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            Use these complementary tools to plan and execute a successful career change
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Opportunity Heatmap</h3>
              <p className="text-sm text-gray-600">
                Explore demand for your target role across different markets and regions
              </p>
            </Link>

            <Link
              href="/career-tools/cost-of-living-calculator"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cost of Living Calculator</h3>
              <p className="text-sm text-gray-600">
                Evaluate financial impact if your career transition involves relocation
              </p>
            </Link>

            <Link
              href="/career-tools/salary-analyzer"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Salary Analyzer</h3>
              <p className="text-sm text-gray-600">
                Analyze your salary expectations in your target career field
              </p>
            </Link>

            <Link
              href="/career-tools/skill-gap-analyzer"
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Gap Analyzer</h3>
              <p className="text-sm text-gray-600">
                Identify skills you need to acquire for your target career
              </p>
            </Link>

            <Link
              href="/career-tools/career-roadmap-builder"
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Roadmap Builder</h3>
              <p className="text-sm text-gray-600">
                Create a step-by-step plan for your career transition journey
              </p>
            </Link>

            <Link
              href="/career-tools/future-skills-identifier"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Future Skills Identifier</h3>
              <p className="text-sm text-gray-600">
                Learn which emerging skills will be valuable in your new career path
              </p>
            </Link>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Resume Review CTA */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Get a Free Resume Review</h3>
              <p className="text-lg mb-6 text-white/90">
                Optimize your resume for your career transition. Get expert feedback—free.
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
          </div>

          {/* ATS CV CTA */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
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
              <h3 className="text-2xl font-bold mb-3">Career Pivot CV</h3>
              <p className="text-lg mb-6 text-white/90">
                Position yourself for success with an ATS-optimized CV tailored for career
                transitions.
              </p>
              <Link
                href="/ats-resume"
                className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
              >
                <span style={{ color: '#0891b2' }}>Get ATS Resume</span>
                <svg
                  className="w-5 h-5 ml-2"
                  style={{ color: '#0891b2' }}
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
    </>
  )
}

export default CareerTransitionCalculatorPage
