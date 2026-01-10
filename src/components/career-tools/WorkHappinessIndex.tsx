/**
 * Work Happiness Index Calculator
 * Multi-dimensional job satisfaction assessment
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// Type definitions
interface SatisfactionRatings {
  compensation: number
  workLifeBalance: number
  careerGrowth: number
  managerQuality: number
  companyCulture: number
  jobSecurity: number
  workInterest: number
  autonomy: number
  impact: number
  recognition: number
  teamDynamics: number
  resources: number
  commute: number
}

interface ImportanceWeights {
  [key: string]: number
}

interface FormData {
  ratings: SatisfactionRatings
  importanceWeights: ImportanceWeights
  timeInRole: string
  previousSatisfaction: string
  lifeStage: string
  role: string
  industry: string
}

interface AssessmentResult {
  overallScore: number
  scoreCategory: string
  dimensionScores: any
  satisfactionDrivers: any
  happinessTrajectory: any
  benchmarkComparison: any
  recommendation: any
  improvementStrategies: any[]
  jobSearchGuidance: any
  nextSteps: any[]
}

const RATING_FACTORS = [
  { key: 'compensation', label: 'Compensation & Benefits' },
  { key: 'workLifeBalance', label: 'Work-Life Balance' },
  { key: 'careerGrowth', label: 'Career Growth Opportunities' },
  { key: 'managerQuality', label: 'Manager Quality' },
  { key: 'companyCulture', label: 'Company Culture' },
  { key: 'jobSecurity', label: 'Job Security' },
  { key: 'workInterest', label: 'Work Interest & Engagement' },
  { key: 'autonomy', label: 'Autonomy & Control' },
  { key: 'impact', label: 'Sense of Impact' },
  { key: 'recognition', label: 'Recognition & Appreciation' },
  { key: 'teamDynamics', label: 'Team Dynamics' },
  { key: 'resources', label: 'Resources & Tools' },
  { key: 'commute', label: 'Commute (if applicable)' },
]

export default function WorkHappinessIndex() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    ratings: {
      compensation: 5,
      workLifeBalance: 5,
      careerGrowth: 5,
      managerQuality: 5,
      companyCulture: 5,
      jobSecurity: 5,
      workInterest: 5,
      autonomy: 5,
      impact: 5,
      recognition: 5,
      teamDynamics: 5,
      resources: 5,
      commute: 5,
    },
    importanceWeights: {},
    timeInRole: '',
    previousSatisfaction: '',
    lifeStage: '',
    role: '',
    industry: '',
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 3

  const updateRating = (key: keyof SatisfactionRatings, value: number) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: value },
    }))
  }

  const updateImportanceWeight = (key: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      importanceWeights: { ...prev.importanceWeights, [key]: value },
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/work-happiness-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to calculate assessment')
        return
      }

      setResult(data.analysis)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 45) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 75) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-blue-500 to-cyan-500'
    if (score >= 45) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Work Happiness Index
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Assess your job satisfaction across multiple dimensions and discover whether to stay,
            improve, or explore new opportunities.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-5 py-2.5 w-fit mx-auto">
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-emerald-700">Free</span>
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
            <span className="text-gray-300">•</span>
            <span className="text-gray-600">3 minutes</span>
          </div>
        </div>

        {!result ? (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Rate Your Job Satisfaction
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Rate each factor from 1 (Very Dissatisfied) to 10 (Very Satisfied)
                  </p>

                  {RATING_FACTORS.map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="font-medium text-gray-700">{label}</label>
                        <span className="text-2xl font-bold text-blue-600">
                          {formData.ratings[key as keyof SatisfactionRatings]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.ratings[key as keyof SatisfactionRatings]}
                        onChange={(e) =>
                          updateRating(key as keyof SatisfactionRatings, parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Very Dissatisfied</span>
                        <span>Very Satisfied</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Rank Importance</h2>
                  <p className="text-gray-600 mb-6">
                    Rank the most important factors (1 = Most Important, higher numbers = Less
                    Important)
                  </p>

                  {RATING_FACTORS.map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <label className="font-medium text-gray-700">{label}</label>
                      <input
                        type="number"
                        min="1"
                        max="13"
                        value={formData.importanceWeights[key] || 7}
                        onChange={(e) => updateImportanceWeight(key, parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Context</h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Time in Current Role
                    </label>
                    <input
                      type="text"
                      value={formData.timeInRole}
                      onChange={(e) => setFormData({ ...formData, timeInRole: e.target.value })}
                      placeholder="e.g., 2 years"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Previous Job Satisfaction
                    </label>
                    <input
                      type="text"
                      value={formData.previousSatisfaction}
                      onChange={(e) =>
                        setFormData({ ...formData, previousSatisfaction: e.target.value })
                      }
                      placeholder="e.g., Higher/Lower/Similar"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Life Stage</label>
                    <input
                      type="text"
                      value={formData.lifeStage}
                      onChange={(e) => setFormData({ ...formData, lifeStage: e.target.value })}
                      placeholder="e.g., Early career, Family planning, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Current Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Industry</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g., Technology"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Analyzing...' : 'Get My Happiness Index'}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                {error}
              </div>
            )}
          </>
        ) : (
          <div ref={resultsRef} className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Work Happiness Index</h2>
              <div className={`text-7xl font-bold ${getScoreColor(result.overallScore)} mb-2`}>
                {result.overallScore}
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-4">{result.scoreCategory}</div>
              <p className="text-gray-600 max-w-2xl mx-auto">{result.recommendation?.reasoning}</p>
            </div>

            {/* Dimension Scores */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Satisfaction Breakdown</h3>
              <div className="space-y-6">
                {Object.entries(result.dimensionScores || {}).map(([key, dim]: [string, any]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`text-xl font-bold ${getScoreColor(dim.score)}`}>
                        {dim.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getScoreGradient(dim.score)}`}
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{dim.analysis}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Strategies */}
            {result.improvementStrategies && result.improvementStrategies.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Improvement Strategies</h3>
                <div className="space-y-6">
                  {result.improvementStrategies.map((strategy: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold text-gray-900 mb-2">{strategy.dimension}</h4>
                      <p className="text-gray-600 mb-3">{strategy.currentIssue}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Action Steps:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {strategy.actionableSteps?.map((step: string, i: number) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        Timeline: {strategy.timeline} • Likelihood: {strategy.likelihoodOfChange}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Search Guidance */}
            {result.jobSearchGuidance?.shouldSearch && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Job Search Recommendations
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Priorities for Next Role:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {result.jobSearchGuidance.prioritiesForNextRole?.map(
                        (priority: string, i: number) => (
                          <li key={i}>{priority}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Green Flags to Look For:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {result.jobSearchGuidance.greenFlags?.map((flag: string, i: number) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Red Flags to Avoid:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {result.jobSearchGuidance.redFlags?.map((flag: string, i: number) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            {result.nextSteps && result.nextSteps.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Action Plan</h3>
                <div className="space-y-4">
                  {result.nextSteps.map((step: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{step.action}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {step.timeline} • Priority: {step.priority}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => {
                  setResult(null)
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Take Assessment Again
              </button>
              <Link
                href="/career-tools"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-center"
              >
                Explore More Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
