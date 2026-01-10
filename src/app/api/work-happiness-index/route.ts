/**
 * Work Happiness Index API with Gemini AI
 * Production-ready endpoint with rate limiting and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

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
    // Step 1: Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Step 2: Rate limiting
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/work-happiness-index',
    )
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
    const {
      ratings,
      importanceWeights,
      timeInRole,
      previousSatisfaction,
      lifeStage,
      role,
      industry,
    } = await request.json()

    if (!ratings || !importanceWeights) {
      return NextResponse.json(
        { error: 'Missing required fields: ratings, importanceWeights' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As a workplace psychology expert and career advisor, analyze this job satisfaction assessment:

**Satisfaction Ratings (1-10):**
- Compensation: ${ratings.compensation}
- Work-Life Balance: ${ratings.workLifeBalance}
- Career Growth: ${ratings.careerGrowth}
- Manager Quality: ${ratings.managerQuality}
- Company Culture: ${ratings.companyCulture}
- Job Security: ${ratings.jobSecurity}
- Work Interest: ${ratings.workInterest}
- Autonomy: ${ratings.autonomy}
- Impact: ${ratings.impact}
- Recognition: ${ratings.recognition}
- Team Dynamics: ${ratings.teamDynamics}
- Resources: ${ratings.resources}
- Commute: ${ratings.commute || 'N/A'}

**Importance Weights (ranked):**
${Object.entries(importanceWeights)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

**Context:**
- Time in Current Role: ${timeInRole || 'Not specified'}
- Previous Job Satisfaction: ${previousSatisfaction || 'Not specified'}
- Life Stage: ${lifeStage || 'Not specified'}
- Role: ${role || 'Not specified'}
- Industry: ${industry || 'Not specified'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "overallScore": number (0-100),
  "scoreCategory": "Stay & Thrive (75-100)" | "Stay & Improve (60-74)" | "Explore Options (45-59)" | "Active Job Search (0-44)",
  "dimensionScores": {
    "financialSatisfaction": {
      "score": number (0-100),
      "factors": ["Compensation", "Benefits", "Security"],
      "analysis": "string"
    },
    "growthDevelopment": {
      "score": number (0-100),
      "factors": ["Advancement", "Learning", "Challenge"],
      "analysis": "string"
    },
    "relationships": {
      "score": number (0-100),
      "factors": ["Manager", "Team", "Culture"],
      "analysis": "string"
    },
    "workItself": {
      "score": number (0-100),
      "factors": ["Interest", "Impact", "Autonomy"],
      "analysis": "string"
    },
    "workLifeIntegration": {
      "score": number (0-100),
      "factors": ["Hours", "Flexibility", "Stress"],
      "analysis": "string"
    },
    "environment": {
      "score": number (0-100),
      "factors": ["Physical space", "Resources", "Commute"],
      "analysis": "string"
    }
  },
  "satisfactionDrivers": {
    "topPositiveFactors": [
      {"factor": "string", "score": number, "impact": "string"}
    ],
    "topNegativeFactors": [
      {"factor": "string", "score": number, "impact": "string"}
    ],
    "dealBreakers": ["string"]
  },
  "happinessTrajectory": {
    "trend": "improving" | "stable" | "declining",
    "sustainability": "string (how long can this be sustained)",
    "burnoutRisk": "low" | "medium" | "high",
    "analysis": "string"
  },
  "benchmarkComparison": {
    "vsIndustryAverage": {"percentile": number, "message": "string"},
    "vsCompanySize": {"percentile": number, "message": "string"},
    "vsRole": {"percentile": number, "message": "string"}
  },
  "recommendation": {
    "action": "Stay & Thrive" | "Stay & Improve" | "Explore Options" | "Active Job Search",
    "reasoning": "string (2-3 sentences)",
    "timeframe": "string",
    "confidence": "high" | "medium" | "low"
  },
  "improvementStrategies": [
    {
      "dimension": "string",
      "currentIssue": "string",
      "actionableSteps": ["string"],
      "conversations": ["string"],
      "expectations": "string",
      "timeline": "string",
      "likelihoodOfChange": "high" | "medium" | "low"
    }
  ],
  "jobSearchGuidance": {
    "shouldSearch": boolean,
    "prioritiesForNextRole": ["string"],
    "greenFlags": ["string"],
    "redFlags": ["string"],
    "interviewQuestions": ["string"]
  },
  "nextSteps": [
    {
      "action": "string",
      "timeline": "immediate" | "1-3 months" | "3-6 months",
      "priority": "high" | "medium" | "low"
    }
  ]
}

Provide honest, actionable, and empowering analysis. Consider the importance weights when calculating scores. Be specific and realistic about improvement potential.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', response.status, errorText)

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: 'AI_SERVICE_RATE_LIMIT',
            message: 'AI service rate limit reached. Please try again in a few minutes.',
          },
          { status: 429 },
        )
      }

      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from AI service')
    }

    // Parse JSON response
    let cleanedResponse = generatedText.trim()
    cleanedResponse = cleanedResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '')
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0]
    }

    let analysis
    try {
      analysis = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError)
      throw new Error('Failed to parse AI response')
    }

    return NextResponse.json(
      {
        analysis,
        processingTime: Date.now() - startTime,
        success: true,
      },
      {
        status: 200,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  } catch (error) {
    console.error('Work Happiness Index API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
