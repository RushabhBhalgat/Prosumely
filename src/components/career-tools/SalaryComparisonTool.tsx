/**
 * Salary Comparison Tool
 * Multi-scenario salary comparison with cost of living, taxes, and savings analysis
 */

'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Type definitions
interface Scenario {
  id: number
  location: string
  jobTitle: string
  experienceYears: number
  industry: string
  companySize: string
  workArrangement: string
  baseSalary: number
  bonuses: number
  equity: number
  benefits: number
}

interface TaxBreakdown {
  federal: number
  state: number
  local: number
  totalTaxRate: number
}

interface LivingCosts {
  housing: number
  transportation: number
  food: number
  healthcare: number
  utilities: number
  entertainment: number
  total: number
}

interface ScenarioResult {
  scenarioId: number
  location: string
  rawSalary: number
  costOfLivingIndex: number
  adjustedSalary: number
  taxBreakdown: TaxBreakdown
  netTakeHome: number
  totalCompensation: number
  livingCosts: LivingCosts
  savingsPotential: number
  qualityOfLifeScore: number
}

interface Comparison {
  bestRawSalary: number
  bestPurchasingPower: number
  lowestTaxBurden: number
  highestTotalComp: number
  bestSavingsPotential: number
  bestQualityOfLife: number
}

interface Insight {
  type: 'key_difference' | 'hidden_cost' | 'opportunity' | 'risk'
  message: string
  affectsScenarios: number[]
}

interface Recommendation {
  scenario: number
  recommendation: string
  reasoning: string
}

interface ComparisonAnalysis {
  scenarios: ScenarioResult[]
  comparison: Comparison
  insights: Insight[]
  recommendations: Recommendation[]
}

interface ApiResponse {
  analysis: ComparisonAnalysis
  processingTime: number
  success: boolean
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

// Constants
const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Government',
  'Non-profit',
  'Other',
]

const COMPANY_SIZES = [
  'Startup (1-50)',
  'Small (51-200)',
  'Medium (201-1000)',
  'Large (1001-5000)',
  'Enterprise (5000+)',
]

const WORK_ARRANGEMENTS = ['Remote', 'Hybrid (2-3 days)', 'Hybrid (4 days)', 'On-site']

const POPULAR_LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Austin, TX',
  'London, UK',
  'Berlin, Germany',
  'Toronto, Canada',
  'Singapore',
  'Sydney, Australia',
  'Amsterdam, Netherlands',
]

export default function SalaryComparisonTool() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 1,
      location: '',
      jobTitle: '',
      experienceYears: 5,
      industry: '',
      companySize: '',
      workArrangement: '',
      baseSalary: 0,
      bonuses: 0,
      equity: 0,
      benefits: 0,
    },
    {
      id: 2,
      location: '',
      jobTitle: '',
      experienceYears: 5,
      industry: '',
      companySize: '',
      workArrangement: '',
      baseSalary: 0,
      bonuses: 0,
      equity: 0,
      benefits: 0,
    },
  ])

  const [result, setResult] = useState<ComparisonAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [activeScenarioTab, setActiveScenarioTab] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Add new scenario
  const addScenario = () => {
    if (scenarios.length < 5) {
      setScenarios([
        ...scenarios,
        {
          id: scenarios.length + 1,
          location: '',
          jobTitle: '',
          experienceYears: 5,
          industry: '',
          companySize: '',
          workArrangement: '',
          baseSalary: 0,
          bonuses: 0,
          equity: 0,
          benefits: 0,
        },
      ])
      setActiveScenarioTab(scenarios.length)
    }
  }

  // Remove scenario
  const removeScenario = (id: number) => {
    if (scenarios.length > 2) {
      setScenarios(scenarios.filter((s) => s.id !== id))
      if (activeScenarioTab >= scenarios.length - 1) {
        setActiveScenarioTab(scenarios.length - 2)
      }
    }
  }

  // Update scenario
  const updateScenario = (id: number, field: keyof Scenario, value: any) => {
    setScenarios(scenarios.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  // Validate form
  const validateForm = (): string | null => {
    for (const scenario of scenarios) {
      if (!scenario.location.trim()) return 'Please enter a location for all scenarios'
      if (!scenario.jobTitle.trim()) return 'Please enter a job title for all scenarios'
      if (scenario.experienceYears < 0) return 'Experience years must be 0 or greater'
      if (!scenario.industry) return 'Please select an industry for all scenarios'
      if (!scenario.companySize) return 'Please select a company size for all scenarios'
      if (!scenario.workArrangement) return 'Please select a work arrangement for all scenarios'
      if (scenario.baseSalary <= 0) return 'Base salary must be greater than 0'
    }
    return null
  }

  // Submit comparison
  const handleCompare = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setResult(null)

    try {
      const response = await fetch('/api/salary-comparison', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenarios }),
      })

      const data: ApiResponse | ApiError = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError

        if (response.status === 429 || errorData.error === 'RATE_LIMIT_EXCEEDED') {
          setRateLimitState({
            isRateLimited: true,
            retryAfter: errorData.retryAfter,
            resetTime: response.headers.get('X-RateLimit-Reset') || undefined,
          })
          setError(errorData.message || 'Rate limit exceeded')
        } else {
          setError(errorData.message || errorData.error || 'Failed to compare salaries')
        }
        return
      }

      const successData = data as ApiResponse
      setResult(successData.analysis)

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const handleReset = () => {
    setScenarios([
      {
        id: 1,
        location: '',
        jobTitle: '',
        experienceYears: 5,
        industry: '',
        companySize: '',
        workArrangement: '',
        baseSalary: 0,
        bonuses: 0,
        equity: 0,
        benefits: 0,
      },
      {
        id: 2,
        location: '',
        jobTitle: '',
        experienceYears: 5,
        industry: '',
        companySize: '',
        workArrangement: '',
        baseSalary: 0,
        bonuses: 0,
        equity: 0,
        benefits: 0,
      },
    ])
    setResult(null)
    setError(null)
    setActiveScenarioTab(0)
  }

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`
  }

  // Get winner badge
  const getWinner = (scenarioId: number, category: keyof Comparison): boolean => {
    if (!result) return false
    return result.comparison[category] === scenarioId
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Salary Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare multiple job offers side-by-side with cost of living adjustments, tax
            implications, and real purchasing power analysis
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-gray-100"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Scenarios to Compare</h2>
              <p className="text-gray-600">Compare 2-5 job offers or salary scenarios</p>
            </div>

            {/* Scenario Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenarioTab(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeScenarioTab === index
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Scenario {index + 1}
                  {scenarios.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeScenario(scenario.id)
                      }}
                      className="ml-2 text-white hover:text-red-200"
                    >
                      ×
                    </button>
                  )}
                </button>
              ))}
              {scenarios.length < 5 && (
                <button
                  onClick={addScenario}
                  className="px-4 py-2 rounded-lg font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                >
                  + Add Scenario
                </button>
              )}
            </div>

            {/* Active Scenario Form */}
            <AnimatePresence mode="wait">
              {scenarios.map(
                (scenario, index) =>
                  activeScenarioTab === index && (
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Basic Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location *
                          </label>
                          <input
                            type="text"
                            value={scenario.location}
                            onChange={(e) =>
                              updateScenario(scenario.id, 'location', e.target.value)
                            }
                            placeholder="e.g., San Francisco, CA"
                            list={`locations-${scenario.id}`}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          <datalist id={`locations-${scenario.id}`}>
                            {POPULAR_LOCATIONS.map((loc) => (
                              <option key={loc} value={loc} />
                            ))}
                          </datalist>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={scenario.jobTitle}
                            onChange={(e) =>
                              updateScenario(scenario.id, 'jobTitle', e.target.value)
                            }
                            placeholder="e.g., Senior Software Engineer"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Experience and Industry */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience: {scenario.experienceYears}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="40"
                            value={scenario.experienceYears}
                            onChange={(e) =>
                              updateScenario(scenario.id, 'experienceYears', Number(e.target.value))
                            }
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(scenario.experienceYears / 40) * 100}%, #dbeafe ${(scenario.experienceYears / 40) * 100}%, #dbeafe 100%)`,
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry *
                          </label>
                          <select
                            value={scenario.industry}
                            onChange={(e) =>
                              updateScenario(scenario.id, 'industry', e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select...</option>
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>
                                {ind}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Size *
                          </label>
                          <select
                            value={scenario.companySize}
                            onChange={(e) =>
                              updateScenario(scenario.id, 'companySize', e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select...</option>
                            {COMPANY_SIZES.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Work Arrangement */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Arrangement *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {WORK_ARRANGEMENTS.map((arr) => (
                            <button
                              key={arr}
                              onClick={() => updateScenario(scenario.id, 'workArrangement', arr)}
                              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                                scenario.workArrangement === arr
                                  ? 'bg-blue-500 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {arr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Compensation Details */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Compensation Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Base Salary * ($)
                            </label>
                            <input
                              type="number"
                              value={scenario.baseSalary || ''}
                              onChange={(e) =>
                                updateScenario(scenario.id, 'baseSalary', Number(e.target.value))
                              }
                              placeholder="120000"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Annual Bonuses ($)
                            </label>
                            <input
                              type="number"
                              value={scenario.bonuses || ''}
                              onChange={(e) =>
                                updateScenario(scenario.id, 'bonuses', Number(e.target.value))
                              }
                              placeholder="15000"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Equity/Stock Value (Annual) ($)
                            </label>
                            <input
                              type="number"
                              value={scenario.equity || ''}
                              onChange={(e) =>
                                updateScenario(scenario.id, 'equity', Number(e.target.value))
                              }
                              placeholder="25000"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Benefits Value (Annual) ($)
                            </label>
                            <input
                              type="number"
                              value={scenario.benefits || ''}
                              onChange={(e) =>
                                updateScenario(scenario.id, 'benefits', Number(e.target.value))
                              }
                              placeholder="10000"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Health insurance, 401k match, etc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    {rateLimitState.isRateLimited && rateLimitState.retryAfter && (
                      <p className="text-xs text-red-600 mt-2">
                        Please try again in {Math.ceil(rateLimitState.retryAfter / 60)} minutes
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={handleCompare}
                disabled={loading}
                className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Compare Salaries'
                )}
              </button>

              <button
                onClick={handleReset}
                disabled={loading}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          {result && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Scenario Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.scenarios.map((scenario, index) => {
                  const isWinnerRaw = getWinner(scenario.scenarioId, 'bestRawSalary')
                  const isWinnerPurchasing = getWinner(scenario.scenarioId, 'bestPurchasingPower')
                  const isWinnerSavings = getWinner(scenario.scenarioId, 'bestSavingsPotential')
                  const isWinnerQOL = getWinner(scenario.scenarioId, 'bestQualityOfLife')

                  return (
                    <motion.div
                      key={scenario.scenarioId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all"
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-500">
                            Scenario {scenario.scenarioId}
                          </span>
                          <div className="flex gap-1">
                            {isWinnerRaw && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                💰 Best Pay
                              </span>
                            )}
                            {isWinnerPurchasing && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                🎯 Best Value
                              </span>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{scenario.location}</h3>
                      </div>

                      {/* Key Metrics */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Total Compensation</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(scenario.totalCompensation)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-600">Net Take-Home</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {formatCurrency(scenario.netTakeHome)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Tax Rate</div>
                            <div className="text-lg font-semibold text-red-600">
                              {formatPercentage(scenario.taxBreakdown.totalTaxRate)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Adjusted Salary */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                        <div className="text-sm text-gray-700 mb-1">
                          Cost-of-Living Adjusted Salary
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(scenario.adjustedSalary)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          COL Index: {scenario.costOfLivingIndex}
                        </div>
                      </div>

                      {/* Savings & Quality */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Monthly Savings</div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(scenario.savingsPotential)}
                          </div>
                          {isWinnerSavings && (
                            <div className="text-xs text-green-700 font-semibold mt-1">🏆 Best</div>
                          )}
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Quality of Life</div>
                          <div className="text-lg font-bold text-purple-600">
                            {scenario.qualityOfLifeScore}/10
                          </div>
                          {isWinnerQOL && (
                            <div className="text-xs text-purple-700 font-semibold mt-1">
                              🏆 Best
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tax Breakdown */}
                      <div className="border-t border-gray-200 pt-3">
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          Tax Breakdown
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Federal:</span>
                            <span className="font-medium">
                              {formatCurrency(scenario.taxBreakdown.federal)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">State:</span>
                            <span className="font-medium">
                              {formatCurrency(scenario.taxBreakdown.state)}
                            </span>
                          </div>
                          {scenario.taxBreakdown.local > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Local:</span>
                              <span className="font-medium">
                                {formatCurrency(scenario.taxBreakdown.local)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Living Costs Preview */}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          Monthly Living Costs
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Housing:</span>
                            <span className="font-medium">
                              {formatCurrency(scenario.livingCosts.housing)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Food & Transport:</span>
                            <span className="font-medium">
                              {formatCurrency(
                                scenario.livingCosts.food + scenario.livingCosts.transportation,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span className="text-gray-700">Total:</span>
                            <span>{formatCurrency(scenario.livingCosts.total)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Comparison Bars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Side-by-Side Comparison</h2>

                <div className="space-y-8">
                  {/* Total Compensation */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Total Compensation</h3>
                      <span className="text-sm text-gray-600">Higher is better</span>
                    </div>
                    <div className="space-y-3">
                      {result.scenarios.map((scenario) => {
                        const maxComp = Math.max(
                          ...result.scenarios.map((s) => s.totalCompensation),
                        )
                        const percentage = (scenario.totalCompensation / maxComp) * 100
                        const isWinner = getWinner(scenario.scenarioId, 'highestTotalComp')

                        return (
                          <div key={scenario.scenarioId}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {scenario.location}
                              </span>
                              <span className="text-sm font-bold text-gray-900">
                                {formatCurrency(scenario.totalCompensation)}
                              </span>
                            </div>
                            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`h-full ${
                                  isWinner
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-blue-400 to-blue-500'
                                }`}
                              >
                                {isWinner && (
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                                    🏆
                                  </span>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Purchasing Power */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Purchasing Power (COL-Adjusted)
                      </h3>
                      <span className="text-sm text-gray-600">Higher is better</span>
                    </div>
                    <div className="space-y-3">
                      {result.scenarios.map((scenario) => {
                        const maxPower = Math.max(...result.scenarios.map((s) => s.adjustedSalary))
                        const percentage = (scenario.adjustedSalary / maxPower) * 100
                        const isWinner = getWinner(scenario.scenarioId, 'bestPurchasingPower')

                        return (
                          <div key={scenario.scenarioId}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {scenario.location}
                              </span>
                              <span className="text-sm font-bold text-gray-900">
                                {formatCurrency(scenario.adjustedSalary)}
                              </span>
                            </div>
                            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className={`h-full ${
                                  isWinner
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                    : 'bg-gradient-to-r from-purple-400 to-purple-500'
                                }`}
                              >
                                {isWinner && (
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                                    🎯
                                  </span>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tax Burden */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Tax Burden</h3>
                      <span className="text-sm text-gray-600">Lower is better</span>
                    </div>
                    <div className="space-y-3">
                      {result.scenarios.map((scenario) => {
                        const maxRate = Math.max(
                          ...result.scenarios.map((s) => s.taxBreakdown.totalTaxRate),
                        )
                        const percentage = (scenario.taxBreakdown.totalTaxRate / maxRate) * 100
                        const isWinner = getWinner(scenario.scenarioId, 'lowestTaxBurden')

                        return (
                          <div key={scenario.scenarioId}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {scenario.location}
                              </span>
                              <span className="text-sm font-bold text-red-600">
                                {formatPercentage(scenario.taxBreakdown.totalTaxRate)}
                              </span>
                            </div>
                            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className={`h-full ${
                                  isWinner
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-red-400 to-red-500'
                                }`}
                              >
                                {isWinner && (
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                                    💚
                                  </span>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Savings Potential */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Monthly Savings Potential
                      </h3>
                      <span className="text-sm text-gray-600">Higher is better</span>
                    </div>
                    <div className="space-y-3">
                      {result.scenarios.map((scenario) => {
                        const maxSavings = Math.max(
                          ...result.scenarios.map((s) => s.savingsPotential),
                        )
                        const percentage = (scenario.savingsPotential / maxSavings) * 100
                        const isWinner = getWinner(scenario.scenarioId, 'bestSavingsPotential')

                        return (
                          <div key={scenario.scenarioId}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {scenario.location}
                              </span>
                              <span className="text-sm font-bold text-green-600">
                                {formatCurrency(scenario.savingsPotential)}
                              </span>
                            </div>
                            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${
                                  isWinner
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-teal-400 to-teal-500'
                                }`}
                              >
                                {isWinner && (
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                                    💰
                                  </span>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Insights */}
              {result.insights && result.insights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.insights.map((insight, index) => {
                      const iconMap = {
                        key_difference: '🔍',
                        hidden_cost: '⚠️',
                        opportunity: '💡',
                        risk: '⚡',
                      }
                      const colorMap = {
                        key_difference: 'bg-blue-50 border-blue-200 text-blue-900',
                        hidden_cost: 'bg-yellow-50 border-yellow-200 text-yellow-900',
                        opportunity: 'bg-green-50 border-green-200 text-green-900',
                        risk: 'bg-red-50 border-red-200 text-red-900',
                      }

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          className={`p-4 rounded-lg border-2 ${colorMap[insight.type]}`}
                        >
                          <div className="flex items-start">
                            <span className="text-2xl mr-3">{iconMap[insight.type]}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-sm mb-1 capitalize">
                                {insight.type.replace('_', ' ')}
                              </div>
                              <p className="text-sm">{insight.message}</p>
                              {insight.affectsScenarios.length > 0 && (
                                <div className="text-xs mt-2 opacity-75">
                                  Affects: Scenario {insight.affectsScenarios.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-purple-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
                  <div className="space-y-4">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="bg-white rounded-lg p-5 shadow-md"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                            {rec.scenario}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {rec.recommendation}
                            </h3>
                            <p className="text-sm text-gray-700">{rec.reasoning}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white"
              >
                <h2 className="text-2xl font-bold mb-4">Need Help Making Your Decision?</h2>
                <p className="text-lg mb-6 opacity-90">
                  Get personalized career coaching and salary negotiation support from our experts
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/consultations"
                    className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                  >
                    Book a Consultation
                  </Link>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
                  >
                    Compare New Scenarios
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Info Cards */}
          {!result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mt-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cost of Living Adjusted
                </h3>
                <p className="text-sm text-gray-600">
                  Compare real purchasing power across different cities and countries, not just raw
                  salaries
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax Breakdown</h3>
                <p className="text-sm text-gray-600">
                  See detailed tax implications including federal, state, and local taxes for each
                  location
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Savings Potential</h3>
                <p className="text-sm text-gray-600">
                  Calculate monthly savings potential after accounting for living costs and taxes
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
