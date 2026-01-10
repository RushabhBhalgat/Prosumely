/**
 * Expected Salary Analyzer by Country, Experience & Industry
 * Production-ready, SEO-optimized tool with interactive visualizations
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Type definitions
interface SalaryRange {
  min: number
  max: number
  median: number
  currency: string
  currencySymbol: string
}

interface Percentile {
  p10: number
  p25: number
  p50: number
  p75: number
  p90: number
}

interface SalaryBreakdown {
  baseSalary: number
  bonus: number
  stockOptions: number
  benefits: number
  total: number
}

interface CountryComparison {
  country: string
  salary: number
  costOfLivingAdjusted: number
  purchasingPower: number
  flag: string
}

interface IndustryComparison {
  industry: string
  avgSalary: number
  difference: number
  percentageDiff: number
}

interface NegotiationInsight {
  category: string
  insights: string[]
  priority: 'high' | 'medium' | 'low'
}

interface SalaryAnalysis {
  salaryRange: SalaryRange
  percentiles: Percentile
  confidenceScore: number
  dataSampleSize: number
  salaryBreakdown: SalaryBreakdown
  yearOverYearGrowth: {
    year: number
    growth: number
  }[]
  countryComparisons: CountryComparison[]
  experienceImpact: {
    years: number
    expectedSalary: number
  }[]
  industryComparisons: IndustryComparison[]
  costOfLivingAdjusted: {
    adjustedSalary: number
    purchasingPowerRank: number
    insights: string
  }
  negotiationInsights: NegotiationInsight[]
  marketInsights: string[]
  summary: string
}

// Country data with flags
const countries = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱' },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮' },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
]

const industries = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting',
  'Real Estate',
  'Legal',
  'Marketing & Advertising',
  'Energy & Utilities',
  'Telecommunications',
  'Pharmaceuticals',
  'Aerospace & Defense',
  'Transportation & Logistics',
  'Hospitality & Tourism',
  'Media & Entertainment',
  'Construction',
  'Agriculture',
  'Government & Public Sector',
]

const companySizes = [
  { label: 'Startup (1-50)', value: 'startup' },
  { label: 'Small (50-200)', value: 'small' },
  { label: 'Medium (200-1000)', value: 'medium' },
  { label: 'Large (1000-5000)', value: 'large' },
  { label: 'Enterprise (5000+)', value: 'enterprise' },
]

const educationLevels = [
  { label: 'High School', value: 'high_school' },
  { label: 'Associate Degree', value: 'associate' },
  { label: "Bachelor's Degree", value: 'bachelor' },
  { label: "Master's Degree", value: 'master' },
  { label: 'PhD/Doctorate', value: 'phd' },
]

const workModes = [
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Onsite', value: 'onsite' },
]

export default function SalaryAnalyzer() {
  // Form state
  const [country, setCountry] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [yearsExperience, setYearsExperience] = useState<number>(0)
  const [industry, setIndustry] = useState('')
  const [city, setCity] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [education, setEducation] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [workMode, setWorkMode] = useState('')

  // UI state
  const [analysis, setAnalysis] = useState<SalaryAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<{
    isRateLimited: boolean
    retryAfter?: number
    resetTime?: string
  }>({ isRateLimited: false })
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'negotiation'>('overview')
  const [countrySearch, setCountrySearch] = useState('')
  const [industrySearch, setIndustrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)

  // Filter countries based on search
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  // Filter industries based on search
  const filteredIndustries = industries.filter((i) =>
    i.toLowerCase().includes(industrySearch.toLowerCase()),
  )

  const handleAddSkill = () => {
    if (skillInput.trim() && skills.length < 15) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    // Validation
    if (!country || !jobTitle || !industry) {
      setError('Please fill in all required fields: Country, Job Title, and Industry')
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setAnalysis(null)

    try {
      const response = await fetch('/api/salary-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          jobTitle,
          yearsExperience,
          industry,
          city: city || null,
          companySize: companySize || null,
          education: education || null,
          skills,
          workMode: workMode || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorData = data

        // Handle rate limiting specifically
        if (response.status === 429 || errorData.error === 'RATE_LIMIT_EXCEEDED') {
          // Check if it's our rate limit or Gemini's rate limit
          const isGeminiRateLimit =
            errorData.message?.includes('Gemini') || errorData.message?.includes('AI service')

          setRateLimitState({
            isRateLimited: true,
            retryAfter: errorData.retryAfter,
            resetTime: response.headers.get('X-RateLimit-Reset') || undefined,
          })

          if (isGeminiRateLimit) {
            setError(errorData.message || 'AI service rate limit exceeded. Please try again later.')
          } else {
            setError(
              errorData.message ||
                `Rate limit exceeded. You can make ${errorData.tier === 'free' ? '4 requests per hour' : '10 requests per hour'}. Time until reset: ${Math.ceil(errorData.retryAfter / 60)} minutes.`,
            )
          }
        } else {
          setError(errorData.message || errorData.error || 'Analysis failed')
        }
        return
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key for skills
  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-green-600"
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Expected Salary Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get data-driven salary insights based on country, experience, industry, and role.
            Compare salaries globally and negotiate with confidence.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Form - Sticky on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h2>

                {/* Required Fields Section */}
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Required Fields
                  </div>

                  {/* Country Dropdown with Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country/Region *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value)
                          setCountrySearch(e.target.value)
                          setShowCountryDropdown(true)
                        }}
                        onFocus={() => setShowCountryDropdown(true)}
                        placeholder="Search country..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                      {showCountryDropdown && filteredCountries.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setCountry(c.name)
                                setCountrySearch(c.name)
                                setShowCountryDropdown(false)
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-green-50 flex items-center gap-2 transition-colors"
                            >
                              <span className="text-xl">{c.flag}</span>
                              <span className="text-sm text-gray-700">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title/Role *
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Software Engineer, Marketing Manager"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience: {yearsExperience}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(Number(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${(yearsExperience / 40) * 100}%, #d1fae5 ${(yearsExperience / 40) * 100}%, #d1fae5 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Entry Level</span>
                      <span>Senior</span>
                      <span>Executive</span>
                    </div>
                  </div>

                  {/* Industry Dropdown with Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry Sector *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value)
                          setIndustrySearch(e.target.value)
                          setShowIndustryDropdown(true)
                        }}
                        onFocus={() => setShowIndustryDropdown(true)}
                        placeholder="Search industry..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                      {showIndustryDropdown && filteredIndustries.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredIndustries.map((ind) => (
                            <button
                              key={ind}
                              onClick={() => {
                                setIndustry(ind)
                                setIndustrySearch(ind)
                                setShowIndustryDropdown(false)
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-green-50 text-sm text-gray-700 transition-colors"
                            >
                              {ind}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional Fields Section */}
                <div className="space-y-4 pt-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Optional Fields (For More Accurate Results)
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City/Metro Area
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., New York, London"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select size...</option>
                      {companySizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Education Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Level
                    </label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select level...</option>
                      {educationLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Work Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Arrangement
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {workModes.map((mode) => (
                        <button
                          key={mode.value}
                          onClick={() => setWorkMode(workMode === mode.value ? '' : mode.value)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            workMode === mode.value
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills/Certifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills/Certifications (Max 15)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleSkillKeyPress}
                        placeholder="Add a skill..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                        disabled={skills.length >= 15}
                      />
                      <button
                        onClick={handleAddSkill}
                        disabled={!skillInput.trim() || skills.length >= 15}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(index)}
                            className="hover:text-green-900 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !country || !jobTitle || !industry}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Analyze Salary Expectations'
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-lg border ${
                      rateLimitState.isRateLimited
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        {rateLimitState.isRateLimited ? (
                          <svg
                            className="w-6 h-6 text-amber-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-1 ${
                            rateLimitState.isRateLimited ? 'text-amber-800' : 'text-red-800'
                          }`}
                        >
                          {rateLimitState.isRateLimited
                            ? error?.includes('Gemini') || error?.includes('AI service')
                              ? 'AI Service Limit Reached'
                              : 'Hourly Limit Reached'
                            : 'Something went wrong'}
                        </h3>
                        <div
                          className={`${
                            rateLimitState.isRateLimited ? 'text-amber-700' : 'text-red-700'
                          }`}
                        >
                          {rateLimitState.isRateLimited ? (
                            <div className="space-y-3">
                              <p className="whitespace-pre-line">{error}</p>
                              {rateLimitState.retryAfter && (
                                <div className="bg-amber-100 rounded-lg p-3 text-sm">
                                  <p className="font-medium text-amber-800">
                                    💡 What can you do now?
                                  </p>
                                  <ul className="mt-2 space-y-1 text-amber-700 list-disc list-inside">
                                    <li>
                                      Wait{' '}
                                      {rateLimitState.retryAfter >= 60
                                        ? `${Math.ceil(rateLimitState.retryAfter / 60)} minutes`
                                        : `${rateLimitState.retryAfter} seconds`}{' '}
                                      for your limit to reset
                                    </li>
                                    <li>Save your information and come back later</li>
                                    <li>
                                      Try our other{' '}
                                      <Link
                                        href="/career-tools"
                                        className="underline hover:text-amber-900"
                                      >
                                        free career tools
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm">{error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!analysis && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100"
                  >
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
                      <svg
                        className="w-16 h-16 text-green-600"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Discover Your Worth?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Fill in your details and click &quot;Analyze Salary Expectations&quot; to get
                      comprehensive salary insights powered by AI and real-world data.
                    </p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100"
                  >
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
                      <svg
                        className="w-16 h-16 text-green-600 animate-pulse"
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
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Analyzing Salary Data...
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Our AI is processing global compensation data, market trends, and regional
                      factors to provide accurate insights.
                    </p>
                    <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Tabs */}
                    <div className="bg-white rounded-t-2xl shadow-xl border-b border-gray-200">
                      <div className="flex overflow-x-auto">
                        {[
                          { id: 'overview', label: 'Salary Overview', icon: '💰' },
                          { id: 'comparison', label: 'Comparisons', icon: '📊' },
                          { id: 'negotiation', label: 'Negotiation Tips', icon: '🤝' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all ${
                              activeTab === tab.id
                                ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-b-2xl shadow-xl p-6">
                      <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            {/* Summary */}
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Summary Insights
                              </h3>
                              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                            </div>

                            {/* Salary Range Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                  Expected Salary Range
                                </h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">Confidence:</span>
                                  <span className="font-semibold text-green-600">
                                    {analysis.confidenceScore}%
                                  </span>
                                </div>
                              </div>

                              {/* Salary Values */}
                              <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                  <div className="text-sm text-gray-600 mb-1">Minimum</div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    {analysis.salaryRange.currencySymbol}
                                    {analysis.salaryRange.min.toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-500">
                                  <div className="text-sm text-green-600 mb-1">Median</div>
                                  <div className="text-2xl font-bold text-green-600">
                                    {analysis.salaryRange.currencySymbol}
                                    {analysis.salaryRange.median.toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                  <div className="text-sm text-gray-600 mb-1">Maximum</div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    {analysis.salaryRange.currencySymbol}
                                    {analysis.salaryRange.max.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              {/* Percentile Distribution */}
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                  Percentile Distribution
                                </h4>
                                <div className="relative h-12 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg overflow-hidden">
                                  {[
                                    { value: analysis.percentiles.p10, label: 'P10' },
                                    { value: analysis.percentiles.p25, label: 'P25' },
                                    { value: analysis.percentiles.p50, label: 'P50' },
                                    { value: analysis.percentiles.p75, label: 'P75' },
                                    { value: analysis.percentiles.p90, label: 'P90' },
                                  ].map((p, idx) => {
                                    const percentage =
                                      ((p.value - analysis.salaryRange.min) /
                                        (analysis.salaryRange.max - analysis.salaryRange.min)) *
                                      100
                                    return (
                                      <div
                                        key={idx}
                                        className="absolute top-0 bottom-0 w-0.5 bg-gray-900"
                                        style={{ left: `${percentage}%` }}
                                      >
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-900 whitespace-nowrap">
                                          {p.label}
                                        </div>
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                                          {analysis.salaryRange.currencySymbol}
                                          {p.value.toLocaleString()}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                              <div className="text-xs text-gray-500 text-center mt-8">
                                Based on {analysis.dataSampleSize.toLocaleString()} data points
                              </div>
                            </div>

                            {/* Salary Breakdown */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Compensation Breakdown
                              </h3>
                              <div className="space-y-3">
                                {[
                                  {
                                    label: 'Base Salary',
                                    value: analysis.salaryBreakdown.baseSalary,
                                    color: 'bg-green-500',
                                  },
                                  {
                                    label: 'Bonus',
                                    value: analysis.salaryBreakdown.bonus,
                                    color: 'bg-blue-500',
                                  },
                                  {
                                    label: 'Stock Options',
                                    value: analysis.salaryBreakdown.stockOptions,
                                    color: 'bg-purple-500',
                                  },
                                  {
                                    label: 'Benefits Value',
                                    value: analysis.salaryBreakdown.benefits,
                                    color: 'bg-orange-500',
                                  },
                                ].map((item, idx) => {
                                  const percentage =
                                    (item.value / analysis.salaryBreakdown.total) * 100
                                  return (
                                    <div key={idx}>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-700 font-medium">
                                          {item.label}
                                        </span>
                                        <span className="text-gray-900 font-semibold">
                                          {analysis.salaryRange.currencySymbol}
                                          {item.value.toLocaleString()} ({percentage.toFixed(0)}%)
                                        </span>
                                      </div>
                                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                          style={{ width: `${percentage}%` }}
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                                <div className="pt-3 border-t border-gray-200 mt-3">
                                  <div className="flex justify-between text-base font-bold">
                                    <span>Total Compensation</span>
                                    <span className="text-green-600">
                                      {analysis.salaryRange.currencySymbol}
                                      {analysis.salaryBreakdown.total.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Year-over-Year Growth */}
                            {analysis.yearOverYearGrowth &&
                              analysis.yearOverYearGrowth.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Historical Salary Trends
                                  </h3>
                                  <div className="space-y-2">
                                    {analysis.yearOverYearGrowth.map((trend, idx) => (
                                      <div
                                        key={idx}
                                        className="flex justify-between items-center py-2"
                                      >
                                        <span className="text-gray-700 font-medium">
                                          {trend.year}
                                        </span>
                                        <span
                                          className={`font-semibold ${trend.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                          {trend.growth >= 0 ? '+' : ''}
                                          {trend.growth.toFixed(1)}%
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* Experience Impact */}
                            {analysis.experienceImpact && analysis.experienceImpact.length > 0 && (
                              <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                  How Experience Affects Salary
                                </h3>
                                <div className="space-y-2">
                                  {analysis.experienceImpact.map((exp, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between items-center py-2"
                                    >
                                      <span className="text-gray-700 font-medium">
                                        {exp.years} {exp.years === 1 ? 'year' : 'years'}
                                      </span>
                                      <span className="text-gray-900 font-semibold">
                                        {analysis.salaryRange.currencySymbol}
                                        {exp.expectedSalary.toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Cost of Living Adjusted */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Cost of Living Adjustment
                              </h3>
                              <div className="mb-3">
                                <div className="text-sm text-gray-700 mb-1">
                                  Purchasing Power Equivalent
                                </div>
                                <div className="text-3xl font-bold text-blue-600">
                                  {analysis.salaryRange.currencySymbol}
                                  {analysis.costOfLivingAdjusted.adjustedSalary.toLocaleString()}
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {analysis.costOfLivingAdjusted.insights}
                              </p>
                              <div className="mt-4 flex items-center gap-2 text-sm">
                                <span className="text-gray-600">Purchasing Power Rank:</span>
                                <span className="font-semibold text-gray-900">
                                  #{analysis.costOfLivingAdjusted.purchasingPowerRank}
                                </span>
                              </div>
                            </div>

                            {/* Market Insights */}
                            {analysis.marketInsights && analysis.marketInsights.length > 0 && (
                              <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                  Market Insights
                                </h3>
                                <ul className="space-y-3">
                                  {analysis.marketInsights.map((insight, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <svg
                                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="text-gray-700">{insight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {activeTab === 'comparison' && (
                          <motion.div
                            key="comparison"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            {/* Country Comparisons */}
                            {analysis.countryComparisons &&
                              analysis.countryComparisons.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Top 5 Countries for {jobTitle}
                                  </h3>
                                  <div className="space-y-4">
                                    {analysis.countryComparisons.map((comp, idx) => (
                                      <div
                                        key={idx}
                                        className="border border-gray-200 rounded-lg p-4"
                                      >
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                            <span className="text-3xl">{comp.flag}</span>
                                            <div>
                                              <div className="font-bold text-gray-900">
                                                {comp.country}
                                              </div>
                                              <div className="text-sm text-gray-500">
                                                #{idx + 1} Globally
                                              </div>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">
                                              {analysis.salaryRange.currencySymbol}
                                              {comp.salary.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                          <div>
                                            <div className="text-gray-600">Cost-Adjusted</div>
                                            <div className="font-semibold text-gray-900">
                                              {analysis.salaryRange.currencySymbol}
                                              {comp.costOfLivingAdjusted.toLocaleString()}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-gray-600">Purchasing Power</div>
                                            <div className="font-semibold text-green-600">
                                              {comp.purchasingPower}%
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* Industry Comparisons */}
                            {analysis.industryComparisons &&
                              analysis.industryComparisons.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Industry Salary Comparison in {country}
                                  </h3>
                                  <div className="space-y-4">
                                    {analysis.industryComparisons.map((comp, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                                      >
                                        <div className="flex-1">
                                          <div className="font-semibold text-gray-900">
                                            {comp.industry}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            Avg. {analysis.salaryRange.currencySymbol}
                                            {comp.avgSalary.toLocaleString()}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div
                                            className={`font-bold ${comp.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                          >
                                            {comp.difference >= 0 ? '+' : ''}
                                            {analysis.salaryRange.currencySymbol}
                                            {Math.abs(comp.difference).toLocaleString()}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            ({comp.percentageDiff >= 0 ? '+' : ''}
                                            {comp.percentageDiff.toFixed(1)}%)
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </motion.div>
                        )}

                        {activeTab === 'negotiation' && (
                          <motion.div
                            key="negotiation"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            {/* Negotiation Insights */}
                            {analysis.negotiationInsights &&
                              analysis.negotiationInsights.length > 0 && (
                                <div className="space-y-4">
                                  {analysis.negotiationInsights.map((insight, idx) => (
                                    <div
                                      key={idx}
                                      className={`border-l-4 rounded-lg p-6 ${
                                        insight.priority === 'high'
                                          ? 'bg-red-50 border-red-500'
                                          : insight.priority === 'medium'
                                            ? 'bg-yellow-50 border-yellow-500'
                                            : 'bg-blue-50 border-blue-500'
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-gray-900 text-lg">
                                              {insight.category}
                                            </h4>
                                            <span
                                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                                insight.priority === 'high'
                                                  ? 'bg-red-200 text-red-800'
                                                  : insight.priority === 'medium'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : 'bg-blue-200 text-blue-800'
                                              }`}
                                            >
                                              {insight.priority.toUpperCase()} PRIORITY
                                            </span>
                                          </div>
                                          <ul className="space-y-2">
                                            {insight.insights.map((tip, tipIdx) => (
                                              <li key={tipIdx} className="flex items-start gap-2">
                                                <svg
                                                  className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5"
                                                  fill="currentColor"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                                <span className="text-gray-700">{tip}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        {!analysis && !loading && (
          <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Use Our Salary Analyzer?
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Data-Driven Salary Intelligence
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our AI-powered Expected Salary Analyzer provides comprehensive compensation
                    insights based on real-world data from global markets. Whether you&apos;re
                    negotiating a new offer, planning a career move, or evaluating if you&apos;re
                    being paid fairly, our tool delivers actionable intelligence tailored to your
                    specific situation.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">What You&apos;ll Get:</h3>
                  <ul className="space-y-3">
                    {[
                      'Detailed salary ranges with minimum, median, and maximum values',
                      'Percentile distribution showing where different salaries fall',
                      'Compensation breakdown (base, bonus, stock, benefits)',
                      'Historical salary trends and growth rates',
                      'Global country comparisons with cost-of-living adjustments',
                      'Industry-specific salary benchmarks',
                      'Experience impact analysis',
                      'Strategic negotiation insights and tactics',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg
                          className="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect For:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Job seekers preparing for salary negotiations',
                      'Professionals evaluating if they&apos;re underpaid',
                      'Career changers understanding salary implications',
                      'Remote workers comparing international salaries',
                      'Hiring managers setting competitive offers',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
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
