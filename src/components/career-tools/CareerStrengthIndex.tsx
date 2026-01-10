/**
 * Career Strength Index - Comprehensive Career Health Assessment
 * Multi-step form with AI-powered 360-degree career evaluation
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

// Type definitions
interface FormData {
  // Professional Profile
  currentRole: string
  industry: string
  yearsExperience: number
  education: string
  certifications: string[]
  skills: string[]

  // Career Assets
  majorAchievements: string[]
  linkedInConnections: number
  networkQuality: number // 1-10
  publicationsSpeeches: number
  portfolioQuality: number // 1-10
  managementExperience: string

  // Market Position
  jobChangesLast5Years: number
  salaryGrowthYoY: number
  recruiterContactsPerMonth: number
  applicationResponseRate: number // percentage
}

interface DimensionScore {
  score: number
  maxScore: number
  percentage: number
  label: string
  feedback: string
  strengths: string[]
  gaps: string[]
}

interface AssessmentResult {
  overallScore: number
  percentileRank: number

  dimensionScores: {
    skillsExpertise: DimensionScore
    experienceQuality: DimensionScore
    educationCredentials: DimensionScore
    networkRelationships: DimensionScore
    personalBrand: DimensionScore
    marketDemand: DimensionScore
    careerMomentum: DimensionScore
  }

  topStrengths: Array<{
    area: string
    description: string
    competitiveAdvantage: string
  }>

  topGaps: Array<{
    area: string
    impact: string
    priority: 'high' | 'medium' | 'low'
  }>

  quickWins: Array<{
    action: string
    timeframe: string
    impactOnScore: number
  }>

  longTermInvestments: Array<{
    area: string
    strategy: string
    timeline: string
    expectedImpact: string
  }>

  competitivePositioning: {
    vsIndustryPeers: string
    vsCareerStage: string
    aheadIn: string[]
    behindIn: string[]
  }

  actionPlan: {
    thirtyDayBoosts: string[]
    ninetyDayProjects: string[]
    oneYearStrategy: string[]
  }
}

const LeadershipReadinessCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [formData, setFormData] = useState<FormData>({
    currentRole: '',
    industry: '',
    yearsExperience: 5,
    education: '',
    certifications: [],
    skills: [],
    majorAchievements: ['', '', ''],
    linkedInConnections: 500,
    networkQuality: 5,
    publicationsSpeeches: 0,
    portfolioQuality: 5,
    managementExperience: '',
    jobChangesLast5Years: 0,
    salaryGrowthYoY: 5,
    recruiterContactsPerMonth: 0,
    applicationResponseRate: 0,
  })

  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateAchievement = (index: number, value: string) => {
    const updated = [...formData.majorAchievements]
    updated[index] = value
    updateFormData('majorAchievements', updated)
  }

  const toggleSkill = (skill: string) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill]
    updateFormData('skills', updated)
  }

  const toggleCertification = (cert: string) => {
    const updated = formData.certifications.includes(cert)
      ? formData.certifications.filter((c) => c !== cert)
      : [...formData.certifications, cert]
    updateFormData('certifications', updated)
  }

  const getStepCompletion = (step: number): number => {
    switch (step) {
      case 1:
        return formData.currentRole && formData.industry && formData.education ? 100 : 0
      case 2:
        return formData.skills.length > 0 ? 100 : 0
      case 3:
        return formData.majorAchievements.some((a) => a.trim()) ? 100 : 0
      case 4:
        return 100
      default:
        return 0
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.currentRole && formData.industry && formData.education
      case 2:
        return formData.skills.length > 0
      case 3:
        return formData.majorAchievements.some((a) => a.trim())
      case 4:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/career-strength-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
          throw new Error(errorData.message || 'Rate limit exceeded. Please try again later.')
        }
        throw new Error(errorData.message || 'Failed to calculate assessment')
      }

      const data = await response.json()
      setResult(data.assessment)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      console.error('Assessment error:', err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setResult(null)
    setError('')
    setFormData({
      currentRole: '',
      industry: '',
      yearsExperience: 5,
      education: '',
      certifications: [],
      skills: [],
      majorAchievements: ['', '', ''],
      linkedInConnections: 500,
      networkQuality: 5,
      publicationsSpeeches: 0,
      portfolioQuality: 5,
      managementExperience: '',
      jobChangesLast5Years: 0,
      salaryGrowthYoY: 5,
      recruiterContactsPerMonth: 0,
      applicationResponseRate: 0,
    })
  }

  const commonSkills = [
    'Leadership',
    'Project Management',
    'Data Analysis',
    'Communication',
    'Problem Solving',
    'Strategic Planning',
    'Team Building',
    'Sales',
    'Marketing',
    'Software Development',
    'Cloud Computing',
    'AI/Machine Learning',
    'Financial Analysis',
    'Product Management',
    'UX/UI Design',
    'Public Speaking',
    'Negotiation',
    'Change Management',
  ]

  const educationLevels = [
    'High School',
    'Associate Degree',
    "Bachelor's Degree",
    "Master's Degree",
    'MBA',
    'PhD/Doctorate',
    'Professional Certification',
    'Self-Taught',
  ]

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Consulting',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Media',
    'Government',
    'Non-Profit',
    'Other',
  ]

  const managementLevels = [
    'No Management Experience',
    'Team Lead (2-5 people)',
    'Manager (5-15 people)',
    'Senior Manager (15-30 people)',
    'Director (30-50 people)',
    'VP/Executive (50+ people)',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Career Assessment Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Strength Index
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive 360-degree assessment of your career health and competitiveness across
            skills, experience, network, brand, and market demand.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="font-semibold text-blue-700">7 Dimension Analysis</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-green-600"
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
              <span className="font-semibold text-green-700">Action Plan</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              {[
                { num: 1, label: 'Profile', icon: 'user' },
                { num: 2, label: 'Skills', icon: 'star' },
                { num: 3, label: 'Assets', icon: 'award' },
                { num: 4, label: 'Market', icon: 'trending' },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep === step.num
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-110 ring-4 ring-blue-100'
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
                      ) : (
                        <span>{step.num}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                        currentStep === step.num
                          ? 'text-blue-600'
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

            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-5 py-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700">
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

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
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
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700 whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Steps */}
        {!result && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-5 py-2 mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-700">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>

            {/* Step 1: Professional Profile */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Professional Profile
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Role
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => updateFormData('currentRole', e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Years of Experience: {formData.yearsExperience}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={formData.yearsExperience}
                    onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 years</span>
                    <span>20 years</span>
                    <span>40+ years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Highest Education Level
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => updateFormData('education', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Education</option>
                    {educationLevels.map((edu) => (
                      <option key={edu} value={edu}>
                        {edu}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Management Experience
                  </label>
                  <select
                    value={formData.managementExperience}
                    onChange={(e) => updateFormData('managementExperience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Level</option>
                    {managementLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Skills & Certifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Skills & Certifications
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Key Skills (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.skills.includes(skill)
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.skills.length} skills
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Career Assets */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Career Assets & Brand
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Major Achievements (List top 3)
                  </label>
                  {formData.majorAchievements.map((achievement, index) => (
                    <textarea
                      key={index}
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder={`Achievement ${index + 1}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-3"
                      rows={2}
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    LinkedIn Connections: {formData.linkedInConnections}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={formData.linkedInConnections}
                    onChange={(e) =>
                      updateFormData('linkedInConnections', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>2,500</span>
                    <span>5,000+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Network Quality (Connections to decision-makers): {formData.networkQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.networkQuality}
                    onChange={(e) => updateFormData('networkQuality', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Publications/Speaking Engagements: {formData.publicationsSpeeches}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={formData.publicationsSpeeches}
                    onChange={(e) =>
                      updateFormData('publicationsSpeeches', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>25</span>
                    <span>50+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Portfolio Quality: {formData.portfolioQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.portfolioQuality}
                    onChange={(e) => updateFormData('portfolioQuality', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Basic</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Market Position */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Market Position & Momentum
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Job Changes (Last 5 Years): {formData.jobChangesLast5Years}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.jobChangesLast5Years}
                    onChange={(e) =>
                      updateFormData('jobChangesLast5Years', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>5</span>
                    <span>10+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Average Salary Growth (Year over Year): {formData.salaryGrowthYoY}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={formData.salaryGrowthYoY}
                    onChange={(e) => updateFormData('salaryGrowthYoY', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>15%</span>
                    <span>30%+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Recruiter Contacts per Month: {formData.recruiterContactsPerMonth}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={formData.recruiterContactsPerMonth}
                    onChange={(e) =>
                      updateFormData('recruiterContactsPerMonth', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                    <span>20+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Application Response Rate: {formData.applicationResponseRate}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={formData.applicationResponseRate}
                    onChange={(e) =>
                      updateFormData('applicationResponseRate', parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Previous
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ml-auto ${
                    canProceed()
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              )}
              {currentStep === totalSteps && (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ml-auto ${
                    loading || !canProceed()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Analyzing...</span>
                    </span>
                  ) : (
                    'Calculate Career Strength Index'
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Career Strength Index</h2>
                <div className="relative inline-block">
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="20"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="white"
                      strokeWidth="20"
                      strokeDasharray={`${result.overallScore * 5.65} 565`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{result.overallScore}</span>
                    <span className="text-sm opacity-90">out of 100</span>
                  </div>
                </div>
                <p className="text-lg mt-4 opacity-95">
                  You rank in the{' '}
                  <span className="font-bold">{result.percentileRank}th percentile</span> for your
                  industry
                </p>
              </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dimension Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(result.dimensionScores).map(([key, dimension]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{dimension.label}</span>
                      <span className="text-sm text-gray-600">
                        {dimension.score}/{dimension.maxScore} ({dimension.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${dimension.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{dimension.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Gaps */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
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
                  Top Strengths
                </h3>
                <div className="space-y-3">
                  {result.topStrengths.map((strength, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-700 mb-1">{strength.area}</h4>
                      <p className="text-sm text-gray-700 mb-1">{strength.description}</p>
                      <p className="text-xs text-emerald-600 font-medium">
                        {strength.competitiveAdvantage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Top Gaps
                </h3>
                <div className="space-y-3">
                  {result.topGaps.map((gap, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-orange-700">{gap.area}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            gap.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : gap.priority === 'medium'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{gap.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Quick Wins</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.quickWins.map((win, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">{win.action}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-600 font-medium">{win.timeframe}</span>
                      <span className="text-green-600 font-bold">+{win.impactOnScore} points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Action Plan</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 mb-3 flex items-center">
                    <span className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      30
                    </span>
                    30-Day Boosts
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.thirtyDayBoosts.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-700 mb-3 flex items-center">
                    <span className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      90
                    </span>
                    90-Day Projects
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.ninetyDayProjects.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-purple-700 mb-3 flex items-center">
                    <span className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      1Y
                    </span>
                    1-Year Strategy
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.oneYearStrategy.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Competitive Positioning */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Positioning</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">You're Ahead In:</h4>
                  <ul className="space-y-1">
                    {result.competitivePositioning.aheadIn.map((area, index) => (
                      <li key={index} className="flex items-center text-sm text-green-700">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">You're Behind In:</h4>
                  <ul className="space-y-1">
                    {result.competitivePositioning.behindIn.map((area, index) => (
                      <li key={index} className="flex items-center text-sm text-red-700">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">vs. Industry Peers:</span>{' '}
                  {result.competitivePositioning.vsIndustryPeers}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">vs. Career Stage:</span>{' '}
                  {result.competitivePositioning.vsCareerStage}
                </p>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center pt-6">
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            About Career Strength Index
          </h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 mb-4">
              The Career Strength Index provides a comprehensive 360-degree assessment of your
              overall career health and competitiveness. Unlike traditional career assessments that
              focus on a single dimension, our tool evaluates seven critical areas that determine
              your career success and market value.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How It Works</h3>
            <p className="text-gray-700 mb-4">
              Our AI-powered assessment analyzes your professional profile across multiple
              dimensions including skills, experience quality, education, network strength, personal
              brand, market demand, and career momentum. Each dimension is weighted based on its
              impact on career success and compared against industry benchmarks.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Use This Tool</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Get an objective measure of your overall career position</li>
              <li>Identify specific strengths to leverage in negotiations and job searches</li>
              <li>Discover gaps that may be holding back your career progression</li>
              <li>Receive a personalized action plan with quick wins and long-term strategies</li>
              <li>Track your career health over time with periodic assessments</li>
              <li>Make data-driven decisions about career investments and changes</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Related Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/career-tools/leadership-readiness-score"
                className="block p-4 bg-orange-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-orange-700 mb-1">Leadership Readiness Score</h4>
                <p className="text-sm text-gray-600">
                  Assess your leadership potential and get development recommendations
                </p>
              </Link>
              <Link
                href="/career-tools/skill-gap-analyzer"
                className="block p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-blue-700 mb-1">Skill Gap Analyzer</h4>
                <p className="text-sm text-gray-600">
                  Identify missing skills for your target role
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadershipReadinessCalculator
