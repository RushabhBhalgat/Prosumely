import React from 'react'
import { Metadata } from 'next'
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
        </div>
      </div>
    </div>
  )
}
