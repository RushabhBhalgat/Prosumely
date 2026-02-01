/**
 * Cost of Living Calculator - Global Comparison Tool
 * Comprehensive cost comparison across locations
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const LOCATIONS = [
  // Countries
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Switzerland',
  'Singapore',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Japan',
  'South Korea',
  'China',
  'Hong Kong',
  'India',
  'Philippines',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Vietnam',
  'Mexico',
  'Brazil',
  'Argentina',
  'Spain',
  'Italy',
  'Portugal',
  'Ireland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Belgium',
  'Austria',
  'New Zealand',
  'Poland',
  'Czech Republic',
  'Greece',
  'Turkey',
  'Israel',
  'South Africa',
  'Egypt',
  'Kenya',
  'Nigeria',
  // Major US Cities
  'New York City, USA',
  'Los Angeles, USA',
  'Chicago, USA',
  'Houston, USA',
  'Phoenix, USA',
  'San Francisco, USA',
  'Seattle, USA',
  'Boston, USA',
  'Miami, USA',
  'Austin, USA',
  'Denver, USA',
  'San Diego, USA',
  'Portland, USA',
  'Atlanta, USA',
  'Dallas, USA',
  'Washington DC, USA',
  // Major Global Cities
  'London, UK',
  'Paris, France',
  'Berlin, Germany',
  'Munich, Germany',
  'Amsterdam, Netherlands',
  'Zurich, Switzerland',
  'Geneva, Switzerland',
  'Tokyo, Japan',
  'Seoul, South Korea',
  'Beijing, China',
  'Shanghai, China',
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Sydney, Australia',
  'Melbourne, Australia',
  'Toronto, Canada',
  'Vancouver, Canada',
  'Montreal, Canada',
  'Singapore',
  'Bangkok, Thailand',
  'Kuala Lumpur, Malaysia',
  'Manila, Philippines',
  'Mumbai, India',
  'Bangalore, India',
  'Delhi, India',
  'Other',
]

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
              <select
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select current location</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
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
                  <select
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select target location {index + 1}</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
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

        {/* City Comparisons Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Popular Career Hub Comparisons
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            Here are typical monthly living costs for popular cities where remote workers, expats,
            and career professionals relocate. Use these as benchmarks when planning your move.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: 'New York City, USA',
                rent: '$3,500-$5,000',
                total: '$5,500-$7,500',
                flag: '🇺🇸',
              },
              { city: 'London, UK', rent: '£2,200-£3,500', total: '£3,800-£5,500', flag: '🇬🇧' },
              { city: 'Singapore', rent: 'S$3,000-S$4,500', total: 'S$4,800-S$6,500', flag: '🇸🇬' },
              {
                city: 'Berlin, Germany',
                rent: '€1,200-€2,000',
                total: '€2,500-€3,800',
                flag: '🇩🇪',
              },
              {
                city: 'Dubai, UAE',
                rent: 'AED 6,000-9,000',
                total: 'AED 10,000-14,000',
                flag: '🇦🇪',
              },
              {
                city: 'Mumbai, India',
                rent: '₹40,000-₹70,000',
                total: '₹70,000-₹1,20,000',
                flag: '🇮🇳',
              },
              {
                city: 'Bangalore, India',
                rent: '₹30,000-₹60,000',
                total: '₹60,000-₹1,00,000',
                flag: '🇮🇳',
              },
              {
                city: 'Toronto, Canada',
                rent: 'C$2,000-C$3,200',
                total: 'C$3,500-C$5,000',
                flag: '🇨🇦',
              },
              {
                city: 'Tokyo, Japan',
                rent: '¥150,000-¥250,000',
                total: '¥280,000-¥420,000',
                flag: '🇯🇵',
              },
            ].map((city, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{city.flag}</span>
                  <h3 className="text-lg font-bold text-gray-900">{city.city}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rent (1-2BR):</span>
                    <span className="font-semibold text-gray-900">{city.rent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Monthly:</span>
                    <span className="font-bold text-blue-600">{city.total}</span>
                  </div>
                </div>
              </div>
            ))}
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
                What is a cost of living calculator?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A cost of living calculator is a tool that compares the expenses of living in
                different cities, states, or countries. It analyzes housing, transportation, food,
                healthcare, taxes, and lifestyle costs to help you understand how much money you
                need to maintain your current standard of living in a new location. Our calculator
                provides detailed breakdowns and equivalent salary recommendations for relocations.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I compare living costs between cities?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To compare living costs: (1) Choose your current city and target cities, (2) Enter
                your household size and lifestyle preferences, (3) Our tool analyzes housing,
                transportation, food, healthcare, taxes, and other expenses, (4) Review the cost
                breakdowns and equivalent salary requirements for each city. Key tip: Don&apos;t
                just compare gross salaries—factor in taxes, healthcare costs, and purchasing power.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What affects cost of living the most?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The biggest factors are: (1) Housing costs (rent/mortgage can be 30-50% of
                expenses), (2) Healthcare and insurance (varies dramatically between countries), (3)
                Taxes (income, sales, property taxes), (4) Transportation (car ownership vs. public
                transit), and (5) Geographic location (urban vs. suburban, coastal vs. inland). In
                expensive cities like NYC or London, housing alone can be 2-3x higher than mid-sized
                cities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How much salary increase do I need when relocating?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                It depends on the cost difference. Moving from a low-cost city (e.g., Austin) to a
                high-cost city (e.g., San Francisco) may require a 40-60% salary increase to
                maintain the same standard of living. Moving internationally adds complexity—factor
                in currency exchange, tax treaties, healthcare systems, and visa costs. Use our
                calculator to get personalized salary equivalent recommendations based on your
                lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Links Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            More Career & Relocation Planning Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-tools/global-opportunity-heatmap"
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Global Opportunity Heatmap
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Discover high-demand job markets and emerging career hotspots worldwide.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-tools/freelance-rate-calculator"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Freelance Rate Calculator
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Adjust your freelance rates based on local living costs and purchasing power.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-tools/lifetime-earning-calculator"
              className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Lifetime Earning Calculator
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Project how relocation affects your total career earnings and retirement
                    savings.
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
                Moving to a new city or country? Optimize your resume for local job markets—free
                expert feedback.
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
              <h3 className="text-2xl font-bold mb-3">International Career Move?</h3>
              <p className="text-lg mb-6 text-white/90">
                Get a professionally crafted resume optimized for international job markets and
                global opportunities.
              </p>
              <Link
                href="/executive-resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ea580c' }}>Get Professional Help</span>
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
