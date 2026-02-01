import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import SalaryAnalyzer from '@/components/career-tools/SalaryAnalyzer'

export const metadata: Metadata = {
  title:
    'Free Expected Salary Analyzer by Country & Industry - AI-Powered Salary Insights | Prosumely',
  description:
    'Get data-driven salary expectations based on country, experience, industry, and job role. Compare global salaries, analyze compensation trends, and negotiate with confidence. Free AI-powered tool with cost-of-living adjustments.',
  keywords: [
    'salary analyzer',
    'expected salary calculator',
    'salary comparison by country',
    'salary expectations tool',
    'global salary comparison',
    'salary negotiation tool',
    'cost of living adjusted salary',
    'industry salary benchmark',
    'salary by experience',
    'compensation analyzer',
    'salary insights',
    'international salary comparison',
    'remote work salary',
    'salary trends',
    'free salary calculator',
    'AI salary analysis',
    'salary percentile calculator',
    'job offer evaluation',
    'fair compensation',
    'salary data',
  ],
  openGraph: {
    title: 'Free Expected Salary Analyzer - Compare Global Salaries by Country & Experience',
    description:
      'AI-powered salary analyzer providing data-driven compensation insights. Compare salaries across 195+ countries, analyze industry benchmarks, and get negotiation strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/salary-analyzer',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/salary-analyzer',
  },
}

export default function SalaryAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Calculator Component */}
        <SalaryAnalyzer />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About the Expected Salary Analyzer
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Make Informed Compensation Decisions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered Expected Salary Analyzer helps you understand your market value by
              analyzing real-world compensation data from over 195 countries. Whether you&apos;re
              preparing for a job interview, evaluating a job offer, or checking if you&apos;re
              being paid fairly, this tool provides comprehensive insights tailored to your specific
              situation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The analyzer considers multiple factors including your country, years of experience,
              industry sector, job role, education level, company size, and work arrangement. You
              receive detailed salary ranges, percentile distributions, compensation breakdowns, and
              strategic negotiation insights—all backed by data and adjusted for cost of living.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Understanding salary expectations isn&apos;t just about knowing a number—it&apos;s
              about understanding your worth in the global market, recognizing regional variations,
              and having the confidence to negotiate effectively. Our tool empowers you with
              data-driven intelligence to make better career and compensation decisions.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Comprehensive Salary Intelligence
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Detailed Salary Ranges:</strong> Get minimum, median, and maximum salary
                expectations with percentile distribution (10th, 25th, 50th, 75th, 90th percentiles)
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Compensation Breakdown:</strong> Understand how your total compensation is
                split between base salary, bonuses, stock options, and benefits value
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Global Comparisons:</strong> Compare your salary with the top 5 countries
                for your role, including cost-of-living adjustments and purchasing power analysis
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Experience Impact Analysis:</strong> See exactly how salary expectations
                change with years of experience in your field and country
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Industry Benchmarking:</strong> Compare salaries across different industries
                in your country to understand relative compensation levels
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Historical Trends:</strong> View year-over-year salary growth trends to
                understand market trajectory and future expectations
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Strategic Negotiation Insights:</strong> Get prioritized negotiation
                tactics, leverage points, and strategies to maximize your compensation package
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Cost of Living Adjustments:</strong> Understand real purchasing power with
                cost-of-living adjusted salary calculations for accurate comparisons
              </span>
            </li>
          </ul>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">Enter Your Details:</strong>
                  <p className="text-gray-700 mt-1">
                    Provide your country, job title, years of experience, and industry. Optionally
                    add city, company size, education, skills, and work arrangement for more
                    accurate results.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">AI Analysis:</strong>
                  <p className="text-gray-700 mt-1">
                    Our advanced AI processes global compensation databases, market trends, regional
                    factors, and industry benchmarks to generate personalized insights.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </span>
                <div>
                  <strong className="text-gray-900">Get Comprehensive Results:</strong>
                  <p className="text-gray-700 mt-1">
                    Review your expected salary range, percentile distribution, compensation
                    breakdown, global comparisons, and negotiation strategies—all in an easy-to-read
                    format.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </span>
                <div>
                  <strong className="text-gray-900">Export & Share:</strong>
                  <p className="text-gray-700 mt-1">
                    Export your analysis to PDF or share results with colleagues and mentors to get
                    additional perspectives on your compensation strategy.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🎯 Job Seekers</h4>
                <p className="text-gray-700 text-sm">
                  Preparing for interviews? Know your worth and negotiate confidently with
                  data-backed salary expectations.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">💼 Working Professionals</h4>
                <p className="text-gray-700 text-sm">
                  Evaluate if you&apos;re being paid fairly compared to market standards and
                  identify opportunities for raises.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🌍 Career Changers</h4>
                <p className="text-gray-700 text-sm">
                  Understand salary implications when switching industries or relocating to new
                  countries or cities.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🏠 Remote Workers</h4>
                <p className="text-gray-700 text-sm">
                  Compare international salaries and understand purchasing power when considering
                  remote opportunities abroad.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">👨‍💼 Hiring Managers</h4>
                <p className="text-gray-700 text-sm">
                  Set competitive salary ranges and make offers that attract top talent while
                  staying within budget.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🎓 Recent Graduates</h4>
                <p className="text-gray-700 text-sm">
                  Set realistic salary expectations for your first job and understand how experience
                  impacts compensation growth.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How accurate are the salary estimates?
                </h4>
                <p className="text-gray-700 text-sm">
                  Our AI analyzes real-world compensation data from multiple sources, market trends,
                  and regional factors. Each analysis includes a confidence score indicating data
                  reliability. While estimates are based on comprehensive data patterns, individual
                  salaries can vary based on specific company policies, unique skills, and local
                  market conditions.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  What data sources does the tool use?
                </h4>
                <p className="text-gray-700 text-sm">
                  The analyzer uses AI-powered analysis trained on publicly available compensation
                  databases, salary surveys, job market reports, and anonymized salary data from
                  global markets. The data is continuously updated to reflect current market
                  conditions.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Can I compare salaries across different countries?
                </h4>
                <p className="text-gray-700 text-sm">
                  Yes! The tool provides comparisons with the top 5 countries for your role,
                  including cost-of-living adjustments and purchasing power analysis to help you
                  understand real value beyond nominal salary figures.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Is the tool free to use?</h4>
                <p className="text-gray-700 text-sm">
                  Yes, the Expected Salary Analyzer is completely free. There are no hidden fees or
                  premium tiers. We believe everyone should have access to fair compensation
                  information.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How should I use these results in negotiations?
                </h4>
                <p className="text-gray-700 text-sm">
                  Use the salary range as a benchmark, not an absolute number. Focus on the median
                  and 75th percentile if you have strong qualifications. Leverage the negotiation
                  insights provided to discuss total compensation (not just base salary), and be
                  prepared to justify your value with specific skills, achievements, and market
                  demand.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 border border-green-200 text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Professional Career Guidance?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              While our free tools provide valuable insights, sometimes you need personalized expert
              advice. Our career coaches can help you develop comprehensive compensation strategies,
              negotiate complex offers, and advance your career effectively.
            </p>
            <Link
              href="/services"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 no-underline"
              style={{ color: '#ffffff' }}
            >
              Explore Career Services
            </Link>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Comprehensive Salary & Career Tools
            </h3>
            <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              Use these tools together to get a complete picture of your compensation and career
              potential
            </p>
            <div className="grid md:grid-cols-3 gap-6">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Compare Your Salary to Market
                </h4>
                <p className="text-sm text-gray-600">
                  Benchmark your current salary against market rates with detailed comparisons
                </p>
              </Link>

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
                <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Benchmarking Tool</h4>
                <p className="text-sm text-gray-600">
                  Identify skills to acquire for higher salary tiers in your field
                </p>
              </Link>

              <Link
                href="/career-tools/career-roadmap-builder"
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Market Compensation Insights
                </h4>
                <p className="text-sm text-gray-600">
                  Plan your career path to systematically increase earning potential
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
                  Position yourself for higher offers. Get expert feedback on your resume—free.
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
                <h3 className="text-2xl font-bold mb-3">Command Top Salaries</h3>
                <p className="text-lg mb-6 text-white/90">
                  Compete for premium compensation with an ATS-optimized CV crafted by experts.
                </p>
                <Link
                  href="/ats-resume"
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
