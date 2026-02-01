import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import ResumeGapIdentifier from '@/components/career-tools/ResumeGapIdentifier'

export const metadata: Metadata = {
  title: 'Free Resume Gap Identifier - Find Missing Skills & Experience | Prosumely',
  description:
    "Discover what's missing from your resume with our AI-powered gap analyzer. Get personalized insights on skills, certifications, and experience needed to land your dream job. Free and instant analysis.",
  keywords: [
    'resume gap identifier',
    'resume gap analysis',
    'skills gap analyzer',
    'resume checker',
    'missing skills identifier',
    'career gap analysis',
    'resume improvement tool',
    'skill assessment',
    'resume skills checker',
    'career development tool',
    'AI resume analyzer',
    'free resume tool',
  ],
  openGraph: {
    title: 'Free Resume Gap Identifier - Find Missing Skills & Experience',
    description:
      'Identify missing skills, certifications, and experience in your resume. Get AI-powered recommendations to land your target role.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/resume-gap-identifier',
    images: [
      {
        url: 'https://prosumely.com/og-resume-gap-identifier.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Resume Gap Identifier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Gap Identifier - AI-Powered Analysis',
    description:
      'Find missing skills and experience in your resume. Get personalized recommendations instantly.',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/resume-gap-identifier',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ResumeGapIdentifierPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Prosumely Resume Gap Identifier',
            description:
              'Free AI-powered resume gap analyzer that identifies missing skills, certifications, and experience to help you land your dream job.',
            url: 'https://prosumely.com/career-tools/resume-gap-identifier',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'AI-powered gap analysis',
              'Skills assessment',
              'Certification recommendations',
              'Experience gap identification',
              'Personalized action plan',
              'Free to use',
              'Instant results',
            ],
            provider: {
              '@type': 'Organization',
              name: 'Prosumely',
              url: 'https://prosumely.com',
            },
          }),
        }}
      />
      <ResumeGapIdentifier />

      {/* SEO Content Section */}
      <div className="max-w-7xl mx-auto p-6 pb-16 space-y-8">
        {/* CTA to Jobseeker CV Combo */}
        <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl shadow-xl p-8 md:p-10 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want a Professionally Optimized Resume?
            </h2>
            <p className="text-xl mb-6 text-white/90 leading-relaxed">
              While our AI identifies gaps in your resume, our expert writers can transform your CV
              into an ATS-optimized, interview-winning document. Get a complete career package with
              professional resume writing, cover letter, and LinkedIn optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Link
                href="/services/jobseeker-cv-combo"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Get Professional CV Writing</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                ATS-Optimized
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Expert Writers
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Complete Package
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Resume Gap Identifier?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Standing out in today's competitive job market requires more than just a
              well-formatted resume. You need to ensure you have the right{' '}
              <strong>skills, certifications, and experience</strong> that employers are looking
              for. Our <strong>free AI-powered Resume Gap Identifier</strong> analyzes your CV
              against your target role and provides a detailed report of what's missing, helping you
              bridge the gap between where you are and where you want to be.
            </p>

            <p className="leading-relaxed">
              Unlike generic resume checkers, our tool provides{' '}
              <strong>personalized, actionable recommendations</strong> tailored to your specific
              career goals. Whether you're switching careers, aiming for a promotion, or entering a
              new industry, our gap analysis tool gives you the insights you need to make strategic
              improvements to your resume.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Comprehensive Skills Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Identifies critical technical and soft skills you're missing compared to your
                  target role. Get specific skill recommendations ranked by importance with clear
                  explanations of why each skill matters.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border border-cyan-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Certification Recommendations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover industry-recognized certifications that will make your resume stand out.
                  We provide specific certification names, issuing organizations, and explain their
                  value for your career path.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Experience Gap Detection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Identifies missing work experience, project types, or leadership roles. Get
                  practical suggestions on how to gain the experience you need through side
                  projects, volunteering, or strategic job moves.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border border-cyan-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prioritized Action Plan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive a step-by-step action plan with immediate, short-term, and long-term
                  recommendations. Each action includes estimated timeframes and expected impact on
                  your job prospects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Use the Resume Gap Identifier
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Your Resume</h3>
              <p className="text-gray-600 leading-relaxed">
                Paste your complete resume or CV including all work experience, education, skills,
                certifications, and achievements. The more details you provide, the more accurate
                the analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Specify Target Role</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your desired job title and key requirements. Include specific skills,
                experience levels, and qualifications mentioned in job postings you're interested
                in.
              </p>
            </div>
            <div className="text-center md:col-span-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Gap Analysis</h3>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Receive a comprehensive report showing your readiness score (0-100), missing skills,
                recommended certifications, experience gaps, your existing strengths, and a
                prioritized action plan to bridge the gaps.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Who Should Use the Resume Gap Identifier?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Career Changers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Switching to a new industry or role? Identify exactly what skills and experience
                  you need to acquire to make a successful transition. Our tool helps you create a
                  strategic learning path.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Job Seekers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Not getting interview calls? Our gap identifier shows you why. Discover the skills
                  and qualifications hiring managers are looking for in your target roles and update
                  your resume accordingly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Promotion Seekers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Aiming for that senior or leadership position? Find out what additional skills,
                  certifications, or experience you need to demonstrate to your employer that you're
                  ready for the next level.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Graduates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bridge the gap between academic knowledge and industry requirements. Understand
                  what practical skills, certifications, and project experience employers expect
                  from entry-level candidates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Professional Development
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Stay competitive in your field by regularly assessing your skill set against
                  industry trends. Use our tool to plan your learning journey and ensure you're
                  always market-ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl shadow-lg border border-indigo-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How does the Resume Gap Identifier work?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our tool uses advanced AI (Google's Gemini 2.0 Flash) to analyze your resume against
                your target role requirements. It identifies missing skills, certifications, and
                experience by comparing industry standards, job market trends, and the specific
                qualifications needed for your desired position. The AI then generates a
                comprehensive gap analysis with actionable recommendations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is this tool really free?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! Our Resume Gap Identifier is completely free to use. There are no hidden fees,
                premium tiers, or required sign-ups. We provide this tool to help job seekers
                succeed in their careers and make informed decisions about their professional
                development.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What kind of results will I get?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You'll receive a comprehensive analysis including: (1) Overall readiness score
                (0-100), (2) List of missing technical and soft skills with importance levels, (3)
                Recommended certifications with providers, (4) Experience gaps with suggestions on
                how to gain that experience, (5) Your existing strengths, and (6) A prioritized
                action plan with immediate, short-term, and long-term recommendations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How accurate is the gap analysis?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our AI is trained on extensive career data and industry standards, making it highly
                accurate for most roles. However, we recommend using the results as guidance rather
                than absolute requirements. Every company and role is unique, so some
                recommendations may be more relevant than others depending on your specific
                situation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I use this tool for multiple roles?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! You can analyze your resume against different target roles to see which
                positions you're best qualified for or to create development plans for multiple
                career paths. Each analysis is independent and tailored to the specific role you
                enter.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is my resume data kept private and secure?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, we take your privacy seriously. Your resume and target role information are
                processed securely to generate the gap analysis and are not stored on our servers.
                We never share your personal information with third parties or use it for any
                purpose other than providing the analysis you requested.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What should I do after getting my gap analysis?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Start with the immediate priority recommendations in your action plan. Focus on
                acquiring critical and high-importance skills first. Consider online courses,
                certifications, volunteering, or side projects to gain missing experience. Update
                your resume as you acquire new skills, and re-run the analysis periodically to track
                your progress.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools CTA */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            More Free Career Tools to Boost Your Job Search
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto text-center">
            Maximize your chances of landing your dream job with our complete suite of AI-powered
            career tools.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/career-tools/skill-gap-analyzer"
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200 no-underline"
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
              <h4 className="text-lg font-bold text-gray-900 mb-2">Skill Gap Analyzer</h4>
              <p className="text-sm text-gray-600">
                Identify and bridge skill gaps to reach your career goals faster
              </p>
            </Link>

            <Link
              href="/career-tools/career-roadmap-builder"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200 no-underline"
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
              <h4 className="text-lg font-bold text-gray-900 mb-2">Career Roadmap Generator</h4>
              <p className="text-sm text-gray-600">
                Create a personalized career path with milestones and actionable steps
              </p>
            </Link>

            <Link
              href="/career-tools/future-skills-identifier"
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200 no-underline"
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
              <h4 className="text-lg font-bold text-gray-900 mb-2">Future Skills Identifier</h4>
              <p className="text-sm text-gray-600">
                Discover emerging skills to stay ahead in your industry
              </p>
            </Link>

            <Link
              href="/career-tools/ai-skills-readiness"
              className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 hover:shadow-lg transition-all duration-200 no-underline"
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
              <h4 className="text-lg font-bold text-gray-900 mb-2">AI Skills Readiness</h4>
              <p className="text-sm text-gray-600">
                Assess your AI proficiency and get learning recommendations
              </p>
            </Link>

            <Link
              href="/career-tools/global-opportunity-heatmap"
              className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-200 no-underline"
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Global Opportunity Heatmap</h4>
              <p className="text-sm text-gray-600">
                Explore career opportunities worldwide and find the best locations for your role
              </p>
            </Link>

            <Link
              href="/career-tools/cover-letter-generator"
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-200 no-underline"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Cover Letter Generator</h4>
              <p className="text-sm text-gray-600">
                Create compelling, personalized cover letters in minutes
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
                Close the gaps in your resume with expert feedback. Get actionable insights—free.
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
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
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
              <h3 className="text-2xl font-bold mb-3">ATS-Optimized Resume</h3>
              <p className="text-lg mb-6 text-white/90">
                Eliminate resume gaps with a professionally crafted, ATS-friendly CV that passes
                every screening.
              </p>
              <Link
                href="/ats-resume"
                className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
              >
                <span style={{ color: '#0891b2' }}>Get ATS Resume</span>
                <svg
                  className="w-5 h-5 ml-2"
                  style={{ color: '#0891b2' }}
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
