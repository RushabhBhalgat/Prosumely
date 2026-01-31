/**
 * Leadership Readiness Score Calculator API with Cost-Optimized Hybrid Approach
 * Uses AI for personalized scoring + static content for certifications/resources
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash Exp - FREE tier)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

// Static content library for cost optimization
const STATIC_RESOURCES = {
  certifications: {
    Strategic: [
      {
        name: 'Executive Leadership Certificate',
        provider: 'Cornell University',
        relevance: 'high' as const,
        timeframe: '3-6 months',
        costRange: '$3,000-$6,000',
        rationale: 'Develops strategic thinking and executive decision-making skills',
      },
      {
        name: 'Strategic Leadership and Management',
        provider: 'MIT Sloan',
        relevance: 'high' as const,
        timeframe: '2-3 months',
        costRange: '$2,500-$5,000',
        rationale: 'Focuses on driving organizational change and innovation',
      },
    ],
    'Team Management': [
      {
        name: 'Leadership and Management Certificate',
        provider: 'Harvard Extension School',
        relevance: 'high' as const,
        timeframe: '4-8 months',
        costRange: '$5,000-$10,000',
        rationale: 'Comprehensive program covering team dynamics and people management',
      },
      {
        name: 'Certified Manager (CM)',
        provider: 'Institute of Certified Professional Managers',
        relevance: 'medium' as const,
        timeframe: '3-6 months',
        costRange: '$1,000-$2,500',
        rationale: 'Industry-recognized credential for professional managers',
      },
    ],
    Communication: [
      {
        name: 'Executive Communication Certificate',
        provider: 'Northwestern University',
        relevance: 'high' as const,
        timeframe: '2-3 months',
        costRange: '$2,000-$4,000',
        rationale: 'Enhances communication effectiveness for leadership roles',
      },
    ],
    'Change Management': [
      {
        name: 'Change Management Certification',
        provider: 'Prosci',
        relevance: 'high' as const,
        timeframe: '1-2 months',
        costRange: '$3,000-$5,000',
        rationale: 'Industry-standard certification for leading organizational change',
      },
    ],
    'Project Management': [
      {
        name: 'PMP (Project Management Professional)',
        provider: 'PMI',
        relevance: 'high' as const,
        timeframe: '3-6 months',
        costRange: '$1,000-$2,000',
        rationale: 'Gold standard certification for project and program management',
      },
    ],
    Agile: [
      {
        name: 'Certified Scrum Master (CSM)',
        provider: 'Scrum Alliance',
        relevance: 'medium' as const,
        timeframe: '1-2 months',
        costRange: '$1,000-$1,500',
        rationale: 'Essential for leading agile teams and transformations',
      },
    ],
  },
  resources: [
    {
      type: 'book' as const,
      title: 'The First 90 Days',
      author: 'Michael D. Watkins',
      relevance: 'Essential playbook for leadership transitions',
      priority: 'high' as const,
    },
    {
      type: 'book' as const,
      title: 'Leaders Eat Last',
      author: 'Simon Sinek',
      relevance: 'Builds understanding of servant leadership',
      priority: 'high' as const,
    },
    {
      type: 'book' as const,
      title: 'Dare to Lead',
      author: 'Brené Brown',
      relevance: 'Develops courage and vulnerability in leadership',
      priority: 'high' as const,
    },
    {
      type: 'book' as const,
      title: 'Radical Candor',
      author: 'Kim Scott',
      relevance: 'Teaches effective feedback and team management',
      priority: 'high' as const,
    },
    {
      type: 'course' as const,
      title: 'Leadership Principles',
      author: 'Amazon (via Coursera)',
      relevance: 'Learn leadership frameworks from top companies',
      priority: 'high' as const,
    },
    {
      type: 'course' as const,
      title: 'Inspirational Leadership',
      author: 'HEC Paris',
      relevance: 'Develop emotional intelligence and influence',
      priority: 'medium' as const,
    },
    {
      type: 'podcast' as const,
      title: 'HBR IdeaCast',
      author: 'Harvard Business Review',
      relevance: 'Weekly insights on leadership and management',
      priority: 'high' as const,
    },
    {
      type: 'podcast' as const,
      title: 'The Tim Ferriss Show',
      author: 'Tim Ferriss',
      relevance: 'Learn from world-class performers and leaders',
      priority: 'medium' as const,
    },
  ],
}

// Helper function to select relevant certifications based on skills
function selectCertifications(
  leadershipSkills: string[],
  targetRole: string,
): Array<{
  name: string
  provider: string
  relevance: 'high' | 'medium'
  timeframe: string
  costRange: string
  rationale: string
}> {
  const selected: Array<{
    name: string
    provider: string
    relevance: 'high' | 'medium'
    timeframe: string
    costRange: string
    rationale: string
  }> = []
  const roleUpper = targetRole.toUpperCase()

  // Always include strategic leadership for management/exec roles
  if (
    roleUpper.includes('MANAGER') ||
    roleUpper.includes('DIRECTOR') ||
    roleUpper.includes('VP') ||
    roleUpper.includes('EXECUTIVE')
  ) {
    const cert = STATIC_RESOURCES.certifications.Strategic[0]
    if (cert) selected.push(cert)
  }

  // Add team management if relevant
  if (leadershipSkills.includes('Team Building') || leadershipSkills.includes('Delegation')) {
    const cert = STATIC_RESOURCES.certifications['Team Management'][0]
    if (cert) selected.push(cert)
  }

  // Add communication if relevant
  if (
    leadershipSkills.includes('Communication') ||
    leadershipSkills.includes('Stakeholder Management')
  ) {
    const cert = STATIC_RESOURCES.certifications.Communication[0]
    if (cert) selected.push(cert)
  }

  // Add change management if relevant
  if (
    leadershipSkills.includes('Change Management') ||
    leadershipSkills.includes('Vision Setting')
  ) {
    const cert = STATIC_RESOURCES.certifications['Change Management'][0]
    if (cert) selected.push(cert)
  }

  // Add project management if relevant
  if (leadershipSkills.includes('Project Management')) {
    const cert = STATIC_RESOURCES.certifications['Project Management'][0]
    if (cert) selected.push(cert)
  }

  // Add agile if relevant
  if (leadershipSkills.includes('Agile Leadership')) {
    const cert = STATIC_RESOURCES.certifications.Agile[0]
    if (cert) selected.push(cert)
  }

  // If less than 3, add strategic leadership
  if (selected.length < 3) {
    const cert = STATIC_RESOURCES.certifications.Strategic[1]
    if (cert && !selected.includes(cert)) {
      selected.push(cert)
    }
  }

  return selected.slice(0, 4) // Max 4 certifications
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
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(
      request,
      '/api/leadership-readiness-score',
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
      yearsExperience,
      currentRole,
      teamSize,
      leadershipSkills,
      softSkills,
      achievements,
      targetRole,
      industry,
    } = await request.json()

    // Validation
    if (!currentRole || !targetRole || !industry) {
      throw new Error('Missing required fields')
    }

    // Step 4: Generate AI-powered personalized assessment (OPTIMIZED PROMPT)
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    // COST-OPTIMIZED PROMPT: Request only core personalized content
    const prompt = `Analyze leadership readiness. Return ONLY JSON, no markdown.

INPUT:
- Years: ${yearsExperience}
- Current: ${currentRole}
- Team: ${teamSize}
- Target: ${targetRole}
- Industry: ${industry}
- Skills: ${leadershipSkills.join(', ')}
- Soft Skills: ${Object.entries(softSkills)
      .map(([k, v]) => `${k}:${v}/5`)
      .join(', ')}
- Achievements: ${achievements.join(', ')}

OUTPUT JSON:
{
  "overallScore": <0-100>,
  "scoreCategory": "<Beginner|Developing|Proficient|Advanced|Expert>",
  "summary": "<2 sentences on readiness>",
  "categoryScores": {
    "experience": {"score": <0-15>, "maxScore": 15, "percentage": <0-100>, "label": "Experience", "feedback": "<1 sentence>"},
    "currentRole": {"score": <0-10>, "maxScore": 10, "percentage": <0-100>, "label": "Current Role", "feedback": "<1 sentence>"},
    "teamSize": {"score": <0-10>, "maxScore": 10, "percentage": <0-100>, "label": "Team Management", "feedback": "<1 sentence>"},
    "leadershipSkills": {"score": <0-20>, "maxScore": 20, "percentage": <0-100>, "label": "Leadership Skills", "feedback": "<1 sentence>"},
    "softSkills": {"score": <0-20>, "maxScore": 20, "percentage": <0-100>, "label": "Soft Skills", "feedback": "<1 sentence>"},
    "achievements": {"score": <0-15>, "maxScore": 15, "percentage": <0-100>, "label": "Achievements", "feedback": "<1 sentence>"},
    "industry": {"score": <0-10>, "maxScore": 10, "percentage": <0-100>, "label": "Industry Fit", "feedback": "<1 sentence>"}
  },
  "strengths": ["<3-5 specific strengths>"],
  "developmentAreas": [
    {"area": "<skill>", "importance": "critical|high|medium", "currentGap": "<gap>", "recommendation": "<action>", "impact": "high|medium|low", "timeframe": "<months>"}
  ],
  "actionPlan": [
    {"priority": "immediate|short-term|medium-term", "timeframe": "<timeframe>", "actions": ["<2-3 actions>"]}
  ],
  "nextSteps": ["<3-5 immediate actions>"],
  "benchmarkComparison": {
    "percentile": <0-100>,
    "message": "<comparison to peers>",
    "context": "<industry context>"
  },
  "targetRoleGap": {
    "readinessPercentage": <0-100>,
    "estimatedTimeToReady": "<timeframe>",
    "criticalGaps": ["<2-3 gaps>"],
    "quickWins": ["<2-3 wins>"]
  }
}`

    const response = await fetch(GEMINI_API_URL + `?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3, // Lower for consistency
          topK: 20, // Reduced for shorter responses
          topP: 0.85, // Reduced for shorter responses
          maxOutputTokens: 1500, // Reduced from 2048
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

    let assessment
    try {
      assessment = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    // Step 5: Enhance with static content (NO ADDITIONAL API CALLS)
    assessment.recommendedCertifications = selectCertifications(leadershipSkills, targetRole)
    assessment.recommendedResources = STATIC_RESOURCES.resources.slice(0, 6) // Top 6 resources

    console.log(`✅ Leadership assessment completed. Score: ${assessment.overallScore}/100`)

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
    console.error('❌ Assessment failed:', error)
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
