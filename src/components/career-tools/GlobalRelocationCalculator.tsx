/**
 * Global Relocation Affordability Calculator
 * Comprehensive international move cost analysis
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FormData {
  fromCountry: string
  fromCity: string
  toCountry: string
  toCity: string
  householdSize: number
  moveTimeline: string
  duration: string
  currentSavings: number
  currentSalary: number
  newSalaryOffer: number
  debtObligations: number
  housingSize: string
  belongingsVolume: string
  pets: string
  shippingVehicle: boolean
}

interface AssessmentResult {
  oneTimeCosts: any
  ongoingMonthlyCosts: any
  affordabilityScore: any
  savingsImpact: any
  breakEvenAnalysis: any
  riskAssessment: any
  recommendation: any
  hiddenCosts: any[]
  financialTimeline: any
  taxImplications: any
}

export default function GlobalRelocationCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fromCountry: '',
    fromCity: '',
    toCountry: '',
    toCity: '',
    householdSize: 1,
    moveTimeline: '',
    duration: 'Permanent',
    currentSavings: 0,
    currentSalary: 0,
    newSalaryOffer: 0,
    debtObligations: 0,
    housingSize: '2',
    belongingsVolume: 'Standard household items',
    pets: 'None',
    shippingVehicle: false,
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 3

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/global-relocation-affordability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to calculate affordability')
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
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
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">
            Global Relocation Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate the true cost of international relocation and determine if your move is
            financially feasible.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-full px-5 py-2.5 w-fit mx-auto">
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
            <span className="text-gray-600">4 minutes</span>
          </div>
        </div>

        {!result ? (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-medium text-teal-600">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Move Details</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">From Country</label>
                      <input
                        type="text"
                        value={formData.fromCountry}
                        onChange={(e) => setFormData({ ...formData, fromCountry: e.target.value })}
                        placeholder="e.g., United States"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        From City (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.fromCity}
                        onChange={(e) => setFormData({ ...formData, fromCity: e.target.value })}
                        placeholder="e.g., New York"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">To Country *</label>
                      <input
                        type="text"
                        value={formData.toCountry}
                        onChange={(e) => setFormData({ ...formData, toCountry: e.target.value })}
                        placeholder="e.g., Germany"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">To City *</label>
                      <input
                        type="text"
                        value={formData.toCity}
                        onChange={(e) => setFormData({ ...formData, toCity: e.target.value })}
                        placeholder="e.g., Berlin"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Household Size *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.householdSize}
                        onChange={(e) =>
                          setFormData({ ...formData, householdSize: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Move Timeline</label>
                      <input
                        type="text"
                        value={formData.moveTimeline}
                        onChange={(e) => setFormData({ ...formData, moveTimeline: e.target.value })}
                        placeholder="e.g., 3 months"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option>Permanent</option>
                        <option>1 year</option>
                        <option>2-5 years</option>
                        <option>Temporary assignment</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Situation</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Current Savings ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.currentSavings}
                        onChange={(e) =>
                          setFormData({ ...formData, currentSavings: parseFloat(e.target.value) })
                        }
                        placeholder="50000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Current Salary ($/year)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.currentSalary}
                        onChange={(e) =>
                          setFormData({ ...formData, currentSalary: parseFloat(e.target.value) })
                        }
                        placeholder="80000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        New Salary Offer ($/year)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.newSalaryOffer}
                        onChange={(e) =>
                          setFormData({ ...formData, newSalaryOffer: parseFloat(e.target.value) })
                        }
                        placeholder="75000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Monthly Debt ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.debtObligations}
                        onChange={(e) =>
                          setFormData({ ...formData, debtObligations: parseFloat(e.target.value) })
                        }
                        placeholder="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Relocation Needs</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Housing Size (Bedrooms)
                      </label>
                      <input
                        type="text"
                        value={formData.housingSize}
                        onChange={(e) => setFormData({ ...formData, housingSize: e.target.value })}
                        placeholder="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Belongings Volume
                      </label>
                      <select
                        value={formData.belongingsVolume}
                        onChange={(e) =>
                          setFormData({ ...formData, belongingsVolume: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option>Minimal (suitcases only)</option>
                        <option>Standard household items</option>
                        <option>Full household (furniture included)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Pets</label>
                      <input
                        type="text"
                        value={formData.pets}
                        onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                        placeholder="e.g., 1 dog, 2 cats"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Shipping Vehicle?
                      </label>
                      <div className="flex items-center space-x-4 pt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.shippingVehicle}
                            onChange={() => setFormData({ ...formData, shippingVehicle: true })}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={!formData.shippingVehicle}
                            onChange={() => setFormData({ ...formData, shippingVehicle: false })}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.toCountry || !formData.toCity}
                    className="px-8 py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Calculating...' : 'Calculate Affordability'}
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
            {/* Affordability Score */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Affordability Score</h2>
              <div
                className={`text-7xl font-bold ${getScoreColor(result.affordabilityScore.score)} mb-2`}
              >
                {result.affordabilityScore.score}
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-4">
                {result.affordabilityScore.category}
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {result.affordabilityScore.reasoning}
              </p>
            </div>

            {/* One-Time Costs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">One-Time Relocation Costs</h3>
              <div className="space-y-4">
                {result.oneTimeCosts &&
                  Object.entries(result.oneTimeCosts).map(([key, value]: [string, any]) => {
                    if (key === 'grandTotal') return null
                    return (
                      <div key={key} className="border-l-4 border-teal-500 pl-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-xl font-bold text-teal-600">
                            {formatCurrency(value.total || 0)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{value.breakdown}</p>
                      </div>
                    )
                  })}
                <div className="border-t-2 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total One-Time Cost</span>
                    <span className="text-3xl font-bold text-teal-600">
                      {formatCurrency(result.oneTimeCosts?.grandTotal || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Costs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Monthly Living Costs</h3>
              <div className="space-y-4">
                {result.ongoingMonthlyCosts &&
                  Object.entries(result.ongoingMonthlyCosts).map(([key, value]: [string, any]) => {
                    if (['monthlyTotal', 'annualTotal', 'comparison'].includes(key)) return null
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium text-gray-900 capitalize">{key}</span>
                          <p className="text-sm text-gray-600">{value.details}</p>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(value.amount || 0)}
                        </span>
                      </div>
                    )
                  })}
                <div className="border-t-2 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">Monthly Total</span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatCurrency(result.ongoingMonthlyCosts?.monthlyTotal || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Annual Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(result.ongoingMonthlyCosts?.annualTotal || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recommendation</h3>
              <div className="space-y-4">
                <div className="text-xl font-semibold text-teal-700">
                  {result.recommendation?.action}
                </div>
                <p className="text-gray-700">{result.recommendation?.reasoning}</p>
                {result.recommendation?.additionalSavingsNeeded > 0 && (
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-medium text-gray-900">Additional Savings Needed:</p>
                    <p className="text-2xl font-bold text-teal-600">
                      {formatCurrency(result.recommendation.additionalSavingsNeeded)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden Costs */}
            {result.hiddenCosts && result.hiddenCosts.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hidden Costs to Consider</h3>
                <div className="space-y-3">
                  {result.hiddenCosts.map((cost: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-start p-3 bg-white rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{cost.category}</div>
                        <p className="text-sm text-gray-600">{cost.description}</p>
                      </div>
                      <span className="text-lg font-bold text-yellow-600 ml-4">
                        {formatCurrency(cost.estimatedCost || 0)}
                      </span>
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
                Calculate Another Move
              </button>
              <Link
                href="/career-tools"
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all text-center"
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
