/**
 * Resume Gap Analysis API with MongoDB-Based Rate Limiting
 * Identifies missing skills, certifications, and experience gaps
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash for better quality)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

export async function OPTIONS(request: NextRequest) {
  // Handle preflight CORS requests
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
  let _success = false
  let _rateLimited = false
  let _securityViolations: string[] = []
  let errorInfo: { type: string; message: string } | null = null
  let cleanResume = ''
  let cleanTargetRole = ''
  let _generatedAnalysis: string | null = null

  try {
    // Step 1: Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      _securityViolations = securityResult.violations.map((v) => v.type)

      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Step 2: Rate limiting with MongoDB (resume gap analysis specific limits)
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/resume-gap-analysis',
    )
    if (!rateLimitResult.allowed) {
      _rateLimited = true
      errorInfo = {
        type: 'RATE_LIMIT_EXCEEDED',
        message: rateLimitResult.message || 'Rate limit exceeded',
      }

      const timeUntilReset = rateLimitResult.retryAfter || 0

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
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

    console.log(`✅ Security and rate limit checks passed. Remaining: ${rateLimitResult.remaining}`)

    // Step 3: Parse and validate request body
    const { resume, targetRole } = await request.json()

    if (!resume || typeof resume !== 'string') {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume content is required and must be a string',
      }
      throw new Error(errorInfo.message)
    }

    if (!targetRole || typeof targetRole !== 'string') {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Target role is required and must be a string',
      }
      throw new Error(errorInfo.message)
    }

    // Clean the inputs
    const cleanResumeTemp = resume
      .replace(/[^\w\s\-.,;:()\[\]{}@+#/&]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const cleanTargetRoleTemp = targetRole
      .replace(/[^\w\s\-.,;:()\[\]{}@+#/&]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    cleanResume = cleanResumeTemp
    cleanTargetRole = cleanTargetRoleTemp

    // Validation checks
    if (cleanResume.length < 100) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume must be at least 100 characters long',
      }
      throw new Error(errorInfo.message)
    }

    if (cleanTargetRole.length < 5) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Target role must be at least 5 characters long',
      }
      throw new Error(errorInfo.message)
    }

    // Word count validation for resume (3000 words max)
    const resumeWordCount = cleanResume
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length

    if (resumeWordCount > 3000) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: `Resume exceeds 3000 word limit (current: ${resumeWordCount} words)`,
      }
      throw new Error(errorInfo.message)
    }

    // Character limit validation for resume
    if (cleanResume.length > 18000) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume must be less than 18,000 characters',
      }
      throw new Error(errorInfo.message)
    }

    // Character limit validation for target role
    if (cleanTargetRole.length > 500) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Target role must be less than 500 characters',
      }
      throw new Error(errorInfo.message)
    }

    // Step 4: Check API configuration
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      errorInfo = { type: 'CONFIG_ERROR', message: 'Service configuration error' }
      throw new Error('API key not configured')
    }

    // Step 5: Generate gap analysis using Gemini 2.0 Flash

    const prompt = `You are an expert career counselor and resume analyst. Analyze the candidate's resume against their target role and provide a comprehensive gap analysis.

TARGET ROLE:
${cleanTargetRole}

CURRENT RESUME:
${cleanResume}

Provide a detailed gap analysis in the following JSON structure:

{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence overview of readiness>",
  "missingSkills": [
    {
      "skill": "<skill name>",
      "importance": "critical|high|medium",
      "reason": "<why this skill matters for the role>"
    }
  ],
  "missingCertifications": [
    {
      "certification": "<certification name>",
      "importance": "critical|high|medium",
      "provider": "<issuing organization>",
      "reason": "<why this certification matters>"
    }
  ],
  "experienceGaps": [
    {
      "gap": "<experience type>",
      "importance": "critical|high|medium",
      "suggestion": "<how to gain this experience>"
    }
  ],
  "strengths": [
    "<existing strength 1>",
    "<existing strength 2>",
    "<existing strength 3>"
  ],
  "recommendations": [
    {
      "priority": "immediate|short-term|long-term",
      "action": "<specific action to take>",
      "timeframe": "<estimated time to complete>",
      "impact": "high|medium|low"
    }
  ]
}

REQUIREMENTS:
- Be specific and actionable
- Identify 3-8 missing skills (focus on most important)
- Identify 1-5 relevant certifications if applicable
- Identify 2-5 experience gaps
- List 3-5 existing strengths
- Provide 4-8 prioritized recommendations
- Use industry-standard terminology
- Be realistic about importance levels
- Consider both technical and soft skills

Return ONLY valid JSON, no additional text or formatting.`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Gemini API error:', response.status, errorText)

      // Handle rate limit specifically
      if (response.status === 429) {
        errorInfo = {
          type: 'RATE_LIMIT',
          message: `⚠️ Gemini AI Rate Limit Exceeded

The AI service has reached its usage limits:
• Free tier: 1,500 requests per day
• 15 requests per minute

This is separate from our tool's rate limit (4/hour for free users).

Please try again in:
• A few minutes (if you hit per-minute limit)
• Tomorrow (if you hit daily limit)

Tip: Consider upgrading to Gemini API paid tier for higher limits, or contact support for increased quota.`,
        }
      } else {
        errorInfo = {
          type: 'API_ERROR',
          message: `AI service error: ${response.status}`,
        }
      }
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Gemini API response received')

    // Extract the generated content
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      console.error('❌ No generated text from Gemini API')
      errorInfo = { type: 'API_ERROR', message: 'No response from AI service' }
      throw new Error('No generated text from Gemini API')
    }

    // Clean the response - remove markdown code blocks if present
    let analysisText = generatedText.trim()
    analysisText = analysisText.replace(/```json\s*/g, '').replace(/```\s*/g, '')

    // Parse JSON
    let gapAnalysis
    try {
      gapAnalysis = JSON.parse(analysisText)
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response:', parseError)
      console.error('Raw response:', analysisText)
      errorInfo = { type: 'API_ERROR', message: 'Invalid response format from AI service' }
      throw new Error('Failed to parse gap analysis')
    }

    // Validate the structure
    if (
      !gapAnalysis.overallScore ||
      !gapAnalysis.summary ||
      !Array.isArray(gapAnalysis.missingSkills) ||
      !Array.isArray(gapAnalysis.recommendations)
    ) {
      errorInfo = { type: 'API_ERROR', message: 'Incomplete analysis from AI service' }
      throw new Error('Invalid gap analysis structure')
    }

    console.log(`✅ Gap analysis generated successfully. Score: ${gapAnalysis.overallScore}/100`)

    _generatedAnalysis = JSON.stringify(gapAnalysis)
    _success = true

    // Return successful response
    return NextResponse.json(
      {
        analysis: gapAnalysis,
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
    console.error('❌ Gap analysis failed:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode =
      errorInfo?.type === 'VALIDATION_ERROR' ? 400 : errorInfo?.type === 'CONFIG_ERROR' ? 503 : 500

    return NextResponse.json(
      {
        error: 'Gap analysis failed',
        message: errorInfo?.message || errorMessage,
        type: errorInfo?.type || 'UNKNOWN_ERROR',
        processingTime: Date.now() - startTime,
      },
      {
        status: statusCode,
        headers: securityManager.getCORSHeaders(request),
      },
    )
  }
}
