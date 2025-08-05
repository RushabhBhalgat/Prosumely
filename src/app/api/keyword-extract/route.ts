/**
 * Enhanced Keyword Extraction API with MongoDB-Based Rate Limiting
 * Production-ready endpoint with persistent storage and Payload CMS integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

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
  let success = false
  let rateLimited = false
  let securityViolations: string[] = []
  let errorInfo: { type: string; message: string } | null = null
  let cleanJobDescription = ''
  let extractedKeywords: any = null

  try {
    console.log('🚀 Enhanced keyword extraction API called with MongoDB storage')

    // Step 1: Security validation
    const securityResult = await securityManager.validateRequest(request)
    if (!securityResult.valid) {
      securityViolations = securityResult.violations.map((v) => v.type)

      return (
        securityResult.response ||
        NextResponse.json({ error: 'Security validation failed' }, { status: 403 })
      )
    }

    // Step 2: Rate limiting with MongoDB
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request)
    if (!rateLimitResult.allowed) {
      rateLimited = true
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
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toISOString(),
            'Retry-After': timeUntilReset.toString(),
          },
        },
      )
    }

    console.log(`✅ Security and rate limit checks passed. Remaining: ${rateLimitResult.remaining}`)

    // Step 3: Parse and validate request body
    const { jobDescription } = await request.json()

    if (!jobDescription || typeof jobDescription !== 'string') {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description is required and must be a string',
      }
      throw new Error(errorInfo.message)
    }

    // Clean the job description
    const cleanJobDescriptionTemp = jobDescription
      .replace(/[^\w\s\-.,;:()\[\]{}]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    cleanJobDescription = cleanJobDescriptionTemp

    if (cleanJobDescription.length < 10) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description must be at least 10 characters long',
      }
      throw new Error(errorInfo.message)
    }

    console.log(`📝 Processing job description: ${cleanJobDescription.substring(0, 100)}...`)

    // Length validation
    if (cleanJobDescription.length > 4000) {
      errorInfo = {
        type: 'VALIDATION_ERROR',
        message: 'Job description must be less than 4000 characters',
      }
      throw new Error(errorInfo.message)
    }

    // Step 4: Check API configuration
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY environment variable is not set')
      errorInfo = { type: 'CONFIG_ERROR', message: 'Service configuration error' }
      throw new Error('API key not configured')
    }

    // Step 5: Generate keywords using Gemini API
    console.log('🤖 Calling Gemini API for keyword extraction...')

    const prompt = `
    Analyze this job description and extract keywords in these specific categories. Return ONLY a valid JSON object with these exact keys:

    {
      "actionVerbs": [],
      "technicalSkills": [],
      "softSkills": []
    }

    Job Description:
    "${cleanJobDescription}"

    Instructions:
    - actionVerbs: Extract action words and verbs that describe responsibilities (e.g., "develop", "manage", "implement", "analyze", "design")
    - technicalSkills: Extract specific technical skills, tools, technologies, programming languages, frameworks, software (e.g., "JavaScript", "React", "SQL", "AWS", "Docker")
    - softSkills: Extract interpersonal and professional skills (e.g., "communication", "leadership", "problem-solving", "teamwork")
    - Return 5-15 keywords per category
    - Make keywords concise and relevant
    - Return ONLY the JSON object, no additional text
    `

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

    // Extract and parse the generated content
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      console.error('❌ No generated text from Gemini API')
      errorInfo = { type: 'API_ERROR', message: 'No response from AI service' }
      throw new Error('No generated text from Gemini API')
    }

    console.log('📄 Raw Gemini response:', generatedText.substring(0, 200) + '...')

    // Clean and parse JSON response
    let cleanedResponse = generatedText.trim()

    // Remove markdown code blocks if present
    cleanedResponse = cleanedResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '')

    // Remove any leading/trailing text that's not JSON
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0]
    }

    console.log('🧹 Cleaned response for parsing:', cleanedResponse.substring(0, 200) + '...')

    let keywords
    try {
      keywords = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError)
      console.error('Raw response that failed to parse:', cleanedResponse)

      // Fallback: try to extract keywords manually
      keywords = {
        actionVerbs: ['Developed', 'Managed', 'Implemented', 'Analyzed', 'Designed'],
        technicalSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
        softSkills: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability'],
      }
      console.log('🔄 Using fallback keywords due to parsing error')
    }

    // Validate keywords structure
    if (!keywords || typeof keywords !== 'object') {
      console.error('❌ Invalid keywords structure')
      throw new Error('Invalid response structure from AI service')
    }

    // Ensure all required arrays exist
    const categories = ['actionVerbs', 'technicalSkills', 'softSkills']
    categories.forEach((category) => {
      if (!Array.isArray(keywords[category])) {
        keywords[category] = []
      }
    })

    extractedKeywords = keywords
    success = true

    console.log('✅ Keywords extracted successfully:', {
      actionVerbs: keywords.actionVerbs.length,
      technicalSkills: keywords.technicalSkills.length,
      softSkills: keywords.softSkills.length,
    })

    // Return successful response
    return NextResponse.json(
      {
        keywords,
        processingTime: Date.now() - startTime,
        inputLength: cleanJobDescription.length,
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
    console.error('❌ Keyword extraction failed:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode =
      errorInfo?.type === 'VALIDATION_ERROR' ? 400 : errorInfo?.type === 'CONFIG_ERROR' ? 503 : 500

    return NextResponse.json(
      {
        error: 'Keyword extraction failed',
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
