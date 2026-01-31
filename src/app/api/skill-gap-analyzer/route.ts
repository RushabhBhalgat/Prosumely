/**
 * Skill Gap Analyzer API with Cost-Optimized Hybrid Approach
 * Uses AI for personalized analysis + static content for learning resources
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash Exp - FREE tier)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

// Static learning resources library for cost optimization
const LEARNING_RESOURCES = {
  // Programming Languages
  JavaScript: [
    {
      type: 'course',
      name: 'JavaScript: The Complete Guide',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 50,
    },
    {
      type: 'course',
      name: 'freeCodeCamp JavaScript',
      platform: 'freeCodeCamp',
      cost: 'Free',
      hours: 300,
    },
    {
      type: 'book',
      name: "You Don't Know JS",
      platform: 'GitHub/Amazon',
      cost: 'Free/Paid',
      hours: 40,
    },
  ],
  Python: [
    { type: 'course', name: 'Python for Everybody', platform: 'Coursera', cost: 'Free', hours: 60 },
    {
      type: 'course',
      name: 'Complete Python Bootcamp',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 22,
    },
    {
      type: 'practice',
      name: 'LeetCode Python Track',
      platform: 'LeetCode',
      cost: 'Free/Premium',
      hours: 100,
    },
  ],
  Java: [
    {
      type: 'course',
      name: 'Java Programming Masterclass',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 80,
    },
    {
      type: 'course',
      name: 'Java MOOC',
      platform: 'University of Helsinki',
      cost: 'Free',
      hours: 200,
    },
    {
      type: 'certification',
      name: 'Oracle Certified Professional',
      platform: 'Oracle',
      cost: 'Paid (~$300)',
      hours: 120,
    },
  ],
  TypeScript: [
    {
      type: 'course',
      name: 'Understanding TypeScript',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 15,
    },
    {
      type: 'book',
      name: 'Programming TypeScript',
      platform: "O'Reilly",
      cost: 'Paid (~$40)',
      hours: 30,
    },
    { type: 'practice', name: 'TypeScript Exercises', platform: 'GitHub', cost: 'Free', hours: 20 },
  ],
  React: [
    {
      type: 'course',
      name: 'React - The Complete Guide',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 40,
    },
    {
      type: 'course',
      name: 'React Official Tutorial',
      platform: 'React.dev',
      cost: 'Free',
      hours: 10,
    },
    {
      type: 'practice',
      name: 'Build 15 React Projects',
      platform: 'YouTube/FreeCodeCamp',
      cost: 'Free',
      hours: 50,
    },
  ],
  'Node.js': [
    {
      type: 'course',
      name: 'The Complete Node.js Developer Course',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 35,
    },
    { type: 'course', name: 'Node.js Tutorial', platform: 'freeCodeCamp', cost: 'Free', hours: 8 },
    { type: 'practice', name: 'Build REST APIs', platform: 'YouTube', cost: 'Free', hours: 20 },
  ],
  SQL: [
    {
      type: 'course',
      name: 'The Complete SQL Bootcamp',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 9,
    },
    { type: 'course', name: 'SQL for Data Science', platform: 'Coursera', cost: 'Free', hours: 20 },
    { type: 'practice', name: 'HackerRank SQL', platform: 'HackerRank', cost: 'Free', hours: 30 },
  ],
  AWS: [
    {
      type: 'course',
      name: 'AWS Certified Solutions Architect',
      platform: 'A Cloud Guru',
      cost: 'Paid (~$50/mo)',
      hours: 40,
    },
    {
      type: 'course',
      name: 'AWS Free Tier Tutorials',
      platform: 'AWS Training',
      cost: 'Free',
      hours: 20,
    },
    {
      type: 'certification',
      name: 'AWS Solutions Architect Associate',
      platform: 'AWS',
      cost: 'Paid (~$150)',
      hours: 80,
    },
  ],
  Docker: [
    { type: 'course', name: 'Docker Mastery', platform: 'Udemy', cost: 'Paid (~$15)', hours: 19 },
    {
      type: 'course',
      name: 'Docker Tutorial for Beginners',
      platform: 'YouTube',
      cost: 'Free',
      hours: 3,
    },
    { type: 'practice', name: 'Docker Labs', platform: 'Docker', cost: 'Free', hours: 15 },
  ],
  Kubernetes: [
    {
      type: 'course',
      name: 'Kubernetes for Beginners',
      platform: 'Udemy',
      cost: 'Paid (~$15)',
      hours: 20,
    },
    {
      type: 'certification',
      name: 'CKA: Certified Kubernetes Administrator',
      platform: 'Linux Foundation',
      cost: 'Paid (~$400)',
      hours: 100,
    },
    {
      type: 'practice',
      name: 'KodeKloud Labs',
      platform: 'KodeKloud',
      cost: 'Paid (~$20/mo)',
      hours: 40,
    },
  ],
  'Machine Learning': [
    {
      type: 'course',
      name: 'Machine Learning by Andrew Ng',
      platform: 'Coursera',
      cost: 'Free',
      hours: 60,
    },
    {
      type: 'course',
      name: 'Deep Learning Specialization',
      platform: 'Coursera',
      cost: 'Paid (~$50/mo)',
      hours: 120,
    },
    { type: 'practice', name: 'Kaggle Competitions', platform: 'Kaggle', cost: 'Free', hours: 200 },
  ],
  'Data Analysis': [
    {
      type: 'course',
      name: 'Google Data Analytics Certificate',
      platform: 'Coursera',
      cost: 'Paid (~$50/mo)',
      hours: 180,
    },
    {
      type: 'course',
      name: 'Data Analysis with Python',
      platform: 'freeCodeCamp',
      cost: 'Free',
      hours: 10,
    },
    {
      type: 'practice',
      name: 'DataCamp Projects',
      platform: 'DataCamp',
      cost: 'Paid (~$30/mo)',
      hours: 50,
    },
  ],
  'Project Management': [
    {
      type: 'course',
      name: 'Google Project Management Certificate',
      platform: 'Coursera',
      cost: 'Paid (~$50/mo)',
      hours: 180,
    },
    {
      type: 'certification',
      name: 'PMP Certification',
      platform: 'PMI',
      cost: 'Paid (~$500)',
      hours: 120,
    },
    { type: 'book', name: 'PMBOK Guide', platform: 'PMI', cost: 'Paid (~$50)', hours: 40 },
  ],
  Agile: [
    {
      type: 'course',
      name: 'Agile with Atlassian Jira',
      platform: 'Coursera',
      cost: 'Free',
      hours: 15,
    },
    {
      type: 'certification',
      name: 'Certified Scrum Master',
      platform: 'Scrum Alliance',
      cost: 'Paid (~$1,500)',
      hours: 40,
    },
    {
      type: 'book',
      name: 'Scrum: The Art of Doing Twice the Work',
      platform: 'Amazon',
      cost: 'Paid (~$20)',
      hours: 8,
    },
  ],
  Communication: [
    {
      type: 'course',
      name: 'Improving Communication Skills',
      platform: 'Coursera',
      cost: 'Free',
      hours: 20,
    },
    {
      type: 'course',
      name: 'Business Communication',
      platform: 'LinkedIn Learning',
      cost: 'Paid (~$30/mo)',
      hours: 15,
    },
    {
      type: 'book',
      name: 'Crucial Conversations',
      platform: 'Amazon',
      cost: 'Paid (~$20)',
      hours: 10,
    },
  ],
  Leadership: [
    { type: 'course', name: 'Inspiring Leadership', platform: 'Coursera', cost: 'Free', hours: 25 },
    { type: 'book', name: 'The First 90 Days', platform: 'Amazon', cost: 'Paid (~$20)', hours: 12 },
    { type: 'book', name: 'Leaders Eat Last', platform: 'Amazon', cost: 'Paid (~$20)', hours: 10 },
  ],
}

// Helper function to match skills to resources
function getLearningResources(skill: string): Array<any> {
  // Direct match
  if (LEARNING_RESOURCES[skill as keyof typeof LEARNING_RESOURCES]) {
    return LEARNING_RESOURCES[skill as keyof typeof LEARNING_RESOURCES]
  }

  // Fuzzy match
  const skillLower = skill.toLowerCase()
  for (const [key, resources] of Object.entries(LEARNING_RESOURCES)) {
    if (key.toLowerCase().includes(skillLower) || skillLower.includes(key.toLowerCase())) {
      return resources
    }
  }

  // Default generic resources
  return [
    { type: 'course', name: 'Search on Udemy', platform: 'Udemy', cost: 'Paid (~$15)', hours: 20 },
    {
      type: 'course',
      name: 'Search on Coursera',
      platform: 'Coursera',
      cost: 'Free/Paid',
      hours: 30,
    },
    { type: 'practice', name: 'YouTube Tutorials', platform: 'YouTube', cost: 'Free', hours: 15 },
  ]
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
      '/api/skill-gap-analyzer',
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
    const body = await request.json()
    const { currentRole, yearsExperience, currentSkills, targetRole, industry, country, timeline } =
      body

    if (!currentRole || !targetRole || !industry || !country) {
      throw new Error('Missing required fields')
    }

    // Step 4: Generate AI-powered skill gap analysis
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `Analyze skill gap between current and target role. Return ONLY JSON, no markdown.

INPUT:
- Current Role: ${currentRole}
- Years Experience: ${yearsExperience}
- Current Skills: ${currentSkills.join(', ')}
- Target Role: ${targetRole}
- Industry: ${industry}
- Country: ${country}
- Timeline: ${timeline || 'Not specified'}

OUTPUT JSON:
{
  "overallReadinessScore": <0-100>,
  "summary": "<2 sentences on skill gap and readiness>",
  "criticalGaps": [
    {
      "skill": "<skill name>",
      "importance": <0-10>,
      "currentProficiency": "None|Beginner|Intermediate|Advanced",
      "targetProficiency": "Intermediate|Advanced|Expert",
      "estimatedHours": <learning hours>,
      "difficulty": "Easy|Medium|Hard|Very Hard",
      "marketDemand": "<% of job postings requiring this>"
    }
  ],
  "importantGaps": [
    {
      "skill": "<skill name>",
      "importance": <0-10>,
      "currentProficiency": "None|Beginner|Intermediate",
      "targetProficiency": "Intermediate|Advanced",
      "estimatedHours": <hours>,
      "difficulty": "Easy|Medium|Hard",
      "marketDemand": "<%>"
    }
  ],
  "niceToHaveGaps": [
    {
      "skill": "<skill name>",
      "importance": <0-10>,
      "currentProficiency": "None|Beginner",
      "targetProficiency": "Intermediate",
      "estimatedHours": <hours>,
      "difficulty": "Easy|Medium",
      "marketDemand": "<%>"
    }
  ],
  "skillsYouHave": [
    {
      "skill": "<skill name>",
      "proficiency": "Beginner|Intermediate|Advanced|Expert",
      "relevanceToTarget": "High|Medium|Low",
      "competitiveAdvantage": "<why this helps>"
    }
  ],
  "learningRoadmap": {
    "totalEstimatedHours": <total hours>,
    "estimatedWeeks": <weeks at 10hrs/week>,
    "phases": [
      {
        "phase": "Immediate Priority (Weeks 1-4)",
        "skills": ["<2-3 critical skills>"],
        "milestoneProject": "<hands-on project>"
      },
      {
        "phase": "Short-term (Weeks 5-12)",
        "skills": ["<2-3 important skills>"],
        "milestoneProject": "<project>"
      },
      {
        "phase": "Medium-term (Weeks 13-24)",
        "skills": ["<2-3 nice-to-have skills>"],
        "milestoneProject": "<project>"
      }
    ]
  },
  "competitiveAnalysis": {
    "yourPercentile": <0-100>,
    "comparisonMessage": "<how you compare to typical candidates>",
    "strengthAreas": ["<2-3 areas where you excel>"],
    "weaknessAreas": ["<2-3 areas needing work>"]
  },
  "actionPlan": {
    "weekByWeekSchedule": "<suggested weekly structure>",
    "portfolioProjects": ["<3 projects to demonstrate skills>"],
    "expectedTimeToReady": "<X months realistic timeline>"
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

    // Step 5: Enhance with static learning resources
    // Add learning resources to each skill gap
    if (analysis.criticalGaps) {
      analysis.criticalGaps = analysis.criticalGaps.map((gap: any) => ({
        ...gap,
        learningResources: getLearningResources(gap.skill),
      }))
    }

    if (analysis.importantGaps) {
      analysis.importantGaps = analysis.importantGaps.map((gap: any) => ({
        ...gap,
        learningResources: getLearningResources(gap.skill),
      }))
    }

    if (analysis.niceToHaveGaps) {
      analysis.niceToHaveGaps = analysis.niceToHaveGaps.map((gap: any) => ({
        ...gap,
        learningResources: getLearningResources(gap.skill),
      }))
    }

    console.log(`✅ Skill gap analysis completed. Readiness: ${analysis.overallReadinessScore}%`)

    return NextResponse.json(
      {
        analysis,
        processingTime: Date.now() - startTime,
        success: true,
      },
      {
        headers: {
          ...securityManager.getCORSHeaders(request),
          'X-Processing-Time': (Date.now() - startTime).toString(),
        },
      },
    )
  } catch (error) {
    console.error('❌ Skill gap analysis failed:', error)
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
