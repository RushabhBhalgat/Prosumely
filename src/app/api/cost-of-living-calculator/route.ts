/**
 * Cost of Living Calculator API with Cost-Optimized Gemini AI
 * Production-ready endpoint with rate limiting and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Use the cheapest Gemini model
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
      '/api/cost-of-living-calculator',
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
      currentLocation,
      targetLocations,
      householdSize,
      lifestyleLevel,
      housingType,
      locationPreference,
      carOwnership,
    } = await request.json()

    if (!currentLocation || !targetLocations || !householdSize) {
      return NextResponse.json(
        { error: 'Missing required fields: currentLocation, targetLocations, householdSize' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As a cost of living analyst and global relocation expert, provide a detailed cost comparison between locations.

**Input Data:**
- Current Location: ${currentLocation}
- Target Location(s): ${targetLocations.join(', ')}
- Household Size: ${householdSize} people
- Lifestyle Level: ${lifestyleLevel || 'Moderate'}
- Housing Type: ${housingType || '2BR apartment'}
- Location Preference: ${locationPreference || 'City center'}
- Car Ownership: ${carOwnership || 'No'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "locations": [
    {
      "location": "string (city, country)",
      "housing": {
        "rent": "number (monthly in USD)",
        "utilities": "number",
        "insurance": "number",
        "maintenance": "number",
        "total": "number"
      },
      "transportation": {
        "publicTransit": "number",
        "carExpenses": "number",
        "gasParking": "number",
        "total": "number"
      },
      "foodGroceries": {
        "groceries": "number",
        "diningOut": "number",
        "total": "number"
      },
      "healthcare": {
        "insurance": "number",
        "outOfPocket": "number",
        "total": "number"
      },
      "taxes": {
        "incomeTax": "string (e.g., '15-25%')",
        "salesTax": "string",
        "propertyTax": "number"
      },
      "lifestyle": {
        "gymEntertainment": "number",
        "subscriptions": "number",
        "hobbies": "number",
        "total": "number"
      },
      "education": {
        "childcare": "number",
        "schoolFees": "number",
        "total": "number"
      },
      "totalMonthly": "number",
      "totalAnnual": "number",
      "costIndex": "number (base location = 100)"
    }
  ],
  "comparison": {
    "baseLocation": "string",
    "biggestDifferences": [
      {
        "category": "string",
        "difference": "string (with percentage)"
      }
    ],
    "equivalentSalaries": [
      {
        "location": "string",
        "salaryNeeded": "number",
        "explanation": "string"
      }
    ]
  },
  "purchasingPower": {
    "insights": ["insight1", "insight2"],
    "hiddenCosts": ["cost1", "cost2"],
    "qualityOfLifeFactors": ["factor1", "factor2"]
  },
  "recommendations": {
    "bestValueLocation": "string",
    "reasonsToConsider": ["reason1", "reason2"],
    "potentialChallenges": ["challenge1", "challenge2"]
  }
}

Use realistic 2025 data. Be accurate with currency conversions. Consider all requested parameters.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.5,
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
            message:
              'AI service rate limit reached. The free Gemini API has limits: 1,500 requests/day, 15 requests/minute. Please try again in a few minutes.',
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
    console.error('Cost of Living Calculator API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
