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
  // FAQ Schema Markup for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good retirement readiness score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A retirement readiness score of 80 or above indicates you're on track for a comfortable retirement. Scores between 60-79 suggest moderate preparation with some areas needing improvement. Scores below 60 indicate significant gaps that require immediate attention. The score considers savings adequacy, investment strategy, timeline, pension/social security, and cost preparedness.",
        },
      },
      {
        '@type': 'Question',
        name: 'How much money do I need to retire comfortably?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A common rule of thumb is to aim for 70-80% of your pre-retirement income annually. For example, if you earn $75,000/year, you'd need $52,500-60,000 per year in retirement. The total amount depends on your retirement age, life expectancy, desired lifestyle, location, and healthcare needs. Many experts suggest having 10-12x your annual salary saved by retirement age.",
        },
      },
      {
        '@type': 'Question',
        name: 'At what age should I start planning for retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The ideal time to start planning is in your 20s or as soon as you begin earning income. The power of compound interest means even small contributions early on can grow significantly. However, it's never too late — even if you're in your 40s, 50s, or 60s, strategic planning and catch-up contributions can still make a substantial difference in your retirement readiness.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best retirement savings accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most popular retirement accounts include 401(k) plans (employer-sponsored with potential matching contributions), Traditional IRAs (tax-deductible contributions), Roth IRAs (tax-free withdrawals in retirement), and SEP IRAs for self-employed individuals. Each has different contribution limits, tax advantages, and withdrawal rules. Many financial advisors recommend maximizing employer 401(k) matches first, then contributing to IRAs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I retire abroad, and what should I consider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, many retirees choose to live abroad for lower costs, better climate, or new experiences. Key considerations include visa/residency requirements, healthcare access and insurance, cost of living, tax implications (some countries have tax treaties with the US), language barriers, proximity to family, and political stability. Popular retirement destinations include Portugal, Mexico, Costa Rica, Spain, and Thailand.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prepare for healthcare costs in retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Healthcare is one of the largest retirement expenses. In the US, Medicare begins at 65 but doesn't cover everything — consider Medicare Supplement (Medigap) or Medicare Advantage plans. Budget for premiums, deductibles, prescriptions, dental, vision, and long-term care insurance. Health Savings Accounts (HSAs) offer triple-tax advantages for healthcare savings. The average couple may need $300,000-400,000+ for healthcare throughout retirement.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <p className="text-gray-600 mb-4">Maximize your career earnings before retirement!</p>
            <Link
              href="/services/resume-review"
              className="inline-block px-8 py-3 bg-blue-600 font-bold rounded-lg hover:bg-blue-700 transition-colors"
              style={{ color: '#ffffff !important', textDecoration: 'none' }}
            >
              <span style={{ color: '#ffffff' }}>Get Free Resume Review</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
