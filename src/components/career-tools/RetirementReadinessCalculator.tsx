/**
 * Retirement Readiness Index Calculator
 * Comprehensive retirement planning tool with country comparison
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// Type definitions
interface FormData {
  currentAge: number
  targetRetirementAge: number
  currentCountry: string
  lifeExpectancy: number
  currentSavings: number
  monthlyContributions: number
  personalContribution: number
  employerContribution: number
  annualReturn: number
  currentSalary: number
  desiredLifestyle: string
  retirementLocation: string
  healthcareCosts: string
  pensionYears: number
  expectedSocialSecurity: number
}

interface CategoryScore {
  score: number
  percentage: number
  label: string
  feedback: string
}

interface RetirementAssessment {
  overallScore: number
  scoreCategory: string
  summary: string
  categoryScores: {
    savingsAdequacy: CategoryScore
    pensionSocialSecurity: CategoryScore
    investmentStrategy: CategoryScore
    timeline: CategoryScore
    costPreparedness: CategoryScore
  }
  projectedWealth: {
    totalAtRetirement: number
    annualRetirementIncome: number
    replacementRate: number
    fundsLastUntilAge: number
    yearsOfRetirement: number
  }
  adequacyAssessment: {
    status: string
    message: string
    monthlyShortfall: number
    targetNeeded: number
    currentTrajectory: number
  }
  countryComparison: {
    currentCountryRank: number
    retirementLocationRank: number
    bestCountries: Array<{
      country: string
      pensionScore: number
      highlights: string[]
    }>
    taxImplications: string
    healthcareSystem: string
  }
  gapAnalysis: {
    currentSavings: number
    targetNeeded: number
    shortfall: number
    yearsToCloseGap: number
    alternativeStrategies: string[]
  }
  actionPlan: {
    immediate: Array<{
      action: string
      impact: string
      effort: string
    }>
    shortTerm: string[]
    longTerm: string[]
  }
  optimizationStrategies: Array<{
    strategy: string
    potentialBenefit: string
    considerations: string
  }>
  countrySpecificInsights: {
    visaRequirements: string
    taxFriendlyJurisdictions: string[]
    pensionPortability: string
    socialSecurityAgreements: string
  }
  riskFactors: Array<{
    risk: string
    severity: string
    mitigation: string
  }>
}

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Switzerland',
  'Singapore',
  'Japan',
  'South Korea',
  'Spain',
  'Italy',
  'Portugal',
  'New Zealand',
  'Ireland',
  'UAE',
  'Hong Kong',
  'India',
  'Mexico',
  'Brazil',
  'Argentina',
  'Chile',
  'Thailand',
  'Malaysia',
  'Other',
]

const LIFESTYLES = ['Modest', 'Comfortable', 'Luxurious']
const HEALTHCARE_NEEDS = ['Low', 'Moderate', 'High']

export default function RetirementReadinessCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    currentAge: 35,
    targetRetirementAge: 65,
    currentCountry: 'United States',
    lifeExpectancy: 85,
    currentSavings: 50000,
    monthlyContributions: 500,
    personalContribution: 300,
    employerContribution: 200,
    annualReturn: 6,
    currentSalary: 75000,
    desiredLifestyle: 'Comfortable',
    retirementLocation: 'United States',
    healthcareCosts: 'Moderate',
    pensionYears: 10,
    expectedSocialSecurity: 1500,
  })
  const [result, setResult] = useState<RetirementAssessment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
      const response = await fetch('/api/retirement-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to calculate assessment')
        return
      }

      setResult(data.assessment)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: any) {
      setError(err.message || 'Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getCategoryColor = (category: string) => {
    if (category === 'On Track' || category === 'Ahead') return 'bg-green-100 text-green-800'
    if (category === 'Behind') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Global Retirement Readiness Index
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Evaluate your retirement preparedness across countries, pension systems, and savings
          goals. Get personalized insights and country comparisons.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Age *
                  </label>
                  <input
                    type="number"
                    value={formData.currentAge}
                    onChange={(e) => updateFormData('currentAge', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Retirement Age *
                  </label>
                  <input
                    type="number"
                    value={formData.targetRetirementAge}
                    onChange={(e) =>
                      updateFormData('targetRetirementAge', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Country *
                  </label>
                  <select
                    value={formData.currentCountry}
                    onChange={(e) => updateFormData('currentCountry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Life Expectancy
                  </label>
                  <input
                    type="number"
                    value={formData.lifeExpectancy}
                    onChange={(e) => updateFormData('lifeExpectancy', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years Until Retirement: {formData.targetRetirementAge - formData.currentAge} years
                </label>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, ((formData.currentAge - 25) / 40) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Situation</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Retirement Savings ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => updateFormData('currentSavings', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Annual Salary ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.currentSalary}
                    onChange={(e) => updateFormData('currentSalary', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={formData.personalContribution}
                    onChange={(e) =>
                      updateFormData('personalContribution', parseFloat(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={formData.employerContribution}
                    onChange={(e) =>
                      updateFormData('employerContribution', parseFloat(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Investment Return: {formData.annualReturn}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={formData.annualReturn}
                  onChange={(e) => updateFormData('annualReturn', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conservative (0%)</span>
                  <span>Moderate (6%)</span>
                  <span>Aggressive (15%)</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Total Monthly Contributions:</strong> $
                  {(formData.personalContribution + formData.employerContribution).toLocaleString()}
                </p>
                <p className="text-sm text-blue-900 mt-1">
                  <strong>Annual Savings Rate:</strong>{' '}
                  {(
                    (((formData.personalContribution + formData.employerContribution) * 12) /
                      formData.currentSalary) *
                    100
                  ).toFixed(1)}
                  % of salary
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Retirement Goals & Pension</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Lifestyle
                  </label>
                  <select
                    value={formData.desiredLifestyle}
                    onChange={(e) => updateFormData('desiredLifestyle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {LIFESTYLES.map((lifestyle) => (
                      <option key={lifestyle} value={lifestyle}>
                        {lifestyle}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retirement Location
                  </label>
                  <select
                    value={formData.retirementLocation}
                    onChange={(e) => updateFormData('retirementLocation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Healthcare Needs
                  </label>
                  <select
                    value={formData.healthcareCosts}
                    onChange={(e) => updateFormData('healthcareCosts', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {HEALTHCARE_NEEDS.map((need) => (
                      <option key={need} value={need}>
                        {need}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pension Years Contributed
                  </label>
                  <input
                    type="number"
                    value={formData.pensionYears}
                    onChange={(e) => updateFormData('pensionYears', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly Social Security/Pension ($)
                </label>
                <input
                  type="number"
                  value={formData.expectedSocialSecurity}
                  onChange={(e) =>
                    updateFormData('expectedSocialSecurity', parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Profile</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Details</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      Age: {formData.currentAge} → Retiring at {formData.targetRetirementAge}
                    </li>
                    <li>
                      Years to Retirement: {formData.targetRetirementAge - formData.currentAge}
                    </li>
                    <li>Life Expectancy: {formData.lifeExpectancy}</li>
                    <li>Current Country: {formData.currentCountry}</li>
                    <li>Retirement Location: {formData.retirementLocation}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Financial Summary</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Current Savings: ${formData.currentSavings.toLocaleString()}</li>
                    <li>Annual Salary: ${formData.currentSalary.toLocaleString()}</li>
                    <li>
                      Monthly Contributions: $
                      {(
                        formData.personalContribution + formData.employerContribution
                      ).toLocaleString()}
                    </li>
                    <li>Expected Return: {formData.annualReturn}%</li>
                    <li>
                      Expected Pension: ${formData.expectedSocialSecurity.toLocaleString()}/mo
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Retirement Goals</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Desired Lifestyle: {formData.desiredLifestyle}</li>
                  <li>Healthcare Needs: {formData.healthcareCosts}</li>
                  <li>Pension Years: {formData.pensionYears}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating...' : 'Calculate Readiness'}
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div ref={resultsRef} className="space-y-8">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Retirement Readiness Score
              </h2>
              <div className="relative inline-block">
                <svg className="w-48 h-48">
                  <circle cx="96" cy="96" r="88" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke={
                      result.overallScore >= 80
                        ? '#10b981'
                        : result.overallScore >= 60
                          ? '#f59e0b'
                          : '#ef4444'
                    }
                    strokeWidth="12"
                    strokeDasharray={`${(result.overallScore / 100) * 553} 553`}
                    transform="rotate(-90 96 96)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}
                    </div>
                    <div className="text-gray-600">out of 100</div>
                  </div>
                </div>
              </div>
              <div
                className={`inline-block mt-4 px-6 py-2 rounded-full font-bold ${getCategoryColor(result.scoreCategory)}`}
              >
                {result.scoreCategory}
              </div>
              <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">{result.summary}</p>
            </div>
          </div>

          {/* Category Scores */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
            <div className="space-y-6">
              {Object.entries(result.categoryScores).map(([key, category]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{category.label}</span>
                    <span className={`font-bold ${getScoreColor(category.percentage)}`}>
                      {category.score}/
                      {category.score === result.categoryScores.savingsAdequacy.score
                        ? 40
                        : category.score === result.categoryScores.pensionSocialSecurity.score
                          ? 25
                          : category.score === result.categoryScores.investmentStrategy.score
                            ? 15
                            : 10}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${category.percentage >= 80 ? 'bg-green-500' : category.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{category.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projected Wealth */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Projected Retirement Wealth</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total at Retirement</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${result.projectedWealth.totalAtRetirement.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Annual Income</p>
                <p className="text-2xl font-bold text-green-900">
                  ${result.projectedWealth.annualRetirementIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Replacement Rate</p>
                <p className="text-2xl font-bold text-purple-900">
                  {result.projectedWealth.replacementRate}%
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Funds Last Until</p>
                <p className="text-2xl font-bold text-orange-900">
                  Age {result.projectedWealth.fundsLastUntilAge}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Years in Retirement</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {result.projectedWealth.yearsOfRetirement} years
                </p>
              </div>
            </div>
          </div>

          {/* Gap Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gap Analysis</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Savings</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${result.gapAnalysis.currentSavings.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Target Needed</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${result.gapAnalysis.targetNeeded.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Shortfall</p>
                  <p className="text-xl font-bold text-red-900">
                    ${result.gapAnalysis.shortfall.toLocaleString()}
                  </p>
                </div>
              </div>
              {result.gapAnalysis.alternativeStrategies.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Alternative Strategies</h4>
                  <ul className="space-y-2">
                    {result.gapAnalysis.alternativeStrategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Country Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Country Comparison</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Country Rank</p>
                  <p className="text-3xl font-bold text-blue-900">
                    #{result.countryComparison.currentCountryRank}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Global Pension System Ranking</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Retirement Location Rank</p>
                  <p className="text-3xl font-bold text-green-900">
                    #{result.countryComparison.retirementLocationRank}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Global Pension System Ranking</p>
                </div>
              </div>

              {result.countryComparison.bestCountries.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Best Countries for Retirement
                  </h4>
                  <div className="space-y-3">
                    {result.countryComparison.bestCountries.map((country, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-gray-900">{country.country}</h5>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Score: {country.pensionScore}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {country.highlights.map((highlight, hidx) => (
                            <li key={hidx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tax Implications</h4>
                  <p className="text-sm text-gray-600">
                    {result.countryComparison.taxImplications}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Healthcare System</h4>
                  <p className="text-sm text-gray-600">
                    {result.countryComparison.healthcareSystem}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Action Plan</h3>
            <div className="space-y-6">
              {result.actionPlan.immediate.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2">
                      Immediate
                    </span>
                  </h4>
                  <div className="space-y-2">
                    {result.actionPlan.immediate.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <div className="flex gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded ${item.impact === 'high' ? 'bg-red-100 text-red-800' : item.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                          >
                            Impact: {item.impact}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${item.effort === 'easy' ? 'bg-green-100 text-green-800' : item.effort === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                          >
                            Effort: {item.effort}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.actionPlan.shortTerm.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2">
                      Short-Term (3-6 months)
                    </span>
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.shortTerm.map((action, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.actionPlan.longTerm.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
                      Long-Term (6-12 months)
                    </span>
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.longTerm.map((action, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Risk Factors */}
          {result.riskFactors.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Risk Factors</h3>
              <div className="space-y-4">
                {result.riskFactors.map((risk, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${risk.severity === 'high' ? 'bg-red-100 text-red-800' : risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {risk.severity} severity
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
            <p className="mb-6 text-blue-100">
              Get personalized retirement planning assistance from our experts
            </p>
            <Link
              href="/services/career-coaching"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
