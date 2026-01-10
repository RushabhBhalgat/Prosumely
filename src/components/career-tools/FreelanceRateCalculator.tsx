/**
 * Freelance Rate Calculator & Pricing Strategy Tool
 * Production-ready, SEO-optimized tool for freelancers
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RateBreakdown {
  hourlyRate: number
  dailyRate: number
  monthlyRetainer: number
  projectBased: {
    small: number
    medium: number
    large: number
  }
}

interface PricingStrategy {
  rateBreakdown: RateBreakdown
  marketPosition: string
  competitiveAnalysis: {
    lowEnd: number
    midRange: number
    highEnd: number
    yourRate: number
  }
  valueBasedPricing: {
    clientROI: string
    recommendedUpsells: string[]
  }
  packageRecommendations: {
    name: string
    description: string
    price: number
    deliverables: string[]
  }[]
  negotiationTips: string[]
  redFlags: string[]
  summary: string
}

const workTypes = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Copywriting',
  'Video Editing',
  'Photography',
  'Digital Marketing',
  'Social Media Management',
  'SEO Services',
  'Consulting',
  'Virtual Assistant',
  'Accounting/Bookkeeping',
  'Legal Services',
  'Translation',
  'Voice Over',
  'Animation',
  'Data Analysis',
  'Project Management',
]

const experienceLevels = [
  { label: 'Beginner (0-2 years)', value: 'beginner' },
  { label: 'Intermediate (2-5 years)', value: 'intermediate' },
  { label: 'Advanced (5-10 years)', value: 'advanced' },
  { label: 'Expert (10+ years)', value: 'expert' },
]

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'Brazil', code: 'BR' },
]

const specializations = [
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Finance',
  'Education',
  'Real Estate',
  'Entertainment',
  'Non-profit',
  'B2B',
  'B2C',
  'Startup',
  'Enterprise',
]

export default function FreelanceRateCalculator() {
  const [workType, setWorkType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [location, setLocation] = useState('')
  const [specialization, setSpecialization] = useState<string[]>([])
  const [portfolioProjects, setPortfolioProjects] = useState<number>(0)
  const [weeklyHours, setWeeklyHours] = useState<number>(40)
  const [desiredIncome, setDesiredIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<number>(0)
  
  const [strategy, setStrategy] = useState<PricingStrategy | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'rates' | 'packages' | 'tips'>('rates')
  const [showWorkTypeDropdown, setShowWorkTypeDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [workTypeSearch, setWorkTypeSearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('')

  const filteredWorkTypes = workTypes.filter((wt) =>
    wt.toLowerCase().includes(workTypeSearch.toLowerCase()),
  )

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  const handleSpecializationToggle = (spec: string) => {
    setSpecialization((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec],
    )
  }

  const handleCalculate = async () => {
    if (!workType || !experienceLevel || !location) {
      setError('Please fill in all required fields: Work Type, Experience Level, and Location')
      return
    }

    setLoading(true)
    setError(null)
    setStrategy(null)

    try {
      const response = await fetch('/api/freelance-rate-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workType,
          experienceLevel,
          location,
          specialization,
          portfolioProjects,
          weeklyHours,
          desiredIncome,
          expenses,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || 'Calculation failed')
        return
      }

      setStrategy(data.strategy)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Freelance Rate Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your optimal freelance rates, create pricing packages, and develop a winning
            pricing strategy based on your skills, experience, and market demand.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>

                <div className="space-y-4 pb-6 border-b border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Required Fields
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Type/Service *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={workType}
                        onChange={(e) => {
                          setWorkType(e.target.value)
                          setWorkTypeSearch(e.target.value)
                          setShowWorkTypeDropdown(true)
                        }}
                        onFocus={() => setShowWorkTypeDropdown(true)}
                        placeholder="Search work type..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {showWorkTypeDropdown && filteredWorkTypes.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredWorkTypes.map((wt) => (
                            <button
                              key={wt}
                              onClick={() => {
                                setWorkType(wt)
                                setWorkTypeSearch(wt)
                                setShowWorkTypeDropdown(false)
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-purple-50 text-sm text-gray-700 transition-colors"
                            >
                              {wt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select level...</option>
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Location *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value)
                          setLocationSearch(e.target.value)
                          setShowLocationDropdown(true)
                        }}
                        onFocus={() => setShowLocationDropdown(true)}
                        placeholder="Search country..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {showLocationDropdown && filteredCountries.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setLocation(c.name)
                                setLocationSearch(c.name)
                                setShowLocationDropdown(false)
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors"
                            >
                              <span className="text-sm text-gray-700">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Optional Fields (For Better Results)
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specializations
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {specializations.slice(0, 6).map((spec) => (
                        <button
                          key={spec}
                          onClick={() => handleSpecializationToggle(spec)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            specialization.includes(spec)
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Projects: {portfolioProjects}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={portfolioProjects}
                      onChange={(e) => setPortfolioProjects(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(portfolioProjects / 50) * 100}%, #e9d5ff ${(portfolioProjects / 50) * 100}%, #e9d5ff 100%)`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Available Hours: {weeklyHours}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(weeklyHours / 60) * 100}%, #e9d5ff ${(weeklyHours / 60) * 100}%, #e9d5ff 100%)`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Annual Income ($)
                    </label>
                    <input
                      type="number"
                      value={desiredIncome}
                      onChange={(e) => setDesiredIncome(Number(e.target.value))}
                      placeholder="e.g., 75000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Business Expenses ($)
                    </label>
                    <input
                      type="number"
                      value={expenses}
                      onChange={(e) => setExpenses(Number(e.target.value))}
                      placeholder="e.g., 500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={loading || !workType || !experienceLevel || !location}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
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
                      Calculating...
                    </span>
                  ) : (
                    'Calculate My Rates'
                  )}
                </button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200"
                  >
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!strategy && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100"
                  >
                    <div className="inline-block p-4 bg-purple-100 rounded-full mb-6">
                      <svg
                        className="w-16 h-16 text-purple-600"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Calculate Your Rates?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Fill in your details and click &quot;Calculate My Rates&quot; to get personalized
                      pricing recommendations, package strategies, and negotiation tips.
                    </p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100"
                  >
                    <div className="inline-block p-4 bg-purple-100 rounded-full mb-6">
                      <svg
                        className="w-16 h-16 text-purple-600 animate-pulse"
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
                      Calculating Your Rates...
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Analyzing market data, competition, and your experience to generate optimal
                      pricing strategies.
                    </p>
                  </motion.div>
                )}

                {strategy && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white rounded-t-2xl shadow-xl border-b border-gray-200">
                      <div className="flex overflow-x-auto">
                        {[
                          { id: 'rates', label: 'Rate Breakdown' },
                          { id: 'packages', label: 'Pricing Packages' },
                          { id: 'tips', label: 'Strategy & Tips' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all ${
                              activeTab === tab.id
                                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-500'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-b-2xl shadow-xl p-6">
                      <AnimatePresence mode="wait">
                        {activeTab === 'rates' && (
                          <motion.div
                            key="rates"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Summary</h3>
                              <p className="text-gray-700 leading-relaxed">{strategy.summary}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-4">
                                  Hourly Rate
                                </h4>
                                <div className="text-4xl font-bold text-purple-600 mb-2">
                                  ${strategy.rateBreakdown.hourlyRate}
                                  <span className="text-xl text-gray-500">/hr</span>
                                </div>
                                <p className="text-sm text-gray-600">Recommended base rate</p>
                              </div>

                              <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-4">Daily Rate</h4>
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                  ${strategy.rateBreakdown.dailyRate}
                                  <span className="text-xl text-gray-500">/day</span>
                                </div>
                                <p className="text-sm text-gray-600">8-hour day rate</p>
                              </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Monthly Retainer
                              </h4>
                              <div className="text-4xl font-bold text-green-600 mb-2">
                                ${strategy.rateBreakdown.monthlyRetainer}
                                <span className="text-xl text-gray-500">/mo</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Based on {weeklyHours} hours/week
                              </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Project-Based Pricing
                              </h4>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                  <div>
                                    <div className="font-semibold text-gray-900">Small Project</div>
                                    <div className="text-xs text-gray-500">
                                      20-40 hours of work
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    ${strategy.rateBreakdown.projectBased.small}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      Medium Project
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      40-80 hours of work
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    ${strategy.rateBreakdown.projectBased.medium}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                  <div>
                                    <div className="font-semibold text-gray-900">Large Project</div>
                                    <div className="text-xs text-gray-500">80+ hours of work</div>
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    ${strategy.rateBreakdown.projectBased.large}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Market Comparison
                              </h4>
                              <div className="space-y-3">
                                {[
                                  {
                                    label: 'Budget Range',
                                    value: strategy.competitiveAnalysis.lowEnd,
                                  },
                                  {
                                    label: 'Mid Market',
                                    value: strategy.competitiveAnalysis.midRange,
                                  },
                                  {
                                    label: 'Premium Range',
                                    value: strategy.competitiveAnalysis.highEnd,
                                  },
                                  {
                                    label: 'Your Rate',
                                    value: strategy.competitiveAnalysis.yourRate,
                                    highlight: true,
                                  },
                                ].map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                    <span
                                      className={`text-sm ${item.highlight ? 'font-bold text-purple-600' : 'text-gray-700'}`}
                                    >
                                      {item.label}
                                    </span>
                                    <span
                                      className={`text-lg ${item.highlight ? 'font-bold text-purple-600' : 'font-semibold text-gray-900'}`}
                                    >
                                      ${item.value}/hr
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-700">
                                  {strategy.marketPosition}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'packages' && (
                          <motion.div
                            key="packages"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Value-Based Pricing
                              </h3>
                              <p className="text-gray-700 mb-4">
                                {strategy.valueBasedPricing.clientROI}
                              </p>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Recommended Upsells:
                                </h4>
                                <ul className="space-y-2">
                                  {strategy.valueBasedPricing.recommendedUpsells.map(
                                    (upsell, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <svg
                                          className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        <span className="text-gray-700">{upsell}</span>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              {strategy.packageRecommendations.map((pkg, idx) => (
                                <div
                                  key={idx}
                                  className={`border rounded-xl p-6 ${
                                    idx === 1
                                      ? 'border-purple-500 bg-purple-50 transform scale-105'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                >
                                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    {pkg.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                                  <div className="text-3xl font-bold text-purple-600 mb-4">
                                    ${pkg.price}
                                  </div>
                                  <div className="space-y-2">
                                    <h5 className="font-semibold text-sm text-gray-900">
                                      Includes:
                                    </h5>
                                    <ul className="space-y-1">
                                      {pkg.deliverables.map((item, itemIdx) => (
                                        <li
                                          key={itemIdx}
                                          className="flex items-start gap-2 text-sm"
                                        >
                                          <svg
                                            className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          <span className="text-gray-700">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'tips' && (
                          <motion.div
                            key="tips"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Negotiation Tips
                              </h3>
                              <ul className="space-y-3">
                                {strategy.negotiationTips.map((tip, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                      <span className="text-green-600 font-bold text-sm">
                                        {idx + 1}
                                      </span>
                                    </div>
                                    <span className="text-gray-700 flex-1">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                              <h3 className="text-xl font-bold text-red-900 mb-4">
                                Red Flags to Watch Out For
                              </h3>
                              <ul className="space-y-3">
                                {strategy.redFlags.map((flag, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <svg
                                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span className="text-red-700">{flag}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
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

        {!strategy && !loading && (
          <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Use This Rate Calculator?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Stop Undercharging Your Worth
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Many freelancers struggle with pricing their services. Our AI-powered calculator
                    analyzes your skills, experience, market demand, and location to provide
                    data-driven pricing recommendations that ensure you&apos;re compensated fairly for
                    your expertise.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">What You Get:</h3>
                  <ul className="space-y-2">
                    {[
                      'Optimal hourly, daily, and monthly rates',
                      'Project-based pricing tiers (small, medium, large)',
                      'Market positioning analysis',
                      'Pre-built pricing packages',
                      'Value-based pricing strategies',
                      'Negotiation tips and tactics',
                      'Client red flags to avoid',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
