/**
 * Career Roadmap Generator - Personalized Career Progression Planner
 * Multi-step form with interactive visual roadmap and AI-powered analysis
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// Type definitions
interface FormData {
  currentRole: string
  currentExperience: number
  totalExperience: number
  targetRole: string
  currentIndustry: string
  targetIndustry: string
  country: string
  currentSkills: string[]
  educationLevel: string
  willingToStudy: boolean
  timelineGoal: 'aggressive' | 'moderate' | 'patient'
  budgetConstraints: string
  timeAvailability: string
  geographicMobility: boolean
  interests: string[]
}

interface Phase {
  name: string
  duration: string
  objectives: string[]
  skills: string[]
  certifications: string[]
  expectedRoles: string[]
  salaryRange: string
  keyMilestones: string[]
}

interface SkillCategory {
  category: 'foundational' | 'intermediate' | 'advanced' | 'leadership'
  skills: Array<{
    name: string
    priority: 'high' | 'medium' | 'low'
    estimatedTime: string
    resources: string[]
  }>
}

interface ExperienceMilestone {
  milestone: string
  description: string
  timeframe: string
  importance: 'critical' | 'high' | 'medium'
}

interface NetworkingRecommendation {
  type: 'community' | 'conference' | 'content' | 'mentorship'
  name: string
  description: string
  frequency: string
  priority: 'high' | 'medium' | 'low'
}

interface AlternativePath {
  name: string
  description: string
  duration: string
  pros: string[]
  cons: string[]
  suitableFor: string[]
}

interface RiskFactor {
  risk: string
  likelihood: 'high' | 'medium' | 'low'
  impact: string
  mitigation: string
}

interface ActionableTasks {
  next30Days: string[]
  next3Months: string[]
  nextYear: string[]
  longTerm: string[]
}

interface RoadmapResult {
  overviewSummary: string
  estimatedDuration: string
  successProbability: number
  phases: Phase[]
  skillsDevelopment: SkillCategory[]
  experienceMilestones: ExperienceMilestone[]
  networkingBrand: NetworkingRecommendation[]
  alternativePaths: AlternativePath[]
  risksReality: RiskFactor[]
  actionableTasks: ActionableTasks
  marketInsights: {
    demandLevel: 'high' | 'medium' | 'low'
    competitionLevel: 'high' | 'medium' | 'low'
    growthProjection: string
    averageSalaryProgression: string
  }
}

interface ApiResponse {
  roadmap: RoadmapResult
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
const EDUCATION_LEVELS = [
  'High School',
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD/Doctorate',
  'Professional Certification',
  'Bootcamp/Self-Taught',
]

const TIMELINE_GOALS = [
  { value: 'aggressive', label: 'Aggressive (2-3 years)', description: 'Fast-track progression' },
  { value: 'moderate', label: 'Moderate (4-5 years)', description: 'Balanced approach' },
  { value: 'patient', label: 'Patient (6+ years)', description: 'Steady and thorough' },
]

const COMMON_SKILLS = [
  'Leadership',
  'Project Management',
  'Data Analysis',
  'Programming',
  'Cloud Computing',
  'Machine Learning',
  'Agile Methodologies',
  'Strategic Planning',
  'Financial Analysis',
  'Marketing Strategy',
  'Sales',
  'Customer Success',
  'Product Management',
  'UI/UX Design',
  'DevOps',
  'Cybersecurity',
  'Business Intelligence',
  'Communication',
  'Public Speaking',
  'Team Management',
]

const BUDGET_OPTIONS = [
  'Under $2,000/year',
  '$2,000-$5,000/year',
  '$5,000-$10,000/year',
  '$10,000-$20,000/year',
  'Over $20,000/year',
  'No specific budget',
]

const TIME_AVAILABILITY = [
  '1-5 hours/week',
  '5-10 hours/week',
  '10-20 hours/week',
  '20+ hours/week',
  'Full-time commitment possible',
]

const INTERESTS = [
  'Technical Deep-Dive',
  'People Management',
  'Strategic Leadership',
  'Innovation & R&D',
  'Sales & Revenue',
  'Operations & Efficiency',
  'Customer Experience',
  'Product Development',
  'Consulting',
  'Entrepreneurship',
]

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'Australia',
  'Singapore',
  'Netherlands',
  'Switzerland',
  'United Arab Emirates',
  'India',
  'Other',
]

export default function CareerRoadmapGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    currentRole: '',
    currentExperience: 0,
    totalExperience: 0,
    targetRole: '',
    currentIndustry: '',
    targetIndustry: '',
    country: '',
    currentSkills: [],
    educationLevel: '',
    willingToStudy: false,
    timelineGoal: 'moderate',
    budgetConstraints: '',
    timeAvailability: '',
    geographicMobility: false,
    interests: [],
  })
  const [result, setResult] = useState<RoadmapResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 5

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle array items
  const toggleArrayItem = (field: 'currentSkills' | 'interests', item: string) => {
    setFormData((prev) => {
      const array = prev[field]
      const newArray = array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
      return { ...prev, [field]: newArray }
    })
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

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.currentRole.length > 2 &&
          formData.targetRole.length > 2 &&
          formData.currentExperience > 0
        )
      case 2:
        return formData.currentIndustry.length > 2 && formData.country.length > 2
      case 3:
        return formData.currentSkills.length > 0 && formData.educationLevel.length > 0
      case 4:
        return formData.budgetConstraints.length > 0 && formData.timeAvailability.length > 0
      case 5:
        return true
      default:
        return false
    }
  }

  // Submit roadmap generation
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setResult(null)

    try {
      const response = await fetch('/api/career-roadmap-generator', {
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
          setError(errorData.message || errorData.error || 'Failed to generate roadmap')
        }
        return
      }

      const successData = data as ApiResponse
      setResult(successData.roadmap)

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } catch (err) {
      console.error('Roadmap generation error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setCurrentStep(1)
    setFormData({
      currentRole: '',
      currentExperience: 0,
      totalExperience: 0,
      targetRole: '',
      currentIndustry: '',
      targetIndustry: '',
      country: '',
      currentSkills: [],
      educationLevel: '',
      willingToStudy: false,
      timelineGoal: 'moderate',
      budgetConstraints: '',
      timeAvailability: '',
      geographicMobility: false,
      interests: [],
    })
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-2 mb-4">
          <span className="text-purple-700 font-semibold text-sm">AI-Powered Career Planning</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Career Roadmap Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get your personalized career progression plan with skills, certifications, milestones, and
          actionable timelines to reach your dream role.
        </p>
      </div>

      {!result ? (
        <>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Step 1: Career Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Career Journey Basics
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Role/Position *
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => updateFormData('currentRole', e.target.value)}
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years in Current Role *
                    </label>
                    <input
                      type="number"
                      value={formData.currentExperience || ''}
                      onChange={(e) =>
                        updateFormData('currentExperience', parseInt(e.target.value) || 0)
                      }
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Career Experience (Years) *
                    </label>
                    <input
                      type="number"
                      value={formData.totalExperience || ''}
                      onChange={(e) =>
                        updateFormData('totalExperience', parseInt(e.target.value) || 0)
                      }
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Role/Position *
                  </label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => updateFormData('targetRole', e.target.value)}
                    placeholder="e.g., Senior Engineering Manager, VP of Marketing"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Be specific about the role you're aiming for
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Industry & Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Industry & Geographic Context
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Industry/Sector *
                  </label>
                  <input
                    type="text"
                    value={formData.currentIndustry}
                    onChange={(e) => updateFormData('currentIndustry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Industry/Sector
                  </label>
                  <input
                    type="text"
                    value={formData.targetIndustry}
                    onChange={(e) => updateFormData('targetIndustry', e.target.value)}
                    placeholder="Leave blank if same as current industry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Only fill this if you're planning to switch industries
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country/Region *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.geographicMobility}
                    onChange={(e) => updateFormData('geographicMobility', e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    I'm willing to relocate for career opportunities
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Education */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Skills & Educational Background
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Skills (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {COMMON_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleArrayItem('currentSkills', skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.currentSkills.includes(skill)
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {formData.currentSkills.length} skills
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Education Level *
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => updateFormData('educationLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    {EDUCATION_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.willingToStudy}
                    onChange={(e) => updateFormData('willingToStudy', e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    I'm willing to pursue additional education/certifications
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Constraints & Availability */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources & Constraints</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget for Learning & Development *
                  </label>
                  <select
                    value={formData.budgetConstraints}
                    onChange={(e) => updateFormData('budgetConstraints', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time Availability for Learning *
                  </label>
                  <select
                    value={formData.timeAvailability}
                    onChange={(e) => updateFormData('timeAvailability', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select time availability</option>
                    {TIME_AVAILABILITY.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Career Progression Timeline Preference
                  </label>
                  <div className="space-y-3">
                    {TIMELINE_GOALS.map((goal) => (
                      <button
                        key={goal.value}
                        onClick={() =>
                          updateFormData('timelineGoal', goal.value as FormData['timelineGoal'])
                        }
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          formData.timelineGoal === goal.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{goal.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{goal.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Interests & Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Areas of Interest & Review
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Professional Interests (Optional but recommended)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {INTERESTS.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleArrayItem('interests', interest)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Career Plan Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Current Role:</span>{' '}
                      <span className="text-gray-600">{formData.currentRole}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Target Role:</span>{' '}
                      <span className="text-gray-600">{formData.targetRole}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Experience:</span>{' '}
                      <span className="text-gray-600">{formData.totalExperience} years</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Industry:</span>{' '}
                      <span className="text-gray-600">{formData.currentIndustry}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Location:</span>{' '}
                      <span className="text-gray-600">{formData.country}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Timeline:</span>{' '}
                      <span className="text-gray-600">
                        {TIMELINE_GOALS.find((g) => g.value === formData.timelineGoal)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Skills:</span>{' '}
                      <span className="text-gray-600">
                        {formData.currentSkills.length} selected
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Education:</span>{' '}
                      <span className="text-gray-600">{formData.educationLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`ml-auto px-6 py-3 rounded-lg font-medium transition-colors ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !isStepValid()}
                  className={`ml-auto px-8 py-3 rounded-lg font-bold transition-all ${
                    loading || !isStepValid()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
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
                      Generating Your Roadmap...
                    </>
                  ) : (
                    'Generate My Career Roadmap'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
                  {rateLimitState.isRateLimited && rateLimitState.retryAfter && (
                    <p className="text-xs text-red-600 mt-2">
                      Please try again in {Math.ceil(rateLimitState.retryAfter / 60)} minutes
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Results Display */
        <div ref={resultsRef} className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Your Personalized Career Roadmap</h2>
            <p className="text-lg opacity-90 mb-6">{result.overviewSummary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-sm opacity-80">Estimated Duration</div>
                <div className="text-2xl font-bold mt-1">{result.estimatedDuration}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-sm opacity-80">Success Probability</div>
                <div className="text-2xl font-bold mt-1">{result.successProbability}%</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-sm opacity-80">Market Demand</div>
                <div className="text-2xl font-bold mt-1 capitalize">
                  {result.marketInsights.demandLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Progression Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-600"></div>

              {/* Phases */}
              <div className="space-y-8">
                {result.phases.map((phase, index) => (
                  <div key={index} className="relative pl-20">
                    {/* Phase number badge */}
                    <div className="absolute left-0 top-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>

                    {/* Phase content */}
                    <div
                      className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                        selectedPhase === index
                          ? 'border-purple-600 bg-purple-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-purple-400'
                      }`}
                      onClick={() => setSelectedPhase(selectedPhase === index ? null : index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{phase.name}</h4>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {phase.duration}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Expected Roles:</strong> {phase.expectedRoles.join(', ')}
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Salary Range:</strong> {phase.salaryRange}
                      </div>

                      {selectedPhase === index && (
                        <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Objectives:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {phase.objectives.map((obj, i) => (
                                <li key={i}>{obj}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Skills to Acquire:</h5>
                            <div className="flex flex-wrap gap-2">
                              {phase.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">
                              Recommended Certifications:
                            </h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {phase.certifications.map((cert, i) => (
                                <li key={i}>{cert}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Key Milestones:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {phase.keyMilestones.map((milestone, i) => (
                                <li key={i}>{milestone}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      <button className="mt-4 text-sm text-purple-600 font-medium hover:text-purple-700">
                        {selectedPhase === index ? 'Show Less ↑' : 'Show More ↓'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Tasks */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Action Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-900 mb-3 flex items-center">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    !
                  </span>
                  Next 30 Days
                </h4>
                <ul className="space-y-2">
                  {result.actionableTasks.next30Days.map((task, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-bold text-orange-900 mb-3">Next 3 Months</h4>
                <ul className="space-y-2">
                  {result.actionableTasks.next3Months.map((task, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-900 mb-3">Next Year</h4>
                <ul className="space-y-2">
                  {result.actionableTasks.nextYear.map((task, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-bold text-purple-900 mb-3">Long-term Goals</h4>
                <ul className="space-y-2">
                  {result.actionableTasks.longTerm.map((task, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Development Path */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Development Path</h3>
            {result.skillsDevelopment.map((category, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="font-bold text-lg text-gray-900 mb-4 capitalize">
                  {category.category} Skills
                </h4>
                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{skill.name}</h5>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              skill.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : skill.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {skill.priority} priority
                          </span>
                          <span className="text-xs text-gray-500">{skill.estimatedTime}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Resources:</strong> {skill.resources.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Alternative Paths */}
          {result.alternativePaths.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative Career Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.alternativePaths.map((path, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{path.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                    <div className="text-sm mb-4">
                      <span className="font-semibold text-gray-700">Duration:</span> {path.duration}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-green-700 mb-2">Pros:</div>
                        <ul className="space-y-1">
                          {path.pros.map((pro, i) => (
                            <li key={i} className="text-gray-600 flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold text-red-700 mb-2">Cons:</div>
                        <ul className="space-y-1">
                          {path.cons.map((con, i) => (
                            <li key={i} className="text-gray-600 flex items-start">
                              <span className="text-red-500 mr-1">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risks & Reality Check */}
          <div className="bg-yellow-50 rounded-2xl shadow-xl p-8 border-2 border-yellow-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Risks & Reality Check</h3>
            <div className="space-y-4">
              {result.risksReality.map((risk, index) => (
                <div
                  key={index}
                  className="bg-white border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        risk.likelihood === 'high'
                          ? 'bg-red-100 text-red-700'
                          : risk.likelihood === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {risk.likelihood} likelihood
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Impact:</strong> {risk.impact}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-600">Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Market Demand</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2 capitalize">
                  {result.marketInsights.demandLevel}
                </div>
                <p className="text-sm text-gray-600">{result.marketInsights.growthProjection}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Competition Level</h4>
                <div className="text-3xl font-bold text-purple-600 mb-2 capitalize">
                  {result.marketInsights.competitionLevel}
                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Salary Progression</h4>
                <p className="text-gray-700">{result.marketInsights.averageSalaryProgression}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Career?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get expert guidance from Prosumely's career consultants to implement your roadmap
              faster and more effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Generate Another Roadmap
              </button>
              <Link
                href="/career-roadmap-service"
                className="px-8 py-3 bg-purple-800 text-white rounded-lg font-bold hover:bg-purple-900 transition-colors"
              >
                Get Expert Help →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Info Section (always visible) */}
      {!result && (
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Visual Timeline</h4>
                <p className="text-sm text-gray-600">
                  Interactive roadmap with phases, milestones, and progression paths
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Skills Development</h4>
                <p className="text-sm text-gray-600">
                  Prioritized skills with learning resources and estimated time
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Actionable Tasks</h4>
                <p className="text-sm text-gray-600">
                  Concrete actions for next 30 days, 3 months, and beyond
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Alternative Paths</h4>
                <p className="text-sm text-gray-600">
                  Multiple routes to your goal with pros, cons, and recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
