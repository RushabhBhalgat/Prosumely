/**
 * Leadership Readiness Score Calculator
 * Multi-step form with AI-powered assessment
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// Type definitions
interface SoftSkillRating {
  [key: string]: number
}

interface FormData {
  yearsExperience: number
  currentRole: string
  teamSize: number
  leadershipSkills: string[]
  softSkills: SoftSkillRating
  achievements: string[]
  targetRole: string
  industry: string
}

interface CategoryScore {
  score: number
  maxScore: number
  percentage: number
  label: string
  feedback: string
}

interface DevelopmentArea {
  area: string
  importance: 'critical' | 'high' | 'medium'
  currentGap: string
  recommendation: string
  impact: 'high' | 'medium' | 'low'
  timeframe: string
}

interface ActionPlanItem {
  priority: 'immediate' | 'short-term' | 'medium-term'
  timeframe: string
  actions: string[]
}

interface Certification {
  name: string
  provider: string
  relevance: 'high' | 'medium'
  timeframe: string
  costRange: string
  rationale: string
}

interface Resource {
  type: 'book' | 'course' | 'podcast' | 'blog'
  title: string
  author: string
  relevance: string
  priority: 'high' | 'medium'
}

interface TargetRoleGap {
  readinessPercentage: number
  estimatedTimeToReady: string
  criticalGaps: string[]
  quickWins: string[]
}

interface AssessmentResult {
  overallScore: number
  scoreCategory: string
  summary: string
  categoryScores: {
    experience: CategoryScore
    currentRole: CategoryScore
    teamSize: CategoryScore
    leadershipSkills: CategoryScore
    softSkills: CategoryScore
    achievements: CategoryScore
    industry: CategoryScore
  }
  strengths: string[]
  developmentAreas: DevelopmentArea[]
  actionPlan: ActionPlanItem[]
  recommendedCertifications: Certification[]
  recommendedResources: Resource[]
  nextSteps: string[]
  benchmarkComparison: {
    percentile: number
    message: string
    context: string
  }
  targetRoleGap: TargetRoleGap
}

interface ApiResponse {
  assessment: AssessmentResult
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
const ROLE_LEVELS = [
  'Individual Contributor',
  'Senior Individual Contributor',
  'Team Lead',
  'Manager',
  'Senior Manager',
  'Director',
  'Senior Director',
  'VP/C-Suite',
]

const LEADERSHIP_SKILLS = [
  'Strategic Planning',
  'Team Building & Development',
  'Conflict Resolution',
  'Decision Making',
  'Communication & Presentation',
  'Delegation',
  'Performance Management',
  'Budget Management',
  'Cross-functional Collaboration',
  'Change Management',
  'Emotional Intelligence',
  'Vision Setting',
]

const SOFT_SKILLS = [
  'Emotional Intelligence',
  'Active Listening',
  'Empathy',
  'Adaptability',
  'Resilience',
  'Accountability',
  'Influence & Persuasion',
]

const ACHIEVEMENTS = [
  'Led a successful project/initiative',
  'Mentored junior team members',
  'Driven process improvements',
  'Managed cross-functional teams',
  'Presented to senior leadership/stakeholders',
  'Handled crisis/critical situations',
  'Implemented cost-saving measures',
  'Championed organizational change',
  'Recruited and onboarded team members',
  'Delivered training/workshops',
]

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Other',
]

export default function LeadershipReadinessCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    yearsExperience: 5,
    currentRole: 'Individual Contributor',
    teamSize: 0,
    leadershipSkills: [],
    softSkills: SOFT_SKILLS.reduce((acc, skill) => ({ ...acc, [skill]: 3 }), {}),
    achievements: [],
    targetRole: '',
    industry: '',
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle array items
  const toggleArrayItem = (field: 'leadershipSkills' | 'achievements', item: string) => {
    setFormData((prev) => {
      const array = prev[field]
      const newArray = array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
      return { ...prev, [field]: newArray }
    })
  }

  // Update soft skill rating
  const updateSoftSkill = (skill: string, rating: number) => {
    setFormData((prev) => ({
      ...prev,
      softSkills: { ...prev.softSkills, [skill]: rating },
    }))
  }

  // Calculate form completion
  const getStepCompletion = (step: number): number => {
    switch (step) {
      case 1:
        return formData.currentRole && formData.yearsExperience > 0 ? 100 : 50
      case 2:
        return (formData.leadershipSkills.length / LEADERSHIP_SKILLS.length) * 100
      case 3:
        const avgRating =
          Object.values(formData.softSkills).reduce((a, b) => a + b, 0) /
          Object.values(formData.softSkills).length
        const achievementPercent = (formData.achievements.length / ACHIEVEMENTS.length) * 100
        return (avgRating / 5) * 50 + achievementPercent * 0.5
      case 4:
        return formData.targetRole.length > 10 ? 100 : 50
      default:
        return 0
    }
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

  // Submit assessment
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setResult(null)

    try {
      const response = await fetch('/api/leadership-readiness-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
          setError(errorData.message || errorData.error || 'Failed to calculate assessment')
        }
        return
      }

      const successData = data as ApiResponse
      setResult(successData.assessment)

      // Scroll to results
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

  // Helper functions
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 55) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 85) return "You're Leadership Material!"
    if (score >= 70) return "You're On The Right Track"
    if (score >= 55) return 'Solid Foundation, Room to Grow'
    if (score >= 40) return 'Focus on Building Core Skills'
    return 'Start Your Leadership Journey'
  }

  const getImportanceBadgeColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'short-term':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'medium-term':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-amber-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
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
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Leadership Readiness Score
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover your leadership potential and get a personalized roadmap to advance into
            management and executive roles.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full px-5 py-2.5 w-fit mx-auto">
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
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="font-semibold text-blue-700">Action Plan</span>
            </div>
          </div>
        </div>

        {/* Progress Steps - Modern Design */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6">
              {[
                { num: 1, label: 'Experience', icon: 'briefcase' },
                { num: 2, label: 'Skills', icon: 'zap' },
                { num: 3, label: 'Achievements', icon: 'award' },
                { num: 4, label: 'Goals', icon: 'target' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep === step.num
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg scale-110 ring-4 ring-orange-100'
                          : currentStep > step.num
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {currentStep > step.num ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : step.icon === 'briefcase' ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ) : step.icon === 'zap' ? (
                        <svg
                          className="w-6 h-6"
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
                      ) : step.icon === 'award' ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
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
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                        currentStep === step.num
                          ? 'text-orange-600'
                          : currentStep > step.num
                            ? 'text-emerald-600'
                            : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 h-1 mx-2">
                      <div
                        className={`h-full rounded transition-all duration-300 ${
                          currentStep > step.num ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Percentage */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full px-5 py-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-orange-700">
                  {Math.round(
                    ((currentStep - 1) / totalSteps) * 100 +
                      getStepCompletion(currentStep) / totalSteps,
                  )}
                  % Complete
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form Steps */}
        {!result && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            {/* Step Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full px-5 py-2 mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                <span className="text-sm font-semibold text-orange-700">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>

            {/* Step 1: Experience & Role */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Tell us about your experience
                </h2>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Years of Professional Experience: {formData.yearsExperience}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={formData.yearsExperience}
                    onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 years</span>
                    <span>20 years</span>
                    <span>40 years</span>
                  </div>
                </div>

                {/* Current Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Role Level
                  </label>
                  <select
                    value={formData.currentRole}
                    onChange={(e) => updateFormData('currentRole', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    {ROLE_LEVELS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Team Size Currently Managed: {formData.teamSize}
                    {formData.teamSize === 0 && ' (Individual Contributor)'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.teamSize}
                    onChange={(e) => updateFormData('teamSize', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100+</span>
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Industry (Optional)
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Leadership Skills */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Which leadership skills do you have?
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Select all the leadership competencies you've demonstrated in your career
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {LEADERSHIP_SKILLS.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.leadershipSkills.includes(skill)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.leadershipSkills.includes(skill)}
                        onChange={() => toggleArrayItem('leadershipSkills', skill)}
                        className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{skill}</span>
                    </label>
                  ))}
                </div>

                <div className="text-sm text-gray-500 text-center">
                  {formData.leadershipSkills.length} of {LEADERSHIP_SKILLS.length} selected
                </div>
              </div>
            )}

            {/* Step 3: Soft Skills & Achievements */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Soft Skills */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    Rate your soft skills & achievements
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    How would you rate your proficiency in these areas? (1 = Developing, 5 = Expert)
                  </p>

                  <div className="space-y-4">
                    {SOFT_SKILLS.map((skill) => (
                      <div key={skill} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{skill}</span>
                          <span className="text-sm text-gray-500">
                            {formData.softSkills[skill]}/5
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => updateSoftSkill(skill, rating)}
                              className={`flex-1 h-10 rounded-lg transition-all ${
                                (formData.softSkills[skill] || 0) >= rating
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your leadership achievements
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select all the leadership accomplishments you've achieved
                  </p>

                  <div className="space-y-3">
                    {ACHIEVEMENTS.map((achievement) => (
                      <label
                        key={achievement}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.achievements.includes(achievement)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.achievements.includes(achievement)}
                          onChange={() => toggleArrayItem('achievements', achievement)}
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                        />
                        <span className="ml-3 text-gray-700">{achievement}</span>
                      </label>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 text-center mt-4">
                    {formData.achievements.length} of {ACHIEVEMENTS.length} selected
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Target Role */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  What's your leadership goal?
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Tell us about the leadership position you're targeting
                </p>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Target Leadership Role
                  </label>
                  <textarea
                    value={formData.targetRole}
                    onChange={(e) => updateFormData('targetRole', e.target.value)}
                    placeholder="e.g., Engineering Manager leading a team of 8-10 software engineers, Product Director overseeing 3 product lines, VP of Sales managing regional teams..."
                    className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    maxLength={200}
                  />
                  <div className="text-sm text-gray-500 text-right mt-2">
                    {formData.targetRole.length}/200 characters
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">💡 Pro Tip</p>
                      <p>
                        Be specific about the role level, team size, and key responsibilities. This
                        helps us provide more personalized recommendations for your career path.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="group flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Previous</span>
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="group flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
                >
                  <span>Continue</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.targetRole.trim()}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing Your Profile...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6"
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
                        <span>Get My Leadership Score</span>
                      </>
                    )}
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div
            className={`border-2 rounded-2xl p-6 animate-fade-in-up ${
              rateLimitState.isRateLimited
                ? 'bg-amber-50 border-amber-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    rateLimitState.isRateLimited ? 'bg-amber-100' : 'bg-red-100'
                  }`}
                >
                  <svg
                    className={`h-6 w-6 ${rateLimitState.isRateLimited ? 'text-amber-500' : 'text-red-500'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    rateLimitState.isRateLimited ? 'text-amber-800' : 'text-red-800'
                  }`}
                >
                  {rateLimitState.isRateLimited ? 'Hourly Limit Reached' : 'Something went wrong'}
                </h3>
                <div
                  className={`${rateLimitState.isRateLimited ? 'text-amber-700' : 'text-red-700'}`}
                >
                  {rateLimitState.isRateLimited ? (
                    <div className="space-y-3">
                      <p className="whitespace-pre-line">{error}</p>
                      {rateLimitState.retryAfter && (
                        <div className="bg-amber-100 rounded-lg p-3 text-sm">
                          <p className="font-medium text-amber-800">💡 What can you do now?</p>
                          <ul className="mt-2 space-y-1 text-amber-700 list-disc list-inside">
                            <li>
                              Wait {rateLimitState.retryAfter} minutes for your limit to reset
                            </li>
                            <li>Save your responses and come back later</li>
                            <li>
                              Consider our{' '}
                              <Link
                                href="/executive-resume-writing-service"
                                className="text-amber-600 underline hover:text-amber-500"
                              >
                                professional executive resume service
                              </Link>{' '}
                              for expert guidance
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div ref={resultsRef} className="space-y-6 animate-fade-in-up">
            {/* Overall Score Card */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl border border-orange-100 p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Leadership Readiness Score
                </h2>
                <div className="mb-4">
                  <span className={`text-7xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}
                  </span>
                  <span className="text-3xl text-gray-500">/100</span>
                </div>
                <p className={`text-2xl font-semibold mb-3 ${getScoreColor(result.overallScore)}`}>
                  {getScoreMessage(result.overallScore)}
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Category Scores */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Score Breakdown by Category
              </h3>
              <div className="space-y-4">
                {Object.entries(result.categoryScores).map(([key, category]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{category.label}</span>
                      <span className="text-sm text-gray-600">
                        {category.score}/{category.maxScore} ({category.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 italic">{category.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            {result.strengths && result.strengths.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Your Leadership Strengths
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200"
                    >
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Areas */}
            {result.developmentAreas && result.developmentAreas.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Areas for Development
                </h3>
                <div className="space-y-4">
                  {result.developmentAreas.map((area, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{area.area}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImportanceBadgeColor(area.importance)}`}
                        >
                          {area.importance.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Gap:</span> {area.currentGap}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Recommendation:</span> {area.recommendation}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {area.timeframe}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${
                            area.impact === 'high'
                              ? 'bg-red-100 text-red-700'
                              : area.impact === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {area.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {result.actionPlan && result.actionPlan.length > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-xl border border-orange-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl mb-4">
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Your Personalized Action Plan
                  </h3>
                  <p className="text-gray-600">
                    Follow these prioritized steps to advance your leadership readiness
                  </p>
                </div>

                <div className="space-y-4">
                  {result.actionPlan.map((plan, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-700 font-bold rounded-lg">
                            {index + 1}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadgeColor(plan.priority)}`}
                          >
                            {plan.priority.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{plan.timeframe}</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start space-x-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Role Gap Analysis */}
            {result.targetRoleGap && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Readiness for Your Target Role
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Current Readiness</h4>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-orange-600">
                        {result.targetRoleGap.readinessPercentage}%
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Estimated time to ready:{' '}
                      <span className="font-medium">
                        {result.targetRoleGap.estimatedTimeToReady}
                      </span>
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Benchmark Comparison</h4>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-blue-600">
                        {result.benchmarkComparison.percentile}
                        <span className="text-2xl">th</span>
                      </span>
                      <span className="text-lg text-gray-600 ml-2">percentile</span>
                    </div>
                    <p className="text-gray-600 text-sm">{result.benchmarkComparison.message}</p>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Critical Gaps to Address
                    </h4>
                    <ul className="space-y-2">
                      {result.targetRoleGap.criticalGaps.map((gap, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Quick Wins
                    </h4>
                    <ul className="space-y-2">
                      {result.targetRoleGap.quickWins.map((win, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Recommended Resources */}
            {result.recommendedResources && result.recommendedResources.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Recommended Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.recommendedResources.map((resource, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                          {resource.type.toUpperCase()}
                        </span>
                        {resource.priority === 'high' && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mt-3">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{resource.author}</p>
                      <p className="text-sm text-gray-700 mt-2 italic">{resource.relevance}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {result.recommendedCertifications && result.recommendedCertifications.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Recommended Certifications
                </h3>
                <div className="space-y-4">
                  {result.recommendedCertifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{cert.provider}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cert.relevance === 'high'
                              ? 'bg-orange-100 text-orange-700 border border-orange-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-300'
                          }`}
                        >
                          {cert.relevance.toUpperCase()} RELEVANCE
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{cert.rationale}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                        <span>⏱ {cert.timeframe}</span>
                        <span>💰 {cert.costRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps */}
            {result.nextSteps && result.nextSteps.length > 0 && (
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2"
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
                  Immediate Next Steps
                </h3>
                <ul className="space-y-3">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Section */}
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
                <h3 className="text-3xl font-bold mb-4">Ready to Make the Leap?</h3>
                <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
                  Transform your leadership assessment into career advancement. Our professional
                  executive resume writers create compelling, achievement-focused resumes that
                  position you for senior roles and showcase your leadership potential.
                </p>
                <Link
                  href="/executive-resume-writing-service"
                  className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Your Executive Resume
                  <svg
                    className="w-5 h-5 ml-2"
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
                <p className="text-sm text-white/80 mt-4">
                  ATS-optimized • Achievement-focused • Leadership-branded
                </p>
              </div>
            </div>

            {/* Retake Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null)
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
