/**
 * Work Abroad Savings Calculator API with Cost-Optimized Gemini AI
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
      '/api/work-abroad-savings',
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
      homeCountry,
      homeSalary,
      homeLivingCost,
      targetCountry,
      offeredSalary,
      contractDuration,
      housingProvided,
      otherBenefits,
      rent,
      utilities,
      food,
      transportation,
      healthcare,
      entertainment,
      personalExpenses,
      remittances,
      homeExpenses,
      debtPayments,
      savingsGoal,
    } = await request.json()

    if (!homeCountry || !targetCountry || !offeredSalary || !contractDuration) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: homeCountry, targetCountry, offeredSalary, contractDuration',
        },
        { status: 400 },
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `As an international work financial advisor and expat wealth strategist, analyze this work abroad opportunity.

**Home Country Details:**
- Country: ${homeCountry}
- Current Salary: ${homeSalary ? `$${homeSalary}` : 'Not specified'}
- Living Costs at Home: ${homeLivingCost ? `$${homeLivingCost}` : 'Not specified'}

**Abroad Details:**
- Target Country: ${targetCountry}
- Offered Salary: $${offeredSalary} annually
- Contract Duration: ${contractDuration} months
- Housing Provided: ${housingProvided ? 'Yes' : 'No'}
- Other Benefits: ${otherBenefits || 'None specified'}

**Living Expenses Abroad (Monthly):**
- Rent: $${rent || 0}
- Utilities: $${utilities || 0}
- Food: $${food || 0}
- Transportation: $${transportation || 0}
- Healthcare: $${healthcare || 0}
- Entertainment: $${entertainment || 0}
- Personal: $${personalExpenses || 0}

**Commitments:**
- Remittances: $${remittances || 0}/month
- Home Expenses: $${homeExpenses || 0}/month
- Debt Payments: $${debtPayments || 0}/month
- Savings Goal: $${savingsGoal || 0}/month

Return ONLY a valid JSON object with this structure:

{
  "monthlyFinancialFlow": {
    "income": {
      "grossSalary": number,
      "taxes": number,
      "deductions": number,
      "netIncome": number
    },
    "fixedExpenses": {
      "rent": number,
      "utilities": number,
      "transportation": number,
      "insurance": number,
      "total": number
    },
    "variableExpenses": {
      "food": number,
      "entertainment": number,
      "personal": number,
      "shopping": number,
      "travel": number,
      "total": number
    },
    "obligations": {
      "remittances": number,
      "homeExpenses": number,
      "debtPayments": number,
      "total": number
    },
    "netMonthlySavings": number,
    "annualSavings": number
  },
  "savingsAnalysis": {
    "savingsRate": number,
    "savingsRating": "excellent|good|fair|poor",
    "wealthAccumulation": {
      "afterOneYear": number,
      "afterTwoYears": number,
      "contractEnd": number,
      "withInvestmentReturns": number
    },
    "comparisonToHome": {
      "homeSavings": number,
      "abroadSavings": number,
      "additionalSavings": number,
      "totalPremium": number
    }
  },
  "currencyRiskAssessment": {
    "exchangeRateImpact": string,
    "historicalVolatility": string,
    "hedgingRecommendations": [string]
  },
  "financialGoals": [
    {
      "goal": string,
      "targetAmount": number,
      "achievableInMonths": number
    }
  ],
  "hiddenCosts": [
    {
      "cost": string,
      "estimatedAmount": number,
      "frequency": string
    }
  ],
  "recommendations": {
    "savingsAllocation": string,
    "investmentStrategy": string,
    "taxAdvantages": [string],
    "remittanceTiming": string
  },
  "summary": {
    "worthIt": boolean,
    "keyBenefit": string,
    "mainConcern": string,
    "overallAssessment": string
  }
}

Provide realistic financial projections based on current market conditions and typical expat experiences.`

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
    console.error('Work Abroad Savings calculation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to calculate savings potential',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
