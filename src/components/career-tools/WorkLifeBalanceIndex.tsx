/**
 * Work Life Balance Index - Wellness Assessment & Burnout Risk Analysis
 * Multi-step form with AI-powered balance evaluation
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  // Work Factors
  hoursPerWeek: number
  commuteTime: number
  workSchedule: string
  remoteDaysPerWeek: number
  vacationDaysTaken: number
  vacationDaysAvailable: number
  afterHoursEmail: string
  weekendWorkFrequency: string
  workStressLevel: number

  // Personal Life
  sleepHours: number
  exerciseDaysPerWeek: number
  hobbyHoursPerWeek: number
  socialConnectionQuality: number
  personalGrowthHours: number
  healthStatus: number

  // Life Satisfaction
  overallHappiness: number
  workSatisfaction: number
  relationshipQuality: number
  financialStress: number
}

interface AssessmentResult {
  overallScore: number
  burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Critical'

  dimensionScores: {
    timeBalance: {
      score: number
      maxScore: number
      percentage: number
      label: string
      feedback: string
    }
    flexibility: {
      score: number
      maxScore: number
      percentage: number
      label: string
      feedback: string
    }
    stressMentalHealth: {
      score: number
      maxScore: number
      percentage: number
      label: string
      feedback: string
    }
    physicalWellbeing: {
      score: number
      maxScore: number
      percentage: number
      label: string
      feedback: string
    }
    lifeSatisfaction: {
      score: number
      maxScore: number
      percentage: number
      label: string
      feedback: string
    }
  }

  warningSignals: string[]
  healthImpact: string

  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }

  comparativeAnalysis: {
    vsIndustryAverage: string
    vsCountryNorms: string
    optimalBalanceGap: string
  }

  hiddenCosts: {
    healthImpact: string
    relationshipStrain: string
    sustainabilityForecast: string
  }
}

const WorkLifeBalanceIndex = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const [formData, setFormData] = useState<FormData>({
    hoursPerWeek: 40,
    commuteTime: 30,
    workSchedule: '',
    remoteDaysPerWeek: 0,
    vacationDaysTaken: 10,
    vacationDaysAvailable: 15,
    afterHoursEmail: '',
    weekendWorkFrequency: '',
    workStressLevel: 5,
    sleepHours: 7,
    exerciseDaysPerWeek: 2,
    hobbyHoursPerWeek: 5,
    socialConnectionQuality: 5,
    personalGrowthHours: 2,
    healthStatus: 7,
    overallHappiness: 6,
    workSatisfaction: 6,
    relationshipQuality: 7,
    financialStress: 5,
  })

  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.workSchedule && formData.afterHoursEmail && formData.weekendWorkFrequency
      case 2:
        return true
      case 3:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/work-life-balance-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
          throw new Error(errorData.message || 'Rate limit exceeded. Please try again later.')
        }
        throw new Error(errorData.message || 'Failed to calculate assessment')
      }

      const data = await response.json()
      setResult(data.assessment)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setResult(null)
    setError('')
  }

  const scheduleOptions = ['Fixed', 'Flexible', 'Shift Work', 'On-Call']
  const frequencyOptions = ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Wellness Assessment Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work-Life Balance Index
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Measure your current work-life balance across time, flexibility, stress, health, and
            satisfaction. Get personalized recommendations and identify burnout risk.
          </p>
        </div>

        {/* Progress Steps */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              {[
                { num: 1, label: 'Work' },
                { num: 2, label: 'Life' },
                { num: 3, label: 'Satisfaction' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep === step.num
                          ? 'bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg scale-110 ring-4 ring-green-100'
                          : currentStep > step.num
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {currentStep > step.num ? '✓' : step.num}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                        currentStep === step.num
                          ? 'text-green-600'
                          : currentStep > step.num
                            ? 'text-emerald-600'
                            : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="flex-1 h-1 mx-2">
                      <div
                        className={`h-full rounded transition-all duration-300 ${
                          currentStep > step.num ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700 whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Steps */}
        {!result && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            {/* Step 1: Work Factors */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Work Factors</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Average Hours per Week: {formData.hoursPerWeek}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={formData.hoursPerWeek}
                    onChange={(e) => updateFormData('hoursPerWeek', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20h</span>
                    <span>50h</span>
                    <span>80h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Daily Commute (Round Trip): {formData.commuteTime} minutes
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="10"
                    value={formData.commuteTime}
                    onChange={(e) => updateFormData('commuteTime', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 min</span>
                    <span>90 min</span>
                    <span>180 min</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Schedule
                  </label>
                  <select
                    value={formData.workSchedule}
                    onChange={(e) => updateFormData('workSchedule', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Schedule Type</option>
                    {scheduleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Remote Work Days per Week: {formData.remoteDaysPerWeek}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={formData.remoteDaysPerWeek}
                    onChange={(e) => updateFormData('remoteDaysPerWeek', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 days</span>
                    <span>2-3 days</span>
                    <span>5 days</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Vacation Days Taken: {formData.vacationDaysTaken}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={formData.vacationDaysTaken}
                      onChange={(e) =>
                        updateFormData('vacationDaysTaken', parseInt(e.target.value))
                      }
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Vacation Days Available: {formData.vacationDaysAvailable}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={formData.vacationDaysAvailable}
                      onChange={(e) =>
                        updateFormData('vacationDaysAvailable', parseInt(e.target.value))
                      }
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email After Hours
                  </label>
                  <select
                    value={formData.afterHoursEmail}
                    onChange={(e) => updateFormData('afterHoursEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Frequency</option>
                    {frequencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Weekend Work
                  </label>
                  <select
                    value={formData.weekendWorkFrequency}
                    onChange={(e) => updateFormData('weekendWorkFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Frequency</option>
                    {frequencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Stress Level: {formData.workStressLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.workStressLevel}
                    onChange={(e) => updateFormData('workStressLevel', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Life */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Personal Life</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Average Sleep per Night: {formData.sleepHours} hours
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={(e) => updateFormData('sleepHours', parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4h</span>
                    <span>7h</span>
                    <span>10h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Exercise Days per Week: {formData.exerciseDaysPerWeek}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    value={formData.exerciseDaysPerWeek}
                    onChange={(e) =>
                      updateFormData('exerciseDaysPerWeek', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>3-4</span>
                    <span>7</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Hobby/Leisure Hours per Week: {formData.hobbyHoursPerWeek}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={formData.hobbyHoursPerWeek}
                    onChange={(e) => updateFormData('hobbyHoursPerWeek', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0h</span>
                    <span>15h</span>
                    <span>30h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Social Connection Quality: {formData.socialConnectionQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.socialConnectionQuality}
                    onChange={(e) =>
                      updateFormData('socialConnectionQuality', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Personal Growth Hours per Week: {formData.personalGrowthHours}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={formData.personalGrowthHours}
                    onChange={(e) =>
                      updateFormData('personalGrowthHours', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0h</span>
                    <span>10h</span>
                    <span>20h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Overall Health Status: {formData.healthStatus}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.healthStatus}
                    onChange={(e) => updateFormData('healthStatus', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Life Satisfaction */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Life Satisfaction
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Overall Happiness: {formData.overallHappiness}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.overallHappiness}
                    onChange={(e) => updateFormData('overallHappiness', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Unhappy</span>
                    <span>Neutral</span>
                    <span>Very Happy</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Satisfaction: {formData.workSatisfaction}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.workSatisfaction}
                    onChange={(e) => updateFormData('workSatisfaction', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Unsatisfied</span>
                    <span>Neutral</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Relationship Quality: {formData.relationshipQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.relationshipQuality}
                    onChange={(e) =>
                      updateFormData('relationshipQuality', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Financial Stress: {formData.financialStress}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.financialStress}
                    onChange={(e) => updateFormData('financialStress', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>No Stress</span>
                    <span>Moderate</span>
                    <span>High Stress</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Previous
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ml-auto ${
                    canProceed()
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              )}
              {currentStep === totalSteps && (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ml-auto ${
                    loading || !canProceed()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Calculate Work-Life Balance'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div
              className={`rounded-2xl shadow-2xl p-8 text-white ${
                result.burnoutRisk === 'Critical'
                  ? 'bg-gradient-to-br from-red-500 to-red-700'
                  : result.burnoutRisk === 'High'
                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                    : result.burnoutRisk === 'Moderate'
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
                      : 'bg-gradient-to-br from-green-500 to-teal-600'
              }`}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Work-Life Balance Score</h2>
                <div className="text-6xl font-bold mb-2">{result.overallScore}</div>
                <div className="text-xl mb-4">out of 100</div>
                <div
                  className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${
                    result.burnoutRisk === 'Critical'
                      ? 'bg-red-900'
                      : result.burnoutRisk === 'High'
                        ? 'bg-orange-900'
                        : result.burnoutRisk === 'Moderate'
                          ? 'bg-yellow-900'
                          : 'bg-green-900'
                  }`}
                >
                  Burnout Risk: {result.burnoutRisk}
                </div>
              </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dimension Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(result.dimensionScores).map(([key, dimension]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{dimension.label}</span>
                      <span className="text-sm text-gray-600">
                        {dimension.score}/{dimension.maxScore} ({dimension.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full"
                        style={{ width: `${dimension.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{dimension.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Signals */}
            {result.warningSignals.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Warning Signals
                </h3>
                <ul className="space-y-2">
                  {result.warningSignals.map((signal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">⚠</span>
                      <span className="text-gray-700">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-3">Immediate Changes (This Week)</h4>
                  <ul className="space-y-2">
                    {result.recommendations.immediate.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-teal-700 mb-3">
                    Short-term Improvements (1-3 Months)
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.shortTerm.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-blue-700 mb-3">
                    Long-term Considerations (3-12 Months)
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.longTerm.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hidden Costs */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hidden Costs</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Health Impact</h4>
                  <p className="text-sm text-gray-600">{result.hiddenCosts.healthImpact}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Relationship Strain</h4>
                  <p className="text-sm text-gray-600">{result.hiddenCosts.relationshipStrain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Career Sustainability</h4>
                  <p className="text-sm text-gray-600">
                    {result.hiddenCosts.sustainabilityForecast}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center pt-6">
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            About Work-Life Balance Index
          </h2>
          <div className="prose prose-green max-w-none">
            <p className="text-gray-700 mb-4">
              The Work-Life Balance Index measures your current balance across multiple factors
              including working hours, flexibility, stress levels, personal time, and life
              satisfaction. Our assessment identifies burnout risk and provides personalized
              recommendations for improving balance.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Related Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/career-tools/career-strength-index"
                className="block p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-blue-700 mb-1">Career Strength Index</h4>
                <p className="text-sm text-gray-600">
                  Comprehensive assessment of your overall career health
                </p>
              </Link>
              <Link
                href="/career-tools/leadership-readiness-score"
                className="block p-4 bg-orange-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-orange-700 mb-1">Leadership Readiness</h4>
                <p className="text-sm text-gray-600">
                  Assess your leadership potential and development needs
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkLifeBalanceIndex
