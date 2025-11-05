import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import LeadershipReadinessCalculator from '@/components/career-tools/LeadershipReadinessCalculator'

export const metadata: Metadata = {
  title:
    'Free Leadership Readiness Score Calculator - Assess Your Leadership Potential | Prosumely',
  description:
    'Discover your leadership readiness with our free AI-powered calculator. Get personalized insights, development recommendations, and a roadmap to advance into management and leadership roles.',
  keywords: [
    'leadership readiness assessment',
    'leadership potential test',
    'management readiness calculator',
    'leadership skills assessment',
    'career advancement tool',
    'executive readiness score',
    'leadership development plan',
    'management transition assessment',
    'leadership gap analysis',
    'free leadership assessment',
    'AI leadership evaluation',
    'leadership career path',
  ],
  openGraph: {
    title: 'Free Leadership Readiness Score Calculator - Assess Your Leadership Potential',
    description:
      'Get your personalized leadership readiness score. AI-powered assessment with development recommendations and actionable insights for career advancement.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/leadership-readiness-score',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/leadership-readiness-score',
  },
}

export default function LeadershipReadinessScorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12">
        {/* Calculator Component */}
        <LeadershipReadinessCalculator />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Leadership Readiness Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Make Data-Driven Career Decisions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered leadership assessment helps you understand your current leadership
              capabilities and identifies the specific areas you need to develop to advance into
              management and executive roles. Whether you're an individual contributor aspiring to
              become a team lead, or a manager aiming for director-level positions, this tool
              provides actionable insights tailored to your career trajectory.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The assessment evaluates multiple dimensions including your years of experience, team
              management capabilities, leadership and soft skills, professional achievements, and
              industry context. You'll receive a comprehensive score breakdown, personalized
              strengths analysis, development recommendations, and a prioritized action plan to
              accelerate your leadership journey.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Overall Leadership Score (0-100):</strong> Understand where you stand on the
                leadership readiness spectrum
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Category Breakdown:</strong> Detailed scores across 7 key leadership
                dimensions with specific feedback
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Strengths & Development Areas:</strong> Identify what you're doing well and
                where to focus improvement efforts
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Prioritized Action Plan:</strong> Step-by-step roadmap with immediate,
                short-term, and medium-term actions
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Recommended Certifications:</strong> Curated list from top institutions like
                Harvard, MIT, and Cornell
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Target Role Gap Analysis:</strong> See exactly how ready you are for your
                desired position
              </span>
            </li>
          </ul>

          <div className="bg-orange-50 rounded-xl p-8 border border-orange-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Executive Leadership?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you're serious about advancing to senior management or executive roles, combine
              this assessment with our professional executive resume writing service. Our expert
              writers create compelling executive resumes that showcase your leadership journey and
              position you for C-suite opportunities.
            </p>
            <Link
              href="/executive-resume-writing-service"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Executive Resume Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
