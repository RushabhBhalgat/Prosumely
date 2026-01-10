/**
 * Lifetime Earning Potential Calculator API
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
      '/api/lifetime-earning-calculator',
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
      currentAge,
      currentSalary,
      currentRole,
      industry,
      retirementAge,
      annualRaise,
      promotionFrequency,
      careerBreaks,
      educationPlans,
      geographicMove,
    } = await request.json()

    if (!currentRole || !industry) {
      throw new Error('Missing required fields')
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `Calculate lifetime earnings projection. Return ONLY JSON, no markdown.

INPUT:
- Age: ${currentAge}, Retirement: ${retirementAge} (${retirementAge - currentAge} years remaining)
- Current: ${currentRole}, ${industry}, $${currentSalary}
- Growth: ${annualRaise}% annual raise, promotion every ${promotionFrequency} years
- Breaks: ${careerBreaks} months planned
- Education: ${educationPlans || 'None'}
- Location: ${geographicMove || 'No change'}

OUTPUT JSON:
{
  "lifetimeEarnings": {
    "gross": <total gross income>,
    "afterTax": <estimated after-tax (~70% of gross)>,
    "byDecade": {
      "20s": <if applicable>,
      "30s": <total in 30s>,
      "40s": <total in 40s>,
      "50s": <total in 50s>,
      "60s": <total in 60s>
    }
  },
  "yearByYear": [
    {"age": <age>, "salary": <annual>, "cumulative": <total to date>}
  ],
  "scenarios": {
    "conservative": {
      "total": <with minimal raises/growth>,
      "description": "<brief explanation>"
    },
    "moderate": {
      "total": <industry average growth>,
      "description": "<brief explanation>"
    },
    "optimistic": {
      "total": <strong performance>,
      "description": "<brief explanation>"
    }
  },
  "milestones": [
    {"age": <age>, "achievement": "<milestone>", "cumulativeEarnings": <amount>}
  ],
  "decisionImpacts": {
    "fivePercentRaise": "<lifetime value of 5% raise>",
    "promotionImpact": "<value of typical promotion>",
    "careerBreakCost": "<cost of ${careerBreaks} months break>",
    "educationROI": "<ROI of ${educationPlans}>"
  },
  "wealthBuilding": {
    "savingsProjection": "<assuming 15-20% savings rate>",
    "netWorthTrajectory": "<projected net worth at retirement>",
    "retirementReadiness": "<assessment of retirement goals>"
  },
  "keyInsights": {
    "peakEarningYears": "<when highest income expected>",
    "totalByAge40": <cumulative by 40>,
    "totalByAge50": <cumulative by 50>,
    "totalByAge60": <cumulative by 60>,
    "biggestDecisions": ["<top 3 career decisions with biggest $ impact>"]
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
          maxOutputTokens: 2000,
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
      `Lifetime earnings calculated: $${assessment.lifetimeEarnings.gross.toLocaleString()}`,
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
    console.error('Lifetime earning calculation failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Calculation failed',
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
