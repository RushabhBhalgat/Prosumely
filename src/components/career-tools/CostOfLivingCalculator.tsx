/**
 * Cost of Living Calculator - Global Comparison Tool
 * Comprehensive cost comparison across locations
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface LocationCost {
  location: string
  housing: {
    rent: number
    utilities: number
    insurance: number
    maintenance: number
    total: number
  }
  transportation: { publicTransit: number; carExpenses: number; gasParking: number; total: number }
  foodGroceries: { groceries: number; diningOut: number; total: number }
  healthcare: { insurance: number; outOfPocket: number; total: number }
  taxes: { incomeTax: string; salesTax: string; propertyTax: number }
  lifestyle: { gymEntertainment: number; subscriptions: number; hobbies: number; total: number }
  education: { childcare: number; schoolFees: number; total: number }
  totalMonthly: number
  totalAnnual: number
  costIndex: number
}

interface CostAnalysis {
  locations: LocationCost[]
  comparison: {
    baseLocation: string
    biggestDifferences: Array<{ category: string; difference: string }>
    equivalentSalaries: Array<{ location: string; salaryNeeded: number; explanation: string }>
  }
  purchasingPower: {
    insights: string[]
    hiddenCosts: string[]
    qualityOfLifeFactors: string[]
  }
  recommendations: {
    bestValueLocation: string
    reasonsToConsider: string[]
    potentialChallenges: string[]
  }
}

export default function CostOfLivingCalculator() {
  const [formData, setFormData] = useState({
    currentLocation: '',
    targetLocations: [''],
    householdSize: '',
    lifestyleLevel: 'Moderate',
    housingType: '2BR',
    locationPreference: 'City center',
    carOwnership: 'No',
  })
  const [analysis, setAnalysis] = useState<CostAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleAddLocation = () => {
    if (formData.targetLocations.length < 3) {
      setFormData({ ...formData, targetLocations: [...formData.targetLocations, ''] })
    }
  }

  const handleRemoveLocation = (index: number) => {
    const newLocations = formData.targetLocations.filter((_, i) => i !== index)
    setFormData({ ...formData, targetLocations: newLocations.length ? newLocations : [''] })
  }

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...formData.targetLocations]
    newLocations[index] = value
    setFormData({ ...formData, targetLocations: newLocations })
  }

  const handleCalculate = async () => {
    const validTargetLocations = formData.targetLocations.filter((loc) => loc.trim())

    if (!formData.currentLocation || !validTargetLocations.length || !formData.householdSize) {
      setError('Please fill in current location, at least one target location, and household size')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/cost-of-living-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, targetLocations: validTargetLocations }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError(
            data.message ||
              'Rate limit reached. Please try again in a few minutes. Free tier: 15 requests/minute.',
          )
        } else {
          setError(data.message || 'Failed to calculate costs')
        }
        return
      }

      setAnalysis(data.analysis)
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

  const getCostIndexColor = (index: number) => {
    if (index < 80) return 'text-green-600'
    if (index < 100) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Global Cost of Living Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare living expenses across countries, states, and cities. Make informed decisions
            for relocation or remote work with detailed cost breakdowns.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Compare Locations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                placeholder="e.g., New York, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Household Size <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.householdSize}
                onChange={(e) => setFormData({ ...formData, householdSize: e.target.value })}
                placeholder="Number of people"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Locations <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {formData.targetLocations.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    placeholder={`Target location ${index + 1}`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {formData.targetLocations.length > 1 && (
                    <button
                      onClick={() => handleRemoveLocation(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {formData.targetLocations.length < 3 && (
                <button
                  onClick={handleAddLocation}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Add Another Location
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lifestyle Level
              </label>
              <select
                value={formData.lifestyleLevel}
                onChange={(e) => setFormData({ ...formData, lifestyleLevel: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>Modest</option>
                <option>Moderate</option>
                <option>Comfortable</option>
                <option>Luxurious</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Housing Type</label>
              <select
                value={formData.housingType}
                onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>Studio</option>
                <option>1BR</option>
                <option>2BR</option>
                <option>3BR</option>
                <option>House</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location Preference
              </label>
              <select
                value={formData.locationPreference}
                onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>City center</option>
                <option>Suburbs</option>
                <option>Rural</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Car Ownership</label>
            <select
              value={formData.carOwnership}
              onChange={(e) => setFormData({ ...formData, carOwnership: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option>No</option>
              <option>Yes - 1 vehicle</option>
              <option>Yes - 2 vehicles</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Calculating Costs...' : 'Compare Cost of Living'}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in">
            {/* Location Comparison Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysis.locations.map((location, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-xl p-6 ${idx === 0 ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{location.location}</h3>
                    {idx === 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Base
                      </span>
                    )}
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {formatCurrency(location.totalMonthly)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(location.totalAnnual)}/year
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-1">Cost Index</p>
                    <p className={`text-2xl font-bold ${getCostIndexColor(location.costIndex)}`}>
                      {location.costIndex}
                    </p>
                    <p className="text-xs text-gray-500">(Base = 100)</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Housing</span>
                      <span className="font-semibold">
                        {formatCurrency(location.housing.total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportation</span>
                      <span className="font-semibold">
                        {formatCurrency(location.transportation.total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Food & Groceries</span>
                      <span className="font-semibold">
                        {formatCurrency(location.foodGroceries.total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Healthcare</span>
                      <span className="font-semibold">
                        {formatCurrency(location.healthcare.total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifestyle</span>
                      <span className="font-semibold">
                        {formatCurrency(location.lifestyle.total)}
                      </span>
                    </div>
                    {location.education.total > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Education</span>
                        <span className="font-semibold">
                          {formatCurrency(location.education.total)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Biggest Differences */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Biggest Cost Differences</h2>
              <div className="space-y-3">
                {analysis.comparison.biggestDifferences.map((diff, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="font-semibold text-gray-800">{diff.category}</span>
                    <span className="text-blue-600 font-bold">{diff.difference}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equivalent Salaries */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Equivalent Salary Needed</h2>
              <div className="space-y-4">
                {analysis.comparison.equivalentSalaries.map((sal, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{sal.location}</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(sal.salaryNeeded)}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm">{sal.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights & Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Insights & Recommendations</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Key Insights</h3>
                  <ul className="space-y-2">
                    {analysis.purchasingPower.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-600 mb-3">
                    Hidden Costs to Consider
                  </h3>
                  <ul className="space-y-2">
                    {analysis.purchasingPower.hiddenCosts.map((cost, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-6 bg-green-50 rounded-xl">
                <h3 className="text-lg font-bold text-green-600 mb-3">
                  Best Value: {analysis.recommendations.bestValueLocation}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Reasons to Consider</h4>
                    <ul className="space-y-1">
                      {analysis.recommendations.reasonsToConsider.map((reason, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">
                          • {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Potential Challenges</h4>
                    <ul className="space-y-1">
                      {analysis.recommendations.potentialChallenges.map((challenge, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">
                          • {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Planning an International Move?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our career services can help you optimize your resume for international job markets
                and maximize your relocation opportunities.
              </p>
              <Link
                href="/services"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Career Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
