/**
 * Work-Life Balance Index API - Wellness Assessment & Burnout Risk Analysis
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
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/work-life-balance-index',
    )
    if (!rateLimitResult.allowed) {
      const timeUntilReset = rateLimitResult.retryAfter || 0

      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: rateLimitResult.message,
          tier: rateLimitResult.tier,
          resetTime: rateLimitResult.resetTime,
          retryAfter: timeUntilReset,
        },
        {
          status: 429,
          headers: {
            ...securityManager.getCORSHeaders(request),
            'X-RateLimit-Limit': '4',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toISOString(),
            'Retry-After': timeUntilReset.toString(),
          },
        },
      )
    }

    const {
      hoursPerWeek,
      commuteTime,
      workSchedule,
      remoteDaysPerWeek,
      vacationDaysTaken,
      vacationDaysAvailable,
      afterHoursEmail,
      weekendWorkFrequency,
      workStressLevel,
      sleepHours,
      exerciseDaysPerWeek,
      hobbyHoursPerWeek,
      socialConnectionQuality,
      personalGrowthHours,
      healthStatus,
      overallHappiness,
      workSatisfaction,
      relationshipQuality,
      financialStress,
    } = await request.json()

    if (!workSchedule || !afterHoursEmail || !weekendWorkFrequency) {
      throw new Error('Missing required fields')
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `Analyze work-life balance. Return ONLY JSON, no markdown.

INPUT:
Work: ${hoursPerWeek}h/week, ${commuteTime}min commute, ${workSchedule} schedule, ${remoteDaysPerWeek} remote days, ${vacationDaysTaken}/${vacationDaysAvailable} vacation taken, after-hours email: ${afterHoursEmail}, weekend work: ${weekendWorkFrequency}, stress: ${workStressLevel}/10
Life: ${sleepHours}h sleep, ${exerciseDaysPerWeek} exercise days, ${hobbyHoursPerWeek}h hobbies, social: ${socialConnectionQuality}/10, growth: ${personalGrowthHours}h, health: ${healthStatus}/10
Satisfaction: happiness ${overallHappiness}/10, work ${workSatisfaction}/10, relationships ${relationshipQuality}/10, financial stress ${financialStress}/10

OUTPUT JSON:
{
  "overallScore": <0-100>,
  "burnoutRisk": "Low|Moderate|High|Critical",
  "dimensionScores": {
    "timeBalance": {
      "score": <0-25>,
      "maxScore": 25,
      "percentage": <0-100>,
      "label": "Time Balance",
      "feedback": "<1-2 sentences>"
    },
    "flexibility": {
      "score": <0-20>,
      "maxScore": 20,
      "percentage": <0-100>,
      "label": "Flexibility & Autonomy",
      "feedback": "<1-2 sentences>"
    },
    "stressMentalHealth": {
      "score": <0-20>,
      "maxScore": 20,
      "percentage": <0-100>,
      "label": "Stress & Mental Health",
      "feedback": "<1-2 sentences>"
    },
    "physicalWellbeing": {
      "score": <0-15>,
      "maxScore": 15,
      "percentage": <0-100>,
      "label": "Physical Wellbeing",
      "feedback": "<1-2 sentences>"
    },
    "lifeSatisfaction": {
      "score": <0-20>,
      "maxScore": 20,
      "percentage": <0-100>,
      "label": "Life Satisfaction",
      "feedback": "<1-2 sentences>"
    }
  },
  "warningSignals": ["<3-5 specific warning signs if any>"],
  "healthImpact": "<predicted health effects>",
  "recommendations": {
    "immediate": ["<3-4 actions for this week>"],
    "shortTerm": ["<3-4 actions for 1-3 months>"],
    "longTerm": ["<3-4 considerations for 3-12 months>"]
  },
  "comparativeAnalysis": {
    "vsIndustryAverage": "<comparison>",
    "vsCountryNorms": "<comparison>",
    "optimalBalanceGap": "<what's missing>"
  },
  "hiddenCosts": {
    "healthImpact": "<quantified impact>",
    "relationshipStrain": "<impact on relationships>",
    "sustainabilityForecast": "<long-term outlook>"
  }
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
          maxOutputTokens: 1800,
        },
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          `AI Service Rate Limit\n\nThe free Gemini API has limits:\n• 1,500 requests/day\n• 15 requests/minute\n\nPlease try again in a few minutes.`,
        )
      }
      throw new Error(`AI service error: ${response.status}`)
    }

    const data = await response.json()
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from AI service')
    }

    generatedText = generatedText
      .trim()
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')

    let assessment
    try {
      assessment = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    console.log(
      `Work-Life Balance calculated. Score: ${assessment.overallScore}/100, Risk: ${assessment.burnoutRisk}`,
    )

    return NextResponse.json(
      {
        assessment,
        processingTime: Date.now() - startTime,
        success: true,
      },
      {
        headers: {
          ...securityManager.getCORSHeaders(request),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-Processing-Time': (Date.now() - startTime).toString(),
        },
      },
    )
  } catch (error) {
    console.error('Work-Life Balance assessment failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Assessment failed',
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
