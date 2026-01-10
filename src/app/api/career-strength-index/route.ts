/**
 * Career Strength Index API - Comprehensive Career Health Assessment
 * Uses AI for personalized 360-degree career evaluation
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

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
    // Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Rate limiting
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/career-strength-index',
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

    // Parse request
    const {
      currentRole,
      industry,
      yearsExperience,
      education,
      certifications,
      skills,
      majorAchievements,
      linkedInConnections,
      networkQuality,
      publicationsSpeeches,
      portfolioQuality,
      managementExperience,
      jobChangesLast5Years,
      salaryGrowthYoY,
      recruiterContactsPerMonth,
      applicationResponseRate,
    } = await request.json()

    // Validation
    if (!currentRole || !industry || !education) {
      throw new Error('Missing required fields')
    }

    // Get API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // AI-powered assessment
    const prompt = `Analyze career strength. Return ONLY JSON, no markdown.

INPUT:
- Role: ${currentRole}
- Industry: ${industry}
- Experience: ${yearsExperience} years
- Education: ${education}
- Management: ${managementExperience}
- Skills: ${skills.join(', ')}
- Certifications: ${certifications.join(', ') || 'None'}
- Achievements: ${majorAchievements.filter((a: string) => a.trim()).join('; ')}
- LinkedIn: ${linkedInConnections} connections, quality ${networkQuality}/10
- Publications/Speeches: ${publicationsSpeeches}
- Portfolio: ${portfolioQuality}/10
- Job Changes (5yr): ${jobChangesLast5Years}
- Salary Growth: ${salaryGrowthYoY}% YoY
- Recruiter Contacts: ${recruiterContactsPerMonth}/month
- Response Rate: ${applicationResponseRate}%

OUTPUT JSON:
{
  "overallScore": <0-100>,
  "percentileRank": <0-100>,
  "dimensionScores": {
    "skillsExpertise": {
      "score": <0-20>,
      "maxScore": 20,
      "percentage": <0-100>,
      "label": "Skills & Expertise",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 specific strengths>"],
      "gaps": ["<2-3 specific gaps>"]
    },
    "experienceQuality": {
      "score": <0-15>,
      "maxScore": 15,
      "percentage": <0-100>,
      "label": "Experience Quality",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    },
    "educationCredentials": {
      "score": <0-10>,
      "maxScore": 10,
      "percentage": <0-100>,
      "label": "Education & Credentials",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    },
    "networkRelationships": {
      "score": <0-15>,
      "maxScore": 15,
      "percentage": <0-100>,
      "label": "Network & Relationships",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    },
    "personalBrand": {
      "score": <0-15>,
      "maxScore": 15,
      "percentage": <0-100>,
      "label": "Personal Brand",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    },
    "marketDemand": {
      "score": <0-15>,
      "maxScore": 15,
      "percentage": <0-100>,
      "label": "Market Demand",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    },
    "careerMomentum": {
      "score": <0-10>,
      "maxScore": 10,
      "percentage": <0-100>,
      "label": "Career Momentum",
      "feedback": "<1-2 sentences>",
      "strengths": ["<2-3 strengths>"],
      "gaps": ["<2-3 gaps>"]
    }
  },
  "topStrengths": [
    {
      "area": "<strength area>",
      "description": "<what makes this strong>",
      "competitiveAdvantage": "<how this helps>"
    }
  ],
  "topGaps": [
    {
      "area": "<gap area>",
      "impact": "<how this affects career>",
      "priority": "high|medium|low"
    }
  ],
  "quickWins": [
    {
      "action": "<specific action>",
      "timeframe": "<timeframe>",
      "impactOnScore": <1-10>
    }
  ],
  "longTermInvestments": [
    {
      "area": "<investment area>",
      "strategy": "<what to do>",
      "timeline": "<timeframe>",
      "expectedImpact": "<outcome>"
    }
  ],
  "competitivePositioning": {
    "vsIndustryPeers": "<comparison>",
    "vsCareerStage": "<comparison>",
    "aheadIn": ["<areas ahead>"],
    "behindIn": ["<areas behind>"]
  },
  "actionPlan": {
    "thirtyDayBoosts": ["<3-4 immediate actions>"],
    "ninetyDayProjects": ["<3-4 short-term projects>"],
    "oneYearStrategy": ["<3-4 long-term strategies>"]
  }
}`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.85,
          maxOutputTokens: 2000,
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

    // Clean response
    generatedText = generatedText
      .trim()
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')

    let assessment
    try {
      assessment = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    console.log(`Career Strength Index calculated. Score: ${assessment.overallScore}/100`)

    return NextResponse.json(
      {
        assessment,
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
    console.error('Career Strength Index failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Assessment failed',
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
