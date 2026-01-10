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
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Explore More Career Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
