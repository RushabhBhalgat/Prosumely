/**
 * Future Skills Identifier API with Cost-Optimized Gemini AI
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
      '/api/future-skills-identifier',
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
    const { currentRole, industry, yearsExperience, currentSkills, careerGoals, timeHorizon } =
      await request.json()

    if (!currentRole || !industry || yearsExperience === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: currentRole, industry, yearsExperience' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As a career trends analyst and futurist, analyze the following professional profile and identify emerging skills that will be critical in the next 2-5 years.

**Professional Profile:**
- Current Role: ${currentRole}
- Industry: ${industry}
- Years of Experience: ${yearsExperience}
- Current Skills: ${currentSkills?.join(', ') || 'Not specified'}
- Career Goals: ${careerGoals || 'Not specified'}
- Time Horizon: ${timeHorizon || '3 years'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "criticalEmergingSkills": [
    {
      "skillName": "string",
      "whyEmerging": "string (1-2 sentences)",
      "demandGrowth": "number (percentage)",
      "timeToMainstream": "string (e.g., '1-2 years')",
      "supplyDemandGap": "high|medium|low",
      "salaryPremium": "string (e.g., '15-25%')",
      "difficultyLevel": "beginner|intermediate|advanced",
      "currentLevel": "none|basic|intermediate|advanced"
    }
  ],
  "skillsByTimeHorizon": {
    "immediate": ["skill1", "skill2"],
    "nearTerm": ["skill1", "skill2"],
    "longTerm": ["skill1", "skill2"]
  },
  "skillsByCategory": {
    "technical": ["skill1", "skill2"],
    "softSkills": ["skill1", "skill2"],
    "toolsPlatforms": ["skill1", "skill2"],
    "domainKnowledge": ["skill1", "skill2"],
    "hybridSkills": ["skill1", "skill2"]
  },
  "industryTrends": {
    "disruptionsOnHorizon": ["trend1", "trend2"],
    "emergingTechnologies": ["tech1", "tech2"],
    "rolesEmerging": ["role1", "role2"],
    "rolesDeclining": ["role1", "role2"],
    "skillsBecomingObsolete": ["skill1", "skill2"]
  },
  "learningPathway": {
    "skillSequence": ["First learn X", "Then Y", "Finally Z"],
    "estimatedTimeInvestment": "string (e.g., '6-12 months')",
    "resourceRecommendations": ["resource1", "resource2"],
    "certificationValue": "high|medium|low"
  },
  "competitiveAdvantage": {
    "earlyAdoptionSkills": ["skill1", "skill2"],
    "skillStackingOpportunities": ["combo1", "combo2"],
    "contrarianRecommendations": ["skill1", "skill2"]
  }
}

Provide 8-10 critical emerging skills. Be specific, data-driven, and realistic. Focus on skills that will genuinely create competitive advantage in the specified industry and role.`

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
    console.error('Future Skills Identifier API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
