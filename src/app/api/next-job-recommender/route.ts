/**
 * Next Job Recommender API with Cost-Optimized Gemini AI
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
      '/api/next-job-recommender',
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
      companySize,
      industry,
      yearsExperience,
      yearsInCurrentRole,
      skills,
      education,
      achievements,
      industriesOfInterest,
      workStyle,
      companySizePreference,
      location,
      minSalary,
      targetSalary,
      careerDirection,
      timeline,
      riskTolerance,
      priorities,
    } = await request.json()

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
    const prompt = `As a career strategist and recruiter, analyze this professional profile and recommend the 5-8 most suitable next career moves with detailed transition strategies.

**Professional Profile:**
- Current Role: ${currentRole} at ${companySize} company
- Industry: ${industry}
- Total Experience: ${yearsExperience} years (${yearsInCurrentRole} years in current role)
- Skills: ${skills?.join(', ') || 'Not specified'}
- Education: ${education || 'Not specified'}
- Key Achievements: ${achievements || 'Not specified'}

**Career Preferences:**
- Industries of Interest: ${industriesOfInterest?.join(', ') || 'Open'}
- Work Style: ${workStyle || 'Flexible'}
- Company Size: ${companySizePreference || 'Any'}
- Location: ${location || 'Flexible'}
- Salary Range: $${minSalary || 0} - $${targetSalary || 0}
- Career Direction: ${careerDirection || 'Growth'}
- Timeline: ${timeline || '3-6 months'}
- Risk Tolerance: ${riskTolerance || 'Moderate'}
- Top Priorities: ${priorities?.join(', ') || 'Growth, Compensation'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "recommendations": [
    {
      "jobTitle": "string",
      "roleSummary": "string (2-3 sentences)",
      "matchScore": number (0-100),
      "matchBreakdown": {
        "skillsMatch": number (0-100),
        "experienceRelevance": number (0-100),
        "careerTrajectoryFit": number (0-100),
        "preferenceAlignment": number (0-100),
        "marketOpportunity": number (0-100)
      },
      "whyThisRole": "string",
      "transferableSkills": ["string", "string"],
      "growthPotential": "string",
      "marketDemand": "high" | "medium" | "low",
      "transitionDifficulty": "easy" | "moderate" | "challenging",
      "difficultyExplanation": "string",
      "typicalPaths": ["string"],
      "salaryRange": {
        "min": number,
        "max": number,
        "median": number
      },
      "comparisonToCurrent": "string",
      "exampleCompanies": ["string", "string", "string"],
      "skillsToD develop": [
        {
          "skill": "string",
          "priority": "critical" | "important" | "nice-to-have",
          "estimatedTime": "string",
          "resources": ["string"]
        }
      ],
      "successProbability": number (0-100),
      "timeToCompetitive": "string",
      "dayInLife": "string",
      "commonChallenges": ["string"],
      "careerTrajectory": {
        "twoYears": "string",
        "fiveYears": "string",
        "tenYears": "string"
      },
      "prosAndCons": {
        "pros": ["string"],
        "cons": ["string"]
      },
      "immediateActions": ["string"],
      "networkingStrategy": "string"
    }
  ],
  "hiddenOpportunities": [
    {
      "role": "string",
      "why": "string",
      "potentialMatch": number
    }
  ],
  "overallInsights": {
    "profileStrengths": ["string"],
    "commonThreads": "string",
    "marketTrends": "string",
    "recommendedApproach": "string"
  }
}

Be specific with job titles, realistic with match scores, and provide actionable transition strategies. Consider current market demand and career growth potential.`

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 8192,
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
    let recommendations
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found in response')
      recommendations = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw response:', rawText)
      throw new Error('Failed to parse AI response')
    }

    // Step 7: Return structured response
    const processingTime = Date.now() - startTime

    return NextResponse.json(
      {
        recommendations,
        processingTime,
        success: true,
      },
      {
        status: 200,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  } catch (error: any) {
    console.error('Next job recommender error:', error)

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error.message || 'Failed to generate recommendations',
      },
      {
        status: 500,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
