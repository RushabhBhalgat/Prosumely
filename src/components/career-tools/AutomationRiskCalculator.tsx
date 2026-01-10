/**
 * AI/Automation Career Risk Assessment
 * Analyzes job automation risk and provides adaptation strategies
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FormData {
  jobTitle: string
  industry: string
  primaryTasks: string[]
  repetitiveness: number
  creativityRequired: number
  humanInteraction: number
  problemComplexity: string
  physicalPresence: boolean
  decisionMakingLevel: string
  technicalSkills: string
  softSkills: string
  digitalLiteracy: string
}

interface AssessmentResult {
  automationRiskScore: number
  riskCategory: string
  tasksAtRisk: any[]
  tasksLikelyHuman: any[]
  roleEvolution: any
  industryDisruption: any
  riskFactors: any
  protectiveFactors: any
  actionPlan: any
  alternativeCareerPaths: any[]
  recommendedSkills: any
  scenarioAnalysis: any
}

const TASK_TYPES = [
  'Routine physical tasks',
  'Routine cognitive tasks',
  'Non-routine physical tasks',
  'Non-routine cognitive tasks',
  'Creative work',
  'Interpersonal/social tasks',
  'Strategic planning',
  'Problem-solving',
]

const PROBLEM_COMPLEXITY_LEVELS = [
  'Simple and repetitive',
  'Moderately complex',
  'Complex with multiple variables',
  'Highly complex and unique',
]

const DECISION_LEVELS = [
  'Task execution only',
  'Operational decisions',
  'Tactical decisions',
  'Strategic decisions',
]

export default function AutomationRiskCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    industry: '',
    primaryTasks: [],
    repetitiveness: 5,
    creativityRequired: 5,
    humanInteraction: 50,
    problemComplexity: 'Moderately complex',
    physicalPresence: false,
    decisionMakingLevel: 'Operational decisions',
    technicalSkills: '',
    softSkills: '',
    digitalLiteracy: 'Intermediate',
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 3

  const toggleTask = (task: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryTasks: prev.primaryTasks.includes(task)
        ? prev.primaryTasks.filter((t) => t !== task)
        : [...prev.primaryTasks, task],
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/automation-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to calculate risk assessment')
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

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-green-600'
    if (score <= 40) return 'text-blue-600'
    if (score <= 60) return 'text-yellow-600'
    if (score <= 80) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRiskGradient = (score: number) => {
    if (score <= 20) return 'from-green-500 to-emerald-500'
    if (score <= 40) return 'from-blue-500 to-cyan-500'
    if (score <= 60) return 'from-yellow-500 to-orange-500'
    if (score <= 80) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-600'
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Automation Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how likely your job is to be automated by AI and get strategic recommendations
            for staying relevant in the future of work.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full px-5 py-2.5 w-fit mx-auto">
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
            <span className="text-gray-600">3 minutes</span>
          </div>
        </div>

        {!result ? (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-medium text-purple-600">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Profile</h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Job Title/Role *</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g., Customer Service Representative"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Industry & Sector *
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g., Retail, Technology, Healthcare"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-3">
                      Primary Tasks (select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {TASK_TYPES.map((task) => (
                        <label
                          key={task}
                          className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.primaryTasks.includes(task)}
                            onChange={() => toggleTask(task)}
                            className="w-4 h-4 text-purple-600 rounded"
                          />
                          <span className="text-gray-700">{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Characteristics</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-gray-700">Task Repetitiveness</label>
                      <span className="text-2xl font-bold text-purple-600">
                        {formData.repetitiveness}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.repetitiveness}
                      onChange={(e) =>
                        setFormData({ ...formData, repetitiveness: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Highly Variable</span>
                      <span>Highly Repetitive</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-gray-700">Creativity Required</label>
                      <span className="text-2xl font-bold text-purple-600">
                        {formData.creativityRequired}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.creativityRequired}
                      onChange={(e) =>
                        setFormData({ ...formData, creativityRequired: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Minimal</span>
                      <span>Highly Creative</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-gray-700">Human Interaction</label>
                      <span className="text-2xl font-bold text-purple-600">
                        {formData.humanInteraction}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.humanInteraction}
                      onChange={(e) =>
                        setFormData({ ...formData, humanInteraction: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>No Interaction</span>
                      <span>Constant Interaction</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Problem Complexity
                    </label>
                    <select
                      value={formData.problemComplexity}
                      onChange={(e) =>
                        setFormData({ ...formData, problemComplexity: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {PROBLEM_COMPLEXITY_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Decision-Making Level
                    </label>
                    <select
                      value={formData.decisionMakingLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, decisionMakingLevel: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {DECISION_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.physicalPresence}
                        onChange={(e) =>
                          setFormData({ ...formData, physicalPresence: e.target.checked })
                        }
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="font-medium text-gray-700">Physical Presence Required</span>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Profile</h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Technical Skills</label>
                    <textarea
                      value={formData.technicalSkills}
                      onChange={(e) =>
                        setFormData({ ...formData, technicalSkills: e.target.value })
                      }
                      placeholder="e.g., Python programming, Data analysis, CAD software"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Soft Skills</label>
                    <textarea
                      value={formData.softSkills}
                      onChange={(e) => setFormData({ ...formData, softSkills: e.target.value })}
                      placeholder="e.g., Communication, Leadership, Problem-solving"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Digital Literacy Level
                    </label>
                    <select
                      value={formData.digitalLiteracy}
                      onChange={(e) =>
                        setFormData({ ...formData, digitalLiteracy: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
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
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.jobTitle || !formData.industry}
                    className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Analyzing...' : 'Get Risk Assessment'}
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
            {/* Risk Score */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Automation Risk Score</h2>
              <div
                className={`text-7xl font-bold ${getRiskColor(result.automationRiskScore)} mb-2`}
              >
                {result.automationRiskScore}
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-4">{result.riskCategory}</div>
              <div className="max-w-2xl mx-auto">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getRiskGradient(result.automationRiskScore)}`}
                    style={{ width: `${result.automationRiskScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tasks at Risk */}
            {result.tasksAtRisk && result.tasksAtRisk.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Tasks at Risk of Automation
                </h3>
                <div className="space-y-4">
                  {result.tasksAtRisk.map((task: any, index: number) => (
                    <div
                      key={index}
                      className="border-l-4 border-red-500 pl-4 p-3 bg-red-50 rounded-r-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900">{task.task}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(task.riskLevel)}`}
                        >
                          {task.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{task.explanation}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="bg-white px-2 py-1 rounded">
                          Timeline: {task.timeline}
                        </span>
                        <span className="bg-white px-2 py-1 rounded">
                          Technology: {task.technology}
                        </span>
                        <span className="bg-white px-2 py-1 rounded">
                          {task.percentageOfRole}% of role
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Likely Human */}
            {result.tasksLikelyHuman && result.tasksLikelyHuman.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Tasks Likely to Remain Human
                </h3>
                <div className="space-y-4">
                  {result.tasksLikelyHuman.map((task: any, index: number) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-500 pl-4 p-3 bg-green-50 rounded-r-lg"
                    >
                      <div className="font-bold text-gray-900 mb-2">{task.task}</div>
                      <p className="text-sm text-gray-700 mb-2">{task.whySafe}</p>
                      {task.skillsToEmphasize && task.skillsToEmphasize.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {task.skillsToEmphasize.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="bg-white px-2 py-1 rounded text-xs text-green-700 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {result.actionPlan && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Action Plan</h3>
                <div className="space-y-6">
                  {result.actionPlan.immediate && (
                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          1
                        </span>
                        Immediate Actions ({result.actionPlan.immediate.timeframe})
                      </h4>
                      <div className="space-y-3 ml-11">
                        {result.actionPlan.immediate.skills && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Skills to Develop:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {result.actionPlan.immediate.skills.map(
                                (skill: string, i: number) => (
                                  <li key={i}>{skill}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {result.actionPlan.mediumTerm && (
                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          2
                        </span>
                        Medium-Term ({result.actionPlan.mediumTerm.timeframe})
                      </h4>
                      <div className="space-y-3 ml-11">
                        {result.actionPlan.mediumTerm.adjacentRoles && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">
                              Adjacent Roles to Explore:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {result.actionPlan.mediumTerm.adjacentRoles.map(
                                (role: string, i: number) => (
                                  <li key={i}>{role}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {result.actionPlan.longTerm && (
                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          3
                        </span>
                        Long-Term ({result.actionPlan.longTerm.timeframe})
                      </h4>
                      <div className="space-y-3 ml-11">
                        <p className="text-gray-700">
                          {result.actionPlan.longTerm.transformationStrategy}
                        </p>
                        {result.actionPlan.longTerm.futureProofRoles && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Future-Proof Roles:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {result.actionPlan.longTerm.futureProofRoles.map(
                                (role: string, i: number) => (
                                  <li key={i}>{role}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recommended Skills */}
            {result.recommendedSkills && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills to Develop</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {result.recommendedSkills.humanCentricSkills &&
                    result.recommendedSkills.humanCentricSkills.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Human-Centric Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.recommendedSkills.humanCentricSkills.map(
                            (skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {result.recommendedSkills.technicalSkillsForAI &&
                    result.recommendedSkills.technicalSkillsForAI.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Technical AI Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.recommendedSkills.technicalSkillsForAI.map(
                            (skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
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
                Assess Another Role
              </button>
              <Link
                href="/career-tools"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center"
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
