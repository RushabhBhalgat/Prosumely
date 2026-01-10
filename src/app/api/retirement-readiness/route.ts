/**
 * Retirement Readiness Index API with Cost-Optimized Gemini AI
 * Production-ready endpoint with rate limiting and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Use the cheapest Gemini model
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
      '/api/retirement-readiness',
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
      currentAge,
      targetRetirementAge,
      currentCountry,
      lifeExpectancy,
      currentSavings,
      monthlyContributions,
      personalContribution,
      employerContribution,
      annualReturn,
      currentSalary,
      desiredLifestyle,
      retirementLocation,
      healthcareCosts,
      pensionYears,
      expectedSocialSecurity,
    } = await request.json()

    if (!currentAge || !targetRetirementAge || !currentCountry || !currentSalary) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: currentAge, targetRetirementAge, currentCountry, currentSalary',
        },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As a retirement planning expert and financial analyst, analyze the following retirement profile and provide a comprehensive readiness assessment.

**Profile:**
- Current Age: ${currentAge}
- Target Retirement Age: ${targetRetirementAge}
- Years Until Retirement: ${targetRetirementAge - currentAge}
- Current Country: ${currentCountry}
- Life Expectancy: ${lifeExpectancy || 85}
- Current Retirement Savings: $${currentSavings || 0}
- Monthly Contributions: $${monthlyContributions || 0} (Personal: $${personalContribution || 0}, Employer: $${employerContribution || 0})
- Expected Annual Return: ${annualReturn || 6}%
- Current Salary: $${currentSalary}
- Desired Lifestyle: ${desiredLifestyle || 'Comfortable'}
- Retirement Location: ${retirementLocation || currentCountry}
- Healthcare Costs: ${healthcareCosts || 'Moderate'}
- Pension Years Contributed: ${pensionYears || 0}
- Expected Social Security/Pension: $${expectedSocialSecurity || 0}/month

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "overallScore": number (0-100),
  "scoreCategory": "On Track" | "Behind" | "Ahead" | "Critical",
  "summary": "string (2-3 sentences overall assessment)",
  "categoryScores": {
    "savingsAdequacy": {
      "score": number (0-40),
      "percentage": number,
      "label": "Savings Adequacy",
      "feedback": "string"
    },
    "pensionSocialSecurity": {
      "score": number (0-25),
      "percentage": number,
      "label": "Pension/Social Security",
      "feedback": "string"
    },
    "investmentStrategy": {
      "score": number (0-15),
      "percentage": number,
      "label": "Investment Strategy",
      "feedback": "string"
    },
    "timeline": {
      "score": number (0-10),
      "percentage": number,
      "label": "Timeline",
      "feedback": "string"
    },
    "costPreparedness": {
      "score": number (0-10),
      "percentage": number,
      "label": "Cost Preparedness",
      "feedback": "string"
    }
  },
  "projectedWealth": {
    "totalAtRetirement": number,
    "annualRetirementIncome": number,
    "replacementRate": number (percentage of current salary),
    "fundsLastUntilAge": number,
    "yearsOfRetirement": number
  },
  "adequacyAssessment": {
    "status": "On Track" | "Behind" | "Ahead" | "Critical",
    "message": "string",
    "monthlyShortfall": number (0 if on track or ahead),
    "targetNeeded": number,
    "currentTrajectory": number
  },
  "countryComparison": {
    "currentCountryRank": number (1-10, pension system quality),
    "retirementLocationRank": number,
    "bestCountries": [
      {
        "country": "string",
        "pensionScore": number (0-100),
        "highlights": ["string", "string"]
      }
    ],
    "taxImplications": "string",
    "healthcareSystem": "string"
  },
  "gapAnalysis": {
    "currentSavings": number,
    "targetNeeded": number,
    "shortfall": number,
    "yearsToCloseGap": number,
    "alternativeStrategies": ["string", "string", "string"]
  },
  "actionPlan": {
    "immediate": [
      {
        "action": "string",
        "impact": "high" | "medium" | "low",
        "effort": "easy" | "moderate" | "challenging"
      }
    ],
    "shortTerm": ["string"],
    "longTerm": ["string"]
  },
  "optimizationStrategies": [
    {
      "strategy": "string",
      "potentialBenefit": "string",
      "considerations": "string"
    }
  ],
  "countrySpecificInsights": {
    "visaRequirements": "string",
    "taxFriendlyJurisdictions": ["string"],
    "pensionPortability": "string",
    "socialSecurityAgreements": "string"
  },
  "riskFactors": [
    {
      "risk": "string",
      "severity": "high" | "medium" | "low",
      "mitigation": "string"
    }
  ]
}

Be specific with numbers, realistic with projections, and provide country-specific insights for ${currentCountry} and ${retirementLocation}. Consider global pension systems, tax treaties, and cost of living differences.`

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
    let assessment
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found in response')
      assessment = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw response:', rawText)
      throw new Error('Failed to parse AI response')
    }

    // Step 7: Return structured response
    const processingTime = Date.now() - startTime

    return NextResponse.json(
      {
        assessment,
        processingTime,
        success: true,
      },
      {
        status: 200,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  } catch (error: any) {
    console.error('Retirement readiness error:', error)

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error.message || 'Failed to calculate retirement readiness',
      },
      {
        status: 500,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
