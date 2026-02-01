/**
 * AI Skills Readiness Score - AI Proficiency Assessment Tool
 * Evaluates AI readiness and provides learning recommendations
 */

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface ReadinessAnalysis {
  aiReadinessScore: number
  scoreBreakdown: {
    aiLiteracy: {
      score: number
      weight: number
      assessment: string
    }
    toolProficiency: {
      score: number
      weight: number
      assessment: string
    }
    integrationSkills: {
      score: number
      weight: number
      assessment: string
    }
    adaptability: {
      score: number
      weight: number
      assessment: string
    }
  }
  toolAssessment: Array<{
    toolType: string
    proficiencyLevel: string
    relevanceToRole: string
  }>
  learningPath: {
    foundation: Array<{
      title: string
      description: string
      priority: string
    }>
    intermediate: Array<{
      title: string
      description: string
      priority: string
    }>
    advanced: Array<{
      title: string
      description: string
      priority: string
    }>
  }
  roleSpecificRecommendations: {
    mustMasterTools: string[]
    criticalUseCases: string[]
    competitiveAdvantage: string[]
    peerTrends: string[]
  }
  industryBenchmark: {
    percentile: number
    adoptionLevel: string
    futureRequirements: string[]
  }
  actionPlan: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
}

export default function AISkillsReadiness() {
  const [formData, setFormData] = useState({
    currentRole: '',
    industry: '',
    experienceLevel: 'mid',
    hasUsedGenerativeAI: false,
    usesAIInWork: false,
    aiToolsUsed: [] as string[],
    comfortLevel: '5',
    aiTrainingCompleted: false,
    currentAIUseCases: [] as string[],
  })
  const [analysis, setAnalysis] = useState<ReadinessAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const aiTools = [
    'ChatGPT',
    'Claude',
    'Gemini',
    'GitHub Copilot',
    'Cursor',
    'DALL-E',
    'Midjourney',
    'Stable Diffusion',
    'Notion AI',
    'Jasper',
    'Copy.ai',
  ]

  const useCases = [
    'Writing/Editing',
    'Research',
    'Code Generation',
    'Data Analysis',
    'Design/Creative Work',
    'Automation',
    'Decision Support',
    'Content Creation',
  ]

  const handleToolToggle = (tool: string) => {
    setFormData({
      ...formData,
      aiToolsUsed: formData.aiToolsUsed.includes(tool)
        ? formData.aiToolsUsed.filter((t) => t !== tool)
        : [...formData.aiToolsUsed, tool],
    })
  }

  const handleUseCaseToggle = (useCase: string) => {
    setFormData({
      ...formData,
      currentAIUseCases: formData.currentAIUseCases.includes(useCase)
        ? formData.currentAIUseCases.filter((u) => u !== useCase)
        : [...formData.currentAIUseCases, useCase],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/ai-skills-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            result.message || 'Rate limit exceeded. Please try again in a few minutes.',
          )
        }
        throw new Error(result.error || 'Failed to calculate readiness score')
      }

      setAnalysis(result.data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'from-green-500 to-green-600'
    if (score >= 50) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-800 border-red-300'
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-blue-100 text-blue-800 border-blue-300'
  }

  const getRelevanceColor = (relevance: string) => {
    if (relevance === 'high') return 'bg-green-100 text-green-800'
    if (relevance === 'medium') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/career-tools" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Career Tools
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Skills Readiness Score
          </h1>
          <p className="text-gray-600 mt-2">
            Evaluate your AI proficiency and get a personalized learning path to stay competitive in
            an AI-augmented workplace.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Marketing Manager"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Technology, Finance"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior (6-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">AI Familiarity</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasUsedGenerativeAI}
                    onChange={(e) =>
                      setFormData({ ...formData, hasUsedGenerativeAI: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-gray-700">
                    I have used generative AI tools (ChatGPT, Claude, etc.)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.usesAIInWork}
                    onChange={(e) => setFormData({ ...formData, usesAIInWork: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-gray-700">I use AI tools in my daily work</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.aiTrainingCompleted}
                    onChange={(e) =>
                      setFormData({ ...formData, aiTrainingCompleted: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-gray-700">
                    I have completed AI training or courses
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comfort Level with AI (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.comfortLevel}
                    onChange={(e) => setFormData({ ...formData, comfortLevel: e.target.value })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Not Comfortable</span>
                    <span className="font-bold text-purple-600">{formData.comfortLevel}</span>
                    <span>Very Comfortable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                AI Tools You've Used (Select all that apply)
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {aiTools.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => handleToolToggle(tool)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.aiToolsUsed.includes(tool)
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Current AI Use Cases (Select all that apply)
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {useCases.map((useCase) => (
                  <button
                    key={useCase}
                    type="button"
                    onClick={() => handleUseCaseToggle(useCase)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.currentAIUseCases.includes(useCase)
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {useCase}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating Score...' : 'Calculate AI Readiness Score'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {analysis && (
          <div ref={resultsRef} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">AI Readiness Assessment</h2>

              <div className="mb-8">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold inline-block text-gray-600">
                        Your AI Readiness Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-3xl font-bold ${getScoreColor(analysis.aiReadinessScore)}`}
                      >
                        {analysis.aiReadinessScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: `${analysis.aiReadinessScore}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${getScoreBg(analysis.aiReadinessScore)} transition-all duration-500`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(analysis.scoreBreakdown).map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                          <span className="font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-lg font-bold text-purple-600 flex-shrink-0">
                            {value.score}/{value.weight}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(value.score / value.weight) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 break-words">{value.assessment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {analysis.toolAssessment.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tool Proficiency Assessment</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysis.toolAssessment.map((tool, index) => (
                        <div
                          key={index}
                          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-800">{tool.toolType}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getRelevanceColor(tool.relevanceToRole)}`}
                            >
                              {tool.relevanceToRole} relevance
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 capitalize">
                            Proficiency: {tool.proficiencyLevel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Personalized Learning Path</h3>
                  <div className="space-y-4">
                    {['foundation', 'intermediate', 'advanced'].map((level) => {
                      const items =
                        analysis.learningPath[level as keyof typeof analysis.learningPath]
                      if (!items || items.length === 0) return null
                      return (
                        <div key={level}>
                          <h4 className="font-medium text-gray-700 mb-3 capitalize">
                            {level} Level
                          </h4>
                          <div className="space-y-2">
                            {items.map((item, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border ${getPriorityColor(item.priority)}`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm mt-1">{item.description}</p>
                                  </div>
                                  <span className="text-xs font-bold uppercase ml-2">
                                    {item.priority}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Role-Specific Recommendations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Must Master Tools</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.roleSpecificRecommendations.mustMasterTools.map((tool, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2">Critical Use Cases</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.roleSpecificRecommendations.criticalUseCases.map(
                          (useCase, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {useCase}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
                  <h3 className="text-lg font-semibold mb-4">Industry Benchmark</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Your Percentile</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {analysis.industryBenchmark.percentile}th
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Industry Adoption Level</span>
                      <span className="font-medium text-gray-800">
                        {analysis.industryBenchmark.adoptionLevel}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium text-gray-700 mb-2">Future Requirements</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.industryBenchmark.futureRequirements.map((req, index) => (
                          <li key={index} className="text-gray-600">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Action Plan</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="font-medium text-red-800 mb-2">Immediate Actions</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.actionPlan.immediate.map((action, index) => (
                          <li key={index} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-800 mb-2">Short-Term (1-3 months)</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.actionPlan.shortTerm.map((action, index) => (
                          <li key={index} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-medium text-green-800 mb-2">Long-Term (3-6 months)</p>
                      <ul className="list-disc list-inside space-y-1">
                        {analysis.actionPlan.longTerm.map((action, index) => (
                          <li key={index} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scoring Labels Explanation Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Understanding Your AI Readiness Score
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Beginner</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Score: 0-40</strong>
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Limited or no experience with AI tools. May have heard of ChatGPT or similar tools
                but haven&apos;t integrated them into daily work. Needs foundational training on AI
                basics and practical applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-300">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Practitioner</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Score: 41-65</strong>
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Regularly uses AI tools like ChatGPT, Gemini, or Copilot for basic tasks (writing,
                research, brainstorming). Understands prompting basics but hasn&apos;t mastered
                advanced techniques or integrated AI deeply into workflows.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-300">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Fluent</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Score: 66-85</strong>
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Confidently uses multiple AI tools across various tasks. Masters advanced prompting,
                understands AI limitations, and integrates AI into daily workflows for productivity
                gains. Can train teammates on AI best practices.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Expert</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Score: 86-100</strong>
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Deep expertise across AI tools, APIs, and custom implementations. Builds AI-powered
                workflows, automates complex tasks, and drives organizational AI adoption.
                Recognized as an AI thought leader in their field.
              </p>
            </div>
          </div>
        </div>

        {/* Industry Benchmarks Section */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            AI Readiness by Industry (2026 Benchmarks)
          </h2>
          <p className="text-gray-700 text-center mb-6 max-w-3xl mx-auto">
            See how different industries are adopting AI and where your score ranks compared to
            professionals in your field.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Industry</th>
                  <th className="px-6 py-3 text-left font-semibold">Avg Score</th>
                  <th className="px-6 py-3 text-left font-semibold">Adoption Level</th>
                  <th className="px-6 py-3 text-left font-semibold">Top AI Use Cases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Technology/Engineering</td>
                  <td className="px-6 py-4 text-green-600 font-bold">78</td>
                  <td className="px-6 py-4 text-gray-700">Very High</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Code generation, debugging, automation
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Marketing/Advertising</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">71</td>
                  <td className="px-6 py-4 text-gray-700">High</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Content creation, campaign optimization, analytics
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Finance/Consulting</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">65</td>
                  <td className="px-6 py-4 text-gray-700">Moderate-High</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Data analysis, report generation, research
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Healthcare/Pharma</td>
                  <td className="px-6 py-4 text-yellow-600 font-bold">58</td>
                  <td className="px-6 py-4 text-gray-700">Moderate</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Clinical documentation, research summaries
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Education</td>
                  <td className="px-6 py-4 text-yellow-600 font-bold">52</td>
                  <td className="px-6 py-4 text-gray-700">Moderate</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Lesson planning, grading assistance, tutoring
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Manufacturing/Logistics</td>
                  <td className="px-6 py-4 text-orange-600 font-bold">45</td>
                  <td className="px-6 py-4 text-gray-700">Low-Moderate</td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    Predictive maintenance, supply chain optimization
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-purple-700">Recruiter Insight:</strong> Many hiring managers
              now explicitly assess AI proficiency during interviews, especially in tech, marketing,
              and consulting roles. Being &quot;AI Fluent&quot; (66+ score) is increasingly becoming
              a baseline expectation for competitive candidates. Demonstrating AI expertise can
              differentiate you in a crowded job market.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What is an AI Skills Readiness Score?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                An AI Skills Readiness Score measures your proficiency with AI tools, your
                understanding of AI concepts, and your ability to integrate AI into your work
                effectively. Our assessment evaluates four key dimensions: AI literacy
                (understanding how AI works), tool proficiency (hands-on experience with ChatGPT,
                Copilot, etc.), integration skills (applying AI to solve real problems), and
                adaptability (keeping up with rapid AI advancements).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Why does AI readiness matter for my career?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                AI is transforming every industry. Professionals who master AI tools are 30-50% more
                productive, command higher salaries, and have better career prospects. Recruiters
                increasingly prioritize AI skills, and job postings mentioning &quot;AI
                proficiency&quot; have grown 200%+ in 2024-2026. Being AI-ready future-proofs your
                career and makes you indispensable to employers.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How can I improve my AI readiness score?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Start by using AI tools daily: ChatGPT for writing/research, GitHub Copilot for
                coding, or Midjourney for design. Take online courses (Coursera, LinkedIn Learning)
                on prompt engineering and AI fundamentals. Join AI communities (Reddit, Discord) to
                learn from power users. Most importantly, experiment with AI in your actual work—the
                best learning comes from solving real problems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do recruiters care about AI skills?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely. In 2026, 75% of hiring managers report asking about AI experience during
                interviews, especially for roles in marketing, tech, consulting, and content
                creation. However, they also worry about candidates who rely on AI blindly without
                critical thinking. The key is demonstrating that you use AI as a productivity
                multiplier—not a replacement for expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Links Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Continue Your Career Development
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/career-tools/future-skills-identifier"
              className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Future Skills Identifier
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Discover other emerging skills beyond AI that will be critical for your career
                    in the next 3-5 years.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/career-tools/skill-gap-analyzer"
              className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Skill Gap Analyzer
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Identify specific skills (including AI) you need to acquire to reach your target
                    role.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Free Resume Review CTA */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Get a Free Resume Review</h3>
              <p className="text-lg mb-6 text-white/90">
                Showcase your AI skills effectively on your resume. Get expert feedback—free.
              </p>
              <Link
                href="/resume-review"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#7c3aed' }}>Get Free Review</span>
                <svg
                  className="w-5 h-5 ml-2"
                  style={{ color: '#7c3aed' }}
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
            </div>
          </div>

          {/* Executive CV CTA */}
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
              <h3 className="text-2xl font-bold mb-3">Position Yourself as AI-Forward</h3>
              <p className="text-lg mb-6 text-white/90">
                Craft a resume that highlights your AI expertise and positions you as a
                forward-thinking professional.
              </p>
              <Link
                href="/executive-resume-writing-service"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ea580c' }}>Get Professional Help</span>
                <svg
                  className="w-5 h-5 ml-2"
                  style={{ color: '#ea580c' }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
