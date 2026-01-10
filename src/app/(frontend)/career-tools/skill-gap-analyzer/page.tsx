import React from 'react'
import { Metadata } from 'next'
import SkillGapAnalyzer from '@/components/career-tools/SkillGapAnalyzer'

export const metadata: Metadata = {
  title: 'Free Skill Gap Analyzer - Get Your Personalized Learning Roadmap | Prosumely',
  description:
    'Discover exactly which skills you need to land your dream role. Our AI-powered skill gap analyzer provides a personalized learning roadmap with resources, timeline, and portfolio projects to help you become job-ready.',
  keywords: [
    'skill gap analysis',
    'skill gap analyzer',
    'career skills assessment',
    'learning roadmap',
    'skill development plan',
    'job readiness assessment',
    'career transition skills',
    'upskilling roadmap',
    'reskilling guide',
    'professional development plan',
    'skills needed for job',
    'missing skills identifier',
    'career gap analysis',
    'skill shortage analysis',
    'job requirements analyzer',
    'free skill assessment',
  ],
  openGraph: {
    title: 'Free Skill Gap Analyzer - Get Your Personalized Learning Roadmap',
    description:
      'AI-powered skill gap analysis with personalized learning roadmap. Discover which skills you need, get learning resources, and close the gap to your dream role.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/skill-gap-analyzer',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/skill-gap-analyzer',
  },
}

export default function SkillGapAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <SkillGapAnalyzer />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Skill Gap Analyzer?</h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stop Guessing What Skills You Need
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered skill gap analyzer compares your current skill set against your target
              role requirements using real job market data. You'll discover exactly which skills are
              missing, which are most critical for landing the role, and get a prioritized learning
              plan with specific resources to close each gap efficiently.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're pivoting careers, aiming for a promotion, or fresh out of school
              wondering what skills employers actually want, this tool provides clarity and a
              concrete action plan. Stop wasting time learning skills that don't matter - focus on
              what will get you hired.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Overall Readiness Score (0-100%):</strong> Know exactly how prepared you are
                for your target role
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Critical Skills Gaps:</strong> Must-have skills found in 80%+ of job
                postings with learning resources
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Personalized Learning Roadmap:</strong> Week-by-week schedule with courses,
                books, and practice resources
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Portfolio Project Ideas:</strong> Hands-on projects to demonstrate each
                skill to employers
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Competitive Positioning:</strong> See how your skill set compares to typical
                candidates
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1"
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
                <strong>Realistic Timeline:</strong> Estimated hours and weeks to become job-ready
                based on 10h/week study
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Career Pivoters:</strong> Understand retraining requirements for switching
                  industries or roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Job Seekers:</strong> Discover why you're not getting interviews and fix
                  skill gaps
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Recent Graduates:</strong> Get clarity on which skills make you job-ready
                  beyond your degree
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Professionals:</strong> Stay relevant by identifying upskilling needs
                  before skills become outdated
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Managers:</strong> Conduct skill gap analysis for team development and
                  hiring planning
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Input Your Profile</h4>
              <p className="text-gray-600 text-sm">
                Tell us your current role, years of experience, existing skills, and target role.
                Takes just 2-3 minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">AI Analysis</h4>
              <p className="text-gray-600 text-sm">
                Our AI analyzes job market data to identify critical skill gaps and ranks them by
                importance and urgency.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Get Your Roadmap</h4>
              <p className="text-gray-600 text-sm">
                Receive a prioritized learning plan with specific courses, books, projects, and
                timeline to close all gaps.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Tip for Job Seekers</h3>
            <p className="text-gray-700 leading-relaxed">
              After identifying your skill gaps, update your resume to highlight transferable skills
              and ongoing learning. Our professional resume writers can help you position your
              existing experience strategically while showing commitment to closing skill gaps - a
              combination employers love to see.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
