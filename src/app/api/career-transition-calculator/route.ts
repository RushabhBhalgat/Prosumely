/**
 * Career Transition Feasibility Calculator API with Cost-Optimized Gemini AI
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
      '/api/career-transition-calculator',
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
      currentRole,
      currentIndustry,
      yearsExperience,
      currentSkills,
      currentSalary,
      jobSatisfaction,
      targetRole,
      targetIndustry,
      reasonForChange,
      urgency,
      financialRunway,
      riskTolerance,
      dependents,
      timeAvailable,
      geographicFlexibility,
      willingToTakePayCut,
    } = await request.json()

    if (!currentRole || !targetRole || yearsExperience === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: currentRole, targetRole, yearsExperience' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As a career transition expert and risk assessment specialist, analyze this career change scenario and provide a comprehensive feasibility assessment.

**Current Situation:**
- Current Role: ${currentRole}
- Current Industry: ${currentIndustry}
- Years of Experience: ${yearsExperience}
- Current Skills: ${currentSkills?.join(', ') || 'Not specified'}
- Current Salary: ${currentSalary || 'Not specified'}
- Job Satisfaction: ${jobSatisfaction}/10

**Target Situation:**
- Target Role: ${targetRole}
- Target Industry: ${targetIndustry}
- Reason for Change: ${reasonForChange}
- Urgency: ${urgency}

**Personal Circumstances:**
- Financial Runway: ${financialRunway} months
- Risk Tolerance: ${riskTolerance}
- Dependents: ${dependents}
- Time Available: ${timeAvailable} hours/week
- Geographic Flexibility: ${geographicFlexibility}
- Willing to Take Pay Cut: ${willingToTakePayCut}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "feasibilityScore": "number (0-100)",
  "scoreCategory": "string (Highly Feasible|Feasible|Challenging|High Risk)",
  "assessmentBreakdown": {
    "skillTransferability": {
      "score": "number (0-25)",
      "overlappingSkills": "number (percentage)",
      "adjacentVsNew": "string",
      "skillsGap": ["skill1", "skill2"],
      "learningCurve": "steep|moderate|gentle"
    },
    "marketDemand": {
      "score": "number (0-20)",
      "jobOpenings": "high|medium|low",
      "growthTrajectory": "string",
      "entryBarriers": "high|medium|low",
      "biasFactors": ["factor1", "factor2"]
    },
    "financialViability": {
      "score": "number (0-25)",
      "runwayVsTimeline": "adequate|tight|insufficient",
      "expectedIncomeChange": "string (percentage or amount)",
      "retrainingCost": "string",
      "roiEstimate": "string"
    },
    "personalReadiness": {
      "score": "number (0-15)",
      "timeCommitmentFit": "good|moderate|challenging",
      "motivationLevel": "high|medium|low",
      "supportSystem": "strong|moderate|weak",
      "riskVsReward": "string"
    },
    "strategicPositioning": {
      "score": "number (0-15)",
      "networkStrength": "strong|moderate|weak",
      "transferableCredentials": ["credential1", "credential2"],
      "narrativeStrength": "compelling|moderate|weak",
      "marketTiming": "favorable|neutral|unfavorable"
    }
  },
  "riskAssessment": {
    "overallRisk": "low|moderate|high|very high",
    "primaryRisks": [
      {
        "risk": "string",
        "severity": "critical|high|medium|low",
        "mitigation": "string"
      }
    ],
    "failureProbability": "string (percentage)",
    "fallbackOptions": ["option1", "option2"]
  },
  "transitionPlan": {
    "immediate": {
      "timeframe": "Month 1",
      "milestones": ["milestone1", "milestone2"],
      "skillsToDevelop": ["skill1", "skill2"],
      "networkingGoals": ["goal1", "goal2"]
    },
    "shortTerm": {
      "timeframe": "Months 2-6",
      "milestones": ["milestone1", "milestone2"],
      "skillsToDevelop": ["skill1", "skill2"],
      "applicationStrategy": "string"
    },
    "mediumTerm": {
      "timeframe": "Months 7-12",
      "milestones": ["milestone1", "milestone2"],
      "skillsToDevelop": ["skill1", "skill2"],
      "financialCheckpoints": ["checkpoint1", "checkpoint2"]
    },
    "longTerm": {
      "timeframe": "12+ months",
      "milestones": ["milestone1", "milestone2"],
      "ongoingDevelopment": ["development1", "development2"]
    }
  },
  "recommendation": {
    "verdict": "GO|GO_WITH_CAUTION|DELAY|RECONSIDER",
    "summary": "string (2-3 sentences)",
    "keySuccessFactors": ["factor1", "factor2"],
    "criticalNextSteps": ["step1", "step2"]
  },
  "alternativePaths": [
    {
      "path": "string (e.g., 'Hybrid role', 'Side hustle')",
      "description": "string",
      "feasibility": "high|medium|low",
      "timeline": "string"
    }
  ]
}

Be realistic, data-driven, and specific. Provide actionable insights.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 4500,
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
    console.error('Career Transition Calculator API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
