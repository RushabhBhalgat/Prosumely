import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import AutomationRiskCalculator from '@/components/career-tools/AutomationRiskCalculator'

export const metadata: Metadata = {
  title: 'Free AI Automation Risk Assessment - Job Security Calculator | Prosumely',
  description:
    'Analyze how likely your job is to be automated by AI and emerging technologies. Get your automation risk score, timeline predictions, and strategic recommendations for staying relevant in the future of work.',
  keywords: [
    'ai automation risk',
    'job automation calculator',
    'ai job security assessment',
    'automation risk score',
    'will ai take my job',
    'job automation prediction',
    'future of work assessment',
    'ai career impact',
    'automation resistant careers',
    'job displacement risk',
    'ai proof jobs',
    'automation career planning',
    'technology job impact',
    'ai workforce transition',
  ],
  openGraph: {
    title: 'Free AI Automation Risk Assessment - Evaluate Your Job Security',
    description:
      'Discover how AI and automation will impact your career. Get risk score, timeline predictions, and actionable strategies for staying relevant in an AI-driven future.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/automation-risk',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/automation-risk',
  },
}

export default function AutomationRiskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <AutomationRiskCalculator />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our AI Automation Risk Assessment?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Understand Your Career's Future in an AI World
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Are you worried about AI and automation taking over your job? You're not alone.
              Artificial intelligence, robotics, and emerging technologies are rapidly transforming
              the workplace, and many workers are anxious about their job security and future
              prospects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our AI Automation Risk Assessment provides a realistic, data-driven analysis of how
              likely your specific job role is to be automated or significantly changed by AI. More
              importantly, it offers actionable strategies for staying relevant, pivoting to
              automation-resistant roles, and developing skills that will keep you competitive in
              the future of work. This isn't about fear-mongering—it's about empowering you to take
              control of your career trajectory.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Automation Risk Score (0-100):</strong> Get a clear numerical assessment
                  of your job's automation risk from Very Low to Very High
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Task-Level Analysis:</strong> Understand which specific tasks in your role
                  are at risk and which are likely to remain human
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Timeline Predictions:</strong> Learn when automation is expected
                  (immediate, 2-5 years, 5-10 years, 10+ years) for different aspects of your role
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Role Evolution Forecast:</strong> Discover how your role will transform
                  (augmentation vs. replacement) and what new responsibilities will emerge
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Immediate, Medium, and Long-Term Action Plans:</strong> Get specific
                  skills to develop, tasks to master, and pivot strategies for different time
                  horizons
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <strong>Alternative Career Paths:</strong> Explore low-risk roles you could
                  transition to with your existing skills
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Workers anxious about AI displacing their jobs</li>
              <li>• Professionals planning education or upskilling investments</li>
              <li>• Career changers evaluating which fields have long-term viability</li>
              <li>• Students choosing career paths with future-proof potential</li>
              <li>• Mid-career professionals deciding whether to stay or pivot</li>
              <li>
                • Anyone who wants realistic, data-driven insights into automation's impact on their
                career
              </li>
            </ul>
          </div>

          <div className="bg-pink-50 rounded-xl p-8 border border-pink-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <strong className="text-gray-900">Describe Your Job:</strong> Provide your job
                  title, industry, and select the primary tasks you perform daily
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <strong className="text-gray-900">Rate Job Characteristics:</strong> Assess
                  repetitiveness, creativity requirements, human interaction levels, problem
                  complexity, and decision-making levels
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <strong className="text-gray-900">Share Your Skills:</strong> List your technical
                  skills, soft skills, and digital literacy level
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <strong className="text-gray-900">Receive Comprehensive Assessment:</strong> Get
                  your automation risk score, task-level breakdown, role evolution forecast, and
                  personalized action plan
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Automation Risk Levels
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Very Low Risk (0-20)</h4>
                <p>
                  Jobs highly resistant to automation. Roles involving high levels of creativity,
                  complex problem-solving, emotional intelligence, or strategic thinking. Examples:
                  therapists, creative directors, strategic consultants.
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Low Risk (21-40)</h4>
                <p>
                  Minimal automation threat with most tasks requiring human judgment and
                  adaptability. Some routine aspects may be automated, but core responsibilities
                  remain human-driven.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Moderate Risk (41-60)</h4>
                <p>
                  Significant portions of tasks could be automated, but roles will likely evolve
                  rather than disappear entirely. Proactive upskilling and role adaptation crucial.
                </p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-bold text-orange-800 mb-2">High Risk (61-80)</h4>
                <p>
                  Substantial automation likely within 5-10 years. Major career pivots or
                  significant skill development needed to remain relevant. Consider transition
                  planning.
                </p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-800 mb-2">Very High Risk (81-100)</h4>
                <p>
                  High probability of complete or near-complete automation. Immediate action
                  recommended to develop automation-resistant skills or transition to alternative
                  roles.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Is this assessment based on research?
                </h4>
                <p className="text-gray-700">
                  Yes. Our AI analyzes your job characteristics using established research on
                  automation risk factors, including studies from Oxford University, McKinsey, and
                  other authoritative sources on the future of work. However, predictions about
                  technology adoption are inherently uncertain.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Should I change careers if my risk is high?
                </h4>
                <p className="text-gray-700">
                  Not necessarily. A high risk score doesn't mean you must change careers
                  immediately. It means you should proactively develop skills that increase your
                  resilience, stay informed about your industry's evolution, and have a plan. Many
                  roles will transform rather than disappear.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  How often should I reassess my automation risk?
                </h4>
                <p className="text-gray-700">
                  We recommend annual reassessments, especially if there are significant changes in
                  your role, industry, or the broader AI/technology landscape. The pace of
                  automation can accelerate unexpectedly.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Bottom Line: Empowerment, Not Fear
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The goal of this assessment isn't to frighten you but to empower you with information.
              Understanding your automation risk allows you to make informed decisions about skill
              development, career investments, and long-term planning. The future of work will be
              shaped by humans and AI working together—those who adapt and prepare will thrive.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/career-tools"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Explore More Career Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
