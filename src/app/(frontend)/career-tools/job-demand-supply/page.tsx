import React from 'react'
import { Metadata } from 'next'
import JobDemandSupplyCalculator from '@/components/career-tools/JobDemandSupply'

export const metadata: Metadata = {
  title: 'Free Job Market Competition Calculator - Supply vs Demand Index 0-10 | Prosumely',
  description:
    'Analyze real-time job market competition with our AI-powered calculator. Get your competition index (0-10), estimated openings, candidate ratios, salary insights, and winning job search strategies for any role.',
  keywords: [
    'job market competition',
    'job demand calculator',
    'job supply demand index',
    'job market analysis tool',
    'career competition index',
    'job search difficulty calculator',
    'hiring market trends',
    'job openings vs candidates',
    'employment competition tool',
    'job market saturation',
    'career market research',
    'job availability calculator',
    'labor market analysis',
    'job hunting competition',
  ],
  openGraph: {
    title: 'Free Job Market Competition Calculator - Supply vs Demand Index',
    description:
      'AI-powered tool to analyze job market competition. Get your personalized competition index, market metrics, regional insights, and data-driven job search strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/job-demand-supply',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/job-demand-supply',
  },
}

export default function JobDemandSupplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <JobDemandSupplyCalculator />

        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Job Market Competition Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Make Data-Driven Career Decisions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Stop wasting time applying to over-saturated job markets. Our AI-powered calculator
              analyzes real-time supply-demand dynamics to give you a precise competition index
              (0-10) for any role, location, and experience level. Know exactly how many candidates
              you're competing against, typical hiring timelines, and which markets offer the best
              opportunities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The tool combines market data with AI insights to provide actionable job search
              strategies tailored to your competition level. Whether you're facing low competition
              or entering a saturated market, you'll get networking tips, application advice, and
              skill gap recommendations to maximize your chances of landing the role.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Competition Index (0-10):</strong> Precise measurement of market saturation
                for your target role and location
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Market Metrics:</strong> Estimated job openings, candidates per role,
                application competition, and hiring timelines
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Regional Analysis:</strong> Best and worst markets to target based on
                supply-demand balance
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Skill Gap Analysis:</strong> In-demand skills you need to acquire to stand
                out from competitors
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Job Search Strategy:</strong> Personalized networking, application, and
                interview tips based on competition level
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Salary Insights:</strong> Expected salary range and negotiation leverage
                based on supply-demand dynamics
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
          <div className="bg-rose-50 rounded-xl p-6 mb-8">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Active Job Seekers:</strong> Understand market competition before
                  investing time in applications
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Career Changers:</strong> Evaluate demand for your target role in new
                  industries
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>New Graduates:</strong> Identify entry-level roles with favorable
                  supply-demand ratios
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Remote Workers:</strong> Compare competition levels for remote vs on-site
                  opportunities
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Career Strategists:</strong> Plan skill development based on future market
                  trends
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
