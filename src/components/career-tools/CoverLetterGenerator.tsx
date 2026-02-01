/**
 * Cover Letter Generator Tool Component
 * Split-screen layout with resume and JD inputs, output below
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface ApiResponse {
  coverLetter: string
  wordCount: number
  error?: string
  message?: string
}

interface ApiError {
  error: string
  message?: string
  retryAfter?: number
}

interface RateLimitState {
  isRateLimited: boolean
  retryAfter?: number
  resetTime?: string
}

export default function CoverLetterGenerator() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [coverLetter, setCoverLetter] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [copied, setCopied] = useState(false)

  // Character and word counts
  const [resumeCharCount, setResumeCharCount] = useState(0)
  const [resumeWordCount, setResumeWordCount] = useState(0)
  const [jdCharCount, setJdCharCount] = useState(0)
  const [jdWordCount, setJdWordCount] = useState(0)

  const resultsRef = useRef<HTMLDivElement>(null)

  const handleResumeChange = (value: string) => {
    setResume(value)
    setResumeCharCount(value.length)
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    setResumeWordCount(words)
  }

  const handleJDChange = (value: string) => {
    setJobDescription(value)
    setJdCharCount(value.length)
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    setJdWordCount(words)
  }

  const generateCoverLetter = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError('Please enter both your resume and job description')
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setCoverLetter(null)
    setCopied(false)

    try {
      const response = await fetch('/api/cover-letter-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resume.trim(),
          jobDescription: jobDescription.trim(),
        }),
      })

      const data: ApiResponse | ApiError = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError

        // Handle rate limiting specifically
        if (response.status === 429 || errorData.error === 'RATE_LIMIT_EXCEEDED') {
          setRateLimitState({
            isRateLimited: true,
            retryAfter: errorData.retryAfter,
            resetTime: response.headers.get('X-RateLimit-Reset') || undefined,
          })
          setError(errorData.message || 'Rate limit exceeded')
        } else {
          setError(errorData.message || errorData.error || 'Failed to generate cover letter')
        }
        return
      }

      const successData = data as ApiResponse
      setCoverLetter(successData.coverLetter)
      setWordCount(successData.wordCount)

      // Scroll to results section after successful generation
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getResumeWordCountColor = () => {
    if (resumeWordCount > 2500) return 'text-red-500'
    if (resumeWordCount > 2200) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getResumeCharCountColor = () => {
    if (resumeCharCount > 15000) return 'text-red-500'
    if (resumeCharCount > 13000) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getJdCharCountColor = () => {
    if (jdCharCount > 4000) return 'text-red-500'
    if (jdCharCount > 3200) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Cover Letter Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate a powerful, tailored cover letter in seconds. Paste your resume and the job
            description, and get a professional cover letter optimized for that specific role.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 bg-purple-50 rounded-full px-4 py-2 w-fit mx-auto">
            <span className="animate-pulse">✨</span>
            <span className="font-medium">Free • AI-Powered • Professional Quality</span>
          </div>
        </div>

        {/* Split Screen Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Input */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-2xl">
            <label
              htmlFor="resume"
              className="flex items-center text-lg font-semibold text-gray-800 mb-4"
            >
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
              Your Resume
            </label>
            <div className="relative">
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => handleResumeChange(e.target.value)}
                placeholder="Paste your complete resume here...

Include:
• Contact information
• Work experience
• Education
• Skills
• Achievements"
                className="w-full h-80 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Stats */}
            <div className="flex flex-col space-y-2 text-sm mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium transition-colors duration-200 ${getResumeWordCountColor()}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        resumeWordCount > 2500
                          ? '#ef4444'
                          : resumeWordCount > 2200
                            ? '#f59e0b'
                            : '#10b981',
                    }}
                  ></span>
                  Words: {resumeWordCount.toLocaleString()}/2,500
                </span>
                {resumeWordCount > 2500 && (
                  <span className="text-red-500 font-medium flex items-center text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limit exceeded
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium transition-colors duration-200 ${getResumeCharCountColor()}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        resumeCharCount > 15000
                          ? '#ef4444'
                          : resumeCharCount > 13000
                            ? '#f59e0b'
                            : '#10b981',
                    }}
                  ></span>
                  Characters: {resumeCharCount.toLocaleString()}/15,000
                </span>
                {resumeCharCount > 15000 && (
                  <span className="text-red-500 font-medium flex items-center text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limit exceeded
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Job Description Input */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-2xl">
            <label
              htmlFor="jobDescription"
              className="flex items-center text-lg font-semibold text-gray-800 mb-4"
            >
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
              Job Description
            </label>
            <div className="relative">
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => handleJDChange(e.target.value)}
                placeholder="Paste the complete job description here...

Include:
• Job title
• Responsibilities
• Required skills
• Qualifications
• Company information"
                className="w-full h-80 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </div>

            {/* JD Stats */}
            <div className="flex flex-col space-y-2 text-sm mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className={`font-medium transition-colors duration-200 text-gray-600`}>
                  <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-500"></span>
                  Words: {jdWordCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium transition-colors duration-200 ${getJdCharCountColor()}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        jdCharCount > 4000 ? '#ef4444' : jdCharCount > 3200 ? '#f59e0b' : '#10b981',
                    }}
                  ></span>
                  Characters: {jdCharCount.toLocaleString()}/4,000
                </span>
                {jdCharCount > 4000 && (
                  <span className="text-red-500 font-medium flex items-center text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limit exceeded
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={generateCoverLetter}
            disabled={
              loading ||
              !resume.trim() ||
              !jobDescription.trim() ||
              resumeWordCount > 2500 ||
              resumeCharCount > 15000 ||
              jdCharCount > 4000
            }
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 min-w-[240px]"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              {loading ? (
                <>
                  <div className="w-5 h-5">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>Generating Cover Letter...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
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
                  <span>Generate Cover Letter</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-5xl mx-auto space-y-8 mt-12">
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Use Our AI Cover Letter Generator?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Writing a compelling cover letter is one of the most critical steps in your job
                application process. Our <strong>free AI cover letter generator</strong> uses
                advanced artificial intelligence to analyze your resume and the target job
                description, creating a <strong>personalized, professional cover letter</strong>{' '}
                that highlights your most relevant qualifications and demonstrates your perfect fit
                for the role.
              </p>

              <p className="leading-relaxed">
                Unlike generic cover letter templates, our tool crafts{' '}
                <strong>tailored content</strong> that speaks directly to the hiring manager's
                needs. Each cover letter is optimized to showcase your unique experience, skills,
                and achievements while maintaining a professional tone that makes a lasting
                impression.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Instant Professional Results
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Generate a polished, job-specific cover letter in seconds. No more staring at a
                    blank page or struggling with writer's block. Our AI does the heavy lifting
                    while you focus on your job search.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ATS-Friendly Format</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our cover letters are designed to pass through Applicant Tracking Systems (ATS)
                    while maintaining readability for human recruiters. We strategically incorporate
                    keywords from the job description without keyword stuffing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customized for Every Job</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Each cover letter is uniquely tailored to match the specific job requirements,
                    company culture, and industry standards. The AI identifies the most relevant
                    achievements from your resume to emphasize.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free to Use</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No hidden fees, no credit card required, no signup necessary. Generate as many
                    cover letters as you need for your job applications. We're here to support your
                    career journey without barriers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Generate Your Cover Letter in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Paste Your Resume</h3>
                <p className="text-gray-600 leading-relaxed">
                  Copy and paste your complete resume into the left text box. Include all your work
                  experience, skills, education, and achievements for the best results.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Add Job Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Paste the full job description from the posting into the right text box. Our AI
                  will analyze the requirements, skills, and qualifications to create a targeted
                  cover letter.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate & Download</h3>
                <p className="text-gray-600 leading-relaxed">
                  Click the generate button and receive your professionally written cover letter
                  instantly. Copy it to your clipboard or regenerate if you want a different
                  version.
                </p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pro Tips for the Perfect Cover Letter
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                    Use Your Complete Resume
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Include all sections of your resume for the best results. The more information
                    the AI has about your background, the more compelling and specific your cover
                    letter will be.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                    Include the Full Job Posting
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Don't just copy the job title - paste the entire job description including
                    responsibilities, requirements, and company information. This helps the AI
                    understand exactly what the employer is looking for.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                    Review and Personalize
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    While our AI creates excellent cover letters, we recommend reviewing the output
                    and adding any personal touches or specific examples that make your application
                    even more compelling.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                    Try Regenerating for Variations
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Not satisfied with the first version? Click regenerate to get a different angle
                    on your cover letter. Each generation creates unique content while maintaining
                    professional quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Boost Your Job Search with More Free Tools
            </h2>
            <p className="text-gray-600 text-lg mb-6 max-w-3xl mx-auto">
              Maximize your chances of landing interviews with our complete suite of free career
              tools designed to optimize every aspect of your job application.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/career-tools/keyword-finder"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Job Description Keyword Finder
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/career-tools"
                className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
              >
                View All Career Tools
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Error Display */}
        {error && (
          <div
            className={`border-2 rounded-2xl p-6 animate-fade-in-up ${
              rateLimitState.isRateLimited
                ? 'bg-amber-50 border-amber-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    rateLimitState.isRateLimited ? 'bg-amber-100' : 'bg-red-100'
                  }`}
                >
                  {rateLimitState.isRateLimited ? (
                    <svg className="h-6 w-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    rateLimitState.isRateLimited ? 'text-amber-800' : 'text-red-800'
                  }`}
                >
                  {rateLimitState.isRateLimited ? 'Hourly Limit Reached' : 'Something went wrong'}
                </h3>
                <div
                  className={`${rateLimitState.isRateLimited ? 'text-amber-700' : 'text-red-700'}`}
                >
                  {rateLimitState.isRateLimited ? (
                    <div className="space-y-3">
                      <p className="whitespace-pre-line">{error}</p>
                      {rateLimitState.retryAfter && (
                        <div className="bg-amber-100 rounded-lg p-3 text-sm">
                          <p className="font-medium text-amber-800">💡 What can you do now?</p>
                          <ul className="mt-2 space-y-1 text-amber-700 list-disc list-inside">
                            <li>
                              Wait {rateLimitState.retryAfter} minutes for your limit to reset
                            </li>
                            <li>Save your content and come back later</li>
                            <li>
                              Consider our{' '}
                              <Link
                                href="/cover-letter-writing-service"
                                className="text-amber-600 underline hover:text-amber-500"
                              >
                                professional cover letter writing service
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {coverLetter && (
          <div
            ref={resultsRef}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in-up"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cover Letter is Ready!</h2>
              <p className="text-gray-600">
                Word count: {wordCount} words • Professional & Tailored
              </p>
            </div>

            {/* Cover Letter Display */}
            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                  {coverLetter}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                onClick={generateCoverLetter}
                disabled={loading}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-purple-600 font-semibold px-6 py-3 rounded-lg border-2 border-purple-600 transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Regenerate</span>
              </button>
            </div>

            {/* CTA Section */}
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mb-4">
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
                <h3 className="text-xl font-bold text-purple-800 mb-3">Need Expert Refinement?</h3>
                <p className="text-purple-700 mb-4 max-w-2xl mx-auto">
                  While our AI generates great cover letters, our professional writers can refine
                  and perfect your message to maximize impact and ensure it resonates with hiring
                  managers.
                </p>
                <Link
                  href="/cover-letter-writing-service"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Get Professional Cover Letter
                  <svg
                    className="w-4 h-4 ml-2"
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
        )}

        {/* Info Section */}
        <div className="bg-purple-50 rounded-lg p-6 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About This Tool</h3>
          <p>
            Our AI-powered cover letter generator analyzes your resume and the job description to
            create a personalized, compelling cover letter. The tool uses advanced language models
            to highlight your relevant experience, skills, and achievements while demonstrating your
            fit for the specific role. Each cover letter is optimized to be concise (250-400 words)
            yet impactful, helping you stand out to hiring managers.
          </p>
        </div>

        {/* SEO-Friendly Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Write a Cover Letter That Gets Noticed
          </h2>
          <p className="text-gray-700 mb-4">
            Writing an effective cover letter requires more than just introducing yourself. A strong
            cover letter should complement your resume by providing context, demonstrating
            enthusiasm, and highlighting how your unique experiences make you the ideal candidate
            for the specific role.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Elements:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Opening Hook:</strong> Start with a compelling statement that shows
                    genuine interest and knowledge about the company
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Relevant Experience:</strong> Highlight 2-3 key achievements that
                    directly relate to the job requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Company Connection:</strong> Demonstrate research by mentioning specific
                    company initiatives, values, or recent news
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Clear Call-to-Action:</strong> Express enthusiasm and request an
                    interview or follow-up conversation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Professional Tone:</strong> Balance professionalism with personality to
                    show you're a cultural fit
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tips to Optimize Cover Letters for ATS (Applicant Tracking Systems)
              </h3>
              <p className="text-gray-700 mb-3">
                Many companies use ATS software to screen applications before a human ever reads
                them. Here's how to ensure your cover letter passes these systems:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Use Keywords:</strong> Mirror language from the job description,
                    including specific skills, qualifications, and industry terms
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Standard Formatting:</strong> Avoid tables, images, or complex layouts
                    that ATS systems struggle to read
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Simple Fonts:</strong> Stick to standard fonts like Arial, Calibri, or
                    Times New Roman
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Include Job Title:</strong> Mention the exact job title from the posting
                    in your opening paragraph
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    <strong>Plain Text Format:</strong> Save as .docx or .pdf (when specified) to
                    ensure compatibility
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Cover Letter Examples by Industry
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Technology</h4>
                  <p className="text-sm">
                    Emphasize technical skills, project outcomes, and innovation. Mention specific
                    technologies, frameworks, and methodologies. Demonstrate problem-solving
                    abilities with quantifiable results.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Healthcare</h4>
                  <p className="text-sm">
                    Highlight patient care experience, certifications, and compliance knowledge.
                    Emphasize compassion, attention to detail, and commitment to quality care.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Finance</h4>
                  <p className="text-sm">
                    Focus on analytical skills, financial modeling, regulatory knowledge, and
                    attention to detail. Include specific metrics and achievements.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Marketing</h4>
                  <p className="text-sm">
                    Showcase creativity, campaign results, and brand awareness initiatives.
                    Demonstrate understanding of current trends and digital marketing strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with Schema Markup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About Cover Letters
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What makes a good cover letter?
              </h3>
              <p className="text-gray-700">
                A good cover letter is tailored to the specific job, demonstrates genuine interest
                in the company, highlights 2-3 relevant achievements, maintains a professional yet
                personable tone, and is concise (250-400 words). It should complement—not
                repeat—your resume by providing context and personality. The best cover letters show
                you've researched the company and explain why you're uniquely qualified for the
                role.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How long should a cover letter be?
              </h3>
              <p className="text-gray-700">
                A cover letter should be between 250-400 words, or about three to four paragraphs.
                It should fit on a single page with proper formatting. Hiring managers typically
                spend 30 seconds to 2 minutes reading a cover letter, so brevity and impact are
                essential. Focus on quality over quantity—every sentence should add value.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Should I customize my cover letter for each job?
              </h3>
              <p className="text-gray-700">
                Absolutely! Customization is crucial. Generic cover letters are easy to spot and
                often lead to rejection. Tailor each cover letter by referencing the specific job
                title, company name, and requirements. Mention how your skills align with their
                needs and why you're interested in that particular company. This shows effort,
                genuine interest, and attention to detail.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What should I avoid in a cover letter?
              </h3>
              <p className="text-gray-700">
                Avoid: Generic templates without customization, repeating your resume verbatim,
                focusing too much on what the job offers you rather than what you offer the company,
                typos or grammatical errors, negative comments about previous employers, salary
                requirements (unless requested), and overly casual language. Also avoid starting
                with "To Whom It May Concern"—research to find the hiring manager's name.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do cover letters really matter in 2026?
              </h3>
              <p className="text-gray-700">
                Yes! While some companies may not require cover letters, when they do, it's your
                opportunity to stand out. A well-crafted cover letter can be the deciding factor
                between similar candidates. It demonstrates communication skills, professionalism,
                and genuine interest. Even when optional, submitting a strong cover letter shows
                initiative and can give you an edge over candidates who skip it.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is this cover letter generator really free?
              </h3>
              <p className="text-gray-700">
                Yes! Our AI cover letter generator is completely free to use. There are no hidden
                fees, subscriptions, or premium versions. We offer this tool to help job seekers
                succeed in their career journey.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How does the AI cover letter generator work?
              </h3>
              <p className="text-gray-700">
                Our tool uses advanced artificial intelligence (Google's Gemini 2.0 Flash) to
                analyze both your resume and the job description. It identifies relevant skills,
                experience, and achievements, then crafts a compelling narrative that demonstrates
                your fit for the role. The AI follows professional writing standards and creates
                cover letters optimized for both ATS systems and human readers.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I use the generated cover letter as-is?
              </h3>
              <p className="text-gray-700">
                Absolutely! Our AI generates professional-quality cover letters that are ready to
                submit. However, we always recommend reviewing the content and adding any personal
                touches or specific examples that make your application unique. Think of it as a
                strong first draft that you can enhance with your personal voice.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How many cover letters can I generate?
              </h3>
              <p className="text-gray-700">
                You can generate up to 3 cover letters per hour with our free tool. This limit
                ensures quality service for all users. If you need unlimited generations or
                professional refinement, check out our{' '}
                <Link
                  href="/cover-letter-writing-service"
                  className="text-purple-600 hover:text-purple-700 font-semibold underline"
                >
                  professional cover letter writing service
                </Link>
                .
              </p>
            </div>

            <div className="pb-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is my data safe and private?
              </h3>
              <p className="text-gray-700">
                Yes, we take your privacy seriously. We don't store your resume or job descriptions
                on our servers. The data is processed securely to generate your cover letter and
                then discarded. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Links Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/career-tools/job-description-keyword-finder"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              🔍 Job Description Keyword Finder
            </h3>
            <p className="text-gray-600 text-sm">
              Extract key skills and requirements from job postings to ensure your cover letter
              includes the right keywords for ATS optimization.
            </p>
          </Link>

          <Link
            href="/services/resume-review"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="text-lg font-semibold text-purple-600 mb-2">📄 Resume Review</h3>
            <p className="text-gray-600 text-sm">
              Get your resume reviewed by experts to ensure it pairs perfectly with your cover
              letter and presents a cohesive application package.
            </p>
          </Link>
        </div>

        {/* Cover Letter Service CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 mt-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Want a Professionally Written Cover Letter?
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Our expert writers craft compelling, ATS-optimized cover letters tailored to your
              target role. Stand out from the competition with a cover letter that tells your story
              and convinces hiring managers you're the perfect fit.
            </p>
            <Link
              href="/services/cover-letter"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-50 transition-all shadow-lg"
              style={{ color: '#9333ea', textDecoration: 'none' }}
            >
              Get Professional Cover Letter Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
