import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import WorkHappinessIndex from '@/components/career-tools/WorkHappinessIndex'

export const metadata: Metadata = {
  title: 'Free Work Happiness Index Calculator - Job Satisfaction Assessment | Prosumely',
  description:
    'Assess your job satisfaction across multiple dimensions including compensation, work-life balance, career growth, and culture. Get personalized recommendations on whether to stay, improve, or explore new opportunities.',
  keywords: [
    'work happiness index',
    'job satisfaction calculator',
    'workplace happiness assessment',
    'career satisfaction tool',
    'should I quit my job',
    'job happiness score',
    'work-life balance assessment',
    'career fulfillment calculator',
    'job satisfaction survey',
    'workplace wellness tool',
    'career decision tool',
    'job change calculator',
    'employee satisfaction assessment',
    'work happiness test',
  ],
  openGraph: {
    title: 'Free Work Happiness Index Calculator - Assess Your Job Satisfaction',
    description:
      'Multi-dimensional job satisfaction assessment. Discover what is driving your happiness or unhappiness at work and get actionable recommendations for improvement or change.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/work-happiness-index',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/work-happiness-index',
  },
}

export default function WorkHappinessIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <WorkHappinessIndex />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Work Happiness Index Calculator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comprehensive Job Satisfaction Assessment
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Are you feeling unhappy at work but can't quite pinpoint why? Our Work Happiness Index
              provides a systematic, multi-dimensional assessment of your job satisfaction. By
              evaluating factors like compensation, work-life balance, career growth, manager
              quality, company culture, and more, you'll gain clarity on what's working and what's
              not in your current role.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unlike simple job satisfaction surveys, our tool uses AI to analyze your responses and
              provide personalized insights, actionable improvement strategies, and honest
              recommendations about whether to stay and improve, explore options, or actively search
              for a new role.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 border border-blue-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>13 Satisfaction Dimensions:</strong> Comprehensive evaluation of
                  compensation, work-life balance, growth opportunities, management, culture, and
                  more
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Personalized Importance Weighting:</strong> Your score is adjusted based
                  on what matters most to you
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Clear Recommendations:</strong> Receive actionable guidance on whether to
                  stay and thrive, stay and improve, explore options, or actively job search
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Improvement Strategies:</strong> Get specific actions you can take to
                  improve low-scoring areas
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Job Search Guidance:</strong> If a move is recommended, learn what to
                  prioritize in your next role and red flags to avoid
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Professionals feeling unhappy at work but unsure why</li>
              <li>
                • Anyone deciding whether to stay in their current role or seek new opportunities
              </li>
              <li>• Employees preparing for performance reviews or compensation discussions</li>
              <li>• People experiencing burnout and need objective assessment</li>
              <li>• Managers wanting to understand team satisfaction factors</li>
              <li>• Career changers evaluating if dissatisfaction warrants a complete pivot</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <strong className="text-gray-900">Rate Your Satisfaction:</strong> Evaluate 13 key
                  dimensions of your job from compensation to team dynamics on a 1-10 scale
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <strong className="text-gray-900">Rank Importance:</strong> Indicate which factors
                  matter most to you so your score is personalized to your priorities
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <strong className="text-gray-900">Provide Context:</strong> Share details about
                  your time in role, previous job satisfaction, and life stage for richer analysis
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <strong className="text-gray-900">Get Your Report:</strong> Receive a
                  comprehensive happiness index score, dimension breakdown, and personalized action
                  plan
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Is my data private?</h4>
                <p className="text-gray-700">
                  Yes, absolutely. We do not store your personal responses or link them to any
                  identifiable information. Your assessment is processed securely and results are
                  displayed only to you.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How accurate is the happiness index?
                </h4>
                <p className="text-gray-700">
                  Our tool uses evidence-based workplace satisfaction research and AI analysis to
                  provide accurate, personalized insights. However, it should be used as one input
                  in your career decision-making process alongside personal reflection and
                  professional advice.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Should I share my results with my manager?
                </h4>
                <p className="text-gray-700">
                  That depends on your relationship and workplace culture. The improvement
                  strategies can provide a framework for constructive conversations about job
                  satisfaction, but use your judgment about what to share.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/career-tools"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Explore More Career Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
