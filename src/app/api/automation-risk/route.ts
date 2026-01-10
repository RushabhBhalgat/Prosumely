/**
 * AI/Automation Career Risk Assessment API with Gemini AI
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
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request, '/api/automation-risk')
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
      jobTitle,
      industry,
      primaryTasks,
      repetitiveness,
      creativityRequired,
      humanInteraction,
      problemComplexity,
      physicalPresence,
      decisionMakingLevel,
      technicalSkills,
      softSkills,
      digitalLiteracy,
    } = await request.json()

    if (!jobTitle || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: jobTitle, industry' },
        { status: 400 },
      )
    }

    // Step 4: Check API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Step 5: Generate analysis with Gemini
    const prompt = `As an AI researcher, labor economist, and career futurist, analyze the automation risk for this job role:

**Job Profile:**
- Job Title/Role: ${jobTitle}
- Industry & Sector: ${industry}
- Primary Tasks: ${Array.isArray(primaryTasks) ? primaryTasks.join(', ') : primaryTasks}

**Job Characteristics:**
- Repetitiveness: ${repetitiveness}/10
- Creativity Required: ${creativityRequired}/10
- Human Interaction: ${humanInteraction}%
- Problem Complexity: ${problemComplexity || 'Not specified'}
- Physical Presence Required: ${physicalPresence ? 'Yes' : 'No'}
- Decision-Making Level: ${decisionMakingLevel || 'Not specified'}

**Skills:**
- Technical Skills: ${Array.isArray(technicalSkills) ? technicalSkills.join(', ') : technicalSkills || 'Not specified'}
- Soft Skills: ${Array.isArray(softSkills) ? softSkills.join(', ') : softSkills || 'Not specified'}
- Digital Literacy: ${digitalLiteracy || 'Not specified'}

**Instructions:**
Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "automationRiskScore": number (0-100),
  "riskCategory": "Very Low Risk (0-20)" | "Low Risk (21-40)" | "Moderate Risk (41-60)" | "High Risk (61-80)" | "Very High Risk (81-100)",
  "tasksAtRisk": [
    {
      "task": "string",
      "riskLevel": "high" | "medium" | "low",
      "timeline": "immediate" | "2-5 years" | "5-10 years" | "10+ years",
      "technology": "string (AI/ML, robotics, etc.)",
      "percentageOfRole": number,
      "explanation": "string"
    }
  ],
  "tasksLikelyHuman": [
    {
      "task": "string",
      "whySafe": "string",
      "skillsToEmphasize": ["string"]
    }
  ],
  "roleEvolution": {
    "transformationType": "augmentation" | "partial replacement" | "complete automation" | "hybrid",
    "newResponsibilities": ["string"],
    "futureJobTitles": ["string"],
    "timelineDescription": "string",
    "preparationStrategy": "string"
  },
  "industryDisruption": {
    "overallAutomationLevel": "low" | "medium" | "high",
    "paceOfChange": "slow" | "moderate" | "rapid",
    "leadingExamples": ["string"],
    "adoptionBarriers": ["string"]
  },
  "riskFactors": {
    "technological": {"level": "high" | "medium" | "low", "description": "string"},
    "economic": {"level": "high" | "medium" | "low", "description": "string"},
    "social": {"level": "high" | "medium" | "low", "description": "string"},
    "adoptionTimeline": "string"
  },
  "protectiveFactors": {
    "resilientSkills": ["string"],
    "safeAspectsOfRole": ["string"],
    "transferableCapital": ["string"]
  },
  "actionPlan": {
    "immediate": {
      "timeframe": "0-6 months",
      "skills": ["string"],
      "tasks": ["string"],
      "positioning": ["string"]
    },
    "mediumTerm": {
      "timeframe": "6-24 months",
      "pivotPossibilities": ["string"],
      "adjacentRoles": ["string"],
      "credentials": ["string"]
    },
    "longTerm": {
      "timeframe": "2-5 years",
      "transformationStrategy": "string",
      "completePivots": ["string"],
      "futureProofRoles": ["string"]
    }
  },
  "alternativeCareerPaths": [
    {
      "role": "string",
      "automationRisk": "low" | "medium" | "high",
      "skillsOverlap": ["string"],
      "transitionDifficulty": "easy" | "moderate" | "difficult",
      "timeToTransition": "string",
      "rationale": "string"
    }
  ],
  "recommendedSkills": {
    "humanCentricSkills": ["string"],
    "technicalSkillsForAI": ["string"],
    "hybridCapabilities": ["string"],
    "priorityOrder": ["string"]
  },
  "scenarioAnalysis": {
    "bestCase": "string",
    "likelyCase": "string",
    "worstCase": "string",
    "recommendation": "string"
  }
}

Be realistic, data-driven, and empowering. Avoid fear-mongering but be honest about risks. Focus on actionable strategies for adaptation and resilience. Consider the specific nuances of the role and industry.`

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
    console.error('Automation Risk API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 },
    )
  }
}
