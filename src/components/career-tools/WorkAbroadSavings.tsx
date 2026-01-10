/**
 * Work Abroad Savings Calculator - International Work Financial Planner
 * Calculates realistic savings potential when working abroad
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface SavingsAnalysis {
  monthlyFinancialFlow: {
    income: {
      grossSalary: number
      taxes: number
      deductions: number
      netIncome: number
    }
    fixedExpenses: {
      rent: number
      utilities: number
      transportation: number
      insurance: number
      total: number
    }
    variableExpenses: {
      food: number
      entertainment: number
      personal: number
      shopping: number
      travel: number
      total: number
    }
    obligations: {
      remittances: number
      homeExpenses: number
      debtPayments: number
      total: number
    }
    netMonthlySavings: number
    annualSavings: number
  }
  savingsAnalysis: {
    savingsRate: number
    savingsRating: string
    wealthAccumulation: {
      afterOneYear: number
      afterTwoYears: number
      contractEnd: number
      withInvestmentReturns: number
    }
    comparisonToHome: {
      homeSavings: number
      abroadSavings: number
      additionalSavings: number
      totalPremium: number
    }
  }
  currencyRiskAssessment: {
    exchangeRateImpact: string
    historicalVolatility: string
    hedgingRecommendations: string[]
  }
  financialGoals: Array<{
    goal: string
    targetAmount: number
    achievableInMonths: number
  }>
  hiddenCosts: Array<{
    cost: string
    estimatedAmount: number
    frequency: string
  }>
  recommendations: {
    savingsAllocation: string
    investmentStrategy: string
    taxAdvantages: string[]
    remittanceTiming: string
  }
  summary: {
    worthIt: boolean
    keyBenefit: string
    mainConcern: string
    overallAssessment: string
  }
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
  'Pakistan',
  'Bangladesh',
  'Luxembourg',
  'Iceland',
  'Estonia',
  'Latvia',
  'Lithuania',
  'Romania',
  'Bulgaria',
  'Croatia',
  'Slovenia',
  'Slovakia',
  'Hungary',
  'Chile',
  'Colombia',
  'Peru',
  'Costa Rica',
  'Panama',
  'Other',
]

export default function WorkAbroadSavings() {
  const [formData, setFormData] = useState({
    homeCountry: '',
    homeSalary: '',
    homeLivingCost: '',
    targetCountry: '',
    offeredSalary: '',
    contractDuration: '',
    housingProvided: false,
    otherBenefits: '',
    rent: '',
    utilities: '',
    food: '',
    transportation: '',
    healthcare: '',
    entertainment: '',
    personalExpenses: '',
    remittances: '',
    homeExpenses: '',
    debtPayments: '',
    savingsGoal: '',
  })
  const [analysis, setAnalysis] = useState<SavingsAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/work-abroad-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            result.message || 'Rate limit exceeded. Please try again in a few minutes.',
          )
        }
        throw new Error(result.error || 'Failed to calculate savings')
      }

      setAnalysis(result.data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getRatingColor = (rating: string) => {
    if (rating === 'excellent') return 'text-green-600'
    if (rating === 'good') return 'text-blue-600'
    if (rating === 'fair') return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRatingBg = (rating: string) => {
    if (rating === 'excellent') return 'bg-green-100 border-green-300'
    if (rating === 'good') return 'bg-blue-100 border-blue-300'
    if (rating === 'fair') return 'bg-yellow-100 border-yellow-300'
    return 'bg-red-100 border-red-300'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/career-tools" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Career Tools
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Work Abroad Savings Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Calculate realistic savings potential when working internationally. Understand your
            wealth accumulation trajectory as an expat.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Home Country Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Country
                  </label>
                  <select
                    value={formData.homeCountry}
                    onChange={(e) => setFormData({ ...formData, homeCountry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Salary (if applicable)
                  </label>
                  <input
                    type="number"
                    value={formData.homeSalary}
                    onChange={(e) => setFormData({ ...formData, homeSalary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="30000"
                    min="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Living Costs at Home (Monthly)
                  </label>
                  <input
                    type="number"
                    value={formData.homeLivingCost}
                    onChange={(e) => setFormData({ ...formData, homeLivingCost: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="1500"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Work Abroad Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Country
                  </label>
                  <select
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select target country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offered Salary (Annual)
                  </label>
                  <input
                    type="number"
                    value={formData.offeredSalary}
                    onChange={(e) => setFormData({ ...formData, offeredSalary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="60000"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contract Duration (months)
                  </label>
                  <input
                    type="number"
                    value={formData.contractDuration}
                    onChange={(e) => setFormData({ ...formData, contractDuration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="24"
                    required
                    min="1"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.housingProvided}
                    onChange={(e) =>
                      setFormData({ ...formData, housingProvided: e.target.checked })
                    }
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <label className="ml-3 text-gray-700">Housing provided by employer</label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Benefits
                  </label>
                  <input
                    type="text"
                    value={formData.otherBenefits}
                    onChange={(e) => setFormData({ ...formData, otherBenefits: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Annual flights home, health insurance"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Living Expenses Abroad (Monthly)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {!formData.housingProvided && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rent ($)</label>
                    <input
                      type="number"
                      value={formData.rent}
                      onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="1200"
                      min="0"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utilities ($)
                  </label>
                  <input
                    type="number"
                    value={formData.utilities}
                    onChange={(e) => setFormData({ ...formData, utilities: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="150"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food ($)</label>
                  <input
                    type="number"
                    value={formData.food}
                    onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="400"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transportation ($)
                  </label>
                  <input
                    type="number"
                    value={formData.transportation}
                    onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="100"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Healthcare ($)
                  </label>
                  <input
                    type="number"
                    value={formData.healthcare}
                    onChange={(e) => setFormData({ ...formData, healthcare: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="50"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entertainment ($)
                  </label>
                  <input
                    type="number"
                    value={formData.entertainment}
                    onChange={(e) => setFormData({ ...formData, entertainment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="200"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Expenses ($)
                  </label>
                  <input
                    type="number"
                    value={formData.personalExpenses}
                    onChange={(e) => setFormData({ ...formData, personalExpenses: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="150"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Commitments (Monthly)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remittances ($)
                  </label>
                  <input
                    type="number"
                    value={formData.remittances}
                    onChange={(e) => setFormData({ ...formData, remittances: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Country Expenses ($)
                  </label>
                  <input
                    type="number"
                    value={formData.homeExpenses}
                    onChange={(e) => setFormData({ ...formData, homeExpenses: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="200"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Debt Payments ($)
                  </label>
                  <input
                    type="number"
                    value={formData.debtPayments}
                    onChange={(e) => setFormData({ ...formData, debtPayments: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="300"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Savings Goal ($)
                  </label>
                  <input
                    type="number"
                    value={formData.savingsGoal}
                    onChange={(e) => setFormData({ ...formData, savingsGoal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="1000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating Savings...' : 'Calculate Savings Potential'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {analysis && (
          <div ref={resultsRef} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Financial Analysis Results</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div
                  className={`p-6 rounded-lg border-2 ${getRatingBg(analysis.savingsAnalysis.savingsRating)}`}
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Savings Rate</h3>
                  <div
                    className={`text-5xl font-bold ${getRatingColor(analysis.savingsAnalysis.savingsRating)}`}
                  >
                    {analysis.savingsAnalysis.savingsRate.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600 mt-2 capitalize">
                    {analysis.savingsAnalysis.savingsRating} Savings Rate
                  </p>
                </div>

                <div className="p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Net Monthly Savings</h3>
                  <div className="text-5xl font-bold text-teal-600">
                    ${analysis.monthlyFinancialFlow.netMonthlySavings.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ${analysis.monthlyFinancialFlow.annualSavings.toLocaleString()} annually
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Monthly Financial Flow</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-2">Income</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${analysis.monthlyFinancialFlow.income.netIncome.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">After taxes & deductions</p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Fixed Expenses</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${analysis.monthlyFinancialFlow.fixedExpenses.total.toLocaleString()}
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Variable Expenses</p>
                        <p className="text-xl font-bold text-purple-600">
                          ${analysis.monthlyFinancialFlow.variableExpenses.total.toLocaleString()}
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Obligations</p>
                        <p className="text-xl font-bold text-orange-600">
                          ${analysis.monthlyFinancialFlow.obligations.total.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Monthly Savings</p>
                        <div className="text-6xl font-bold text-teal-600">
                          ${analysis.monthlyFinancialFlow.netMonthlySavings.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Wealth Accumulation Projection</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">After 1 Year</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${analysis.savingsAnalysis.wealthAccumulation.afterOneYear.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">After 2 Years</p>
                      <p className="text-2xl font-bold text-gray-800">
                        $
                        {analysis.savingsAnalysis.wealthAccumulation.afterTwoYears.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <p className="text-sm text-gray-600">At Contract End</p>
                      <p className="text-2xl font-bold text-teal-600">
                        ${analysis.savingsAnalysis.wealthAccumulation.contractEnd.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600">With Investments</p>
                      <p className="text-2xl font-bold text-blue-600">
                        $
                        {analysis.savingsAnalysis.wealthAccumulation.withInvestmentReturns.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Comparison to Home Country</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600">Savings at Home</p>
                      <p className="text-xl font-bold text-gray-700">
                        ${analysis.savingsAnalysis.comparisonToHome.homeSavings.toLocaleString()}/mo
                      </p>
                    </div>
                    <div className="p-4 bg-teal-100 rounded-lg">
                      <p className="text-sm text-gray-600">Savings Abroad</p>
                      <p className="text-xl font-bold text-teal-700">
                        ${analysis.savingsAnalysis.comparisonToHome.abroadSavings.toLocaleString()}
                        /mo
                      </p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg border-2 border-green-400">
                      <p className="text-sm text-gray-600">Additional Savings</p>
                      <p className="text-xl font-bold text-green-700">
                        +$
                        {analysis.savingsAnalysis.comparisonToHome.additionalSavings.toLocaleString()}
                        /mo
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        ${analysis.savingsAnalysis.comparisonToHome.totalPremium.toLocaleString()}{' '}
                        total premium
                      </p>
                    </div>
                  </div>
                </div>

                {analysis.financialGoals.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Financial Goals Timeline</h3>
                    <div className="space-y-3">
                      {analysis.financialGoals.map((goal, index) => (
                        <div
                          key={index}
                          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800">{goal.goal}</p>
                              <p className="text-sm text-gray-600">
                                Target: ${goal.targetAmount.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">
                                {goal.achievableInMonths}
                              </p>
                              <p className="text-xs text-gray-600">months</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Currency Risk Assessment</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Exchange Rate Impact</p>
                      <p className="text-gray-800">
                        {analysis.currencyRiskAssessment.exchangeRateImpact}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Historical Volatility</p>
                      <p className="text-gray-800">
                        {analysis.currencyRiskAssessment.historicalVolatility}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-600 mb-2">Hedging Recommendations</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.currencyRiskAssessment.hedgingRecommendations.map(
                          (rec, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {rec}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {analysis.hiddenCosts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Hidden Costs to Consider</h3>
                    <div className="space-y-3">
                      {analysis.hiddenCosts.map((cost, index) => (
                        <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800">{cost.cost}</p>
                              <p className="text-sm text-gray-600">{cost.frequency}</p>
                            </div>
                            <p className="text-lg font-bold text-red-600">
                              ${cost.estimatedAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Savings Allocation</p>
                      <p className="text-gray-600">{analysis.recommendations.savingsAllocation}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Investment Strategy</p>
                      <p className="text-gray-600">{analysis.recommendations.investmentStrategy}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Tax Advantages</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.recommendations.taxAdvantages.map((advantage, index) => (
                          <li key={index} className="text-gray-600">
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Remittance Timing</p>
                      <p className="text-gray-600">{analysis.recommendations.remittanceTiming}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg border-2 ${analysis.summary.worthIt ? 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'}`}
                >
                  <h3 className="text-lg font-semibold mb-4">Overall Assessment</h3>
                  <div className="space-y-3">
                    <div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full font-bold ${analysis.summary.worthIt ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}
                      >
                        {analysis.summary.worthIt ? 'Worth It' : 'Consider Carefully'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Key Benefit</p>
                      <p className="font-medium text-gray-800">{analysis.summary.keyBenefit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Main Concern</p>
                      <p className="font-medium text-gray-800">{analysis.summary.mainConcern}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Summary</p>
                      <p className="text-gray-800">{analysis.summary.overallAssessment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
