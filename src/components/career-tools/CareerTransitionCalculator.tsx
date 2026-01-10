/**
 * Career Transition Feasibility Calculator
 * Evaluates risk and feasibility of career changes
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface AssessmentBreakdown {
  skillTransferability: {
    score: number
    overlappingSkills: number
    adjacentVsNew: string
    skillsGap: string[]
    learningCurve: string
  }
  marketDemand: {
    score: number
    jobOpenings: string
    growthTrajectory: string
    entryBarriers: string
    biasFactors: string[]
  }
  financialViability: {
    score: number
    runwayVsTimeline: string
    expectedIncomeChange: string
    retrainingCost: string
    roiEstimate: string
  }
  personalReadiness: {
    score: number
    timeCommitmentFit: string
    motivationLevel: string
    supportSystem: string
    riskVsReward: string
  }
  strategicPositioning: {
    score: number
    networkStrength: string
    transferableCredentials: string[]
    narrativeStrength: string
    marketTiming: string
  }
}

interface Risk {
  risk: string
  severity: string
  mitigation: string
}

interface PhaseDetails {
  timeframe: string
  milestones: string[]
  skillsToDevelop: string[]
  networkingGoals?: string[]
  applicationStrategy?: string
  financialCheckpoints?: string[]
  ongoingDevelopment?: string[]
}

interface AlternativePath {
  path: string
  description: string
  feasibility: string
  timeline: string
}

interface TransitionAnalysis {
  feasibilityScore: number
  scoreCategory: string
  assessmentBreakdown: AssessmentBreakdown
  riskAssessment: {
    overallRisk: string
    primaryRisks: Risk[]
    failureProbability: string
    fallbackOptions: string[]
  }
  transitionPlan: {
    immediate: PhaseDetails
    shortTerm: PhaseDetails
    mediumTerm: PhaseDetails
    longTerm: PhaseDetails
  }
  recommendation: {
    verdict: string
    summary: string
    keySuccessFactors: string[]
    criticalNextSteps: string[]
  }
  alternativePaths: AlternativePath[]
}

export default function CareerTransitionCalculator() {
  const [formData, setFormData] = useState({
    currentRole: '',
    currentIndustry: '',
    yearsExperience: '',
    currentSkills: [] as string[],
    currentSalary: '',
    jobSatisfaction: '5',
    targetRole: '',
    targetIndustry: '',
    reasonForChange: '',
    urgency: 'Not urgent',
    financialRunway: '',
    riskTolerance: 'Moderate',
    dependents: 'No',
    timeAvailable: '',
    geographicFlexibility: 'Flexible',
    willingToTakePayCut: 'Maybe',
  })
  const [skillInput, setSkillInput] = useState('')
  const [analysis, setAnalysis] = useState<TransitionAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.currentSkills.includes(skillInput.trim())) {
      setFormData({ ...formData, currentSkills: [...formData.currentSkills, skillInput.trim()] })
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      currentSkills: formData.currentSkills.filter((s) => s !== skill),
    })
  }

  const handleAnalyze = async () => {
    if (!formData.currentRole || !formData.targetRole || !formData.yearsExperience) {
      setError('Please fill in current role, target role, and years of experience')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/career-transition-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError(
            data.message ||
              'Rate limit reached. Please try again in a few minutes. Free tier: 15 requests/minute.',
          )
        } else {
          setError(data.message || 'Failed to analyze transition')
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

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 75) return 'text-green-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'GO':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'GO_WITH_CAUTION':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'DELAY':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'RECONSIDER':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700'
      case 'high':
        return 'bg-orange-100 text-orange-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Career Transition Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an objective assessment of your career change feasibility. Understand risks,
            timeline, and receive a detailed transition plan.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Current Situation</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Industry
              </label>
              <input
                type="text"
                value={formData.currentIndustry}
                onChange={(e) => setFormData({ ...formData, currentIndustry: e.target.value })}
                placeholder="e.g., Technology, Finance"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                placeholder="e.g., 5"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Satisfaction (1-10)
              </label>
              <input
                type="range"
                value={formData.jobSatisfaction}
                onChange={(e) => setFormData({ ...formData, jobSatisfaction: e.target.value })}
                min="1"
                max="10"
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1</span>
                <span className="font-semibold text-indigo-600">{formData.jobSatisfaction}</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Skills</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Enter a skill and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleAddSkill}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Target Situation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  placeholder="e.g., Product Manager"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Industry
                </label>
                <input
                  type="text"
                  value={formData.targetIndustry}
                  onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  placeholder="e.g., Healthcare"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Change
                </label>
                <select
                  value={formData.reasonForChange}
                  onChange={(e) => setFormData({ ...formData, reasonForChange: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">Select reason</option>
                  <option>Passion/Interest</option>
                  <option>Better Pay</option>
                  <option>Career Growth</option>
                  <option>Work-Life Balance</option>
                  <option>Burnout</option>
                  <option>Industry Decline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Not urgent</option>
                  <option>Within 6 months</option>
                  <option>Within 1 year</option>
                  <option>Immediate</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Circumstances</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Financial Runway (months)
                </label>
                <input
                  type="number"
                  value={formData.financialRunway}
                  onChange={(e) => setFormData({ ...formData, financialRunway: e.target.value })}
                  placeholder="e.g., 6"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Available (hours/week)
                </label>
                <input
                  type="number"
                  value={formData.timeAvailable}
                  onChange={(e) => setFormData({ ...formData, timeAvailable: e.target.value })}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={formData.riskTolerance}
                  onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Geographic Flexibility
                </label>
                <select
                  value={formData.geographicFlexibility}
                  onChange={(e) =>
                    setFormData({ ...formData, geographicFlexibility: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Flexible</option>
                  <option>Willing to relocate</option>
                  <option>Must stay local</option>
                  <option>Remote only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Willing to Take Pay Cut?
                </label>
                <select
                  value={formData.willingToTakePayCut}
                  onChange={(e) =>
                    setFormData({ ...formData, willingToTakePayCut: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Yes</option>
                  <option>Maybe</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dependents</label>
                <select
                  value={formData.dependents}
                  onChange={(e) => setFormData({ ...formData, dependents: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>No</option>
                  <option>Yes - 1-2</option>
                  <option>Yes - 3+</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Analyzing Transition...' : 'Calculate Feasibility'}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in">
            {/* Feasibility Score & Verdict */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Feasibility Assessment</h2>
                <div className="inline-block">
                  <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#4f46e5"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(analysis.feasibilityScore / 100) * 439.6} 439.6`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600">
                          {analysis.feasibilityScore}
                        </div>
                        <div className="text-sm text-gray-600">/ 100</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-800 mt-4">{analysis.scoreCategory}</p>
                <div
                  className={`inline-block px-6 py-3 rounded-xl font-bold text-lg mt-4 border-2 ${getVerdictStyle(analysis.recommendation.verdict)}`}
                >
                  {analysis.recommendation.verdict.replace(/_/g, ' ')}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {analysis.recommendation.summary}
                </p>
              </div>
            </div>

            {/* Assessment Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Assessment</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Skill Transferability</h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(analysis.assessmentBreakdown.skillTransferability.score, 25)}`}
                    >
                      {analysis.assessmentBreakdown.skillTransferability.score}/25
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{
                        width: `${(analysis.assessmentBreakdown.skillTransferability.score / 25) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <span className="font-semibold">Overlapping Skills:</span>{' '}
                      {analysis.assessmentBreakdown.skillTransferability.overlappingSkills}%
                    </p>
                    <p>
                      <span className="font-semibold">Learning Curve:</span>{' '}
                      {analysis.assessmentBreakdown.skillTransferability.learningCurve}
                    </p>
                  </div>
                  {analysis.assessmentBreakdown.skillTransferability.skillsGap.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Skills Gap:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.assessmentBreakdown.skillTransferability.skillsGap.map(
                          (skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Market Demand</h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(analysis.assessmentBreakdown.marketDemand.score, 20)}`}
                    >
                      {analysis.assessmentBreakdown.marketDemand.score}/20
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{
                        width: `${(analysis.assessmentBreakdown.marketDemand.score / 20) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Financial Viability</h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(analysis.assessmentBreakdown.financialViability.score, 25)}`}
                    >
                      {analysis.assessmentBreakdown.financialViability.score}/25
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{
                        width: `${(analysis.assessmentBreakdown.financialViability.score / 25) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Expected Income Change:</span>{' '}
                    {analysis.assessmentBreakdown.financialViability.expectedIncomeChange}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Personal Readiness</h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(analysis.assessmentBreakdown.personalReadiness.score, 15)}`}
                    >
                      {analysis.assessmentBreakdown.personalReadiness.score}/15
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{
                        width: `${(analysis.assessmentBreakdown.personalReadiness.score / 15) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Strategic Positioning</h3>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(analysis.assessmentBreakdown.strategicPositioning.score, 15)}`}
                    >
                      {analysis.assessmentBreakdown.strategicPositioning.score}/15
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{
                        width: `${(analysis.assessmentBreakdown.strategicPositioning.score / 15) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Risk Assessment</h2>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Overall Risk Level</p>
                <span
                  className={`inline-block px-6 py-2 rounded-xl font-bold text-lg uppercase ${
                    analysis.riskAssessment.overallRisk === 'low'
                      ? 'bg-green-100 text-green-700'
                      : analysis.riskAssessment.overallRisk === 'moderate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : analysis.riskAssessment.overallRisk === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                  }`}
                >
                  {analysis.riskAssessment.overallRisk}
                </span>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-semibold">Failure Probability:</span>{' '}
                  {analysis.riskAssessment.failureProbability}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Primary Risks & Mitigation</h3>
                {analysis.riskAssessment.primaryRisks.map((risk, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{risk.risk}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(risk.severity)}`}
                      >
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>

              {analysis.riskAssessment.fallbackOptions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Fallback Options</h3>
                  <ul className="space-y-2">
                    {analysis.riskAssessment.fallbackOptions.map((option, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Transition Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Transition Roadmap</h2>
              <div className="space-y-6">
                {Object.entries(analysis.transitionPlan).map(([phase, details]) => (
                  <div key={phase} className="border-l-4 border-indigo-500 pl-6">
                    <h3 className="text-lg font-bold text-indigo-600 mb-2 capitalize">
                      {phase.replace(/([A-Z])/g, ' $1').trim()} - {details.timeframe}
                    </h3>
                    {details.milestones && details.milestones.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Milestones:</p>
                        <ul className="space-y-1">
                          {details.milestones.map((milestone, idx) => (
                            <li key={idx} className="text-gray-700 text-sm">
                              • {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {details.skillsToDevelop && details.skillsToDevelop.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Skills to Develop:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {details.skillsToDevelop.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Paths */}
            {analysis.alternativePaths && analysis.alternativePaths.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Alternative Transition Paths
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {analysis.alternativePaths.map((path, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{path.path}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            path.feasibility === 'high'
                              ? 'bg-green-100 text-green-700'
                              : path.feasibility === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {path.feasibility}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{path.description}</p>
                      <p className="text-gray-600 text-xs">
                        <span className="font-semibold">Timeline:</span> {path.timeline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Critical Next Steps */}
            <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Critical Next Steps</h2>
              <div className="space-y-3">
                {analysis.recommendation.criticalNextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need Expert Guidance?</h2>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Our career coaches can help you navigate your transition with personalized
                strategies, resume optimization, and interview preparation for your target role.
              </p>
              <Link
                href="/services"
                className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Career Coaching
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
