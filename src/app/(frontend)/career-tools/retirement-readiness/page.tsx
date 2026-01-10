import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import RetirementReadinessCalculator from '@/components/career-tools/RetirementReadinessCalculator'

export const metadata: Metadata = {
  title: 'Free Retirement Readiness Calculator - Global Pension Analysis Tool | Prosumely',
  description:
    'Evaluate retirement preparedness based on savings, pension contributions, and country-specific retirement systems. Compare retirement security across countries for expats and remote workers.',
  keywords: [
    'retirement readiness calculator',
    'retirement planning tool',
    'pension calculator',
    'global retirement comparison',
    'retirement savings calculator',
    'expat retirement planning',
    'retirement preparedness assessment',
    'pension system comparison',
    'retirement income calculator',
    'international retirement planning',
    'retirement gap analysis',
    'country retirement comparison',
  ],
  openGraph: {
    title: 'Free Retirement Readiness Calculator - Global Pension Analysis Tool',
    description:
      'Evaluate retirement preparedness with our comprehensive calculator. Compare pension systems globally, assess savings adequacy, and get personalized retirement planning insights.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/retirement-readiness',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/retirement-readiness',
  },
}

export default function RetirementReadinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <RetirementReadinessCalculator />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Retirement Readiness Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Global Retirement Planning Made Simple
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered retirement readiness calculator helps you understand your retirement
              preparedness across different countries and pension systems. Whether you're planning
              to retire in your home country or considering retirement abroad, this tool provides
              comprehensive analysis of your savings trajectory, pension benefits, and
              country-specific retirement security.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Perfect for expats, digital nomads, and remote workers navigating multiple pension
              systems, our calculator compares retirement security across countries, analyzes
              pension portability, and provides actionable strategies to close any retirement
              savings gaps. Get personalized insights on optimal retirement locations, tax
              implications, and healthcare systems.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Retirement Readiness Score (0-100):</strong> Comprehensive assessment of
                your retirement preparedness across 5 key dimensions
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Projected Retirement Wealth:</strong> Detailed projections of retirement
                assets, annual income, and fund sustainability
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Country Comparison:</strong> Pension system rankings, best retirement
                countries, and tax-friendly jurisdictions
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Gap Analysis:</strong> Identify savings shortfalls and get alternative
                strategies to reach your retirement goals
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Actionable Roadmap:</strong> Prioritized action plan with immediate,
                short-term, and long-term strategies
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Risk Assessment:</strong> Identify and mitigate risks including market
                volatility, inflation, healthcare costs, and longevity
              </span>
            </li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Perfect For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Expats and Remote Workers:</strong> Navigate multiple pension systems and
                  plan international retirement
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Mid-Career Professionals:</strong> Assess if you're on track and make
                  necessary adjustments
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Pre-Retirees:</strong> Fine-tune your retirement strategy in the final
                  years before retirement
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Global Citizens:</strong> Compare retirement options across different
                  countries
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">Enter Your Profile:</strong>
                  <p className="text-gray-600">
                    Provide age, savings, contributions, and current country information
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">Define Your Goals:</strong>
                  <p className="text-gray-600">
                    Specify desired lifestyle, retirement location, and healthcare needs
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </span>
                <div>
                  <strong className="text-gray-900">Get AI Analysis:</strong>
                  <p className="text-gray-600">
                    Our AI evaluates your readiness across 5 dimensions with country-specific
                    insights
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </span>
                <div>
                  <strong className="text-gray-900">Take Action:</strong>
                  <p className="text-gray-600">
                    Follow the personalized roadmap to optimize your retirement plan
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need more personalized retirement planning assistance?
            </p>
            <Link
              href="/services/career-coaching"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule a Career Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
