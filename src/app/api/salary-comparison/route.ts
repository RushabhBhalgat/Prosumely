/**
 * Salary Comparison Tool API with Cost-Optimized Gemini AI
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
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request, '/api/salary-comparison')
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
    const { scenarios } = await request.json()

    if (!scenarios || !Array.isArray(scenarios) || scenarios.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 scenarios are required for comparison' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const scenariosText = scenarios
      .map(
        (s: any, idx: number) => `
**Scenario ${idx + 1}: ${s.location}**
- Job Title: ${s.jobTitle}
- Experience: ${s.experienceYears} years
- Industry: ${s.industry}
- Company Size: ${s.companySize}
- Work Arrangement: ${s.workArrangement}
- Base Salary: $${s.baseSalary}
- Bonuses: $${s.bonuses || 0}
- Equity/Stock: $${s.equity || 0}
- Benefits Value: $${s.benefits || 0}
`,
      )
      .join('\n')

    const prompt = `As a global compensation analyst, compare these salary scenarios across multiple dimensions including cost of living, taxes, purchasing power, and quality of life.

${scenariosText}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "scenarios": [
    {
      "scenarioId": number,
      "location": "string",
      "rawSalary": number,
      "costOfLivingIndex": number,
      "adjustedSalary": number,
      "taxBreakdown": {
        "federal": number,
        "state": number,
        "local": number,
        "totalTaxRate": number
      },
      "netTakeHome": number,
      "totalCompensation": number,
      "livingCosts": {
        "housing": number,
        "transportation": number,
        "food": number,
        "healthcare": number,
        "utilities": number,
        "entertainment": number,
        "total": number
      },
      "savingsPotential": number,
      "qualityOfLifeScore": number
    }
  ],
  "comparison": {
    "bestRawSalary": number,
    "bestPurchasingPower": number,
    "lowestTaxBurden": number,
    "highestTotalComp": number,
    "bestSavingsPotential": number,
    "bestQualityOfLife": number
  },
  "insights": [
    {
      "type": "key_difference" | "hidden_cost" | "opportunity" | "risk",
      "message": "string",
      "affectsScenarios": [number]
    }
  ],
  "recommendations": [
    {
      "scenario": number,
      "recommendation": "string",
      "reasoning": "string"
    }
  ]
}

Be realistic with tax rates, cost of living data, and purchasing power calculations. Consider remote work tax implications if applicable.`

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', errorText)
      throw new Error(`Gemini API failed: ${geminiResponse.statusText}`)
    }

    const geminiData = await geminiResponse.json()
    const rawText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'

    // Step 6: Parse JSON from response
    let analysis
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found in response')
      analysis = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw response:', rawText)
      throw new Error('Failed to parse AI response')
    }

    // Step 7: Return structured response
    const processingTime = Date.now() - startTime

    return NextResponse.json(
      {
        analysis,
        processingTime,
        success: true,
      },
      {
        status: 200,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  } catch (error: any) {
    console.error('Salary comparison error:', error)

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error.message || 'Failed to compare salaries',
      },
      {
        status: 500,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
