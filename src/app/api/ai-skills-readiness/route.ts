/**
 * AI Skills Readiness Score API with Cost-Optimized Gemini AI
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
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/ai-skills-readiness',
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

    const {
      currentRole,
      industry,
      experienceLevel,
      hasUsedGenerativeAI,
      usesAIInWork,
      aiToolsUsed,
      comfortLevel,
      aiTrainingCompleted,
      currentAIUseCases,
    } = await request.json()

    if (!currentRole || !industry || !experienceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: currentRole, industry, experienceLevel' },
        { status: 400 },
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `As an AI adoption specialist and workforce transformation advisor, assess the AI readiness of this professional.

**Professional Profile:**
- Current Role: ${currentRole}
- Industry: ${industry}
- Experience Level: ${experienceLevel}

**AI Familiarity:**
- Used Generative AI: ${hasUsedGenerativeAI ? 'Yes' : 'No'}
- Uses AI in Daily Work: ${usesAIInWork ? 'Yes' : 'No'}
- AI Tools Used: ${aiToolsUsed?.join(', ') || 'None'}
- Comfort Level: ${comfortLevel || 'Not specified'}/10
- AI Training Completed: ${aiTrainingCompleted ? 'Yes' : 'No'}

**Current AI Use Cases:**
${currentAIUseCases?.join(', ') || 'None yet'}

Return ONLY a valid JSON object with this structure:

{
  "aiReadinessScore": number,
  "scoreBreakdown": {
    "aiLiteracy": {
      "score": number,
      "weight": 25,
      "assessment": string
    },
    "toolProficiency": {
      "score": number,
      "weight": 30,
      "assessment": string
    },
    "integrationSkills": {
      "score": number,
      "weight": 25,
      "assessment": string
    },
    "adaptability": {
      "score": number,
      "weight": 20,
      "assessment": string
    }
  },
  "toolAssessment": [
    {
      "toolType": string,
      "proficiencyLevel": "none|basic|intermediate|advanced",
      "relevanceToRole": "high|medium|low"
    }
  ],
  "learningPath": {
    "foundation": [
      {
        "title": string,
        "description": string,
        "priority": "high|medium|low"
      }
    ],
    "intermediate": [
      {
        "title": string,
        "description": string,
        "priority": "high|medium|low"
      }
    ],
    "advanced": [
      {
        "title": string,
        "description": string,
        "priority": "high|medium|low"
      }
    ]
  },
  "roleSpecificRecommendations": {
    "mustMasterTools": [string],
    "criticalUseCases": [string],
    "competitiveAdvantage": [string],
    "peerTrends": [string]
  },
  "industryBenchmark": {
    "percentile": number,
    "adoptionLevel": string,
    "futureRequirements": [string]
  },
  "actionPlan": {
    "immediate": [string],
    "shortTerm": [string],
    "longTerm": [string]
  }
}

Provide honest assessment with practical, actionable recommendations.`

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!resultText) {
      throw new Error('No response from AI')
    }

    let analysisResult
    try {
      const cleanedText = resultText
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim()
      analysisResult = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError)
      return NextResponse.json(
        {
          error: 'Failed to parse AI response',
          rawResponse: resultText.substring(0, 500),
        },
        { status: 500 },
      )
    }

    const processingTime = Date.now() - startTime

    return NextResponse.json(
      {
        success: true,
        data: analysisResult,
        processingTime,
      },
      {
        status: 200,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  } catch (error) {
    console.error('AI Skills Readiness error:', error)
    return NextResponse.json(
      {
        error: 'Failed to calculate AI readiness',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
