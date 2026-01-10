/**
 * Job Demand vs Supply Calculator API
 * Analyzes job market competition and provides strategy recommendations
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash Exp - FREE tier)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Step 1: Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Step 2: Rate limiting
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request, '/api/job-demand-supply')

    if (!rateLimitResult.allowed) {
      const timeUntilReset = rateLimitResult.retryAfter || 0
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: rateLimitResult.message,
          retryAfter: timeUntilReset,
        },
        {
          status: 429,
          headers: {
            ...securityManager.getCORSHeaders(request),
            'Retry-After': timeUntilReset.toString(),
          },
        },
      )
    }

    // Step 3: Parse and validate input
    const body = await request.json()
    const {
      jobTitle,
      location,
      industry,
      experienceLevel,
      skills,
      education,
      certifications,
      companySizePreference,
      salaryExpectations,
    } = body

    if (!jobTitle || !location || !industry || !experienceLevel) {
      throw new Error('Missing required fields')
    }

    // Step 4: Use AI for comprehensive market analysis
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `Analyze job market supply and demand. Return ONLY JSON, no markdown.

INPUT:
- Job Title: ${jobTitle}
- Location: ${location}
- Industry: ${industry}
- Experience Level: ${experienceLevel}
- Skills: ${skills?.join(', ') || 'Not specified'}
- Education: ${education || 'Not specified'}
- Certifications: ${certifications?.join(', ') || 'None'}

OUTPUT JSON:
{
  "competitionIndex": <0-10 where 0=very high demand, 10=extremely competitive>,
  "competitionLevel": "Very High Demand|High Demand|Balanced|High Competition|Extremely Competitive",
  "marketMetrics": {
    "currentOpenings": <estimated number>,
    "openingsTrend": "Increasing|Stable|Declining",
    "monthOverMonthChange": "<percentage>",
    "seasonalPattern": "<description>",
    "candidateSupply": <estimated qualified professionals>,
    "activeJobSeekers": <estimate>,
    "applicationVolume": "<dozens|hundreds|thousands per opening>",
    "averageApplicationsPerOpening": <number>,
    "timeToHireAvgDays": <days>,
    "salaryTrend": "Rising|Stable|Declining",
    "salaryTrendReasoning": "<1 sentence>"
  },
  "regionalAnalysis": {
    "bestCities": [
      {"city": "<city>", "demandScore": <0-10>, "reason": "<why>"}
    ],
    "worstCities": [
      {"city": "<city>", "competitionScore": <0-10>, "reason": "<why>"}
    ],
    "remoteWorkImpact": "<how remote work affects supply/demand>"
  },
  "industryInsights": {
    "topHiringIndustries": ["<3-5 industries>"],
    "growthForecast": "Strong Growth|Moderate Growth|Stable|Declining",
    "emergingSpecializations": ["<2-3 hot specializations>"],
    "decliningSpecializations": ["<2-3 declining areas>"]
  },
  "competitivePositioning": {
    "yourOddsRating": "Top Tier (Top 10%)|Strong (Top 25%)|Average (Middle 50%)|Below Average (Bottom 25%)",
    "percentileEstimate": <0-100>,
    "reasoning": "<why you're in this tier>",
    "improvementRecommendations": [
      {
        "area": "<what to improve>",
        "impact": "Critical|High|Medium",
        "timeframe": "<how long to acquire>"
      }
    ]
  },
  "jobSearchStrategy": {
    "recommendedApproach": "<tailored strategy based on competition>",
    "applicationVolume": "<how many applications needed>",
    "expectedTimelineMonths": <months>,
    "networkingImportance": "Critical|High|Medium|Low",
    "negotiationLeverage": "Strong|Fair|Limited|Very Limited",
    "specificTactics": ["<3-5 actionable tactics>"]
  },
  "forecast": {
    "oneYearOutlook": "Much Better|Better|Same|Worse|Much Worse",
    "threeYearOutlook": "Much Better|Better|Same|Worse|Much Worse",
    "aiAutomationRisk": "High|Medium|Low|None",
    "disruptionFactors": ["<2-3 factors that could change market>"]
  },
  "alertsAndInsights": [
    "<3-5 key insights or warnings>"
  ]
}`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.85,
          maxOutputTokens: 2000,
        },
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          `⚠️ AI Service Rate Limit\n\nThe free Gemini API has limits:\n• 1,500 requests/day\n• 15 requests/minute\n\nPlease try again in a few minutes.`,
        )
      }
      throw new Error(`AI service error: ${response.status}`)
    }

    const data = await response.json()
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from AI service')
    }

    // Clean response
    generatedText = generatedText
      .trim()
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')

    let analysis
    try {
      analysis = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    console.log(`✅ Market analysis completed. Competition Index: ${analysis.competitionIndex}/10`)

    return NextResponse.json(
      {
        analysis,
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
    console.error('❌ Market analysis failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Analysis failed',
        message: errorMessage,
        type: 'UNKNOWN_ERROR',
      },
      {
        status: 500,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
