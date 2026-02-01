/**
 * Future Skills Identifier - AI-Powered Future-Proofing Tool
 * Identifies emerging skills for career security
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface EmergingSkill {
  skillName: string
  whyEmerging: string
  demandGrowth: number
  timeToMainstream: string
  supplyDemandGap: 'high' | 'medium' | 'low'
  salaryPremium: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  currentLevel: 'none' | 'basic' | 'intermediate' | 'advanced'
}

interface SkillAnalysis {
  criticalEmergingSkills: EmergingSkill[]
  skillsByTimeHorizon: {
    immediate: string[]
    nearTerm: string[]
    longTerm: string[]
  }
  skillsByCategory: {
    technical: string[]
    softSkills: string[]
    toolsPlatforms: string[]
    domainKnowledge: string[]
    hybridSkills: string[]
  }
  industryTrends: {
    disruptionsOnHorizon: string[]
    emergingTechnologies: string[]
    rolesEmerging: string[]
    rolesDeclining: string[]
    skillsBecomingObsolete: string[]
  }
  learningPathway: {
    skillSequence: string[]
    estimatedTimeInvestment: string
    resourceRecommendations: string[]
    certificationValue: 'high' | 'medium' | 'low'
  }
  competitiveAdvantage: {
    earlyAdoptionSkills: string[]
    skillStackingOpportunities: string[]
    contrarianRecommendations: string[]
  }
}

export default function FutureSkillsIdentifier() {
  const [formData, setFormData] = useState({
    currentRole: '',
    industry: '',
    yearsExperience: '',
    currentSkills: [] as string[],
    careerGoals: '',
    timeHorizon: '3',
  })
  const [skillInput, setSkillInput] = useState('')
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null)
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
    if (!formData.currentRole || !formData.industry || !formData.yearsExperience) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/future-skills-identifier', {
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
          setError(data.message || 'Failed to analyze skills')
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

  const getDemandColor = (gap: string) => {
    switch (gap) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getDifficultyBadge = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700',
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Future Skills Identifier
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover emerging skills that will be in high demand in the next 2-5 years. Stay ahead
            of industry evolution and future-proof your career.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                placeholder="e.g., Software Engineer, Marketing Manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology, Healthcare, Finance"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Time Horizon</label>
              <select
                value={formData.timeHorizon}
                onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="2">2 years ahead</option>
                <option value="3">3 years ahead</option>
                <option value="5">5 years ahead</option>
              </select>
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleAddSkill}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Career Goals (Optional)
            </label>
            <textarea
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              placeholder="e.g., Transition to leadership, specialize in AI/ML, move to product management"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Analyzing Future Skills...' : 'Identify Future Skills'}
          </button>
        </div>

        {/* Cross-link to Related Tools */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Complete Your Career Strategy
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Maximize your career growth by combining these powerful tools
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/career-tools/resume-gap-identifier"
              className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Resume Gap Identifier →
                  </h3>
                  <p className="text-sm text-gray-600">
                    Identify which of these future skills are missing from your resume and get
                    actionable recommendations to bridge the gaps.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-tools/career-roadmap-generator"
              className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Career Roadmap Generator →
                  </h3>
                  <p className="text-sm text-gray-600">
                    Create a detailed timeline and action plan for acquiring these emerging skills
                    and advancing your career strategically.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Statistics Image */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Future of Work: Skills & Trends
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src="https://res.cloudinary.com/dekim1abx/image/upload/v1769923261/work-life-balance-statistics-trends-2025_unwvyg.png"
              alt="Work-Life Balance Statistics and Career Trends 2025"
              className="rounded-lg shadow-lg max-w-full h-auto"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-600 text-center italic">
            Key statistics and trends shaping the future of work and skill requirements
          </p>
        </div>

        {/* Additional CTAs Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Resume Review CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mb-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Free Resume Review</h3>
              <p className="text-purple-700 text-sm mb-4">
                Get expert feedback on your resume. We'll identify areas for improvement and provide
                actionable recommendations.
              </p>
              <Link
                href="/resume-review"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                style={{ color: '#ffffff', textDecoration: 'none' }}
              >
                Get Free Review
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ATS CV Service CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-4">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">ATS Resume - Only $20</h3>
              <p className="text-blue-700 text-sm mb-4">
                Professional ATS-optimized resume writing service. Beat applicant tracking systems
                and land more interviews.
              </p>
              <Link
                href="/ats-resume-writing-service"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                style={{ color: '#ffffff', textDecoration: 'none' }}
              >
                Get ATS Resume
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Results */}
        {analysis && (
          <div ref={resultsRef} className="space-y-8 animate-fade-in">
            {/* Critical Emerging Skills */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Critical Emerging Skills</h2>
              <div className="space-y-4">
                {analysis.criticalEmergingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-purple-600">{skill.skillName}</h3>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadge(skill.difficultyLevel)}`}
                        >
                          {skill.difficultyLevel}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{skill.whyEmerging}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-medium">Demand Growth</p>
                        <p className="text-green-600 font-bold">{skill.demandGrowth}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Time to Mainstream</p>
                        <p className="text-gray-800 font-semibold">{skill.timeToMainstream}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Supply Gap</p>
                        <p className={`font-bold ${getDemandColor(skill.supplyDemandGap)}`}>
                          {skill.supplyDemandGap.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Salary Premium</p>
                        <p className="text-green-600 font-bold">{skill.salaryPremium}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills by Time Horizon */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills by Time Horizon</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Immediate (0-1 year)</h3>
                  <ul className="space-y-2">
                    {analysis.skillsByTimeHorizon.immediate.map((skill, idx) => (
                      <li key={idx} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Near-term (1-3 years)</h3>
                  <ul className="space-y-2">
                    {analysis.skillsByTimeHorizon.nearTerm.map((skill, idx) => (
                      <li key={idx} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Long-term (3-5 years)</h3>
                  <ul className="space-y-2">
                    {analysis.skillsByTimeHorizon.longTerm.map((skill, idx) => (
                      <li key={idx} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Industry Trends */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Industry Trends & Disruptions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Emerging Technologies</h3>
                  <ul className="space-y-2">
                    {analysis.industryTrends.emergingTechnologies.map((tech, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">▲</span> {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-600 mb-3">
                    Skills Becoming Obsolete
                  </h3>
                  <ul className="space-y-2">
                    {analysis.industryTrends.skillsBecomingObsolete.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="text-red-500">▼</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Learning Pathway */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Learning Pathway</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">
                    Recommended Sequence
                  </h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {analysis.learningPathway.skillSequence.map((step, idx) => (
                      <li key={idx} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Estimated Time Investment</h4>
                    <p className="text-gray-700">
                      {analysis.learningPathway.estimatedTimeInvestment}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Certification Value</h4>
                    <p className="text-gray-700 capitalize">
                      {analysis.learningPathway.certificationValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Advantage */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Competitive Advantage Opportunities
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Early Adoption Skills</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Learn these now for maximum differentiation
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.competitiveAdvantage.earlyAdoptionSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pink-600 mb-3">
                    Skill Stacking Opportunities
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">Powerful skill combinations</p>
                  <ul className="space-y-2">
                    {analysis.competitiveAdvantage.skillStackingOpportunities.map((combo, idx) => (
                      <li key={idx} className="text-gray-700">
                        {combo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Future-Proof Your Career?</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Need help developing these skills? Our career coaching services can create a
                personalized roadmap to help you stay ahead of industry trends.
              </p>
              <Link
                href="/services"
                className="inline-block bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Career Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
