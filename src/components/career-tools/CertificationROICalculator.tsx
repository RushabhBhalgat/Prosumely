/**
 * Certification ROI Calculator - Investment Return Analysis Tool
 * Calculates ROI for professional certifications
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const COUNTRIES_AND_REGIONS = [
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
  'Remote',
  'Global',
  'Other',
]

interface ROIAnalysis {
  totalInvestment: {
    directCosts: number
    opportunityCost: number
    totalAmount: number
  }
  expectedReturns: {
    salaryIncrease: {
      percentage: number
      annualAmount: number
    }
    jobPlacementImprovement: number
    promotionProbability: string
    jobSecurity: string
    billableRateIncrease: string
  }
  roiMetrics: {
    paybackPeriodMonths: number
    fiveYearROI: number
    lifetimeValue: number
    roiPercentage: number
  }
  valueScore: number
  marketDemand: {
    jobPostingsRequiring: string
    demandTrend: string
    employerRecognition: string
    industryRelevance: string
  }
  alternativesComparison: Array<{
    alternative: string
    reason: string
  }>
  riskFactors: Array<{
    risk: string
    severity: 'high' | 'medium' | 'low'
  }>
  recommendation: {
    decision: string
    reasoning: string
    conditions: string[]
  }
}

export default function CertificationROICalculator() {
  const [formData, setFormData] = useState({
    certificationName: '',
    currentRole: '',
    industry: '',
    yearsExperience: '',
    currentSalary: '',
    location: '',
    courseCost: '',
    examFee: '',
    studyMaterialsCost: '',
    timeInvestment: '',
    renewalCost: '',
    primaryReason: 'career advancement',
  })
  const [analysis, setAnalysis] = useState<ROIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/certification-roi-calculator', {
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
        throw new Error(result.error || 'Failed to calculate ROI')
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

  const getValueScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getValueScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-100 border-green-300'
    if (score >= 5) return 'bg-yellow-100 border-yellow-300'
    return 'bg-red-100 border-red-300'
  }

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-100 text-red-800 border-red-300'
    if (severity === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-green-100 text-green-800 border-green-300'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/career-tools" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Career Tools
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certification ROI Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Calculate the return on investment for professional certifications. Make data-driven
            decisions about your learning investments.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={formData.certificationName}
                  onChange={(e) => setFormData({ ...formData, certificationName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., PMP, AWS Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Technology, Healthcare"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Salary (Annual)
                </label>
                <input
                  type="number"
                  value={formData.currentSalary}
                  onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="75000"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select location</option>
                  {COUNTRIES_AND_REGIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Costs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Training Cost ($)
                  </label>
                  <input
                    type="number"
                    value={formData.courseCost}
                    onChange={(e) => setFormData({ ...formData, courseCost: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2000"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Fee ($)
                  </label>
                  <input
                    type="number"
                    value={formData.examFee}
                    onChange={(e) => setFormData({ ...formData, examFee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Study Materials ($)
                  </label>
                  <input
                    type="number"
                    value={formData.studyMaterialsCost}
                    onChange={(e) =>
                      setFormData({ ...formData, studyMaterialsCost: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="300"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Investment (hours)
                  </label>
                  <input
                    type="number"
                    value={formData.timeInvestment}
                    onChange={(e) => setFormData({ ...formData, timeInvestment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="200"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Renewal Cost ($)
                  </label>
                  <input
                    type="number"
                    value={formData.renewalCost}
                    onChange={(e) => setFormData({ ...formData, renewalCost: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Reason
                  </label>
                  <select
                    value={formData.primaryReason}
                    onChange={(e) => setFormData({ ...formData, primaryReason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="career advancement">Career Advancement</option>
                    <option value="salary increase">Salary Increase</option>
                    <option value="job requirement">Job Requirement</option>
                    <option value="career change">Career Change</option>
                    <option value="credibility">Credibility/Recognition</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating ROI...' : 'Calculate ROI'}
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
              <h2 className="text-2xl font-bold mb-6 text-gray-800">ROI Analysis Results</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className={`p-6 rounded-lg border-2 ${getValueScoreBg(analysis.valueScore)}`}>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Value Score</h3>
                  <div className={`text-5xl font-bold ${getValueScoreColor(analysis.valueScore)}`}>
                    {analysis.valueScore.toFixed(1)}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {analysis.valueScore >= 8
                      ? 'Highly Recommended'
                      : analysis.valueScore >= 5
                        ? 'Moderate Value'
                        : 'Consider Alternatives'}
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">ROI Percentage</h3>
                  <div className="text-5xl font-bold text-blue-600">
                    {analysis.roiMetrics.roiPercentage.toFixed(0)}%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Return on Investment</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Total Investment</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Direct Costs</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${analysis.totalInvestment.directCosts.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Opportunity Cost</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${analysis.totalInvestment.opportunityCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600">Total Investment</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${analysis.totalInvestment.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Expected Returns</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Salary Increase</span>
                      <span className="font-bold text-green-600">
                        {analysis.expectedReturns.salaryIncrease.percentage}% ($
                        {analysis.expectedReturns.salaryIncrease.annualAmount.toLocaleString()}
                        /year)
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Job Placement Improvement</span>
                      <span className="font-bold text-gray-800">
                        {analysis.expectedReturns.jobPlacementImprovement}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Promotion Probability</span>
                      <span className="font-bold text-gray-800">
                        {analysis.expectedReturns.promotionProbability}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">ROI Metrics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Payback Period</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {analysis.roiMetrics.paybackPeriodMonths} months
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">5-Year ROI</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${analysis.roiMetrics.fiveYearROI.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Lifetime Value</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${analysis.roiMetrics.lifetimeValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Market Demand</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Job Postings</p>
                      <p className="text-gray-800">{analysis.marketDemand.jobPostingsRequiring}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Demand Trend</p>
                      <p className="text-gray-800">{analysis.marketDemand.demandTrend}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Employer Recognition</p>
                      <p className="text-gray-800">{analysis.marketDemand.employerRecognition}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Industry Relevance</p>
                      <p className="text-gray-800">{analysis.marketDemand.industryRelevance}</p>
                    </div>
                  </div>
                </div>

                {analysis.alternativesComparison.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Alternative Options</h3>
                    <div className="space-y-3">
                      {analysis.alternativesComparison.map((alt, index) => (
                        <div
                          key={index}
                          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <p className="font-medium text-gray-800">{alt.alternative}</p>
                          <p className="text-sm text-gray-600 mt-1">{alt.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.riskFactors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
                    <div className="space-y-3">
                      {analysis.riskFactors.map((risk, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${getSeverityColor(risk.severity)}`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium flex-1">{risk.risk}</p>
                            <span className="text-xs font-bold uppercase px-2 py-1 rounded">
                              {risk.severity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="text-lg font-semibold mb-4">Recommendation</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full font-bold">
                        {analysis.recommendation.decision}
                      </span>
                    </div>
                    <p className="text-gray-800">{analysis.recommendation.reasoning}</p>
                    {analysis.recommendation.conditions.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium text-gray-700 mb-2">Conditions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {analysis.recommendation.conditions.map((condition, index) => (
                            <li key={index} className="text-gray-700">
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
