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

        {/* Educational Content Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <svg
              className="w-8 h-8 text-purple-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Understanding Your Lifetime Earning Potential
          </h2>

          <div className="prose max-w-none space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Your lifetime earning potential is the total amount of money you will earn throughout
              your entire career—from your first paycheck to retirement. This number is influenced
              by factors like your industry, role, education level, promotion frequency, career
              breaks, geographic location, and how aggressively you negotiate raises or pursue new
              opportunities.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What Affects Lifetime Earnings?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-purple-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">📈</span>
                    Promotions & Career Growth
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Promotions dramatically increase lifetime earnings. Moving from entry-level to
                    mid-management can add $500K-$1M+ to lifetime income. Each promotion typically
                    brings 10-20% salary increases, compounded over decades.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">💰</span>
                    Annual Raises Matter More Than You Think
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    A 3% annual raise vs. 5% might seem small, but over 30 years, that 2% difference
                    can add $300K-$500K to your lifetime earnings. Consistent raises compound
                    powerfully over time.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🔄</span>
                    Career Changes & Industry Shifts
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Switching careers can increase lifetime earnings if moving to higher-paying
                    industries (e.g., finance, tech, healthcare). However, career breaks or lateral
                    moves may temporarily reduce income trajectory.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🎓</span>
                    Education & Certifications
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Advanced degrees (MBA, JD, MD) can add $1M-$3M to lifetime earnings.
                    Professional certifications (PMP, CFA, CPA) boost earning potential by 10-30% in
                    specialized fields.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-amber-900">💡 Key Insight:</strong> Most people earn 80% of
                their lifetime income between ages 35-60. Maximizing income during peak earning
                years through strategic promotions, negotiations, and upskilling has outsized impact
                on lifetime wealth.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What factors affect lifetime earnings the most?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The biggest factors are: (1) Industry choice (tech, finance, healthcare pay
                significantly more than retail, hospitality), (2) Promotion frequency (every 3-5
                years vs. staying stagnant), (3) Annual raises (3% vs. 5-7% makes a huge difference
                over decades), (4) Career breaks (extended unemployment reduces cumulative
                earnings), and (5) Geographic location (coastal cities pay 30-50% more than rural
                areas for the same roles).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do promotions change career earnings over a lifetime?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Promotions are the fastest way to increase lifetime earnings. Each promotion
                typically brings a 10-20% salary increase. If you get promoted every 3-4 years (vs.
                every 6-7 years), you could earn an additional $500K-$1M+ over your career.
                Senior-level promotions (Director, VP, C-Suite) can add $2M-$5M to lifetime income.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Does changing careers increase lifetime earnings?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                It depends. Switching to higher-paying industries (e.g., from education to tech) can
                increase lifetime earnings by $500K-$1M+. However, career changes often come with
                temporary salary resets (10-20% lower starting pay). The key is ensuring your new
                career has higher long-term growth potential and faster salary progression.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How accurate is a lifetime earning calculator?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Lifetime earning calculators provide estimates, not guarantees. Accuracy depends on
                assumptions about salary growth, promotions, and career trajectory. Our tool uses AI
                analysis of industry benchmarks, but real-world earnings vary based on performance,
                economic conditions, negotiation skills, and opportunities pursued.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What is the average lifetime earning potential in the US?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The average US worker earns approximately $1.7-$2.5M over their lifetime (pre-tax).
                However, this varies dramatically by education: high school graduates average $1.3M,
                bachelor&apos;s degree holders average $2.3M, and master&apos;s degree holders
                average $2.7M. Professionals in high-earning fields (doctors, lawyers, engineers,
                finance) can earn $5M-$10M+ over their careers.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Links Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Maximize Your Career Earnings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/career-tools/career-roadmap-builder"
              className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Career Roadmap Builder
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Create a strategic plan to reach higher-paying roles and maximize your earning
                    potential over time.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-tools/skill-gap-analyzer"
              className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Skill Gap Analyzer
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Identify skills you need to acquire for promotions and higher-paying roles that
                    boost lifetime earnings.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
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
                Maximize your earning potential with a resume that showcases your value. Get expert
                feedback—free.
              </p>
              <Link
                href="/resume-review"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ color: '#ffffff' }}
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

          {/* Executive CV CTA */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white">
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
              <h3 className="text-2xl font-bold mb-3">Accelerate Your Career Growth</h3>
              <p className="text-lg mb-6 text-white/90">
                Position yourself for promotions and higher-paying roles with a professionally
                crafted executive resume.
              </p>
              <Link
                href="/executive-resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ea580c' }}>Get Executive Resume</span>
                <svg
                  className="w-5 h-5 ml-2"
                  style={{ color: '#ea580c' }}
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
    </div>
  )
}

export default LifetimeEarningCalculator
