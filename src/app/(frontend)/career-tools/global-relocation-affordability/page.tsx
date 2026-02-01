import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import GlobalRelocationCalculator from '@/components/career-tools/GlobalRelocationCalculator'

export const metadata: Metadata = {
  title:
    'Free Global Relocation Affordability Calculator - International Move Cost Planner | Prosumely',
  description:
    'Calculate the true cost of international relocation including visa fees, moving costs, housing setup, and ongoing expenses. Determine if your international move is financially feasible with comprehensive cost analysis and affordability scoring.',
  keywords: [
    'global relocation calculator',
    'international move cost calculator',
    'expat relocation costs',
    'moving abroad affordability',
    'visa cost calculator',
    'international moving budget',
    'cost of relocating overseas',
    'expat financial planning',
    'relocation affordability assessment',
    'international job offer calculator',
    'moving abroad cost breakdown',
    'global mobility calculator',
    'expat cost of living',
    'international relocation planner',
  ],
  openGraph: {
    title: 'Free Global Relocation Affordability Calculator - Plan Your International Move',
    description:
      'Comprehensive calculator for international moves. Analyze one-time costs, ongoing expenses, visa requirements, and financial feasibility before relocating abroad.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/global-relocation-affordability',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/global-relocation-affordability',
  },
}

export default function GlobalRelocationAffordabilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <GlobalRelocationCalculator />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Global Relocation Affordability Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comprehensive International Move Planning
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Considering a job offer abroad or planning an international relocation? Moving to
              another country involves complex financial considerations that go far beyond just
              comparing salaries. Our Global Relocation Affordability Calculator provides a
              comprehensive analysis of all costs involved in international moves.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From visa and immigration fees to shipping costs, housing setup, ongoing living
              expenses, and hidden costs you might not have considered, our tool gives you a
              complete financial picture. You'll receive an affordability score, break-even
              analysis, and clear recommendations on whether your move is financially sound.
            </p>
          </div>

          <div className="bg-teal-50 rounded-xl p-8 border border-teal-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Complete Cost Breakdown:</strong> Calculate one-time relocation costs
                  including visa fees, travel, shipping, housing setup, and administrative expenses
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Ongoing Cost Analysis:</strong> Compare monthly living expenses between
                  your current and destination locations
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Affordability Score:</strong> Get a clear 0-100 score indicating whether
                  your move is financially feasible
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Break-Even Analysis:</strong> Learn how many months it will take to recoup
                  relocation costs
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Hidden Costs Alert:</strong> Discover often-overlooked expenses like tax
                  implications, healthcare gaps, and pension portability
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>Financial Timeline:</strong> Get a detailed checklist of financial tasks
                  from 6 months before to 6 months after arrival
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Professionals considering international job offers</li>
              <li>• Digital nomads planning extended stays abroad</li>
              <li>• Expats evaluating relocation between countries</li>
              <li>• Families planning international moves with multiple dependents</li>
              <li>• Recent graduates considering working abroad</li>
              <li>• Retirees exploring international retirement destinations</li>
              <li>• Anyone who needs to understand the true financial impact of relocation</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 border border-blue-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <strong className="text-gray-900">Enter Move Details:</strong> Specify your origin
                  and destination countries/cities, household size, move timeline, and duration of
                  stay
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <strong className="text-gray-900">Provide Financial Information:</strong> Input
                  your current savings, current salary, new salary offer, and debt obligations
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <strong className="text-gray-900">Specify Relocation Needs:</strong> Detail your
                  housing requirements, belongings volume, pets, and whether you're shipping a
                  vehicle
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <strong className="text-gray-900">Review Comprehensive Analysis:</strong> Receive
                  detailed cost breakdowns, affordability score, recommendations, and a financial
                  timeline for your move
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What Costs Are Included?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">One-Time Costs:</h4>
                <ul className="space-y-1">
                  <li>• Visa and immigration fees</li>
                  <li>• Legal and consultant fees</li>
                  <li>• Medical examinations</li>
                  <li>• Document translations</li>
                  <li>• Flight tickets</li>
                  <li>• Household goods shipping</li>
                  <li>• Pet transportation</li>
                  <li>• Vehicle shipping (if applicable)</li>
                  <li>• Security deposits</li>
                  <li>• Furniture and appliances</li>
                  <li>• Utilities connection</li>
                  <li>• Administrative fees</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Ongoing Monthly Costs:</h4>
                <ul className="space-y-1">
                  <li>• Housing (rent + utilities)</li>
                  <li>• Transportation</li>
                  <li>• Food and groceries</li>
                  <li>• Healthcare and insurance</li>
                  <li>• Education (if applicable)</li>
                  <li>• Entertainment and leisure</li>
                  <li>• Savings</li>
                  <li>• Debt obligations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl p-8 border border-teal-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How accurate are the cost estimates?
                </h4>
                <p className="text-gray-700">
                  Our AI uses real-world data and typical cost ranges for international relocations.
                  However, actual costs can vary significantly based on specific circumstances,
                  lifestyle choices, and current economic conditions. Use these estimates as a
                  planning guide and conduct additional research for your specific situation.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Does this include employer relocation packages?
                </h4>
                <p className="text-gray-700">
                  The calculator shows the full cost of relocation. If your employer offers a
                  relocation package, you can subtract that amount from the total one-time costs to
                  see your net out-of-pocket expense.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  What if I'm moving without a job offer?
                </h4>
                <p className="text-gray-700">
                  You can still use the calculator. Simply leave the new salary offer field blank or
                  enter an estimated income. The tool will still provide valuable insights into
                  relocation costs and ongoing living expenses.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/career-tools"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg no-underline"
              style={{ color: '#ffffff' }}
            >
              Explore More Career Tools
            </Link>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-200 mt-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Essential Tools for International Relocation
            </h3>
            <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              Maximize SEO value and user engagement by internally linking to these related career
              tools
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">Global Opportunity Heatmap</h4>
                <p className="text-sm text-gray-600">
                  Explore career opportunities worldwide before deciding where to relocate
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">Cost of Living Calculator</h4>
                <p className="text-sm text-gray-600">
                  Compare detailed living expenses between your current location and destination
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Analyzer</h4>
                <p className="text-sm text-gray-600">
                  Understand expected salaries in your target country and role
                </p>
              </Link>

              <Link
                href="/career-tools/career-transition-calculator"
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
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Career Transition Calculator
                </h4>
                <p className="text-sm text-gray-600">
                  Evaluate career change feasibility if relocation involves switching industries
                </p>
              </Link>

              <Link
                href="/career-tools/salary-comparison"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Comparison</h4>
                <p className="text-sm text-gray-600">
                  Compare job offers across multiple countries with purchasing power analysis
                </p>
              </Link>
            </div>
          </div>

          {/* CTAs Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                  Position yourself for international opportunities. Get expert feedback—free.
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
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
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
                <h3 className="text-2xl font-bold mb-3">International Career CV</h3>
                <p className="text-lg mb-6 text-white/90">
                  Secure your global relocation with an ATS-optimized CV for international markets.
                </p>
                <Link
                  href="/ats-resume"
                  className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
                >
                  <span style={{ color: '#14b8a6' }}>Get ATS Resume</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    style={{ color: '#14b8a6' }}
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
      </div>
    </div>
  )
}
