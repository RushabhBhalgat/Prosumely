/**
 * Lifetime Earning Potential Calculator
 * Project total career earnings with scenario modeling
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  currentAge: number
  currentSalary: number
  currentRole: string
  industry: string
  yearsExperience: number
  retirementAge: number
  annualRaise: number
  promotionFrequency: number
  careerBreaks: number
  educationPlans: string
  geographicMove: string
}

interface YearlyProjection {
  age: number
  salary: number
  cumulative: number
}

interface AssessmentResult {
  lifetimeEarnings: {
    gross: number
    afterTax: number
    byDecade: Record<string, number>
  }

  yearByYear: YearlyProjection[]

  scenarios: {
    conservative: { total: number; description: string }
    moderate: { total: number; description: string }
    optimistic: { total: number; description: string }
  }

  milestones: Array<{
    age: number
    achievement: string
    cumulativeEarnings: number
  }>

  decisionImpacts: {
    fivePercentRaise: string
    promotionImpact: string
    careerBreakCost: string
    educationROI: string
  }

  wealthBuilding: {
    savingsProjection: string
    netWorthTrajectory: string
    retirementReadiness: string
  }

  keyInsights: {
    peakEarningYears: string
    totalByAge40: number
    totalByAge50: number
    totalByAge60: number
    biggestDecisions: string[]
  }
}

const LifetimeEarningCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    currentAge: 30,
    currentSalary: 75000,
    currentRole: '',
    industry: '',
    yearsExperience: 5,
    retirementAge: 65,
    annualRaise: 3,
    promotionFrequency: 3,
    careerBreaks: 0,
    educationPlans: '',
    geographicMove: '',
  })

  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.currentRole || !formData.industry) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/lifetime-earning-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
          throw new Error(errorData.message || 'Rate limit exceeded. Please try again later.')
        }
        throw new Error(errorData.message || 'Failed to calculate projection')
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
    setResult(null)
    setError('')
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Consulting',
    'Manufacturing',
    'Retail',
    'Government',
    'Other',
  ]

  const educationOptions = [
    'None Planned',
    'Professional Certification',
    'Masters Degree',
    'MBA',
    'PhD/Doctorate',
  ]

  const locationOptions = [
    'No Move Planned',
    'Higher Cost Area',
    'Lower Cost Area',
    'International Move',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Financial Planning Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lifetime Earning Potential Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Project your total career earnings from now to retirement. Model different scenarios to
            understand how career decisions impact lifetime wealth.
          </p>
        </div>

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
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {!result && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Your Career Profile
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Age: {formData.currentAge}
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={formData.currentAge}
                    onChange={(e) => updateFormData('currentAge', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>18</span>
                    <span>44</span>
                    <span>70</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Retirement Age: {formData.retirementAge}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="75"
                    value={formData.retirementAge}
                    onChange={(e) => updateFormData('retirementAge', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50</span>
                    <span>62</span>
                    <span>75</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Annual Salary: {formatCurrency(formData.currentSalary)}
                </label>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={formData.currentSalary}
                  onChange={(e) => updateFormData('currentSalary', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$20K</span>
                  <span>$260K</span>
                  <span>$500K</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Role
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => updateFormData('currentRole', e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Expected Annual Raise: {formData.annualRaise}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={formData.annualRaise}
                  onChange={(e) => updateFormData('annualRaise', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>7.5%</span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Promotion Every {formData.promotionFrequency} Years
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.promotionFrequency}
                  onChange={(e) => updateFormData('promotionFrequency', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>5 years</span>
                  <span>10 years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Planned Career Breaks (months): {formData.careerBreaks}
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={formData.careerBreaks}
                  onChange={(e) => updateFormData('careerBreaks', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>12</span>
                  <span>24</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Education Plans
                </label>
                <select
                  value={formData.educationPlans}
                  onChange={(e) => updateFormData('educationPlans', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Education Plans</option>
                  {educationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Geographic Move
                </label>
                <select
                  value={formData.geographicMove}
                  onChange={(e) => updateFormData('geographicMove', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Move Plans</option>
                  {locationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.currentRole || !formData.industry}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  loading || !formData.currentRole || !formData.industry
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg'
                }`}
              >
                {loading ? 'Calculating...' : 'Calculate Lifetime Earnings'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Total Lifetime Earnings */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Total Lifetime Earnings</h2>
                <div className="text-6xl font-bold mb-2">
                  {formatCurrency(result.lifetimeEarnings.gross)}
                </div>
                <p className="text-lg opacity-90">Gross Career Income</p>
                <p className="text-xl mt-4">
                  After Tax:{' '}
                  <span className="font-bold">
                    {formatCurrency(result.lifetimeEarnings.afterTax)}
                  </span>
                </p>
              </div>
            </div>

            {/* Scenarios Comparison */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Scenario Comparison</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="font-bold text-orange-700 mb-2">Conservative</h4>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(result.scenarios.conservative.total)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {result.scenarios.conservative.description}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-bold text-blue-700 mb-2">Moderate</h4>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(result.scenarios.moderate.total)}
                  </div>
                  <p className="text-sm text-gray-600">{result.scenarios.moderate.description}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-bold text-green-700 mb-2">Optimistic</h4>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(result.scenarios.optimistic.total)}
                  </div>
                  <p className="text-sm text-gray-600">{result.scenarios.optimistic.description}</p>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Career Milestones</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">By Age 40:</span>{' '}
                      <span className="text-green-600 font-bold">
                        {formatCurrency(result.keyInsights.totalByAge40)}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">By Age 50:</span>{' '}
                      <span className="text-green-600 font-bold">
                        {formatCurrency(result.keyInsights.totalByAge50)}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">By Age 60:</span>{' '}
                      <span className="text-green-600 font-bold">
                        {formatCurrency(result.keyInsights.totalByAge60)}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Peak Earning Years</h4>
                  <p className="text-sm text-gray-600">{result.keyInsights.peakEarningYears}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">Biggest Decision Impacts</h4>
                <ul className="space-y-2">
                  {result.keyInsights.biggestDecisions.map((decision, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Decision Impacts */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Decision Impact Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">5% Raise Impact</h4>
                  <p className="text-sm text-gray-700">{result.decisionImpacts.fivePercentRaise}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">Promotion Value</h4>
                  <p className="text-sm text-gray-700">{result.decisionImpacts.promotionImpact}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">Career Break Cost</h4>
                  <p className="text-sm text-gray-700">{result.decisionImpacts.careerBreakCost}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">Education ROI</h4>
                  <p className="text-sm text-gray-700">{result.decisionImpacts.educationROI}</p>
                </div>
              </div>
            </div>

            {/* Wealth Building */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Wealth Building Projection</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Savings Potential</h4>
                  <p className="text-sm text-gray-600">{result.wealthBuilding.savingsProjection}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Net Worth Trajectory</h4>
                  <p className="text-sm text-gray-600">
                    {result.wealthBuilding.netWorthTrajectory}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Retirement Readiness</h4>
                  <p className="text-sm text-gray-600">
                    {result.wealthBuilding.retirementReadiness}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center pt-6">
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Calculate Again
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            About Lifetime Earning Potential Calculator
          </h2>
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-700 mb-4">
              The Lifetime Earning Potential Calculator projects your total career earnings from
              current age to retirement based on your role, industry, education, and growth
              assumptions. Model different scenarios to understand how career decisions impact
              lifetime wealth.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Related Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/career-tools/salary-analyzer"
                className="block p-4 bg-green-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-green-700 mb-1">Salary Analyzer</h4>
                <p className="text-sm text-gray-600">
                  Get data-driven salary expectations by industry
                </p>
              </Link>
              <Link
                href="/career-tools/career-strength-index"
                className="block p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-blue-700 mb-1">Career Strength Index</h4>
                <p className="text-sm text-gray-600">
                  Comprehensive assessment of your career health
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifetimeEarningCalculator
