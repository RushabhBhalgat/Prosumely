/**
 * Cover Letter Generation API with MongoDB-Based Rate Limiting
 * Production-ready endpoint with Gemini 2.0 Flash integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash for better quality)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

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
  let cleanJobDescription = ''
  let _generatedCoverLetter: string | null = null

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

    // Step 2: Rate limiting with MongoDB (cover letter specific limits)
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/cover-letter-generate',
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
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toISOString(),
            'Retry-After': timeUntilReset.toString(),
          },
        },
      )
    }

    console.log(`✅ Security and rate limit checks passed. Remaining: ${rateLimitResult.remaining}`)

    // Step 3: Parse and validate request body
    const { resume, jobDescription } = await request.json()

    if (!resume || typeof resume !== 'string') {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume content is required and must be a string',
      }
      throw new Error(errorInfo.message)
    }

    if (!jobDescription || typeof jobDescription !== 'string') {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description is required and must be a string',
      }
      throw new Error(errorInfo.message)
    }

    // Clean the inputs
    const cleanResumeTemp = resume
      .replace(/[^\w\s\-.,;:()\[\]{}@+#]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const cleanJobDescriptionTemp = jobDescription
      .replace(/[^\w\s\-.,;:()\[\]{}@+#]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    cleanResume = cleanResumeTemp
    cleanJobDescription = cleanJobDescriptionTemp

    // Validation checks
    if (cleanResume.length < 50) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume must be at least 50 characters long',
      }
      throw new Error(errorInfo.message)
    }

    if (cleanJobDescription.length < 10) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description must be at least 10 characters long',
      }
      throw new Error(errorInfo.message)
    }

    // Word count validation for resume (2500 words max)
    const resumeWordCount = cleanResume
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length

    if (resumeWordCount > 2500) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: `Resume exceeds 2500 word limit (current: ${resumeWordCount} words)`,
      }
      throw new Error(errorInfo.message)
    }

    // Character limit validation for resume (~15,000 chars for 2500 words)
    if (cleanResume.length > 15000) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Resume must be less than 15,000 characters',
      }
      throw new Error(errorInfo.message)
    }

    // Character limit validation for job description
    if (cleanJobDescription.length > 4000) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description must be less than 4,000 characters',
      }
      throw new Error(errorInfo.message)
    }

    // Step 4: Check API configuration
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      errorInfo = { type: 'CONFIG_ERROR', message: 'Service configuration error' }
      throw new Error('API key not configured')
    }

    // Step 5: Generate cover letter using Gemini 2.0 Flash

    const prompt = `You are an expert career advisor and professional writer. Based on the candidate's resume and the job description provided, write a powerful, impactful, and concise cover letter.

REQUIREMENTS:
- Length: 250-400 words (strict requirement)
- Structure: 3-4 paragraphs with clear flow
- Tone: Professional, confident, and engaging
- Format: No date, no addresses, no "Dear Hiring Manager" - start directly with content
- Content: Highlight relevant experience, skills, and achievements that match the job requirements
- Style: Direct, compelling, no fluff or generic statements
- Focus: Show clear value proposition and enthusiasm for the specific role

RESUME:
${cleanResume}

JOB DESCRIPTION:
${cleanJobDescription}

Write a cover letter that makes the candidate stand out. Make it specific to this role, showcase relevant achievements with quantifiable results where possible, and demonstrate clear understanding of the company's needs. Be concise but impactful.

Return ONLY the cover letter text, no additional commentary or formatting markers.`

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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Gemini API error:', response.status, errorText)
      errorInfo = {
        type: 'API_ERROR',
        message: `AI service error: ${response.status}`,
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

    // Clean the response
    let coverLetter = generatedText.trim()

    // Remove any markdown formatting if present
    coverLetter = coverLetter.replace(/```\s*/g, '').replace(/\*\*/g, '')

    // Validate word count (should be 250-400)
    const wordCount = coverLetter
      .trim()
      .split(/\s+/)
      .filter((word: string) => word.length > 0).length

    console.log(`✅ Cover letter generated successfully. Word count: ${wordCount}`)

    _generatedCoverLetter = coverLetter
    _success = true

    // Return successful response
    return NextResponse.json(
      {
        coverLetter,
        wordCount,
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
    console.error('❌ Cover letter generation failed:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode =
      errorInfo?.type === 'VALIDATION_ERROR' ? 400 : errorInfo?.type === 'CONFIG_ERROR' ? 503 : 500

    return NextResponse.json(
      {
        error: 'Cover letter generation failed',
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
