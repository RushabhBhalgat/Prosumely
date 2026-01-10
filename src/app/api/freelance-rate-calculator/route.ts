/**
 * Freelance Rate Calculator API
 * Provides AI-powered freelance pricing strategy based on work type, experience, location
 * Uses Gemini 2.0 Flash Exp with rate limiting and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Gemini API configuration (FREE tier)
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
      '/api/freelance-rate-calculator',
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

    // Step 3: Parse and validate request
    const {
      workType,
      experienceLevel,
      location,
      specialization = [],
      portfolioProjects = 0,
      weeklyHours = 40,
      desiredIncome = 0,
      expenses = 0,
    } = await request.json()

    // Validation
    if (!workType || !experienceLevel || !location) {
      throw new Error('Missing required fields: workType, experienceLevel, location')
    }

    // Step 4: Generate AI-powered pricing strategy
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Optimized prompt for freelance rate calculation
    const prompt = `Analyze freelance pricing strategy. Return ONLY JSON, no markdown.

INPUT:
- Work Type: ${workType}
- Experience Level: ${experienceLevel}
- Location: ${location}
${specialization && specialization.length > 0 ? `- Specializations: ${specialization.join(', ')}` : ''}
- Portfolio Projects: ${portfolioProjects}
- Weekly Available Hours: ${weeklyHours}
${desiredIncome > 0 ? `- Desired Annual Income: $${desiredIncome}` : ''}
${expenses > 0 ? `- Monthly Business Expenses: $${expenses}` : ''}

OUTPUT JSON (all amounts in USD):
{
  "rateBreakdown": {
    "hourlyRate": <realistic number based on experience and location>,
    "dailyRate": <8-hour day rate>,
    "monthlyRetainer": <based on ${weeklyHours} hours/week>,
    "projectBased": {
      "small": <20-40 hours project>,
      "medium": <40-80 hours project>,
      "large": <80+ hours project>
    }
  },
  "marketPosition": "<1-2 sentences explaining where this rate falls in the market>",
  "competitiveAnalysis": {
    "lowEnd": <budget freelancer rate/hr>,
    "midRange": <average market rate/hr>,
    "highEnd": <premium/expert rate/hr>,
    "yourRate": <recommended rate from rateBreakdown.hourlyRate>
  },
  "valueBasedPricing": {
    "clientROI": "<2-3 sentences on how to communicate value vs time>",
    "recommendedUpsells": [
      "<upsell service 1>",
      "<upsell service 2>",
      "<upsell service 3>",
      "<upsell service 4>"
    ]
  },
  "packageRecommendations": [
    {
      "name": "Basic",
      "description": "<1 sentence description>",
      "price": <package price>,
      "deliverables": [
        "<deliverable 1>",
        "<deliverable 2>",
        "<deliverable 3>"
      ]
    },
    {
      "name": "Standard",
      "description": "<1 sentence description>",
      "price": <package price>,
      "deliverables": [
        "<deliverable 1>",
        "<deliverable 2>",
        "<deliverable 3>",
        "<deliverable 4>"
      ]
    },
    {
      "name": "Premium",
      "description": "<1 sentence description>",
      "price": <package price>,
      "deliverables": [
        "<deliverable 1>",
        "<deliverable 2>",
        "<deliverable 3>",
        "<deliverable 4>",
        "<deliverable 5>"
      ]
    }
  ],
  "negotiationTips": [
    "<negotiation tip 1>",
    "<negotiation tip 2>",
    "<negotiation tip 3>",
    "<negotiation tip 4>",
    "<negotiation tip 5>"
  ],
  "redFlags": [
    "<client red flag 1>",
    "<client red flag 2>",
    "<client red flag 3>",
    "<client red flag 4>"
  ],
  "summary": "<2-3 sentences summarizing the pricing strategy and key recommendations>"
}

Requirements:
- Rates must be realistic for ${location} and ${workType}
- Consider ${experienceLevel} experience level in pricing
- Factor in portfolio size (${portfolioProjects} projects) as credibility indicator
${desiredIncome > 0 ? `- Ensure rates can achieve desired income of $${desiredIncome}/year with ${weeklyHours} billable hours/week` : ''}
${expenses > 0 ? `- Account for monthly expenses of $${expenses}` : ''}
- Package prices should show clear value progression (Basic < Standard < Premium)
- Negotiation tips should be specific and actionable
- Red flags should help freelancers avoid problematic clients
- All pricing should account for taxes, benefits, overhead typical for freelancers`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.85,
          maxOutputTokens: 2500,
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

    let strategy
    try {
      strategy = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    console.log(
      `✅ Freelance rate calculation completed for ${workType} in ${location}. Hourly rate: $${strategy.rateBreakdown.hourlyRate}`,
    )

    return NextResponse.json(
      {
        strategy,
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
    console.error('❌ Freelance rate calculation failed:', error)
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
