/**
 * Global Relocation Affordability Calculator API with Gemini AI
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
      '/api/global-relocation-affordability',
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
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      householdSize,
      moveTimeline,
      duration,
      currentSavings,
      currentSalary,
      newSalaryOffer,
      debtObligations,
      housingSize,
      belongingsVolume,
      pets,
      shippingVehicle,
    } = await request.json()

    if (!fromCountry || !toCountry || !toCity || householdSize === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: fromCountry, toCountry, toCity, householdSize' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As an international relocation expert and financial planner, analyze this relocation scenario:

**Move Details:**
- From: ${fromCity ? `${fromCity}, ${fromCountry}` : fromCountry}
- To: ${toCity}, ${toCountry}
- Household Size: ${householdSize} ${householdSize > 1 ? 'people' : 'person'}
- Move Timeline: ${moveTimeline || 'Not specified'}
- Duration: ${duration || 'Permanent'}

**Financial Situation:**
- Current Savings: $${currentSavings ? currentSavings.toLocaleString() : '0'}
- Current Salary: $${currentSalary ? currentSalary.toLocaleString() : '0'}/year
- New Salary Offer: $${newSalaryOffer ? newSalaryOffer.toLocaleString() : 'Not specified'}/year
- Debt Obligations: $${debtObligations ? debtObligations.toLocaleString() : '0'}/month

**Relocation Needs:**
- Housing Size: ${housingSize || 'Not specified'} bedrooms
- Belongings Volume: ${belongingsVolume || 'Standard household items'}
- Pets: ${pets || 'None'}
- Vehicle Shipping: ${shippingVehicle ? 'Yes' : 'No'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "oneTimeCosts": {
    "visaImmigration": {
      "applicationFees": number,
      "legalFees": number,
      "medicalExams": number,
      "translations": number,
      "biometrics": number,
      "total": number,
      "breakdown": "string"
    },
    "travel": {
      "flights": number,
      "excessBaggage": number,
      "temporaryAccommodation": number,
      "total": number,
      "breakdown": "string"
    },
    "shippingMoving": {
      "householdGoods": number,
      "vehicleShipping": number,
      "petTransportation": number,
      "insurance": number,
      "storage": number,
      "total": number,
      "breakdown": "string"
    },
    "housingSetup": {
      "securityDeposit": number,
      "firstMonthRent": number,
      "realtorFees": number,
      "furnitureAppliances": number,
      "utilitiesConnection": number,
      "total": number,
      "breakdown": "string"
    },
    "administrative": {
      "driversLicense": number,
      "bankFees": number,
      "phoneInternet": number,
      "addressChanges": number,
      "total": number,
      "breakdown": "string"
    },
    "grandTotal": number
  },
  "ongoingMonthlyCosts": {
    "housing": {"amount": number, "details": "string"},
    "utilities": {"amount": number, "details": "string"},
    "transportation": {"amount": number, "details": "string"},
    "food": {"amount": number, "details": "string"},
    "healthcare": {"amount": number, "details": "string"},
    "education": {"amount": number, "details": "string"},
    "entertainment": {"amount": number, "details": "string"},
    "savings": {"amount": number, "details": "string"},
    "monthlyTotal": number,
    "annualTotal": number,
    "comparison": {
      "currentLocation": number,
      "newLocation": number,
      "difference": number,
      "percentChange": number
    }
  },
  "affordabilityScore": {
    "score": number (0-100),
    "category": "Go Ahead" | "Proceed with Caution" | "Build More Savings First" | "Reconsider",
    "reasoning": "string"
  },
  "savingsImpact": {
    "relocationCostVsSavings": {"percentage": number, "analysis": "string"},
    "remainingEmergencyFund": {"amount": number, "monthsOfExpenses": number, "adequate": boolean},
    "timeToReplenish": "string",
    "financialBuffer": "comfortable" | "tight" | "insufficient"
  },
  "breakEvenAnalysis": {
    "monthsToRecoup": number,
    "salaryComparison": {
      "oldSalaryAdjusted": number,
      "newSalaryAdjusted": number,
      "netDifference": number,
      "explanation": "string"
    },
    "netPositionAfter": {
      "oneYear": number,
      "twoYears": number,
      "fiveYears": number
    }
  },
  "riskAssessment": {
    "financialRisks": ["string"],
    "currencyFluctuation": "string",
    "jobMarketBackup": "string",
    "overallRiskLevel": "low" | "medium" | "high"
  },
  "recommendation": {
    "action": "Go Ahead" | "Proceed with Caution" | "Build More Savings First" | "Reconsider",
    "reasoning": "string (2-3 sentences)",
    "additionalSavingsNeeded": number,
    "confidence": "high" | "medium" | "low"
  },
  "hiddenCosts": [
    {"category": "string", "description": "string", "estimatedCost": number}
  ],
  "financialTimeline": {
    "threeToSixMonthsBefore": [
      {"task": "string", "estimatedCost": number}
    ],
    "oneToThreeMonthsBefore": [
      {"task": "string", "estimatedCost": number}
    ],
    "uponArrival": [
      {"task": "string", "estimatedCost": number}
    ],
    "firstSixMonths": [
      {"task": "string", "estimatedCost": number}
    ]
  },
  "taxImplications": {
    "doubleTaxationRisk": boolean,
    "explanation": "string",
    "recommendations": ["string"]
  }
}

Use realistic cost data for the specified countries and cities. Be thorough and consider all aspects of international relocation. Provide honest assessment of affordability.`

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
    console.error('Global Relocation Affordability API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
