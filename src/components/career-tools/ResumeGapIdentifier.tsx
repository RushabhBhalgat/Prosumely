/**
 * Resume Gap Identifier Tool Component
 * Identifies missing skills, certifications, and experience gaps
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface MissingSkill {
  skill: string
  importance: 'critical' | 'high' | 'medium'
  reason: string
}

interface MissingCertification {
  certification: string
  importance: 'critical' | 'high' | 'medium'
  provider: string
  reason: string
}

interface ExperienceGap {
  gap: string
  importance: 'critical' | 'high' | 'medium'
  suggestion: string
}

interface Recommendation {
  priority: 'immediate' | 'short-term' | 'long-term'
  action: string
  timeframe: string
  impact: 'high' | 'medium' | 'low'
}

interface GapAnalysis {
  overallScore: number
  summary: string
  missingSkills: MissingSkill[]
  missingCertifications: MissingCertification[]
  experienceGaps: ExperienceGap[]
  strengths: string[]
  recommendations: Recommendation[]
}

interface ApiResponse {
  analysis: GapAnalysis
  processingTime: number
  success: boolean
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

export default function ResumeGapIdentifier() {
  const [resume, setResume] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [analysis, setAnalysis] = useState<GapAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })

  // Character and word counts
  const [resumeCharCount, setResumeCharCount] = useState(0)
  const [resumeWordCount, setResumeWordCount] = useState(0)
  const [roleCharCount, setRoleCharCount] = useState(0)

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

  const handleRoleChange = (value: string) => {
    setTargetRole(value)
    setRoleCharCount(value.length)
  }

  const analyzeResume = async () => {
    if (!resume.trim() || !targetRole.trim()) {
      setError('Please enter both your resume and target role')
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setAnalysis(null)

    try {
      const response = await fetch('/api/resume-gap-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resume.trim(),
          targetRole: targetRole.trim(),
        }),
      })

      const data: ApiResponse | ApiError = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError

        // Handle rate limiting specifically
        if (response.status === 429 || errorData.error === 'RATE_LIMIT_EXCEEDED') {
          // Check if it's our rate limit or Gemini's rate limit
          const isGeminiRateLimit =
            errorData.message?.includes('Gemini') || errorData.message?.includes('AI service')

          setRateLimitState({
            isRateLimited: true,
            retryAfter: errorData.retryAfter,
            resetTime: response.headers.get('X-RateLimit-Reset') || undefined,
          })

          if (isGeminiRateLimit) {
            setError(errorData.message || 'AI service rate limit exceeded. Please try again later.')
          } else {
            setError(errorData.message || 'Rate limit exceeded. Please try again in a few minutes.')
          }
        } else {
          setError(errorData.message || errorData.error || 'Failed to analyze resume')
        }
        return
      }

      const successData = data as ApiResponse
      setAnalysis(successData.analysis)

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

  const getResumeWordCountColor = () => {
    if (resumeWordCount > 3000) return 'text-red-500'
    if (resumeWordCount > 2700) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getResumeCharCountColor = () => {
    if (resumeCharCount > 18000) return 'text-red-500'
    if (resumeCharCount > 16000) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getRoleCharCountColor = () => {
    if (roleCharCount > 500) return 'text-red-500'
    if (roleCharCount > 400) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getImportanceBadgeColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'short-term':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'long-term':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent Match!'
    if (score >= 60) return 'Good Foundation'
    if (score >= 40) return 'Some Gaps to Address'
    return 'Significant Development Needed'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Resume Gap Identifier
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what's missing from your resume. Get personalized insights on skills,
            certifications, and experience needed to land your dream role.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-indigo-600 bg-indigo-50 rounded-full px-4 py-2 w-fit mx-auto">
            <span className="animate-pulse">🎯</span>
            <span className="font-medium">Free • AI-Powered • Actionable Insights</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Resume Input - Takes 2 columns */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-2xl">
            <label
              htmlFor="resume"
              className="flex items-center text-lg font-semibold text-gray-800 mb-4"
            >
              <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mr-3"></span>
              Your Resume / CV
            </label>
            <div className="relative">
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => handleResumeChange(e.target.value)}
                placeholder="Paste your complete resume or CV here...

Include:
• Contact information
• Professional summary
• Work experience with achievements
• Education and qualifications
• Technical and soft skills
• Certifications (if any)
• Projects and accomplishments"
                className="w-full h-96 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
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
                        resumeWordCount > 3000
                          ? '#ef4444'
                          : resumeWordCount > 2700
                            ? '#f59e0b'
                            : '#10b981',
                    }}
                  ></span>
                  Words: {resumeWordCount.toLocaleString()}/3,000
                </span>
                {resumeWordCount > 3000 && (
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
                        resumeCharCount > 18000
                          ? '#ef4444'
                          : resumeCharCount > 16000
                            ? '#f59e0b'
                            : '#10b981',
                    }}
                  ></span>
                  Characters: {resumeCharCount.toLocaleString()}/18,000
                </span>
                {resumeCharCount > 18000 && (
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

          {/* Target Role Input - Takes 1 column */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-2xl">
            <label
              htmlFor="targetRole"
              className="flex items-center text-lg font-semibold text-gray-800 mb-4"
            >
              <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mr-3"></span>
              Target Role
            </label>
            <div className="relative">
              <textarea
                id="targetRole"
                value={targetRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                placeholder="Enter your target job title and key requirements...

Example:
Senior Software Engineer
• 5+ years experience
• React, Node.js, AWS
• Team leadership
• Agile methodology"
                className="w-full h-96 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Stats */}
            <div className="flex flex-col space-y-2 text-sm mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium transition-colors duration-200 ${getRoleCharCountColor()}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        roleCharCount > 500
                          ? '#ef4444'
                          : roleCharCount > 400
                            ? '#f59e0b'
                            : '#10b981',
                    }}
                  ></span>
                  Characters: {roleCharCount.toLocaleString()}/500
                </span>
                {roleCharCount > 500 && (
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
            onClick={analyzeResume}
            disabled={
              loading ||
              !resume.trim() ||
              !targetRole.trim() ||
              resumeWordCount > 3000 ||
              resumeCharCount > 18000 ||
              roleCharCount > 500
            }
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 min-w-[240px]"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              {loading ? (
                <>
                  <div className="w-5 h-5">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>Analyzing Resume...</span>
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span>Analyze Resume Gaps</span>
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
                  {rateLimitState.isRateLimited
                    ? error?.includes('Gemini') || error?.includes('AI service')
                      ? 'AI Service Limit Reached'
                      : 'Hourly Limit Reached'
                    : 'Something went wrong'}
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
        {analysis && (
          <div ref={resultsRef} className="space-y-6 animate-fade-in-up">
            {/* Overall Score Card */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100 p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gap Analysis Complete</h2>
                <div className="mb-4">
                  <span className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}
                  </span>
                  <span className="text-2xl text-gray-500">/100</span>
                </div>
                <p className={`text-xl font-semibold mb-3 ${getScoreColor(analysis.overallScore)}`}>
                  {getScoreMessage(analysis.overallScore)}
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths && analysis.strengths.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Your Strengths
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200"
                    >
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {analysis.missingSkills && analysis.missingSkills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mr-3"></span>
                  Missing Skills
                </h3>
                <div className="space-y-4">
                  {analysis.missingSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{skill.skill}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImportanceBadgeColor(skill.importance)}`}
                        >
                          {skill.importance.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{skill.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Certifications */}
            {analysis.missingCertifications && analysis.missingCertifications.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mr-3"></span>
                  Recommended Certifications
                </h3>
                <div className="space-y-4">
                  {analysis.missingCertifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {cert.certification}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">Provider: {cert.provider}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImportanceBadgeColor(cert.importance)}`}
                        >
                          {cert.importance.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mt-2">{cert.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Gaps */}
            {analysis.experienceGaps && analysis.experienceGaps.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mr-3"></span>
                  Experience Gaps
                </h3>
                <div className="space-y-4">
                  {analysis.experienceGaps.map((gap, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{gap.gap}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImportanceBadgeColor(gap.importance)}`}
                        >
                          {gap.importance.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        <span className="font-medium text-gray-700">How to gain:</span>{' '}
                        {gap.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl shadow-xl border border-indigo-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl mb-4">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Your Personalized Action Plan
                  </h3>
                  <p className="text-gray-600">
                    Follow these prioritized steps to bridge your resume gaps
                  </p>
                </div>

                <div className="space-y-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 font-bold rounded-lg">
                            {index + 1}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadgeColor(rec.priority)}`}
                          >
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">{rec.timeframe}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-2">{rec.action}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-xs font-medium text-gray-500">Impact:</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            rec.impact === 'high'
                              ? 'bg-green-100 text-green-700'
                              : rec.impact === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {rec.impact.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={analyzeResume}
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Analyze Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
