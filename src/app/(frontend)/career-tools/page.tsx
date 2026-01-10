import React from 'react'
import Link from 'next/link'
import { PageHeading } from '@/components/SEO/PageHeading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Career Tools - AI-Powered Job Search Resources | Prosumely',
  description:
    'Free AI-powered career tools to boost your job search. Generate cover letters, identify resume gaps, explore global opportunities, extract job keywords, analyze salaries, plan career roadmaps, calculate freelance rates, and optimize for ATS systems.',
  keywords: [
    'career tools',
    'job search tools',
    'AI cover letter generator',
    'resume gap analyzer',
    'global job opportunities',
    'ATS resume scanner',
    'keyword finder',
    'resume analyzer',
    'salary analyzer',
    'salary comparison tool',
    'career roadmap generator',
    'career progression planner',
    'free career resources',
    'job description analyzer',
    'career planning tools',
    'leadership assessment',
    'salary expectations',
    'freelance rate calculator',
    'freelance pricing tool',
    'pricing strategy',
    'hourly rate calculator',
    'project pricing',
    'retainer pricing',
    'freelance income calculator',
  ],
  openGraph: {
    title: 'Free Career Tools - AI-Powered Job Search Resources',
    description:
      'Free AI-powered career tools: Cover letter generator, resume gap identifier, salary analyzer, career roadmap planner, freelance rate calculator, global opportunity heatmap, and more. Boost your job search success.',
    type: 'website',
    url: 'https://prosumely.com/career-tools',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools',
  },
}

const CareerTools = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeading as="h1" className="text-4xl font-bold text-center mb-4">
          Free AI-Powered Career Tools
        </PageHeading>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Boost your job search with our free professional tools. Generate AI cover letters,
          identify resume gaps, explore global opportunities, analyze salary expectations, plan your
          career roadmap, calculate optimal freelance rates, optimize for ATS systems, and extract
          keywords from job descriptions to land your dream job.
        </p>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Job Description Keyword Finder */}
          <Link href="/career-tools/job-description-keyword-finder" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group-hover:border-blue-500">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                Job Description Keyword Finder
              </h3>
              <p className="text-gray-600 mb-4">
                Extract key action verbs, technical skills, and soft skills from job descriptions.
                Beat ATS systems and optimize your resume.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Cover Letter Generator */}
          <Link href="/career-tools/cover-letter-generator" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group-hover:border-purple-500">
              <div className="text-purple-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                AI Cover Letter Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Generate professional, tailored cover letters in seconds. AI-powered tool that
                analyzes your resume and job description.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Resume Gap Identifier */}
          <Link href="/career-tools/resume-gap-identifier" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group-hover:border-green-500">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                Resume Gap Identifier
              </h3>
              <p className="text-gray-600 mb-4">
                Identify missing skills and qualifications between your resume and target job role.
                Get actionable improvement suggestions.
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Global Opportunity Heatmap */}
          <Link href="/career-tools/global-opportunity-heatmap" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group-hover:border-indigo-500">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                Global Opportunity Heatmap
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the best countries for your career. Explore job demand, salaries, visa
                friendliness, and remote work opportunities worldwide.
              </p>
              <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Leadership Readiness Score */}
          <Link href="/career-tools/leadership-readiness-score" className="group">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-orange-200 group-hover:border-orange-500">
              <div className="text-orange-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                Leadership Readiness Score
              </h3>
              <p className="text-gray-600 mb-4">
                Assess your leadership potential with our AI-powered evaluation. Get personalized
                insights, certification recommendations, and a clear development roadmap.
              </p>
              <div className="flex items-center text-orange-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Salary Analyzer */}
          <Link href="/career-tools/salary-analyzer" className="group">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-green-200 group-hover:border-green-500">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                Expected Salary Analyzer
              </h3>
              <p className="text-gray-600 mb-4">
                Get data-driven salary expectations by country, experience, and industry. Compare
                globally and negotiate with confidence.
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Career Roadmap Generator */}
          <Link href="/career-tools/career-roadmap-generator" className="group">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-200 group-hover:border-purple-500">
              <div className="text-purple-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                Career Roadmap Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Create your personalized career progression plan with phases, skills,
                certifications, and actionable timelines to reach your target role.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Freelance Rate Calculator */}
          <Link href="/career-tools/freelance-rate-calculator" className="group">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-pink-200 group-hover:border-pink-500">
              <div className="text-pink-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-pink-600 transition-colors">
                Freelance Rate Calculator
              </h3>
              <p className="text-gray-600 mb-4">
                Calculate optimal freelance rates and pricing strategy. Get hourly, project-based,
                and retainer recommendations with negotiation tips.
              </p>
              <div className="flex items-center text-pink-600 font-medium group-hover:translate-x-1 transition-transform">
                Try Free Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Coming Soon Tools */}
          <div className="bg-white/60 rounded-xl shadow-lg p-6 border border-gray-200 opacity-75">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Resume ATS Scanner</h3>
            <p className="text-gray-500 mb-4">
              Upload your resume and get an instant ATS compatibility score with improvement
              suggestions.
            </p>
            <div className="text-gray-400 font-medium">Coming Soon</div>
          </div>

          <div className="bg-white/60 rounded-xl shadow-lg p-6 border border-gray-200 opacity-75">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093v0c0 .55.45 1 1 1h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Interview Question Generator</h3>
            <p className="text-gray-500 mb-4">
              Generate personalized interview questions based on your industry and experience level.
            </p>
            <div className="text-gray-400 font-medium">Coming Soon</div>
          </div>

          <div className="bg-white/60 rounded-xl shadow-lg p-6 border border-gray-200 opacity-75">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Career Path Planner</h3>
            <p className="text-gray-500 mb-4">
              Map your professional journey and discover the skills needed for your dream career.
            </p>
            <div className="text-gray-400 font-medium">Coming Soon</div>
          </div>

          <div className="bg-white/60 rounded-xl shadow-lg p-6 border border-gray-200 opacity-75">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Resume Templates</h3>
            <p className="text-gray-500 mb-4">
              Download professional, ATS-friendly resume templates for various industries and
              experience levels.
            </p>
            <div className="text-gray-400 font-medium">Coming Soon</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Professional Help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            While our free tools are great for self-service optimization, sometimes you need expert
            guidance. Our professional resume writers create compelling, ATS-optimized resumes that
            get results.
          </p>
          <Link
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View Professional Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CareerTools
