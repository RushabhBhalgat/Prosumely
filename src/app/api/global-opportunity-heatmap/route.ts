/**
 * Global Opportunity Heatmap API
 * Analyzes global job opportunities based on skills, experience, and preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

export async function OPTIONS(request: NextRequest) {
  const corsHeaders = securityManager.getCORSHeaders(request)
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Rate limiting
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/global-opportunity-heatmap',
    )
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: rateLimitResult.message,
          tier: rateLimitResult.tier,
          resetTime: rateLimitResult.resetTime,
          retryAfter: rateLimitResult.retryAfter || 0,
        },
        {
          status: 429,
          headers: {
            ...securityManager.getCORSHeaders(request),
            'Retry-After': (rateLimitResult.retryAfter || 0).toString(),
          },
        },
      )
    }

    // Parse request
    const {
      jobTitle,
      yearsOfExperience,
      skills,
      industry,
      workMode,
      salaryExpectation,
      visaRequirement,
    } = await request.json()

    // Validation
    if (!jobTitle || typeof jobTitle !== 'string') {
      throw new Error('Job title is required and must be a string')
    }

    if (
      yearsOfExperience === undefined ||
      typeof yearsOfExperience !== 'number' ||
      yearsOfExperience < 0 ||
      yearsOfExperience > 50
    ) {
      throw new Error('Years of experience must be a number between 0 and 50')
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      throw new Error('At least one skill is required')
    }

    if (skills.length > 20) {
      throw new Error('Maximum 20 skills allowed')
    }

    // Clean inputs
    const cleanJobTitle = jobTitle.trim().slice(0, 100)
    const cleanSkills = skills.map((s) => String(s).trim()).filter((s) => s.length > 0)
    const cleanIndustry = industry ? String(industry).trim().slice(0, 100) : ''
    const cleanWorkMode = workMode || 'any'
    const cleanSalaryExpectation = salaryExpectation || 'market_rate'
    const cleanVisaRequirement = visaRequirement === true

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Generate opportunity analysis
    const prompt = `You are a global job market analyst with expertise in international hiring trends, salary benchmarks, visa policies, and remote work opportunities.

Analyze the global job market for this candidate profile:

JOB TITLE: ${cleanJobTitle}
YEARS OF EXPERIENCE: ${yearsOfExperience}
SKILLS: ${cleanSkills.join(', ')}
${cleanIndustry ? `INDUSTRY: ${cleanIndustry}` : ''}
WORK MODE PREFERENCE: ${cleanWorkMode}
SALARY EXPECTATION: ${cleanSalaryExpectation}
VISA SPONSORSHIP NEEDED: ${cleanVisaRequirement ? 'Yes' : 'No'}

Provide a comprehensive global opportunity analysis in the following JSON structure:

{
  "summary": "<2-3 sentence overview of global opportunities>",
  "overallScore": <number 0-100 representing job market strength>,
  "topCountries": [
    {
      "country": "<country name>",
      "countryCode": "<ISO 2-letter code (US, GB, DE, etc.)>",
      "demandScore": <number 0-100>,
      "salaryRange": {
        "min": <number in USD>,
        "max": <number in USD>,
        "currency": "USD"
      },
      "visaFriendliness": "easy|moderate|difficult",
      "remoteOpportunities": "high|medium|low",
      "topCities": ["<city1>", "<city2>", "<city3>"],
      "keyIndustries": ["<industry1>", "<industry2>"],
      "insights": "<brief insight about this market>",
      "cost of living": "high|medium|low"
    }
  ],
  "skillDemand": [
    {
      "skill": "<skill name>",
      "demandLevel": "very_high|high|moderate|low",
      "topCountries": ["<country1>", "<country2>", "<country3>"],
      "salaryImpact": "high|medium|low"
    }
  ],
  "remoteWorkInsights": {
    "availability": "high|medium|low",
    "topRemoteCountries": ["<country1>", "<country2>", "<country3>"],
    "remoteJobPercentage": <number 0-100>,
    "insights": "<insights about remote work for this role>"
  },
  "visaInsights": {
    "easiestCountries": ["<country1>", "<country2>", "<country3>"],
    "sponsorshipAvailability": "common|limited|rare",
    "popularPrograms": ["<visa program 1>", "<visa program 2>"],
    "insights": "<insights about visa options>"
  },
  "recommendations": [
    {
      "type": "country|skill|strategy",
      "title": "<recommendation title>",
      "description": "<detailed recommendation>",
      "priority": "high|medium|low"
    }
  ]
}

REQUIREMENTS:
- Provide data for 8-12 countries with highest opportunities
- Use accurate country codes (US, GB, DE, CA, AU, SG, JP, etc.)
- Salary ranges should be realistic and in USD
- Consider current 2025 job market trends
- Factor in remote work trends post-pandemic
- Include both traditional tech hubs and emerging markets
- Be specific about visa programs (H1B, skilled worker visa, etc.)
- Consider work mode preference in analysis
- Provide actionable recommendations
- Use real-world salary data ranges

Return ONLY valid JSON, no additional text.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Gemini API error:', response.status, errorText)

      if (response.status === 429) {
        throw new Error(
          '⚠️ Gemini AI Rate Limit Exceeded\n\n' +
            'The AI service has reached its usage limits:\n' +
            '• Free tier: 1,500 requests per day\n' +
            '• 15 requests per minute\n\n' +
            "This is separate from our tool's rate limit (4/hour for free users).\n\n" +
            'Please try again in:\n' +
            '• A few minutes (if you hit per-minute limit)\n' +
            '• Tomorrow (if you hit daily limit)',
        )
      }
      throw new Error(`AI service error: ${response.status}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from AI service')
    }

    // Parse JSON
    let analysisText = generatedText.trim()
    analysisText = analysisText.replace(/```json\s*/g, '').replace(/```\s*/g, '')

    let opportunityData
    try {
      opportunityData = JSON.parse(analysisText)
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError)
      throw new Error('Invalid response format from AI service')
    }

    // Validate structure
    if (
      !opportunityData.summary ||
      !Array.isArray(opportunityData.topCountries) ||
      opportunityData.topCountries.length === 0
    ) {
      throw new Error('Incomplete analysis from AI service')
    }

    console.log(`✅ Opportunity analysis generated. Score: ${opportunityData.overallScore}/100`)

    return NextResponse.json(
      {
        analysis: opportunityData,
        processingTime: Date.now() - startTime,
        success: true,
      },
      {
        headers: {
          ...securityManager.getCORSHeaders(request),
          'X-Processing-Time': (Date.now() - startTime).toString(),
        },
      },
    )
  } catch (error) {
    console.error('❌ Opportunity analysis failed:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode = errorMessage.includes('required') ? 400 : 500

    return NextResponse.json(
      {
        error: 'Opportunity analysis failed',
        message: errorMessage,
        processingTime: Date.now() - startTime,
      },
      {
        status: statusCode,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
