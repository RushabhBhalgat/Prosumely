import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import SalaryComparisonTool from '@/components/career-tools/SalaryComparisonTool'

export const metadata: Metadata = {
  title: 'Free Salary Comparison Tool - Compare Job Offers Globally | Prosumely',
  description:
    'Compare salary offers across locations with cost-of-living adjustments, tax calculations, and purchasing power analysis. Make informed decisions about job offers and relocations.',
  keywords: [
    'salary comparison tool',
    'job offer comparison',
    'salary calculator',
    'cost of living adjusted salary',
    'purchasing power comparison',
    'tax calculator',
    'relocation salary calculator',
    'global salary comparison',
    'compensation comparison',
    'job offer evaluator',
    'salary negotiation tool',
    'remote work salary comparison',
  ],
  openGraph: {
    title: 'Free Salary Comparison Tool - Compare Job Offers Globally',
    description:
      'Compare salaries across locations with our comprehensive tool. Get cost-of-living adjustments, tax breakdowns, and total compensation analysis to make informed career decisions.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/salary-comparison',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/salary-comparison',
  },
}

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How to compare my salary to market rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compare your salary to market rates by researching industry benchmarks for your role, location, and experience level. Use salary comparison tools that factor in cost of living, consider total compensation (base salary, bonuses, equity, benefits), and look at percentile ranges (25th, 50th, 75th) to understand where you stand. Remember to account for regional differences and company size when making comparisons.',
      },
    },
    {
      '@type': 'Question',
      name: 'What salary should I expect for my experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Expected salary varies significantly by industry, location, role, and company size. Generally: Entry-level (0-2 years) positions fall in the 25th-40th percentile of market ranges, mid-level (3-7 years) positions typically earn 50th-65th percentile, senior roles (8-15 years) reach 65th-85th percentile, and leadership positions (15+ years) often exceed the 75th percentile. Use salary comparison tools and research similar roles in your target location.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does cost of living affect salary comparisons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cost of living dramatically affects salary value. A $100K salary in San Francisco has roughly the same purchasing power as $60K in Austin or $50K in smaller cities. Major factors include housing costs (often 30-50% of expenses), taxes (state/local rates vary widely), transportation, healthcare, and daily necessities. Always compare salaries using cost-of-living adjusted figures to understand real purchasing power and quality of life.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentile should I target for salary negotiations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Target the 50th-65th percentile for standard negotiations if you meet all job requirements. Aim for the 65th-75th percentile if you have specialized skills, strong track record, or competing offers. Pursue the 75th+ percentile if you bring unique expertise, leadership experience, or exceptional value. Support your target with market data, your achievements, and the specific value you bring to the role.',
      },
    },
  ],
}

export default function SalaryComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-12">
        <SalaryComparisonTool />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Salary Comparison Tool?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Make Informed Career Decisions with Data
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our comprehensive salary comparison tool goes beyond simple numbers to give you the
              complete picture. Compare job offers across different cities and countries with
              cost-of-living adjustments, tax implications, and purchasing power analysis. Perfect
              for evaluating relocations, remote work opportunities, or comparing multiple job
              offers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're considering a move from New York to Austin, San Francisco to Berlin, or
              comparing remote opportunities across continents, our tool provides accurate,
              location-specific data to help you understand your true earning potential and quality
              of life impact.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Features:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Cost of Living Adjustment:</strong> See your real purchasing power with
                location-specific cost indexes
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Tax Breakdown:</strong> Detailed federal, state, and local tax calculations
                for accurate net take-home
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Total Compensation:</strong> Include bonuses, equity, benefits, and perks
                for complete comparison
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Savings Potential:</strong> Calculate disposable income after essential
                living expenses
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Quality of Life Scores:</strong> Beyond money - compare overall lifestyle
                and wellbeing factors
              </span>
            </li>
          </ul>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-purple-900 mb-3">Perfect For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>
                  <strong>Comparing Multiple Job Offers:</strong> Evaluate 2-5 opportunities
                  side-by-side
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>
                  <strong>Relocation Decisions:</strong> Understand the true financial impact of
                  moving
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>
                  <strong>Remote Work Evaluation:</strong> Compare remote salaries from different
                  regions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>
                  <strong>Salary Negotiations:</strong> Arm yourself with data for informed
                  negotiations
                </span>
              </li>
            </ul>
          </div>

          {/* Salary Percentile Ranges by City */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 mt-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Salary Percentile Ranges by Location (Tech Industry, 2026)
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Understanding percentile ranges helps you gauge where you stand in the market and set
              realistic salary expectations. The 25th percentile represents entry-level or
              below-average compensation, the 50th percentile (median) is typical market rate, and
              the 75th percentile represents above-average or experienced professional compensation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">City/Region</th>
                    <th className="px-6 py-3 text-left font-semibold">25th Percentile</th>
                    <th className="px-6 py-3 text-left font-semibold">50th (Median)</th>
                    <th className="px-6 py-3 text-left font-semibold">75th Percentile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">San Francisco Bay Area</td>
                    <td className="px-6 py-4 text-gray-700">$115K</td>
                    <td className="px-6 py-4 text-gray-700">$155K</td>
                    <td className="px-6 py-4 text-gray-700">$205K</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">New York City</td>
                    <td className="px-6 py-4 text-gray-700">$105K</td>
                    <td className="px-6 py-4 text-gray-700">$140K</td>
                    <td className="px-6 py-4 text-gray-700">$185K</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Seattle</td>
                    <td className="px-6 py-4 text-gray-700">$100K</td>
                    <td className="px-6 py-4 text-gray-700">$135K</td>
                    <td className="px-6 py-4 text-gray-700">$175K</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Austin</td>
                    <td className="px-6 py-4 text-gray-700">$85K</td>
                    <td className="px-6 py-4 text-gray-700">$115K</td>
                    <td className="px-6 py-4 text-gray-700">$150K</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Denver</td>
                    <td className="px-6 py-4 text-gray-700">$80K</td>
                    <td className="px-6 py-4 text-gray-700">$110K</td>
                    <td className="px-6 py-4 text-gray-700">$145K</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Remote (US Average)</td>
                    <td className="px-6 py-4 text-gray-700">$75K</td>
                    <td className="px-6 py-4 text-gray-700">$105K</td>
                    <td className="px-6 py-4 text-gray-700">$140K</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Negotiation Tips Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Salary Negotiation Tips Based on Your Comparison
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  1. Use Data to Support Your Ask
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Present salary comparison data showing market rates for your role in your target
                  location. Reference percentile ranges and emphasize your experience level.
                  Employers respect candidates who come prepared with objective market data rather
                  than arbitrary numbers.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  2. Account for Cost of Living Differences
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  If relocating or comparing remote opportunities, emphasize cost-of-living adjusted
                  figures. A $120K offer in Austin may provide better purchasing power than $160K in
                  San Francisco. Use this to negotiate appropriate compensation for your target
                  location.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  3. Consider Total Compensation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Don&apos;t focus solely on base salary. Factor in bonuses, equity, benefits
                  (health insurance, 401k match, PTO), remote work flexibility, professional
                  development budgets, and perks. Sometimes a lower base salary with better total
                  compensation is more valuable.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  4. Leverage Competing Offers
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  If you have multiple offers, use them strategically. You don&apos;t need to
                  disclose exact numbers, but mentioning &quot;competing offers&quot; signals your
                  market value. Be prepared to walk away if the offer doesn&apos;t meet your needs.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  5. Time Your Negotiation Right
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Negotiate after receiving a written offer, not during initial conversations.
                  Express enthusiasm for the role first, then present your case for higher
                  compensation. Aim to finalize within 3-5 business days to maintain momentum while
                  showing you&apos;re thoughtful about the decision.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  How to compare my salary to market rates?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Compare your salary to market rates by researching industry benchmarks for your
                  role, location, and experience level. Use salary comparison tools that factor in
                  cost of living, consider total compensation (base salary, bonuses, equity,
                  benefits), and look at percentile ranges (25th, 50th, 75th) to understand where
                  you stand. Remember to account for regional differences and company size when
                  making comparisons.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  What salary should I expect for my experience?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Expected salary varies significantly by industry, location, role, and company
                  size. Generally: Entry-level (0-2 years) positions fall in the 25th-40th
                  percentile of market ranges, mid-level (3-7 years) positions typically earn
                  50th-65th percentile, senior roles (8-15 years) reach 65th-85th percentile, and
                  leadership positions (15+ years) often exceed the 75th percentile. Use our{' '}
                  <Link
                    href="/career-tools/skill-gap-analyzer"
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Skill Gap Analyzer
                  </Link>{' '}
                  to identify areas for growth that can boost your earning potential.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  How does cost of living affect salary comparisons?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Cost of living dramatically affects salary value. A $100K salary in San Francisco
                  has roughly the same purchasing power as $60K in Austin or $50K in smaller cities.
                  Major factors include housing costs (often 30-50% of expenses), taxes (state/local
                  rates vary widely), transportation, healthcare, and daily necessities. Always
                  compare salaries using cost-of-living adjusted figures to understand real
                  purchasing power and quality of life.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  What percentile should I target for salary negotiations?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Target the 50th-65th percentile for standard negotiations if you meet all job
                  requirements. Aim for the 65th-75th percentile if you have specialized skills,
                  strong track record, or competing offers. Pursue the 75th+ percentile if you bring
                  unique expertise, leadership experience, or exceptional value. Support your target
                  with market data, your achievements, and the specific value you bring to the role.
                  Use our{' '}
                  <Link
                    href="/career-tools/career-roadmap-builder"
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Career Roadmap Builder
                  </Link>{' '}
                  to plan your path to higher compensation tiers.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Tools to Enhance Your Career Strategy
            </h3>
            <p className="text-gray-700 text-center mb-6">
              Use these complementary tools to maximize your earning potential and career growth
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/career-tools/skill-gap-analyzer"
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Skill Gap Analyzer</h4>
                <p className="text-sm text-gray-600">
                  Identify skills needed to reach higher salary percentiles in your target role
                </p>
              </Link>

              <Link
                href="/career-tools/career-roadmap-builder"
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Career Roadmap Generator</h4>
                <p className="text-sm text-gray-600">
                  Plan your career progression to systematically increase your earning potential
                </p>
              </Link>

              <Link
                href="/resume-optimization"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Resume Optimization</h4>
                <p className="text-sm text-gray-600">
                  Optimize your resume to compete for higher-paying roles effectively
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
                  Position yourself for better offers. Get expert feedback on your resume—free.
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

            {/* Executive CV CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white">
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
                <h3 className="text-2xl font-bold mb-3">Command Top-Tier Offers</h3>
                <p className="text-lg mb-6 text-white/90">
                  Compete for executive-level roles with a professionally crafted CV that opens
                  doors to premium compensation.
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
      </div>
    </div>
  )
}
