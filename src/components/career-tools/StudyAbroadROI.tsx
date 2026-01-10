/**
 * Study Abroad ROI Calculator - Multi-step form with financial analysis
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FormData {
  country: string
  institutionType: string
  degreeLevel: string
  programDuration: number
  fieldOfStudy: string
  tuitionAnnual: number
  livingExpensesMonthly: number
  visaFees: number
  travelCosts: number
  healthInsurance: number
  scholarships: number
  loanAmount: number
  loanInterestRate: number
  familySupport: number
  partTimeEarnings: number
  foregoneSalary: number
  homeCountryDegreeCost: number
  targetCareerField: string
  targetWorkCountry: string
  expectedSalaryPostGrad: number
}

interface ROICalculation {
  investmentBreakdown: any
  funding: any
  netInvestment: number
  loanDetails: any
  comparison: any
  salaryBoostAnalysis: any
  careerOpportunities: any
  immigrationBenefits: any
  roiMetrics: any
  financialViability: any
  riskFactors: string[]
  recommendation: any
  alternatives: any[]
  scholarshipNeeded: any
}

export default function StudyAbroadROICalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    country: '',
    institutionType: 'Public University',
    degreeLevel: '',
    programDuration: 2,
    fieldOfStudy: '',
    tuitionAnnual: 0,
    livingExpensesMonthly: 0,
    visaFees: 0,
    travelCosts: 0,
    healthInsurance: 0,
    scholarships: 0,
    loanAmount: 0,
    loanInterestRate: 5,
    familySupport: 0,
    partTimeEarnings: 0,
    foregoneSalary: 0,
    homeCountryDegreeCost: 0,
    targetCareerField: '',
    targetWorkCountry: '',
    expectedSalaryPostGrad: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ROICalculation | null>(null)
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
      const response = await fetch('/api/study-abroad-roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to calculate ROI')
        return
      }

      setResult(data.roiCalculation)

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
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('Strong')) return 'text-green-600 bg-green-50 border-green-200'
    if (verdict.includes('Positive')) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (verdict.includes('Marginal')) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Study Abroad ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Make informed decisions about international education. Calculate total costs, career
            returns, and break-even timeline.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full px-5 py-2.5 w-fit mx-auto">
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
          </div>
        </div>

        {!result && (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${currentStep >= step ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-200'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-gray-600 font-medium">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        )}

        {!result && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Program Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Study Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => updateFormData('country', e.target.value)}
                      placeholder="e.g., United States, United Kingdom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree Level *
                    </label>
                    <select
                      value={formData.degreeLevel}
                      onChange={(e) => updateFormData('degreeLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select degree level</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      value={formData.fieldOfStudy}
                      onChange={(e) => updateFormData('fieldOfStudy', e.target.value)}
                      placeholder="e.g., Computer Science, Business"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Duration (Years) *
                    </label>
                    <input
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={formData.programDuration}
                      onChange={(e) =>
                        updateFormData('programDuration', parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={nextStep}
                  disabled={!formData.country || !formData.degreeLevel || !formData.fieldOfStudy}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Costs
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Costs & Expenses</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Tuition (USD) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.tuitionAnnual}
                      onChange={(e) =>
                        updateFormData('tuitionAnnual', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Living Expenses (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.livingExpensesMonthly}
                      onChange={(e) =>
                        updateFormData('livingExpensesMonthly', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 1500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visa & Immigration Fees (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.visaFees}
                      onChange={(e) => updateFormData('visaFees', parseFloat(e.target.value) || 0)}
                      placeholder="e.g., 1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Costs (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.travelCosts}
                      onChange={(e) =>
                        updateFormData('travelCosts', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 3000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Health Insurance (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.healthInsurance}
                      onChange={(e) =>
                        updateFormData('healthInsurance', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 200"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foregone Annual Salary (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.foregoneSalary}
                      onChange={(e) =>
                        updateFormData('foregoneSalary', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 60000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      What you would earn if working instead
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
                  >
                    Continue to Funding
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Funding Sources</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scholarships/Grants (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.scholarships}
                      onChange={(e) =>
                        updateFormData('scholarships', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 10000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Support (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.familySupport}
                      onChange={(e) =>
                        updateFormData('familySupport', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 20000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.loanAmount}
                      onChange={(e) =>
                        updateFormData('loanAmount', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={formData.loanInterestRate}
                      onChange={(e) =>
                        updateFormData('loanInterestRate', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Part-Time Earnings (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.partTimeEarnings}
                      onChange={(e) =>
                        updateFormData('partTimeEarnings', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 800"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Country Degree Cost (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.homeCountryDegreeCost}
                      onChange={(e) =>
                        updateFormData('homeCountryDegreeCost', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 30000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">For comparison</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
                  >
                    Continue to Expected Outcomes
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Expected Outcomes</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Career Field
                    </label>
                    <input
                      type="text"
                      value={formData.targetCareerField}
                      onChange={(e) => updateFormData('targetCareerField', e.target.value)}
                      placeholder="e.g., Software Engineering, Finance"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Work Country
                    </label>
                    <input
                      type="text"
                      value={formData.targetWorkCountry}
                      onChange={(e) => updateFormData('targetWorkCountry', e.target.value)}
                      placeholder="e.g., United States"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Post-Graduation Salary (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.expectedSalaryPostGrad}
                      onChange={(e) =>
                        updateFormData('expectedSalaryPostGrad', parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 85000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your expected first-year salary</p>
                  </div>
                </div>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Calculating...
                      </>
                    ) : (
                      'Calculate ROI'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {result && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in-up">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-8 shadow-xl text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Your Study Abroad ROI Analysis</h2>
                <div
                  className={`inline-block px-8 py-4 rounded-xl border-2 ${getVerdictColor(result.recommendation?.verdict || '')}`}
                >
                  <p className="text-sm font-medium opacity-80 mb-1">ROI Verdict</p>
                  <p className="text-3xl font-bold">{result.recommendation?.verdict}</p>
                </div>
                <p className="text-xl mt-6 text-white/90 max-w-2xl mx-auto">
                  {result.recommendation?.reasoning}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Total Investment</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(result.netInvestment)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Payback Period</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {result.roiMetrics?.paybackPeriodYears} years
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">ROI Percentage</p>
                <p className="text-3xl font-bold text-teal-600">
                  {result.roiMetrics?.roiPercentage?.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Investment Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Direct Costs</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(result.investmentBreakdown?.directCosts?.subtotal || 0)}
                  </span>
                </div>
                <div className="pl-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition</span>
                    <span>
                      {formatCurrency(result.investmentBreakdown?.directCosts?.tuition || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Living Expenses</span>
                    <span>
                      {formatCurrency(result.investmentBreakdown?.directCosts?.livingExpenses || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travel</span>
                    <span>
                      {formatCurrency(result.investmentBreakdown?.directCosts?.travel || 0)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Opportunity Costs</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(result.investmentBreakdown?.opportunityCosts?.subtotal || 0)}
                  </span>
                </div>
                {result.loanDetails?.principal > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Financing Costs (Interest)</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(result.investmentBreakdown?.financingCosts?.subtotal || 0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {result.salaryBoostAnalysis && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-emerald-200">
                <h3 className="text-2xl font-bold mb-6 text-emerald-600">Salary & Career Impact</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">International Degree Premium</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {result.salaryBoostAnalysis.internationalDegreePremium}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Expected First Year Salary</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(result.salaryBoostAnalysis.firstYearSalary)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Lifetime Earnings Increase</p>
                    <p className="text-3xl font-bold text-teal-600">
                      {formatCurrency(result.salaryBoostAnalysis.lifetimeEarningsIncrease)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Global Mobility Score</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {result.careerOpportunities?.globalMobilityScore}/10
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">{result.salaryBoostAnalysis.reasoning}</p>
              </div>
            )}

            {result.financialViability && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Financial Viability</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Affordability Rating</p>
                    <p className="text-2xl font-bold mb-2">
                      {result.financialViability.affordabilityRating}
                    </p>
                    <p className="text-sm text-gray-600">{result.financialViability.reasoning}</p>
                  </div>
                  {result.financialViability.debtLoad > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Debt Load</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(result.financialViability.debtLoad)}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Monthly Payment:{' '}
                        {formatCurrency(result.financialViability.monthlyLoanPayment)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.riskFactors && result.riskFactors.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-yellow-200">
                <h3 className="text-2xl font-bold mb-6 text-yellow-600">Risk Factors</h3>
                <ul className="space-y-3">
                  {result.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.alternatives && result.alternatives.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Alternative Options</h3>
                <div className="space-y-4">
                  {result.alternatives.map((alt, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg"
                    >
                      <h4 className="font-bold text-gray-900 mb-1">{alt.option}</h4>
                      <p className="text-sm text-gray-700 mb-1">{alt.comparison}</p>
                      <p className="text-sm text-gray-600">Cost Difference: {alt.costDifference}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-8 text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Make the Move?</h3>
              <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
                Whether studying abroad or working internationally, get your resume optimized for
                global opportunities.
              </p>
              <Link
                href="/resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Your International Resume
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null)
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Calculate Another Program
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
