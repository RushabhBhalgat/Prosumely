/**
 * Skill Gap Analyzer - Multi-step form with AI-powered analysis
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// Type definitions
interface FormData {
  currentRole: string
  yearsExperience: number
  currentSkills: string[]
  targetRole: string
  industry: string
  country: string
  timeline: string
}

interface SkillGap {
  skill: string
  importance: number
  currentProficiency: string
  targetProficiency: string
  estimatedHours: number
  difficulty: string
  marketDemand: string
  learningResources?: Array<{
    type: string
    name: string
    platform: string
    cost: string
    hours: number
  }>
}

interface LearningPhase {
  phase: string
  skills: string[]
  milestoneProject: string
}

interface Analysis {
  overallReadinessScore: number
  summary: string
  criticalGaps: SkillGap[]
  importantGaps: SkillGap[]
  niceToHaveGaps: SkillGap[]
  skillsYouHave: Array<{
    skill: string
    proficiency: string
    relevanceToTarget: string
    competitiveAdvantage: string
  }>
  learningRoadmap: {
    totalEstimatedHours: number
    estimatedWeeks: number
    phases: LearningPhase[]
  }
  competitiveAnalysis: {
    yourPercentile: number
    comparisonMessage: string
    strengthAreas: string[]
    weaknessAreas: string[]
  }
  actionPlan: {
    weekByWeekSchedule: string
    portfolioProjects: string[]
    expectedTimeToReady: string
  }
}

interface ApiResponse {
  analysis: Analysis
  processingTime: number
  success: boolean
  error?: string
}

// Predefined skills list for auto-suggestions
const COMMON_SKILLS = [
  'JavaScript',
  'Python',
  'Java',
  'TypeScript',
  'React',
  'Node.js',
  'SQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'Git',
  'MongoDB',
  'PostgreSQL',
  'REST APIs',
  'GraphQL',
  'HTML/CSS',
  'Machine Learning',
  'Data Analysis',
  'Project Management',
  'Agile',
  'Scrum',
  'Leadership',
  'Communication',
  'Problem Solving',
  'Team Collaboration',
  'Strategic Thinking',
  'UI/UX Design',
  'DevOps',
  'CI/CD',
  'Microservices',
  'Cloud Computing',
  'Cybersecurity',
  'Angular',
  'Vue.js',
  'Django',
  'Flask',
  'Spring Boot',
  '.NET',
  'C#',
  'C++',
  'Go',
  'Rust',
]

export default function SkillGapAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    currentRole: '',
    yearsExperience: 0,
    currentSkills: [],
    targetRole: '',
    industry: '',
    country: '',
    timeline: '',
  })
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Analysis | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 3

  // Update form data
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Add skill
  const addSkill = (skill: string) => {
    if (skill && !formData.currentSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skill],
      }))
      setSkillInput('')
    }
  }

  // Remove skill
  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skill),
    }))
  }

  // Navigation
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

  // Submit analysis
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/skill-gap-analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to analyze skill gaps')
        return
      }

      setResult(data.analysis)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGaugeFill = (score: number) => {
    if (score >= 80) return 'stroke-green-500'
    if (score >= 60) return 'stroke-blue-500'
    if (score >= 40) return 'stroke-yellow-500'
    return 'stroke-red-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Skill Gap Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover exactly which skills you need to land your dream role. Get a personalized
            learning roadmap with resources and timeline.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-5 py-2.5 w-fit mx-auto">
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
            <span className="font-semibold text-gray-700">3-Minute Analysis</span>
          </div>
        </div>

        {/* Progress Bar */}
        {!result && (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${currentStep >= step ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}`}
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

        {/* Form Steps */}
        {!result && (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            {/* Step 1: Current Experience */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Your Current Experience</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => updateFormData('currentRole', e.target.value)}
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      updateFormData('yearsExperience', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country/Region *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    placeholder="e.g., United States, United Kingdom, Canada"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={nextStep}
                  disabled={!formData.currentRole || !formData.industry || !formData.country}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Skills
                </button>
              </div>
            )}

            {/* Step 2: Current Skills */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Your Current Skills</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Your Skills *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSkill(skillInput)
                        }
                      }}
                      placeholder="Type a skill and press Enter"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => addSkill(skillInput)}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Type skills like JavaScript, Python, Leadership, etc.
                  </p>
                </div>

                {/* Skill Suggestions */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Add Common Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SKILLS.filter((skill) => !formData.currentSkills.includes(skill))
                      .slice(0, 15)
                      .map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSkill(skill)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Selected Skills */}
                {formData.currentSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Your Skills ({formData.currentSkills.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.currentSkills.map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
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
                    onClick={nextStep}
                    disabled={formData.currentSkills.length === 0}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Target Role
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Target Role */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Your Target Role</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => updateFormData('targetRole', e.target.value)}
                    placeholder="e.g., Senior Software Engineer, Product Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline (Optional)
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateFormData('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                  </select>
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
                    disabled={loading || !formData.targetRole}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-started flex items-center justify-center gap-2"
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
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Skill Gaps'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in-up">
            {/* Overall Readiness Score */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 shadow-xl text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Your Skill Gap Analysis</h2>
                <div className="flex justify-center my-8">
                  <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="white"
                        strokeWidth="12"
                        fill="none"
                        opacity="0.2"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="white"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(result.overallReadinessScore / 100) * 552.64} 552.64`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold">{result.overallReadinessScore}%</div>
                        <div className="text-sm uppercase tracking-wide opacity-90">Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">{result.summary}</p>
              </div>
            </div>

            {/* Critical Gaps */}
            {result.criticalGaps && result.criticalGaps.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-red-200">
                <h3 className="text-2xl font-bold mb-6 text-red-600">Critical Gaps (Must Have)</h3>
                <div className="space-y-4">
                  {result.criticalGaps.map((gap, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-red-500 pl-6 py-4 bg-red-50 rounded-r-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{gap.skill}</h4>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            {gap.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {gap.estimatedHours}h
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Current:</span>
                          <span className="font-semibold ml-2">{gap.currentProficiency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Target:</span>
                          <span className="font-semibold ml-2">{gap.targetProficiency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Market Demand:</span>
                          <span className="font-semibold ml-2">{gap.marketDemand}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Importance:</span>
                          <span className="font-semibold ml-2">{gap.importance}/10</span>
                        </div>
                      </div>
                      {gap.learningResources && gap.learningResources.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Learning Resources:
                          </p>
                          <div className="grid gap-2">
                            {gap.learningResources.slice(0, 3).map((resource, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-white p-3 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{resource.name}</p>
                                  <p className="text-sm text-gray-600">{resource.platform}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-gray-700">
                                    {resource.cost}
                                  </p>
                                  <p className="text-xs text-gray-500">{resource.hours}h</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Gaps */}
            {result.importantGaps && result.importantGaps.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-orange-200">
                <h3 className="text-2xl font-bold mb-6 text-orange-600">
                  Important Gaps (Should Have)
                </h3>
                <div className="space-y-4">
                  {result.importantGaps.map((gap, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{gap.skill}</h4>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                            {gap.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {gap.estimatedHours}h
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current:</span>
                          <span className="font-semibold ml-2">{gap.currentProficiency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Target:</span>
                          <span className="font-semibold ml-2">{gap.targetProficiency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nice-to-Have Gaps */}
            {result.niceToHaveGaps && result.niceToHaveGaps.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">
                  Nice-to-Have Gaps (Bonus Skills)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.niceToHaveGaps.map((gap, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg"
                    >
                      <h4 className="font-bold text-gray-900">{gap.skill}</h4>
                      <p className="text-sm text-gray-600">
                        {gap.estimatedHours}h • {gap.difficulty}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills You Have */}
            {result.skillsYouHave && result.skillsYouHave.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
                <h3 className="text-2xl font-bold mb-6 text-green-600">Skills You Already Have</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.skillsYouHave.map((skill, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900">{skill.skill}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Relevance:</span> {skill.relevanceToTarget}
                      </p>
                      <p className="text-sm text-gray-600">{skill.competitiveAdvantage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Roadmap */}
            {result.learningRoadmap && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-200">
                <h3 className="text-2xl font-bold mb-6 text-purple-600">Your Learning Roadmap</h3>
                <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">
                        {result.learningRoadmap.totalEstimatedHours}h
                      </p>
                      <p className="text-sm text-gray-600">Total Learning Time</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-purple-600">
                        {result.learningRoadmap.estimatedWeeks} weeks
                      </p>
                      <p className="text-sm text-gray-600">At 10h/week</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {result.learningRoadmap.phases.map((phase, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{phase.phase}</h4>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Focus Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Milestone Project:</p>
                        <p className="text-sm text-gray-600">{phase.milestoneProject}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitive Analysis */}
            {result.competitiveAnalysis && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Competitive Analysis</h3>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">You are in the</span>
                    <span className="text-3xl font-bold text-blue-600">
                      {result.competitiveAnalysis.yourPercentile}th
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${result.competitiveAnalysis.yourPercentile}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {result.competitiveAnalysis.comparisonMessage}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-600 mb-3">Your Strengths</h4>
                    <ul className="space-y-2">
                      {result.competitiveAnalysis.strengthAreas.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600 mb-3">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      {result.competitiveAnalysis.weaknessAreas.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Plan */}
            {result.actionPlan && (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Your Action Plan</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Weekly Schedule</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {result.actionPlan.weekByWeekSchedule}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Portfolio Projects to Build</h4>
                    <ul className="space-y-2">
                      {result.actionPlan.portfolioProjects.map((project, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 flex-shrink-0 text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Expected Time to Job-Ready</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.actionPlan.expectedTimeToReady}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Close the Gap?</h3>
              <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
                Get your resume optimized for your target role. Our professional writers highlight
                transferable skills and position you for success.
              </p>
              <Link
                href="/resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Optimize Your Resume
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

            {/* Retake */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null)
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Analyze Another Role
              </button>
            </div>
          </div>
        )}

        {/* Cross-Links Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/career-tools/resume-gap-analyzer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📊 Resume Gap Identifier</h3>
            <p className="text-gray-600 text-sm">
              Analyze your resume against target job descriptions to identify missing skills,
              keywords, and qualifications that could improve your candidacy.
            </p>
          </Link>

          <Link
            href="/career-tools/future-skills-identifier"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              🔮 Future Skills Identifier
            </h3>
            <p className="text-gray-600 text-sm">
              Discover trending skills in your industry and identify which certifications align with
              future job market demands to stay ahead of the curve.
            </p>
          </Link>
        </div>

        {/* Tool Screenshot/Example */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">See It In Action</h3>
          <div className="mb-6">
            <img
              src="https://res.cloudinary.com/dekim1abx/image/upload/v1769925503/Include_real_examples_or_tool_screenshots_showing_typical_outputs_which_increases_perceived_value_and_makes_outreach_easier._gqoywa.jpg"
              alt="Skill Gap Analyzer Tool Screenshot"
              className="w-full rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-600 mt-4 italic text-center">
              See it in action: Our AI analyzes your resume in seconds to pinpoint missing skills
              and build a personalized roadmap for your target role.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/services/resume-review"
            className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
            style={{ color: '#ffffff', textDecoration: 'none' }}
          >
            <div className="flex items-start">
              <svg className="w-12 h-12 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  Free Resume Review
                </h3>
                <p className="text-purple-100 text-sm">
                  Get expert feedback on your resume to increase your chances of landing interviews.
                  Our AI-powered review identifies areas for improvement.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/services/ats-optimized-resume"
            className="block bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
            style={{ color: '#ffffff', textDecoration: 'none' }}
          >
            <div className="flex items-start">
              <svg className="w-12 h-12 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  $20 ATS-Optimized Resume
                </h3>
                <p className="text-blue-100 text-sm">
                  Professional resume writing service optimized for Applicant Tracking Systems.
                  Stand out from the competition with our expert formatting.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
