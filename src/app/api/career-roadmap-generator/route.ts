/**
 * Career Roadmap Generator API with Cost-Optimized Gemini AI
 * Generates personalized career progression plans with phases, skills, and actionable tasks
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash Exp - FREE tier)
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
      '/api/career-roadmap-generator',
    )
    if (!rateLimitResult.allowed) {
      const timeUntilReset = rateLimitResult.retryAfter || 0

      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: rateLimitResult.message,
          tier: rateLimitResult.tier,
          resetTime: rateLimitResult.resetTime,
          retryAfter: timeUntilReset,
        },
        {
          status: 429,
          headers: {
            ...securityManager.getCORSHeaders(request),
            'X-RateLimit-Limit': '4',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toISOString(),
            'Retry-After': timeUntilReset.toString(),
          },
        },
      )
    }

    // Step 3: Parse and validate request
    const {
      currentRole,
      currentExperience,
      totalExperience,
      targetRole,
      currentIndustry,
      targetIndustry,
      country,
      currentSkills,
      educationLevel,
      willingToStudy,
      timelineGoal,
      budgetConstraints,
      timeAvailability,
      geographicMobility,
      interests,
    } = await request.json()

    // Validation
    if (!currentRole || !targetRole || !currentIndustry || !country) {
      throw new Error('Missing required fields')
    }

    // Step 4: Generate AI-powered career roadmap
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Determine timeline multiplier
    const timelineMultipliers = {
      aggressive: 0.6,
      moderate: 1.0,
      patient: 1.5,
    }
    const multiplier = timelineMultipliers[timelineGoal as keyof typeof timelineMultipliers] || 1.0

    // OPTIMIZED PROMPT - Concise output
    const prompt = `Create career roadmap from ${currentRole} to ${targetRole}. Return ONLY valid JSON, no markdown.

Context: ${totalExperience}y exp, ${country}, ${currentIndustry}, ${timelineGoal} timeline, ${budgetConstraints} budget.

JSON:
{
  "overviewSummary": "1-2 sentences",
  "estimatedDuration": "X-Y years",
  "successProbability": 70,
  "phases": [{"name": "Phase", "duration": "X years", "objectives": ["obj1", "obj2"], "skills": ["skill1", "skill2", "skill3"], "certifications": ["cert1"], "expectedRoles": ["role1"], "salaryRange": "${country} range", "keyMilestones": ["m1", "m2"]}],
  "skillsDevelopment": [{"category": "foundational", "skills": [{"name": "skill", "priority": "high", "estimatedTime": "6mo", "resources": ["res1", "res2"]}]}],
  "experienceMilestones": [{"milestone": "name", "description": "brief", "timeframe": "1y", "importance": "high"}],
  "networkingBrand": [{"type": "community", "name": "name", "description": "brief", "frequency": "monthly", "priority": "high"}],
  "alternativePaths": [{"name": "path", "description": "brief", "duration": "Xy", "pros": ["pro1"], "cons": ["con1"], "suitableFor": ["who"]}],
  "risksReality": [{"risk": "risk", "likelihood": "medium", "impact": "brief", "mitigation": "brief"}],
  "actionableTasks": {"next30Days": ["t1", "t2"], "next3Months": ["t1", "t2"], "nextYear": ["t1", "t2"], "longTerm": ["t1"]},
  "marketInsights": {"demandLevel": "high", "competitionLevel": "medium", "growthProjection": "1 sentence", "averageSalaryProgression": "1 sentence"}
}

Generate: 3 phases, 2 skill categories (4 skills total), 2 milestones, 2 networking items, 3 alt paths, 3 risks. Keep all text under 100 chars.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          topK: 30,
          topP: 0.9,
          maxOutputTokens: 4000,
        },
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          `AI Service Rate Limit\n\nThe free Gemini API has limits:\n• 1,500 requests/day\n• 15 requests/minute\n\nPlease try again in a few minutes.`,
        )
      }
      throw new Error(`AI service error: ${response.status}`)
    }

    const data = await response.json()
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from AI service')
    }

    // Clean response - remove markdown code blocks and any extra text
    generatedText = generatedText
      .trim()
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .replace(/^[^{]*/, '') // Remove any text before the first {
      .replace(/[^}]*$/, '') // Remove any text after the last }
      .trim()

    let roadmap
    try {
      roadmap = JSON.parse(generatedText)
    } catch (parseError) {
      console.error('Parse error:', parseError)
      console.error('Generated text length:', generatedText.length)
      console.error('First 200 chars:', generatedText.substring(0, 200))
      console.error('Last 200 chars:', generatedText.substring(generatedText.length - 200))

      // Try to find and extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          roadmap = JSON.parse(jsonMatch[0])
          console.log('Successfully parsed after regex extraction')
        } catch (e) {
          throw new Error('Invalid AI response format. Please try again.')
        }
      } else {
        throw new Error('Invalid AI response format. Please try again.')
      }
    }

    // Validate roadmap structure
    if (!roadmap.phases || !Array.isArray(roadmap.phases) || roadmap.phases.length === 0) {
      throw new Error('Invalid roadmap structure generated')
    }

    console.log(
      `Career roadmap generated. ${roadmap.phases.length} phases. Duration: ${roadmap.estimatedDuration}`,
    )

    return NextResponse.json(
      {
        roadmap,
        processingTime: Date.now() - startTime,
        success: true,
      },
      {
        headers: {
          ...securityManager.getCORSHeaders(request),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-Processing-Time': (Date.now() - startTime).toString(),
        },
      },
    )
  } catch (error) {
    console.error('Roadmap generation failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Roadmap generation failed',
        message: errorMessage,
        type: 'UNKNOWN_ERROR',
      },
      {
        status: 500,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
