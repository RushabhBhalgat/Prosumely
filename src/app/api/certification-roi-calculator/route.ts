/**
 * Certification ROI Calculator API with Cost-Optimized Gemini AI
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
      '/api/certification-roi-calculator',
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
      certificationName,
      currentRole,
      industry,
      yearsExperience,
      currentSalary,
      location,
      courseCost,
      examFee,
      studyMaterialsCost,
      timeInvestment,
      renewalCost,
      primaryReason,
    } = await request.json()

    if (
      !certificationName ||
      !currentRole ||
      !industry ||
      yearsExperience === undefined ||
      !currentSalary ||
      !location
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: certificationName, currentRole, industry, yearsExperience, currentSalary, location',
        },
        { status: 400 },
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `As a professional certification advisor and career ROI analyst, evaluate the following certification investment.

**Certification Details:**
- Certification Name: ${certificationName}
- Current Role: ${currentRole}
- Industry: ${industry}
- Years of Experience: ${yearsExperience}
- Current Salary: ${currentSalary}
- Location: ${location}

**Investment Costs:**
- Course/Training Cost: $${courseCost || 0}
- Exam Fee: $${examFee || 0}
- Study Materials: $${studyMaterialsCost || 0}
- Time Investment: ${timeInvestment || 0} hours
- Annual Renewal Cost: $${renewalCost || 0}

**Primary Goal:** ${primaryReason || 'Career advancement'}

Return ONLY a valid JSON object with this structure:

{
  "totalInvestment": {
    "directCosts": number,
    "opportunityCost": number,
    "totalAmount": number
  },
  "expectedReturns": {
    "salaryIncrease": {
      "percentage": number,
      "annualAmount": number
    },
    "jobPlacementImprovement": number,
    "promotionProbability": string,
    "jobSecurity": string,
    "billableRateIncrease": string
  },
  "roiMetrics": {
    "paybackPeriodMonths": number,
    "fiveYearROI": number,
    "lifetimeValue": number,
    "roiPercentage": number
  },
  "valueScore": number,
  "marketDemand": {
    "jobPostingsRequiring": string,
    "demandTrend": string,
    "employerRecognition": string,
    "industryRelevance": string
  },
  "alternativesComparison": [
    {
      "alternative": string,
      "reason": string
    }
  ],
  "riskFactors": [
    {
      "risk": string,
      "severity": "high|medium|low"
    }
  ],
  "recommendation": {
    "decision": "Pursue Now|Consider If|Wait|Skip",
    "reasoning": string,
    "conditions": [string]
  }
}

Provide realistic, data-driven analysis based on current market conditions and industry standards.`

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
    console.error('Certification ROI calculation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to calculate ROI',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
