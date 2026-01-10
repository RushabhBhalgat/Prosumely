/**
 * Next Job Recommender
 * AI-powered career transition recommendations
 */

'use client'

import { useState, useRef } from 'react'

// Type definitions
interface FormData {
  currentRole: string
  companySize: string
  industry: string
  yearsExperience: number
  yearsInCurrentRole: number
  skills: string[]
  education: string
  achievements: string[]
  industriesOfInterest: string[]
  workStyle: string
  companySizePreference: string
  location: string
  minSalary: number
  targetSalary: number
  careerDirection: string
  timeline: string
  riskTolerance: string
  priorities: string[]
}

interface MatchBreakdown {
  skillsMatch: number
  experienceMatch: number
  cultureMatch: number
  salaryMatch: number
  growthPotential: number
}

interface Recommendation {
  jobTitle: string
  roleSummary: string
  matchScore: number
  matchBreakdown: MatchBreakdown
  whyThisRole: string
  transferableSkills: string[]
  transitionDifficulty: 'easy' | 'moderate' | 'challenging'
  salaryRange: { min: number; max: number; median: number }
  exampleCompanies: string[]
  skillsToDevelop: Array<{ skill: string; priority: 'high' | 'medium' | 'low' }>
  successProbability: number
  careerTrajectory: { twoYears: string; fiveYears: string; tenYears: string }
  prosAndCons: { pros: string[]; cons: string[] }
  immediateActions: string[]
}

interface ApiResponse {
  recommendations: Recommendation[]
  hiddenOpportunities: string[]
  overallInsights: string[]
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
}

// Constants
const COMPANY_SIZES = [
  'Startup (1-50)',
  'Small (51-200)',
  'Medium (201-1000)',
  'Large (1000+)',
  'Enterprise (10000+)',
]
const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting',
  'Media',
  'Real Estate',
  'Other',
]
const EDUCATION_LEVELS = [
  'High School',
  'Associate',
  'Bachelor',
  'Master',
  'PhD',
  'Professional Certification',
]
const WORK_STYLES = ['Office-based', 'Remote', 'Hybrid', 'Flexible']
const CAREER_DIRECTIONS = [
  'Vertical (Management)',
  'Horizontal (Cross-functional)',
  'Specialist (Deep expertise)',
  'Entrepreneurial',
]
const TIMELINES = [
  'Immediate (0-3 months)',
  'Short-term (3-6 months)',
  'Medium-term (6-12 months)',
  'Long-term (1-2 years)',
]
const RISK_LEVELS = ['Low (Stable roles)', 'Medium (Some uncertainty)', 'High (Startups/change)']
const PRIORITIES = [
  'Work-Life Balance',
  'High Compensation',
  'Career Growth',
  'Impact/Purpose',
  'Innovation',
  'Job Security',
  'Learning',
  'Leadership',
]
const SKILLS = [
  'Project Management',
  'Data Analysis',
  'Team Leadership',
  'Communication',
  'Problem Solving',
  'Technical Skills',
  'Strategy',
  'Sales',
  'Marketing',
  'Design',
  'Engineering',
  'Operations',
]
const ACHIEVEMENTS = [
  'Led major projects',
  'Grew revenue/metrics',
  'Built teams',
  'Improved processes',
  'Won awards',
  'Published/presented',
  'Launched products',
  'Drove innovation',
]

export default function NextJobRecommender() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    currentRole: '',
    companySize: '',
    industry: '',
    yearsExperience: 5,
    yearsInCurrentRole: 2,
    skills: [],
    education: '',
    achievements: [],
    industriesOfInterest: [],
    workStyle: '',
    companySizePreference: '',
    location: '',
    minSalary: 50000,
    targetSalary: 80000,
    careerDirection: '',
    timeline: '',
    riskTolerance: '',
    priorities: [],
  })
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (
    field: 'skills' | 'achievements' | 'industriesOfInterest' | 'priorities',
    item: string,
  ) => {
    setFormData((prev) => {
      const array = prev[field]
      const newArray = array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
      return { ...prev, [field]: newArray }
    })
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
    setRateLimitState({ isRateLimited: false })
    setResult(null)

    try {
      const response = await fetch('/api/next-job-recommender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data: ApiResponse | ApiError = await response.json()

      if (!response.ok) {
        const errorData = data as ApiError
        if (response.status === 429 || errorData.error === 'RATE_LIMIT_EXCEEDED') {
          setRateLimitState({
            isRateLimited: true,
            retryAfter: errorData.retryAfter,
          })
          setError(errorData.message || 'Rate limit exceeded')
        } else {
          setError(errorData.message || errorData.error || 'Failed to get recommendations')
        }
        return
      }

      setResult(data as ApiResponse)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 border-green-300',
      moderate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      challenging: 'bg-red-100 text-red-700 border-red-300',
    }
    return colors[difficulty as keyof typeof colors] || colors.moderate
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-gray-100 text-gray-700 border-gray-300',
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const RadialChart = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = size / 2 - 10
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getMatchColor(score)}`}>{score}</span>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Position</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => updateFormData('currentRole', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      updateFormData('yearsExperience', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years in Current Role
                  </label>
                  <input
                    type="number"
                    value={formData.yearsInCurrentRole}
                    onChange={(e) =>
                      updateFormData('yearsInCurrentRole', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => updateFormData('companySize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => updateFormData('education', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select education</option>
                  {EDUCATION_LEVELS.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Skills & Achievements</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Key Skills
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleArrayItem('skills', skill)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-orange-50 border-orange-500 text-orange-700 font-medium'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Career Achievements
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((achievement) => (
                  <button
                    key={achievement}
                    onClick={() => toggleArrayItem('achievements', achievement)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                      formData.achievements.includes(achievement)
                        ? 'bg-orange-50 border-orange-500 text-orange-700 font-medium'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {achievement}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Industries of Interest
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => toggleArrayItem('industriesOfInterest', ind)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.industriesOfInterest.includes(ind)
                        ? 'bg-orange-50 border-orange-500 text-orange-700 font-medium'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Style Preference
              </label>
              <select
                value={formData.workStyle}
                onChange={(e) => updateFormData('workStyle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select work style</option>
                {WORK_STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Company Size
              </label>
              <select
                value={formData.companySizePreference}
                onChange={(e) => updateFormData('companySizePreference', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select size preference</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Remote, New York, Anywhere"
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Goals & Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Salary ($)
                </label>
                <input
                  type="number"
                  value={formData.minSalary}
                  onChange={(e) => updateFormData('minSalary', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Salary ($)
                </label>
                <input
                  type="number"
                  value={formData.targetSalary}
                  onChange={(e) => updateFormData('targetSalary', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Direction
              </label>
              <select
                value={formData.careerDirection}
                onChange={(e) => updateFormData('careerDirection', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select direction</option>
                {CAREER_DIRECTIONS.map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => updateFormData('timeline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                {TIMELINES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
              <select
                value={formData.riskTolerance}
                onChange={(e) => updateFormData('riskTolerance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select risk level</option>
                {RISK_LEVELS.map((risk) => (
                  <option key={risk} value={risk}>
                    {risk}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Top Priorities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PRIORITIES.map((priority) => (
                  <button
                    key={priority}
                    onClick={() => toggleArrayItem('priorities', priority)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.priorities.includes(priority)
                        ? 'bg-orange-50 border-orange-500 text-orange-700 font-medium'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-amber-50/50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Next Job Recommender
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered recommendations for your next career move based on your experience and
            goals.
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
          </div>
        </div>

        {!result && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2"></div>
            <div className="p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-16 md:w-32 h-1 mx-2 ${currentStep > step ? 'bg-orange-500' : 'bg-gray-200'}`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-600 text-sm">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>

              {renderStep()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:shadow-lg transition-shadow"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Get Recommendations'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-700 mt-1">{error}</p>
                {rateLimitState.isRateLimited && rateLimitState.retryAfter && (
                  <p className="text-red-600 mt-2 text-sm">
                    Please try again in {rateLimitState.retryAfter} seconds.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {result && (
          <div ref={resultsRef} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Career Recommendations</h2>
              <div className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{rec.jobTitle}</h3>
                          <p className="text-gray-600 mb-4">{rec.roleSummary}</p>
                          <div className="flex items-center space-x-4 flex-wrap gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyBadge(rec.transitionDifficulty)}`}
                            >
                              {rec.transitionDifficulty}
                            </span>
                            <span className="text-sm text-gray-600">
                              ${rec.salaryRange.min.toLocaleString()} - $
                              {rec.salaryRange.max.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600">
                              {rec.successProbability}% Success Probability
                            </span>
                          </div>
                        </div>
                        <div className="ml-6">
                          <RadialChart score={rec.matchScore} size={100} />
                        </div>
                      </div>
                    </div>

                    {expandedCard === idx && (
                      <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Match Breakdown</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {Object.entries(rec.matchBreakdown).map(([key, value]) => (
                              <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                                <div className={`text-2xl font-bold ${getMatchColor(value)}`}>
                                  {value}%
                                </div>
                                <div className="text-xs text-gray-600 mt-1 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Why This Role</h4>
                          <p className="text-gray-700">{rec.whyThisRole}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Transferable Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.transferableSkills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Skills to Develop</h4>
                          <div className="space-y-2">
                            {rec.skillsToDevelop.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                              >
                                <span className="text-gray-700">{item.skill}</span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(item.priority)}`}
                                >
                                  {item.priority}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Pros</h4>
                            <ul className="space-y-2">
                              {rec.prosAndCons.pros.map((pro, i) => (
                                <li key={i} className="flex items-start space-x-2 text-gray-700">
                                  <span className="text-green-500 mt-1">✓</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Cons</h4>
                            <ul className="space-y-2">
                              {rec.prosAndCons.cons.map((con, i) => (
                                <li key={i} className="flex items-start space-x-2 text-gray-700">
                                  <span className="text-red-500 mt-1">✗</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Career Trajectory</h4>
                          <div className="space-y-3">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <div className="font-medium text-blue-900 mb-1">2 Years</div>
                              <p className="text-blue-700 text-sm">
                                {rec.careerTrajectory.twoYears}
                              </p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                              <div className="font-medium text-purple-900 mb-1">5 Years</div>
                              <p className="text-purple-700 text-sm">
                                {rec.careerTrajectory.fiveYears}
                              </p>
                            </div>
                            <div className="bg-indigo-50 rounded-lg p-4">
                              <div className="font-medium text-indigo-900 mb-1">10 Years</div>
                              <p className="text-indigo-700 text-sm">
                                {rec.careerTrajectory.tenYears}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Example Companies</h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.exampleCompanies.map((company, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-200"
                              >
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions</h4>
                          <ul className="space-y-2">
                            {rec.immediateActions.map((action, i) => (
                              <li
                                key={i}
                                className="flex items-start space-x-3 bg-amber-50 rounded-lg p-3"
                              >
                                <span className="text-amber-600 font-bold">{i + 1}.</span>
                                <span className="text-gray-700">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {result.hiddenOpportunities && result.hiddenOpportunities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hidden Opportunities</h3>
                <ul className="space-y-3">
                  {result.hiddenOpportunities.map((opp, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <svg
                        className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-purple-800">{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.overallInsights && result.overallInsights.length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Insights</h3>
                <ul className="space-y-3">
                  {result.overallInsights.map((insight, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                setResult(null)
                setCurrentStep(1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
