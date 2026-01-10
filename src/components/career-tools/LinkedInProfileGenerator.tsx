'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface GeneratedContent {
  headlines: string[]
  aboutSections: string[]
  experienceDescriptions: {
    role: string
    bullets: string[]
  }[]
  skills: {
    core: string[]
    niceToHave: string[]
  }
  featuredIdeas: string[]
}

interface ApiResponse {
  content: GeneratedContent
  processingTime: number
  success: boolean
  error?: string
  message?: string
}

interface ApiError {
  error: string
  message?: string
  userFriendlyMessage?: string
  retryAfter?: number
}

interface RateLimitState {
  isRateLimited: boolean
  retryAfter?: number
  resetTime?: string
}

export default function LinkedInProfileGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [targetIndustry, setTargetIndustry] = useState('')
  const [careerStage, setCareerStage] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [currentLinkedInUrl, setCurrentLinkedInUrl] = useState('')
  const [targetCompanies, setTargetCompanies] = useState('')
  const [tonePreference, setTonePreference] = useState('professional')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({ isRateLimited: false })
  const [selectedHeadline, setSelectedHeadline] = useState(0)
  const [selectedAbout, setSelectedAbout] = useState(0)
  const [activeTab, setActiveTab] = useState<
    'headline' | 'about' | 'experience' | 'skills' | 'featured'
  >('headline')
  const resultsRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or DOCX file')
        return
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const generateProfile = async () => {
    if (!file) {
      setError('Please upload your resume or CV')
      return
    }
    if (!targetIndustry) {
      setError('Please select your target industry')
      return
    }
    if (!careerStage) {
      setError('Please select your career stage')
      return
    }
    if (!primaryGoal) {
      setError('Please select your primary goal')
      return
    }

    setLoading(true)
    setError(null)
    setRateLimitState({ isRateLimited: false })
    setGeneratedContent(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('targetIndustry', targetIndustry)
      formData.append('careerStage', careerStage)
      formData.append('primaryGoal', primaryGoal)
      formData.append('currentLinkedInUrl', currentLinkedInUrl)
      formData.append('targetCompanies', targetCompanies)
      formData.append('tonePreference', tonePreference)

      const response = await fetch('/api/linkedin-profile-generate', {
        method: 'POST',
        body: formData,
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
          setError(errorData.userFriendlyMessage || errorData.message || 'Rate limit exceeded')
        } else {
          setError(errorData.message || errorData.error || 'Failed to generate profile content')
        }
        return
      }

      setGeneratedContent((data as ApiResponse).content)
      setActiveTab('headline')

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getCharCount = (text: string) => text.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            LinkedIn Profile Content Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your resume into compelling, ATS-optimized LinkedIn content. Generate
            professional headlines, engaging about sections, and achievement-focused experience
            descriptions tailored to your industry and career goals.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 bg-blue-50 rounded-full px-4 py-2 w-fit mx-auto">
            <span className="animate-pulse">✨</span>
            <span className="font-medium">Free • AI-Powered • Multiple Variations</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></span>
            Profile Information
          </h2>

          <div className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume/CV Upload <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="hidden"
                  disabled={loading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Choose File
                </button>
                {file && (
                  <span className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {file.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: PDF, DOCX (Max 5MB) • <strong>DOCX recommended for best results</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Target Industry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Industry <span className="text-red-500">*</span>
                </label>
                <select
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Education">Education</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Legal">Legal</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Career Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Career Stage <span className="text-red-500">*</span>
                </label>
                <select
                  value={careerStage}
                  onChange={(e) => setCareerStage(e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Career Stage</option>
                  <option value="Entry">Entry Level (0-2 years)</option>
                  <option value="Mid">Mid Level (3-7 years)</option>
                  <option value="Senior">Senior Level (8-15 years)</option>
                  <option value="Executive">Executive (15+ years)</option>
                  <option value="Pivot">Career Pivot</option>
                </select>
              </div>

              {/* Primary Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Goal <span className="text-red-500">*</span>
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Primary Goal</option>
                  <option value="Job Search">Job Search</option>
                  <option value="Networking">Networking</option>
                  <option value="Thought Leadership">Thought Leadership</option>
                  <option value="Business Development">Business Development</option>
                </select>
              </div>

              {/* Tone Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tone Preference
                </label>
                <select
                  value={tonePreference}
                  onChange={(e) => setTonePreference(e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="professional">Professional</option>
                  <option value="approachable">Approachable</option>
                  <option value="bold">Bold</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Optional Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current LinkedIn URL
                </label>
                <input
                  type="url"
                  value={currentLinkedInUrl}
                  onChange={(e) => setCurrentLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Companies/Roles
                </label>
                <input
                  type="text"
                  value={targetCompanies}
                  onChange={(e) => setTargetCompanies(e.target.value)}
                  placeholder="e.g., Google, Microsoft, Senior Product Manager"
                  disabled={loading}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-red-800 font-medium">{error}</p>
                  {rateLimitState.isRateLimited && (
                    <p className="text-red-600 text-sm mt-1">
                      Please try again in {rateLimitState.retryAfter} seconds
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateProfile}
            disabled={loading || !file || !targetIndustry || !careerStage || !primaryGoal}
            className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Generating Profile Content...
              </span>
            ) : (
              'Generate LinkedIn Profile Content'
            )}
          </button>
        </div>

        {/* Results Section */}
        {generatedContent && (
          <div
            ref={resultsRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 animate-fade-in-up"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></span>
              Generated Content
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab('headline')}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'headline'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Headlines
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                About Section
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'experience'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'skills'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 ${
                  activeTab === 'featured'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Featured
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'headline' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Choose from multiple headline variations (max 220 characters):
                  </p>
                  {generatedContent.headlines.map((headline, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedHeadline === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedHeadline(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-blue-600">
                          Variation {index + 1}
                        </span>
                        <span
                          className={`text-xs ${getCharCount(headline) > 220 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {getCharCount(headline)}/220
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3">{headline}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(headline)
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy to Clipboard
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Choose from multiple about section variations (max 2,600 characters):
                  </p>
                  {generatedContent.aboutSections.map((about, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAbout === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedAbout(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-blue-600">
                          Variation {index + 1}
                        </span>
                        <span
                          className={`text-xs ${getCharCount(about) > 2600 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {getCharCount(about)}/2,600
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3 whitespace-pre-line">{about}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(about)
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy to Clipboard
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Enhanced experience descriptions with quantified achievements:
                  </p>
                  {generatedContent.experienceDescriptions.map((exp, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200"
                    >
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">{exp.role}</h3>
                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => copyToClipboard(exp.bullets.join('\n'))}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy All Bullets
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                      Core Skills (Prioritize These)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.skills.core.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedContent.skills.core.join(', '))}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy All Core Skills
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                      Nice-to-Have Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.skills.niceToHave.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedContent.skills.niceToHave.join(', '))}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy All Nice-to-Have Skills
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'featured' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Suggested content for your Featured section:
                  </p>
                  <ul className="space-y-3">
                    {generatedContent.featuredIdeas.map((idea, index) => (
                      <li
                        key={index}
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200"
                      >
                        <div className="flex items-start">
                          <span className="text-blue-600 font-bold mr-3">{index + 1}.</span>
                          <span className="text-gray-800">{idea}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">How to Use This Tool</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Step 1: Upload & Configure
              </h3>
              <p className="text-gray-600 text-sm">
                Upload your resume, select your industry, career stage, and primary goal. Add
                optional details for more personalized results.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Step 2: Generate Content
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your resume and generates multiple variations of headlines, about
                sections, and experience descriptions.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Step 3: Select & Customize
              </h3>
              <p className="text-gray-600 text-sm">
                Review the generated variations, select your favorites, and customize them to match
                your personal brand.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
                Step 4: Copy & Apply
              </h3>
              <p className="text-gray-600 text-sm">
                Copy the content to your clipboard and paste directly into your LinkedIn profile.
                Watch your engagement grow!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Professional LinkedIn Profile Writing?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            While our AI tool provides excellent content, our expert writers craft fully customized
            LinkedIn profiles that tell your unique story and position you as an industry leader.
          </p>
          <Link
            href="/services/linkedin-profile-optimization"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View Professional Services
          </Link>
        </div>
      </div>
    </div>
  )
}
