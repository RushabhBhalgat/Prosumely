/**
 * Global Opportunity Heatmap Component
 * Interactive world map showing job opportunities, salaries, and visa friendliness
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

interface SalaryRange {
  min: number
  max: number
  currency: string
}

interface Country {
  country: string
  countryCode: string
  demandScore: number
  salaryRange: SalaryRange
  visaFriendliness: 'easy' | 'moderate' | 'difficult'
  remoteOpportunities: 'high' | 'medium' | 'low'
  topCities: string[]
  keyIndustries: string[]
  insights: string
  costOfLiving?: 'high' | 'medium' | 'low'
}

interface SkillDemand {
  skill: string
  demandLevel: 'very_high' | 'high' | 'moderate' | 'low'
  topCountries: string[]
  salaryImpact: 'high' | 'medium' | 'low'
}

interface RemoteWorkInsights {
  availability: 'high' | 'medium' | 'low'
  topRemoteCountries: string[]
  remoteJobPercentage: number
  insights: string
}

interface VisaInsights {
  easiestCountries: string[]
  sponsorshipAvailability: 'common' | 'limited' | 'rare'
  popularPrograms: string[]
  insights: string
}

interface Recommendation {
  type: 'country' | 'skill' | 'strategy'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

interface OpportunityAnalysis {
  summary: string
  overallScore: number
  topCountries: Country[]
  skillDemand: SkillDemand[]
  remoteWorkInsights: RemoteWorkInsights
  visaInsights: VisaInsights
  recommendations: Recommendation[]
}

export default function GlobalOpportunityHeatmap() {
  const [jobTitle, setJobTitle] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0)
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [industry, setIndustry] = useState('')
  const [workMode, setWorkMode] = useState('any')
  const [salaryExpectation, setSalaryExpectation] = useState('market_rate')
  const [visaRequirement, setVisaRequirement] = useState(false)

  const [analysis, setAnalysis] = useState<OpportunityAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [activeTab, setActiveTab] = useState<'map' | 'skills' | 'remote' | 'visa'>('map')
  const [isMounted, setIsMounted] = useState(false)

  // Only render map on client-side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddSkill = () => {
    if (skillInput.trim() && skills.length < 20) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (!jobTitle.trim() || skills.length === 0) {
      setError('Please enter job title and at least one skill')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysis(null)
    setSelectedCountry(null)

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

    try {
      const response = await fetch('/api/global-opportunity-heatmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          yearsOfExperience,
          skills: skills.map((s) => s.trim()),
          industry: industry.trim(),
          workMode,
          salaryExpectation,
          visaRequirement,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          // Rate limit error - already has good message from API
          throw new Error(data.message || 'Rate limit exceeded. Please try again later.')
        } else if (response.status === 403) {
          throw new Error('Access denied. Please refresh the page and try again.')
        } else if (response.status === 400) {
          throw new Error(data.message || 'Invalid input. Please check your information.')
        } else {
          throw new Error(data.message || 'Failed to analyze opportunities')
        }
      }

      if (!data.analysis || !data.analysis.topCountries) {
        throw new Error('Incomplete analysis received. Please try again.')
      }

      setAnalysis(data.analysis)
      setActiveTab('map') // Reset to first tab
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError(
            'Request timed out. The analysis is taking too long. Please try again with fewer skills or simpler inputs.',
          )
        } else {
          setError(err.message)
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Analysis error:', err)
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-600'
    if (score >= 60) return 'from-blue-500 to-cyan-600'
    if (score >= 40) return 'from-yellow-500 to-orange-600'
    return 'from-orange-500 to-red-600'
  }

  const getVisaColor = (friendliness: string) => {
    switch (friendliness) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'difficult':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getRemoteColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'medium':
        return 'bg-indigo-100 text-indigo-700 border-indigo-300'
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'very_high':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300'
      case 'high':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'moderate':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Global Opportunity{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Heatmap
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover global job opportunities, salary insights, visa friendliness, and remote work
            possibilities tailored to your skills
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  maxLength={100}
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                  min={0}
                  max={50}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">{yearsOfExperience} years</p>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry (Optional)
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., FinTech, Healthcare, E-commerce"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  maxLength={100}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">({skills.length}/20)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill (press Enter)"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  />
                  <button
                    onClick={handleAddSkill}
                    disabled={skills.length >= 20}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="hover:text-blue-900 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Mode Preference
                </label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="any">Any (Remote, Hybrid, or On-site)</option>
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              {/* Salary Expectation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary Expectation
                </label>
                <select
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="market_rate">Market Rate</option>
                  <option value="above_market">Above Market</option>
                  <option value="top_tier">Top Tier (90th percentile+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Visa Requirement */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={visaRequirement}
                onChange={(e) => setVisaRequirement(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                I need visa sponsorship (will prioritize visa-friendly countries)
              </span>
            </label>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobTitle.trim() || skills.length === 0}
            className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
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
                Analyzing Global Opportunities...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  />
                </svg>
                Analyze Global Opportunities
              </span>
            )}
          </button>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`border-2 rounded-2xl p-6 mb-8 ${
              error.includes('Gemini') || error.includes('AI service')
                ? 'bg-orange-50 border-orange-200'
                : error.includes('Rate limit') || error.includes('limit')
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className={`w-6 h-6 ${
                    error.includes('Gemini') || error.includes('AI service')
                      ? 'text-orange-500'
                      : error.includes('Rate limit') || error.includes('limit')
                        ? 'text-yellow-500'
                        : 'text-red-500'
                  }`}
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
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    error.includes('Gemini') || error.includes('AI service')
                      ? 'text-orange-800'
                      : error.includes('Rate limit') || error.includes('limit')
                        ? 'text-yellow-800'
                        : 'text-red-800'
                  }`}
                >
                  {error.includes('Gemini') || error.includes('AI service')
                    ? 'AI Service Limit Reached'
                    : error.includes('Rate limit') || error.includes('limit')
                      ? 'Rate Limit Reached'
                      : 'Error'}
                </h3>
                <p
                  className={`whitespace-pre-line ${
                    error.includes('Gemini') || error.includes('AI service')
                      ? 'text-orange-700'
                      : error.includes('Rate limit') || error.includes('limit')
                        ? 'text-yellow-700'
                        : 'text-red-700'
                  }`}
                >
                  {error}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-4xl font-bold">{analysis.overallScore}</div>
                  </div>
                  <p className="text-center text-xs mt-2 text-white/80">Market Score</p>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">Global Market Analysis</h2>
                  <p className="text-white/90 text-lg leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'map', label: 'Top Countries', icon: '🗺️' },
                    { id: 'skills', label: 'Skill Demand', icon: '💼' },
                    { id: 'remote', label: 'Remote Work', icon: '🏠' },
                    { id: 'visa', label: 'Visa Info', icon: '✈️' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 min-w-[120px] px-4 py-4 font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* Top Countries Tab */}
                  {activeTab === 'map' && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Interactive World Map */}
                      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border-2 border-blue-200 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          🌍 Interactive Opportunity Heatmap
                          <span className="text-sm font-normal text-gray-500">
                            (Click countries for details)
                          </span>
                        </h3>
                        {!isMounted ? (
                          <div className="flex items-center justify-center min-h-[400px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                          </div>
                        ) : (
                          <div className="relative w-full" style={{ maxWidth: '100%' }}>
                            <ComposableMap
                              projectionConfig={{
                                rotate: [-10, 0, 0],
                                scale: 147,
                              }}
                              width={800}
                              height={400}
                              style={{
                                width: '100%',
                                height: 'auto',
                              }}
                            >
                              <ZoomableGroup center={[0, 20]} zoom={1}>
                                <Geographies
                                  geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
                                  fill="#D6D6DA"
                                  stroke="#FFFFFF"
                                  strokeWidth={0.5}
                                >
                                  {({ geographies }: { geographies: any[] }) =>
                                    geographies.map((geo: any) => {
                                      const countryData = analysis.topCountries.find(
                                        (c) => c.countryCode === geo.id,
                                      )
                                      const demandScore = countryData?.demandScore || 0

                                      // Color based on demand score
                                      let fillColor = '#E5E7EB' // Default gray
                                      if (demandScore >= 80)
                                        fillColor = '#10B981' // Green
                                      else if (demandScore >= 60)
                                        fillColor = '#3B82F6' // Blue
                                      else if (demandScore >= 40)
                                        fillColor = '#F59E0B' // Orange
                                      else if (demandScore > 0) fillColor = '#EF4444' // Red

                                      return (
                                        <Geography
                                          key={geo.rsmKey}
                                          geography={geo}
                                          fill={fillColor}
                                          stroke="#FFFFFF"
                                          strokeWidth={0.5}
                                          style={{
                                            default: {},
                                            hover: {
                                              fill: countryData ? '#6366F1' : fillColor,
                                              cursor: countryData ? 'pointer' : 'default',
                                            },
                                            pressed: {},
                                          }}
                                          onClick={() => {
                                            if (countryData) {
                                              setSelectedCountry(countryData)
                                              // Scroll to country cards
                                              const cardsSection =
                                                document.getElementById('country-cards')
                                              if (cardsSection) {
                                                cardsSection.scrollIntoView({
                                                  behavior: 'smooth',
                                                  block: 'nearest',
                                                })
                                              }
                                            }
                                          }}
                                        />
                                      )
                                    })
                                  }
                                </Geographies>

                                {/* Markers for top countries */}
                                {analysis.topCountries.slice(0, 5).map((country) => {
                                  // Country coordinates (approximate)
                                  const coordinates: { [key: string]: [number, number] } = {
                                    US: [-95, 37],
                                    GB: [-2, 54],
                                    DE: [10, 51],
                                    CA: [-106, 56],
                                    AU: [133, -27],
                                    SG: [103, 1],
                                    JP: [138, 36],
                                    NL: [5, 52],
                                    SE: [15, 62],
                                    CH: [8, 47],
                                    IE: [-8, 53],
                                    FR: [2, 46],
                                    IN: [78, 20],
                                    CN: [105, 35],
                                    BR: [-47, -14],
                                  }

                                  const coords = coordinates[country.countryCode]
                                  if (!coords) return null

                                  return (
                                    <Marker key={country.countryCode} coordinates={coords}>
                                      <circle
                                        r={6}
                                        fill="#6366F1"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          setSelectedCountry(country)
                                          const cardsSection =
                                            document.getElementById('country-cards')
                                          if (cardsSection) {
                                            cardsSection.scrollIntoView({
                                              behavior: 'smooth',
                                              block: 'nearest',
                                            })
                                          }
                                        }}
                                      />
                                      <text
                                        textAnchor="middle"
                                        y={-12}
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 'bold',
                                          fill: '#1F2937',
                                          pointerEvents: 'none',
                                        }}
                                      >
                                        {country.demandScore}
                                      </text>
                                    </Marker>
                                  )
                                })}
                              </ZoomableGroup>
                            </ComposableMap>
                          </div>
                        )}

                        {/* Legend */}
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-emerald-500"></div>
                            <span className="text-gray-700">High Demand (80+)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-blue-500"></div>
                            <span className="text-gray-700">Good (60-79)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-orange-500"></div>
                            <span className="text-gray-700">Moderate (40-59)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-500"></div>
                            <span className="text-gray-700">Lower (1-39)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gray-300"></div>
                            <span className="text-gray-700">No Data</span>
                          </div>
                        </div>

                        {/* Selected Country Display */}
                        {selectedCountry && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-white rounded-xl p-4 border-2 border-indigo-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                  {selectedCountry.country}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Demand Score: {selectedCountry.demandScore} | Salary:{' '}
                                  {formatSalary(selectedCountry.salaryRange.min)} -{' '}
                                  {formatSalary(selectedCountry.salaryRange.max)}
                                </p>
                              </div>
                              <button
                                onClick={() => setSelectedCountry(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                ✕
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Country Cards */}
                      <div id="country-cards" className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          📊 Detailed Country Analysis
                        </h3>
                        {analysis.topCountries.map((country, index) => (
                          <motion.div
                            key={country.countryCode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedCountry(country)}
                            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="text-4xl">
                                  {country.countryCode === 'US'
                                    ? '🇺🇸'
                                    : country.countryCode === 'GB'
                                      ? '🇬🇧'
                                      : country.countryCode === 'DE'
                                        ? '🇩🇪'
                                        : country.countryCode === 'CA'
                                          ? '🇨🇦'
                                          : country.countryCode === 'AU'
                                            ? '🇦🇺'
                                            : country.countryCode === 'SG'
                                              ? '🇸🇬'
                                              : country.countryCode === 'JP'
                                                ? '🇯🇵'
                                                : country.countryCode === 'NL'
                                                  ? '🇳🇱'
                                                  : country.countryCode === 'SE'
                                                    ? '🇸🇪'
                                                    : country.countryCode === 'CH'
                                                      ? '🇨🇭'
                                                      : country.countryCode === 'IE'
                                                        ? '🇮🇪'
                                                        : country.countryCode === 'FR'
                                                          ? '🇫🇷'
                                                          : '🌍'}
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {country.country}
                                  </h3>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <span
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getVisaColor(country.visaFriendliness)}`}
                                    >
                                      Visa: {country.visaFriendliness}
                                    </span>
                                    <span
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getRemoteColor(country.remoteOpportunities)}`}
                                    >
                                      Remote: {country.remoteOpportunities}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-blue-600">
                                  {country.demandScore}
                                </div>
                                <p className="text-xs text-gray-500">Demand Score</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                  Salary Range
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {formatSalary(country.salaryRange.min)} -{' '}
                                  {formatSalary(country.salaryRange.max)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                  Top Cities
                                </p>
                                <p className="text-sm text-gray-700">
                                  {country.topCities.join(', ')}
                                </p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm font-semibold text-gray-600 mb-1">
                                Key Industries
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {country.keyIndustries.map((ind, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium"
                                  >
                                    {ind}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 italic">{country.insights}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Skill Demand Tab */}
                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {analysis.skillDemand.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{skill.skill}</h3>
                            <span
                              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getDemandColor(skill.demandLevel)}`}
                            >
                              {skill.demandLevel.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-600 mb-2">
                                Top Markets
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {skill.topCountries.map((country, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                                  >
                                    {country}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-600 mb-2">
                                Salary Impact
                              </p>
                              <span
                                className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold ${
                                  skill.salaryImpact === 'high'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : skill.salaryImpact === 'medium'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {skill.salaryImpact.toUpperCase()} IMPACT
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Remote Work Tab */}
                  {activeTab === 'remote' && (
                    <motion.div
                      key="remote"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                            <div className="text-3xl font-bold text-purple-600">
                              {analysis.remoteWorkInsights.remoteJobPercentage}%
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              Remote Job Availability
                            </h3>
                            <p className="text-purple-700 font-semibold">
                              {analysis.remoteWorkInsights.availability.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {analysis.remoteWorkInsights.insights}
                        </p>
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Top Countries for Remote Work
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {analysis.remoteWorkInsights.topRemoteCountries.map((country, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 transition-all text-center"
                          >
                            <div className="text-3xl mb-2">💻</div>
                            <p className="font-bold text-gray-900">{country}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Visa Info Tab */}
                  {activeTab === 'visa' && (
                    <motion.div
                      key="visa"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          Visa Sponsorship Outlook
                        </h3>
                        <p className="text-lg font-semibold text-blue-700 mb-4">
                          Availability:{' '}
                          {analysis.visaInsights.sponsorshipAvailability.toUpperCase()}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {analysis.visaInsights.insights}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4">
                            Easiest Countries for Visa
                          </h4>
                          <div className="space-y-3">
                            {analysis.visaInsights.easiestCountries.map((country, i) => (
                              <div
                                key={i}
                                className="bg-green-50 rounded-xl p-4 border-2 border-green-200"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">✅</span>
                                  <span className="font-bold text-gray-900">{country}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4">
                            Popular Visa Programs
                          </h4>
                          <div className="space-y-3">
                            {analysis.visaInsights.popularPrograms.map((program, i) => (
                              <div
                                key={i}
                                className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">📋</span>
                                  <span className="font-semibold text-gray-900">{program}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span>💡</span>
                Personalized Recommendations
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {analysis.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl p-6 border-2 ${
                      rec.priority === 'high'
                        ? 'bg-red-50 border-red-200'
                        : rec.priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          rec.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : rec.priority === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {rec.priority.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          rec.type === 'country'
                            ? 'bg-green-200 text-green-800'
                            : rec.type === 'skill'
                              ? 'bg-purple-200 text-purple-800'
                              : 'bg-indigo-200 text-indigo-800'
                        }`}
                      >
                        {rec.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{rec.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
