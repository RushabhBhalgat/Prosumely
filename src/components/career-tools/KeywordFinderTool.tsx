/**
 * Example React component for the Job Description Keyword Finder tool
 * This would be used on the /career-tools/job-description-keyword-finder page
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface Keywords {
  actionVerbs: string[]
  technicalSkills: string[]
  softSkills: string[]
}

interface ApiResponse {
  keywords: Keywords
  error?: string
  message?: string
}

interface ApiError {
  error: string
  message?: string
  userFriendlyMessage?: string
  retryAfter?: number
}

interface RateLimitState {
  isRateLimited: boolean
  retryAfter?: number
  resetTime?: string
}

export default function KeywordFinderTool() {
  const [jobDescription, setJobDescription] = useState('')
  const [keywords, setKeywords] = useState<Keywords | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (value: string) => {
    setJobDescription(value)
    setWordCount(
      value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length,
    )
    setCharCount(value.length)
  }

  const extractKeywords = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description')
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setKeywords(null)

    try {
      const response = await fetch('/api/keyword-extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
          setError(errorData.userFriendlyMessage || errorData.message || 'Rate limit exceeded')
        } else {
          setError(errorData.message || errorData.error || 'Failed to extract keywords')
        }
        return
      }

      setKeywords((data as ApiResponse).keywords)

      // Scroll to results section after successful extraction
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getWordCountColor = () => {
    if (wordCount > 800) return 'text-red-500'
    if (wordCount > 600) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getCharCountColor = () => {
    if (charCount > 4000) return 'text-red-500'
    if (charCount > 3200) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Free Job Description Keyword Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Extract key action verbs, technical skills, and soft skills from any job description.
            Optimize your resume to beat Applicant Tracking Systems (ATS) and land more interviews.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 bg-blue-50 rounded-full px-4 py-2 w-fit mx-auto">
            <span className="animate-pulse">🚀</span>
            <span className="font-medium">Free • Powered by AI • No Signup Required</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 transition-all duration-300 hover:shadow-2xl">
          <label
            htmlFor="jobDescription"
            className="flex items-center text-lg font-semibold text-gray-800 mb-4"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></span>
            Paste Job Description Here
          </label>
          <div className="relative">
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Copy and paste the job description you want to analyze...

Example: We're looking for a skilled Software Engineer with experience in React, Node.js, and TypeScript..."
              className="w-full h-72 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-base leading-relaxed"
              disabled={loading}
            />
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-600 font-medium">Processing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Character/Word Count */}
          <div className="flex justify-between items-center text-sm mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className={`font-medium transition-colors duration-200 ${getWordCountColor()}`}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      wordCount > 800 ? '#ef4444' : wordCount > 600 ? '#f59e0b' : '#10b981',
                  }}
                ></span>
                Words: {wordCount.toLocaleString()}/800
              </span>
              <span className={`font-medium transition-colors duration-200 ${getCharCountColor()}`}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      charCount > 4000 ? '#ef4444' : charCount > 3200 ? '#f59e0b' : '#10b981',
                  }}
                ></span>
                Characters: {charCount.toLocaleString()}/4,000
              </span>
            </div>
            {(wordCount > 800 || charCount > 4000) && (
              <span className="text-red-500 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={extractKeywords}
            disabled={loading || !jobDescription.trim() || wordCount > 5000 || charCount > 35000}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 min-w-[200px]"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              {loading ? (
                <>
                  <div className="w-5 h-5">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>Analyzing Keywords...</span>
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Extract Keywords</span>
                </>
              )}
            </div>
          </button>
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
                            <li>Save your job description and come back later</li>
                            <li>
                              Consider our{' '}
                              <Link
                                href="/ats-resume-writing-service"
                                className="text-amber-600 underline hover:text-amber-500"
                              >
                                professional resume writing service
                              </Link>
                              .
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
        {keywords && (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Keywords Extracted Successfully!
              </h2>
              <p className="text-gray-600">
                Copy the keywords you need for your resume optimization
              </p>
            </div>

            <div className="space-y-8">
              {/* Action Verbs */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Action Verbs
                  </h3>
                  <button
                    onClick={() => copyToClipboard(keywords.actionVerbs.join(', '))}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy All</span>
                  </button>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {keywords.actionVerbs.length > 0 ? (
                    keywords.actionVerbs.join(', ')
                  ) : (
                    <p className="text-gray-500 italic">No action verbs found</p>
                  )}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Technical Skills
                  </h3>
                  <button
                    onClick={() => copyToClipboard(keywords.technicalSkills.join(', '))}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy All</span>
                  </button>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {keywords.technicalSkills.length > 0 ? (
                    keywords.technicalSkills.join(', ')
                  ) : (
                    <p className="text-gray-500 italic">No technical skills found</p>
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Soft Skills
                  </h3>
                  <button
                    onClick={() => copyToClipboard(keywords.softSkills.join(', '))}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy All</span>
                  </button>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {keywords.softSkills.length > 0 ? (
                    keywords.softSkills.join(', ')
                  ) : (
                    <p className="text-gray-500 italic">No soft skills found</p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Need Expert Help?</h3>
                <p className="text-green-700 mb-4 max-w-2xl mx-auto">
                  Don't want to manually incorporate these keywords? Our professional resume writers
                  can seamlessly integrate these ATS-friendly keywords into your resume while
                  maintaining natural flow and readability.
                </p>
                <Link
                  href="/ats-resume-writing-service"
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Get Professional ATS Resume
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

            {/* Tips Section - Pro Tips for ATS Optimization */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">
                    💡 Pro Tips for ATS Optimization
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">Best Practices:</h5>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                          <span>
                            <strong>Action Verbs:</strong> Use these in your resume bullet points to
                            describe your achievements and responsibilities dynamically
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                          <span>
                            <strong>Technical Skills:</strong> Include relevant ones in your skills
                            section and throughout your experience descriptions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                          <span>
                            <strong>Soft Skills:</strong> Weave these into your summary and
                            experience descriptions to show your personality and work style
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                          <span>
                            <strong>ATS Tip:</strong> Use exact keyword matches from the job
                            description in your resume for maximum compatibility
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional CTAs Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Resume Review CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-lg transition-all duration-300">
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
              <h3 className="text-xl font-bold text-purple-900 mb-2">Free Resume Review</h3>
              <p className="text-purple-700 text-sm mb-4">
                Get expert feedback on your resume. We'll identify areas for improvement and provide
                actionable recommendations.
              </p>
              <Link
                href="/resume-review"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Free Review
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

          {/* Executive CV Service CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-xl mb-4">
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Executive CV - Only $30</h3>
              <p className="text-amber-700 text-sm mb-4">
                Premium executive CV writing service at an unbeatable price. Stand out in the
                C-suite market.
              </p>
              <Link
                href="/executive-resume-writing-service"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Executive CV
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

        {/* SEO Footer Content */}
        <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About This Tool</h3>
          <p>
            Our free job description keyword finder helps job seekers optimize their resumes for
            Applicant Tracking Systems (ATS). By analyzing job postings and extracting key terms,
            you can ensure your resume includes the right keywords to pass initial screening filters
            and reach human recruiters. This ATS-friendly approach increases your chances of landing
            interviews and advancing in the hiring process.
          </p>
        </div>
      </div>
    </div>
  )
}
