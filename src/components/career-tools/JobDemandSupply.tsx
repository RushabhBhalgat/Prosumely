/**
 * Job Demand Supply Calculator - Analyze market competition with 0-10 index
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FormData {
  jobTitle: string
  country: string
  city: string
  industry: string
  experienceLevel: string
  specialization: string
  remotePreference: string
}

interface CompetitionAnalysis {
  competitionIndex: number
  explanation: string
  marketMetrics: {
    estimatedOpenings: string
    candidatesPerRole: string
    applicationCompetition: string
    hiringTimeline: string
  }
  regionalAnalysis: {
    topMarkets: Array<{ location: string; reason: string }>
    avoidMarkets: Array<{ location: string; reason: string }>
  }
  skillGaps: string[]
  jobSearchStrategy: {
    recommendedApproach: string
    networkingTips: string[]
    applicationTips: string[]
    interviewPrep: string[]
  }
  salaryInsights: {
    salaryRange: string
    negotiationLeverage: string
    factors: string[]
  }
  marketTrends: {
    growthOutlook: string
    demandDrivers: string[]
    supplyFactors: string[]
  }
  actionPlan: Array<{ priority: string; action: string; timeline: string }>
}

export default function JobDemandSupplyCalculator() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    country: '',
    city: '',
    industry: '',
    experienceLevel: '',
    specialization: '',
    remotePreference: 'Flexible',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CompetitionAnalysis | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/job-demand-supply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to analyze job market')
        return
      }

      setResult(data.competitionAnalysis)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getCompetitionColor = (index: number) => {
    if (index <= 3) return { bg: 'bg-green-500', text: 'text-green-600', label: 'Low Competition' }
    if (index <= 5)
      return { bg: 'bg-yellow-500', text: 'text-yellow-600', label: 'Moderate Competition' }
    if (index <= 7)
      return { bg: 'bg-orange-500', text: 'text-orange-600', label: 'High Competition' }
    return { bg: 'bg-red-500', text: 'text-red-600', label: 'Very High Competition' }
  }

  const isFormValid = () => {
    return formData.jobTitle && formData.country && formData.experienceLevel
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Job Market Competition Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover real-time job market demand vs supply. Get your competition index (0-10),
            market insights, and winning job search strategies.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-full px-5 py-2.5 w-fit mx-auto">
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
              <span className="font-semibold text-rose-700">Free</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-purple-600"
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
              <span className="font-semibold text-purple-700">AI-Powered</span>
            </div>
          </div>
        </div>

        {!result && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData('jobTitle', e.target.value)}
                    placeholder="e.g., Software Engineer, Product Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => updateFormData('experienceLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                    <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                    <option value="Senior Level (6-10 years)">Senior Level (6-10 years)</option>
                    <option value="Lead/Principal (10+ years)">Lead/Principal (10+ years)</option>
                    <option value="Executive/Director">Executive/Director</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    placeholder="e.g., United States, India"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="e.g., San Francisco, Bangalore"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    placeholder="e.g., Technology, Finance, Healthcare"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => updateFormData('specialization', e.target.value)}
                    placeholder="e.g., Machine Learning, Cloud Architecture"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remote Work Preference
                </label>
                <select
                  value={formData.remotePreference}
                  onChange={(e) => updateFormData('remotePreference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="Remote Only">Remote Only</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site Only">On-site Only</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing Market...
                  </>
                ) : (
                  'Get Competition Analysis'
                )}
              </button>
            </form>
          </div>
        )}

        {result && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in-up">
            <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl p-8 shadow-xl text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Your Job Market Analysis</h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="white"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${(result.competitionIndex / 10) * 502.4} 502.4`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">
                        {result.competitionIndex.toFixed(1)}
                      </span>
                      <span className="text-sm opacity-90">out of 10</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`inline-block px-6 py-3 rounded-xl ${getCompetitionColor(result.competitionIndex).text} bg-white font-bold text-lg`}
                >
                  {getCompetitionColor(result.competitionIndex).label}
                </div>
                <p className="text-xl mt-6 text-white/90 max-w-2xl mx-auto">{result.explanation}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estimated Job Openings</h3>
                <p className="text-3xl font-bold text-rose-600">
                  {result.marketMetrics.estimatedOpenings}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Candidates Per Role</h3>
                <p className="text-3xl font-bold text-pink-600">
                  {result.marketMetrics.candidatesPerRole}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Competition</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {result.marketMetrics.applicationCompetition}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Typical Hiring Timeline</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {result.marketMetrics.hiringTimeline}
                </p>
              </div>
            </div>

            {result.regionalAnalysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
                  <h3 className="text-2xl font-bold mb-6 text-green-600">Best Markets</h3>
                  <div className="space-y-4">
                    {result.regionalAnalysis.topMarkets.map((market, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg"
                      >
                        <h4 className="font-bold text-gray-900">{market.location}</h4>
                        <p className="text-sm text-gray-700">{market.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-red-200">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">Markets to Avoid</h3>
                  <div className="space-y-4">
                    {result.regionalAnalysis.avoidMarkets.map((market, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg"
                      >
                        <h4 className="font-bold text-gray-900">{market.location}</h4>
                        <p className="text-sm text-gray-700">{market.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {result.skillGaps && result.skillGaps.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-yellow-200">
                <h3 className="text-2xl font-bold mb-6 text-yellow-600">
                  Skills to Bridge the Gap
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.skillGaps.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg"
                    >
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-800 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.jobSearchStrategy && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Your Job Search Strategy</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Recommended Approach</h4>
                    <p className="text-gray-700">{result.jobSearchStrategy.recommendedApproach}</p>
                  </div>
                  {result.jobSearchStrategy.networkingTips.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Networking Tips</h4>
                      <ul className="space-y-2">
                        {result.jobSearchStrategy.networkingTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.jobSearchStrategy.applicationTips.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Application Tips</h4>
                      <ul className="space-y-2">
                        {result.jobSearchStrategy.applicationTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.salaryInsights && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-emerald-200">
                <h3 className="text-2xl font-bold mb-6 text-emerald-600">Salary Insights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Expected Range</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {result.salaryInsights.salaryRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Negotiation Leverage</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.salaryInsights.negotiationLeverage}
                    </p>
                  </div>
                </div>
                {result.salaryInsights.factors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Factors Affecting Salary</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.salaryInsights.factors.map((factor, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {result.marketTrends && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-200">
                <h3 className="text-2xl font-bold mb-6 text-purple-600">Market Trends</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Growth Outlook</h4>
                    <p className="text-gray-700">{result.marketTrends.growthOutlook}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Demand Drivers</h4>
                      <ul className="space-y-2">
                        {result.marketTrends.demandDrivers.map((driver, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">▲</span>
                            <span className="text-gray-700">{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Supply Factors</h4>
                      <ul className="space-y-2">
                        {result.marketTrends.supplyFactors.map((factor, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-500 mr-2">●</span>
                            <span className="text-gray-700">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result.actionPlan && result.actionPlan.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-rose-200">
                <h3 className="text-2xl font-bold mb-6 text-rose-600">Your Action Plan</h3>
                <div className="space-y-4">
                  {result.actionPlan.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-rose-600 uppercase">
                            {item.priority}
                          </span>
                          <span className="text-xs text-gray-500">{item.timeline}</span>
                        </div>
                        <p className="text-gray-900 font-medium">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl p-8 text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Stand Out?</h3>
              <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
                In a competitive job market, your resume needs to be perfect. Get a professionally
                written resume that beats ATS systems and impresses hiring managers.
              </p>
              <Link
                href="/resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Your Professional Resume
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null)
                  setFormData({
                    jobTitle: '',
                    country: '',
                    city: '',
                    industry: '',
                    experienceLevel: '',
                    specialization: '',
                    remotePreference: 'Flexible',
                  })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-rose-500 text-rose-600 font-semibold rounded-xl hover:bg-rose-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Analyze Another Role
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
