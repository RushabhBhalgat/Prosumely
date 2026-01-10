import React from 'react'
import { Metadata } from 'next/model'
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

export default function SalaryComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need help evaluating your options?</p>
            <Link
              href="/services/career-coaching"
              className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Book a Career Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
