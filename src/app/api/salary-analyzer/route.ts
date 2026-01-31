/**
 * Expected Salary Analyzer API
 * Provides AI-powered salary analysis based on country, experience, and industry
 * Uses Gemini 2.0 Flash Exp with rate limiting and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Gemini API configuration (FREE tier)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  SGD: 'S$',
  AED: 'د.إ',
  BRL: 'R$',
  MXN: 'Mex$',
  ZAR: 'R',
  KRW: '₩',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  ILS: '₪',
  NZD: 'NZ$',
  ARS: 'ARS$',
}

// Country to currency mapping
const COUNTRY_CURRENCY: Record<string, string> = {
  'United States': 'USD',
  'United Kingdom': 'GBP',
  Canada: 'CAD',
  Australia: 'AUD',
  Germany: 'EUR',
  France: 'EUR',
  Netherlands: 'EUR',
  Switzerland: 'CHF',
  Singapore: 'SGD',
  'United Arab Emirates': 'AED',
  India: 'INR',
  China: 'CNY',
  Japan: 'JPY',
  'South Korea': 'KRW',
  Brazil: 'BRL',
  Mexico: 'MXN',
  Spain: 'EUR',
  Italy: 'EUR',
  Poland: 'PLN',
  Ireland: 'EUR',
  Sweden: 'SEK',
  Norway: 'NOK',
  Denmark: 'DKK',
  Finland: 'EUR',
  Belgium: 'EUR',
  Austria: 'EUR',
  'New Zealand': 'NZD',
  Israel: 'ILS',
  'South Africa': 'ZAR',
  Argentina: 'ARS',
}

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
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request, '/api/salary-analyzer')
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
      country,
      jobTitle,
      yearsExperience,
      industry,
      city,
      companySize,
      education,
      skills,
      workMode,
    } = await request.json()

    // Validation
    if (!country || !jobTitle || !industry || yearsExperience === undefined) {
      throw new Error('Missing required fields')
    }

    // Step 4: Determine currency
    const currency = COUNTRY_CURRENCY[country] || 'USD'
    const currencySymbol = CURRENCY_SYMBOLS[currency] || '$'

    // Step 5: Generate AI-powered salary analysis
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // Optimized prompt for salary analysis
    const prompt = `Analyze salary expectations. Return ONLY JSON, no markdown.

INPUT:
- Country: ${country}
- Job Title: ${jobTitle}
- Years Experience: ${yearsExperience}
- Industry: ${industry}
${city ? `- City: ${city}` : ''}
${companySize ? `- Company Size: ${companySize}` : ''}
${education ? `- Education: ${education}` : ''}
${skills && skills.length > 0 ? `- Skills: ${skills.join(', ')}` : ''}
${workMode ? `- Work Mode: ${workMode}` : ''}

OUTPUT JSON (all salary amounts in ${currency} without currency symbols):
{
  "salaryRange": {
    "min": <number>,
    "max": <number>,
    "median": <number>,
    "currency": "${currency}",
    "currencySymbol": "${currencySymbol}"
  },
  "percentiles": {
    "p10": <number>,
    "p25": <number>,
    "p50": <number>,
    "p75": <number>,
    "p90": <number>
  },
  "confidenceScore": <0-100>,
  "dataSampleSize": <realistic number like 5000>,
  "salaryBreakdown": {
    "baseSalary": <number>,
    "bonus": <number>,
    "stockOptions": <number>,
    "benefits": <number>,
    "total": <number>
  },
  "yearOverYearGrowth": [
    {"year": 2022, "growth": <percentage>},
    {"year": 2023, "growth": <percentage>},
    {"year": 2024, "growth": <percentage>},
    {"year": 2025, "growth": <percentage>}
  ],
  "countryComparisons": [
    {
      "country": "<country name>",
      "salary": <number>,
      "costOfLivingAdjusted": <number>,
      "purchasingPower": <percentage>,
      "flag": "<emoji flag>"
    }
  ],
  "experienceImpact": [
    {"years": 0, "expectedSalary": <number>},
    {"years": 3, "expectedSalary": <number>},
    {"years": 5, "expectedSalary": <number>},
    {"years": 10, "expectedSalary": <number>},
    {"years": 15, "expectedSalary": <number>}
  ],
  "industryComparisons": [
    {
      "industry": "<industry name>",
      "avgSalary": <number>,
      "difference": <number>,
      "percentageDiff": <percentage>
    }
  ],
  "costOfLivingAdjusted": {
    "adjustedSalary": <number>,
    "purchasingPowerRank": <1-10>,
    "insights": "<2 sentences on cost of living impact>"
  },
  "negotiationInsights": [
    {
      "category": "<category name>",
      "insights": ["<tip 1>", "<tip 2>", "<tip 3>"],
      "priority": "high|medium|low"
    }
  ],
  "marketInsights": [
    "<insight 1>",
    "<insight 2>",
    "<insight 3>",
    "<insight 4>"
  ],
  "summary": "<2-3 sentences summarizing the salary expectations and key factors>"
}

Requirements:
- Provide top 5 country comparisons with realistic data
- Include 4-5 industry comparisons
- Provide 3-4 negotiation insight categories
- All salaries must be realistic for the specified country and role
- Consider experience level, company size, and education in calculations
- Base calculations on real market data patterns`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.85,
          maxOutputTokens: 2500,
        },
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          `⚠️ AI Service Rate Limit\n\nThe free Gemini API has limits:\n• 1,500 requests/day\n• 15 requests/minute\n\nPlease try again in a few minutes.`,
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

    let analysis
    try {
      analysis = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    console.log(
      `✅ Salary analysis completed for ${jobTitle} in ${country}. Median: ${currencySymbol}${analysis.salaryRange.median}`,
    )

    return NextResponse.json(
      {
        analysis,
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
    console.error('❌ Salary analysis failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Analysis failed',
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
