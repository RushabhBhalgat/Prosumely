import { NextRequest, NextResponse } from 'next/server'

// Constants
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    console.log('🚀 API called - Clean version')

    const { jobDescription } = await request.json()

    console.log('📝 Job description received, length:', jobDescription?.length || 0)

    // Basic validation
    if (!jobDescription || typeof jobDescription !== 'string') {
      console.log('❌ Invalid job description')
      return NextResponse.json(
        { error: 'Job description is required and must be a string' },
        { status: 400 },
      )
    }

    const cleanJobDescription = jobDescription.trim()

    if (cleanJobDescription.length < 10) {
      console.log('❌ Job description too short')
      return NextResponse.json(
        { error: 'Job description must be at least 10 characters long' },
        { status: 400 },
      )
    }

    if (cleanJobDescription.length > 4000) {
      console.log('❌ Job description too long')
      return NextResponse.json(
        { error: 'Job description must be less than 4000 characters' },
        { status: 400 },
      )
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.log('❌ API key not configured')
      return NextResponse.json({ error: 'Service configuration error' }, { status: 500 })
    }

    // Enhanced prompt for better keyword extraction
    const prompt = `
    You are an expert ATS (Applicant Tracking System) keyword analyzer. Analyze the following job description and extract the most important keywords that candidates should include in their resumes to beat ATS systems.

    Job Description:
    "${cleanJobDescription}"

    Please extract keywords in these categories:
    1. Action Verbs (skills and activities): Strong action words that demonstrate capabilities
    2. Technical Skills: Specific technologies, tools, software, programming languages, certifications
    3. Soft Skills: Interpersonal and behavioral skills

    Return your response in this exact JSON format:
    {
      "actionVerbs": ["verb1", "verb2", "verb3"],
      "technicalSkills": ["skill1", "skill2", "skill3"],
      "softSkills": ["skill1", "skill2", "skill3"]
    }

    Focus on the most relevant and frequently mentioned keywords. Limit each category to the top 10-15 most important keywords.
    `

    console.log('🤖 Calling Gemini API...')

    // Call Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('❌ Gemini API Error:', errorText)
      return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 503 })
    }

    const geminiData = await geminiResponse.json()

    if (!geminiData.candidates || !geminiData.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('❌ Invalid response format from Gemini API')
      return NextResponse.json({ error: 'AI service returned invalid response' }, { status: 503 })
    }

    const responseText = geminiData.candidates[0].content.parts[0].text

    console.log('🎯 Parsing AI response...')

    // Parse the JSON response
    let parsedKeywords
    try {
      // Extract JSON from the response (handle code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      parsedKeywords = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('❌ Failed to parse keywords:', parseError)
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 503 })
    }

    // Validate the structure
    if (
      !parsedKeywords.actionVerbs ||
      !parsedKeywords.technicalSkills ||
      !parsedKeywords.softSkills
    ) {
      console.error('❌ Invalid keyword structure in response')
      return NextResponse.json({ error: 'AI response structure invalid' }, { status: 503 })
    }

    const processingTime = Date.now() - startTime

    console.log('✅ Keywords extracted successfully')
    console.log('⏱️  Processing time:', processingTime, 'ms')
    console.log('📊 Keywords found:', {
      actionVerbs: parsedKeywords.actionVerbs.length,
      technicalSkills: parsedKeywords.technicalSkills.length,
      softSkills: parsedKeywords.softSkills.length,
    })

    return NextResponse.json({
      keywords: parsedKeywords,
      processingTime,
      usage: {
        inputLength: cleanJobDescription.length,
        wordCount: cleanJobDescription.split(/\s+/).length,
      },
    })
  } catch (error) {
    console.error('❌ Keyword extraction error:', error)

    const processingTime = Date.now() - startTime

    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
        processingTime,
      },
      { status: 500 },
    )
  }
}
