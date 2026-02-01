import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import CareerStrengthIndex from '@/components/career-tools/CareerStrengthIndex'

export const metadata: Metadata = {
  title: 'Free Career Strength Index - 360° Career Assessment | Prosumely',
  description:
    'Comprehensive career health assessment. Evaluate your career strength across 7 dimensions: skills, experience, education, network, brand, market demand, and momentum. Get personalized action plan and competitive insights.',
  keywords: [
    'career strength index',
    'career assessment',
    'career health',
    'career evaluation',
    'professional assessment',
    'career competitiveness',
    'career analysis',
    '360 career review',
    'career positioning',
    'career development',
    'career planning',
    'career benchmarking',
    'career strengths',
    'career gaps',
    'career action plan',
    'professional development',
    'career momentum',
    'career market value',
  ],
  openGraph: {
    title: 'Free Career Strength Index - 360° Career Assessment',
    description:
      'Get a comprehensive 360-degree assessment of your career health and competitiveness. Evaluate skills, experience, network, brand, and market demand. Receive personalized action plan with quick wins and long-term strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/career-strength-index',
    images: [
      {
        url: '/media/career-strength-index-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Career Strength Index Tool',
      },
    ],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/career-strength-index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Strength Index - 360° Career Assessment',
    description:
      'Comprehensive career health assessment across 7 dimensions with AI-powered insights and personalized action plan.',
    images: ['/media/career-strength-index-og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Career Strength Index',
  description:
    'Comprehensive 360-degree career health assessment tool evaluating skills, experience, network, brand, and market demand with AI-powered insights.',
  url: 'https://prosumely.com/career-tools/career-strength-index',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '360-degree career assessment',
    'AI-powered analysis',
    '7 dimension evaluation',
    'Personalized action plan',
    'Competitive benchmarking',
    'Quick wins identification',
    'Long-term strategy recommendations',
  ],
}

export default function CareerStrengthIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerStrengthIndex />

      {/* SEO Content and Related Tools Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Strengthen Your Career with These Tools
          </h2>
          <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            Use these complementary career tools to maximize your professional growth and market
            value
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Gap Analyzer</h3>
              <p className="text-sm text-gray-600">
                Identify missing skills to boost your career strength score
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Roadmap Generator</h3>
              <p className="text-sm text-gray-600">
                Plan your career progression with actionable milestones
              </p>
            </Link>

            <Link
              href="/career-tools/future-skills-identifier"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Future Skills Identifier</h3>
              <p className="text-sm text-gray-600">
                Stay ahead by learning the most in-demand emerging skills
              </p>
            </Link>

            <Link
              href="/career-tools/ai-skills-readiness"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Skills Readiness</h3>
              <p className="text-sm text-gray-600">
                Measure your AI literacy and get personalized learning paths
              </p>
            </Link>

            <Link
              href="/career-tools/resume-gap-identifier"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-600"
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Resume Gap Identifier</h3>
              <p className="text-sm text-gray-600">
                Discover what's missing from your resume to strengthen your positioning
              </p>
            </Link>

            <Link
              href="/career-tools/global-opportunity-heatmap"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 no-underline"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Opportunity Heatmap</h3>
              <p className="text-sm text-gray-600">
                Find high-demand markets for your role and skills globally
              </p>
            </Link>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="grid md:grid-cols-2 gap-6">
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
                Strengthen your career positioning with expert feedback on your resume—free.
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
              </a>
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
              <h3 className="text-2xl font-bold mb-3">Professional CV Writing</h3>
              <p className="text-lg mb-6 text-white/90">
                Maximize your career strength index with an ATS-optimized CV crafted by experts.
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
    </>
  )
}
