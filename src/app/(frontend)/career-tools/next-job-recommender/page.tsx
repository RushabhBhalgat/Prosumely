import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const NextJobRecommender = dynamic(() => import('@/components/career-tools/NextJobRecommender'))

export const metadata: Metadata = {
  title: 'Free Next Job Recommender - AI Career Move Suggestions | Prosumely',
  description:
    'AI-powered next career move recommendations based on your skills, experience, and goals. Discover suitable roles with transition strategies and success probabilities.',
  keywords: [
    'next job recommender',
    'career move suggestions',
    'AI job matcher',
    'career transition tool',
    'job recommendation engine',
    'career path finder',
    'next role suggester',
    'career advancement tool',
    'job matching algorithm',
    'career exploration tool',
    'skill-based job matching',
    'personalized job recommendations',
  ],
  openGraph: {
    title: 'Free Next Job Recommender - AI Career Move Suggestions',
    description:
      'Discover your ideal next career move with AI-powered recommendations. Get match scores, transition strategies, skill development plans, and success probabilities.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/next-job-recommender',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/next-job-recommender',
  },
}

export default function NextJobRecommenderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <NextJobRecommender />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Next Job Recommender?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              AI-Powered Career Guidance Beyond Simple Job Boards
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our intelligent job recommender analyzes your complete professional profile—skills,
              experience, achievements, and preferences—to suggest roles you may not have
              considered. Unlike simple keyword matching, we evaluate career trajectory fit, skill
              transferability, market demand, and your personal priorities to recommend genuine
              career advancement opportunities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Perfect for professionals feeling stuck, career changers exploring adjacent
              opportunities, or anyone wondering "what's next" without actively job searching. Get
              personalized recommendations with detailed transition strategies, skill development
              plans, and realistic success probabilities.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>5-8 Personalized Role Recommendations:</strong> Specific job titles with
                detailed role summaries
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Match Scores (0-100):</strong> Skills, experience, trajectory, preferences,
                and market opportunity breakdown
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Transition Difficulty Ratings:</strong> Easy, moderate, or challenging with
                clear explanations
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Skills to Develop:</strong> Prioritized learning paths with resources and
                estimated time
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Career Trajectory Visualization:</strong> Where each role leads in 2, 5, and
                10 years
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1"
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
                <strong>Immediate Action Steps:</strong> Concrete next steps to start your
                transition
              </span>
            </li>
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-green-900 mb-3">Perfect For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <strong>Stuck Professionals:</strong> Don't know what roles you qualify for
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <strong>Career Changers:</strong> Discover adjacent opportunities you haven't
                  considered
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <strong>Passive Job Seekers:</strong> Explore "what's next" without active job
                  hunting
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <strong>Growth-Oriented:</strong> Want personalized suggestions beyond keyword
                  matching
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need expert guidance on your career transition?</p>
            <Link
              href="/services/career-coaching"
              className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Schedule a Career Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
