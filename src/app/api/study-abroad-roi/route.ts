/**
 * Study Abroad ROI Calculator API
 * Financial analysis for international education investment
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityManager } from '@/lib/security-new'
import { mongoRateLimiter } from '@/lib/rate-limiter-mongo'

// Environment variables (using Gemini 2.0 Flash Exp - FREE tier)
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

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
    const rateLimitResult = await mongoRateLimiter.checkRateLimit(request, '/api/study-abroad-roi')

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
    const {
      country,
      institutionType,
      degreeLevel,
      programDuration,
      fieldOfStudy,
      tuitionAnnual,
      livingExpensesMonthly,
      visaFees,
      travelCosts,
      healthInsurance,
      scholarships,
      loanAmount,
      loanInterestRate,
      familySupport,
      partTimeEarnings,
      foregoneSalary,
      homeCountryDegreeCost,
      targetCareerField,
      targetWorkCountry,
      expectedSalaryPostGrad,
    } = body

    if (!country || !degreeLevel || !fieldOfStudy || !tuitionAnnual) {
      throw new Error('Missing required fields')
    }

    // Step 4: Perform financial calculations
    const programYears = programDuration || 2
    const monthlyLiving = livingExpensesMonthly || 0
    const totalMonths = programYears * 12

    // Direct Costs
    const totalTuition = tuitionAnnual * programYears
    const totalLivingExpenses = monthlyLiving * totalMonths
    const totalDirectCosts =
      totalTuition +
      totalLivingExpenses +
      (visaFees || 0) +
      (travelCosts || 0) +
      (healthInsurance || 0) * totalMonths +
      2000 // materials estimate

    // Opportunity Costs
    const totalForegoneSalary = (foregoneSalary || 0) * programYears
    const totalOpportunityCosts = totalForegoneSalary

    // Financing Costs
    const totalLoan = loanAmount || 0
    const interestRate = loanInterestRate || 5
    const loanYears = 10
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanYears * 12
    const monthlyPayment =
      totalLoan > 0
        ? (totalLoan * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
        : 0
    const totalLoanRepayment = monthlyPayment * totalPayments
    const totalInterest = totalLoanRepayment - totalLoan
    const totalFinancingCosts = totalInterest

    // Total Investment
    const totalInvestment = totalDirectCosts + totalOpportunityCosts + totalFinancingCosts

    // Funding
    const totalScholarships = scholarships || 0
    const totalFamilySupport = familySupport || 0
    const totalPartTimeEarnings = (partTimeEarnings || 0) * totalMonths
    const totalFunding = totalScholarships + totalFamilySupport + totalPartTimeEarnings

    // Net Investment
    const netInvestment = totalInvestment - totalFunding

    // Use AI for market insights and ROI analysis
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const prompt = `Analyze study abroad ROI. Return ONLY JSON, no markdown.

INPUT:
- Country: ${country}
- Degree: ${degreeLevel} in ${fieldOfStudy}
- Program Duration: ${programYears} years
- Total Net Investment: $${netInvestment.toFixed(0)}
- Expected Post-Grad Salary: $${expectedSalaryPostGrad || 'Not specified'}
- Target Work Country: ${targetWorkCountry || 'Not specified'}
- Target Career: ${targetCareerField || 'Not specified'}

OUTPUT JSON:
{
  "salaryBoostAnalysis": {
    "internationalDegreePremium": <5-40 percentage increase>,
    "firstYearSalary": <realistic estimate USD>,
    "domesticDegreeSalary": <comparison>,
    "lifetimeEarningsIncrease": <30-year difference>,
    "reasoning": "<1 sentence justification>"
  },
  "careerOpportunities": {
    "accessToRolesNotAvailableOtherwise": ["<2-3 specific roles>"],
    "fasterAdvancement": "<description>",
    "globalMobilityScore": <0-10>
  },
  "immigrationBenefits": {
    "postStudyWorkVisaYears": <years>,
    "pathToPermanentResidency": "Strong|Moderate|Limited|None",
    "estimatedValue": "<qualitative benefit>"
  },
  "roiMetrics": {
    "paybackPeriodYears": <years to break even>,
    "netPresentValue": <lifetime value - investment>,
    "roiPercentage": <(returns - investment) / investment * 100>
  },
  "financialViability": {
    "debtLoad": <total post-grad debt>,
    "debtToIncomeRatio": <debt / first year salary>,
    "monthlyLoanPayment": <USD>,
    "yearsToPayOff": <years>,
    "affordabilityRating": "Manageable|Tight|Risky|Unaffordable",
    "reasoning": "<1 sentence>"
  },
  "riskFactors": [
    "<3-5 specific risks for this scenario>"
  ],
  "recommendation": {
    "verdict": "Strong ROI|Positive ROI|Marginal ROI|Negative ROI",
    "reasoning": "<2 sentences>",
    "conditions": "<any conditions for recommendation>"
  },
  "alternatives": [
    {
      "option": "<alternative>",
      "comparison": "<vs study abroad>",
      "costDifference": "<USD>"
    }
  ],
  "scholarshipNeeded": {
    "forPositiveROI": <USD amount>,
    "forStrongROI": <USD amount>
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

    let aiAnalysis
    try {
      aiAnalysis = JSON.parse(generatedText)
    } catch {
      throw new Error('Invalid AI response format')
    }

    // Combine calculations with AI analysis
    const roiCalculation = {
      investmentBreakdown: {
        directCosts: {
          tuition: totalTuition,
          livingExpenses: totalLivingExpenses,
          visaImmigration: visaFees || 0,
          travel: travelCosts || 0,
          healthInsurance: (healthInsurance || 0) * totalMonths,
          materials: 2000,
          subtotal: totalDirectCosts,
        },
        opportunityCosts: {
          foregoneSalary: totalForegoneSalary,
          lostCareerProgression: 0,
          subtotal: totalOpportunityCosts,
        },
        financingCosts: {
          loanInterest: totalInterest,
          subtotal: totalFinancingCosts,
        },
        totalInvestment: totalInvestment,
      },
      funding: {
        scholarships: totalScholarships,
        familySupport: totalFamilySupport,
        partTimeEarnings: totalPartTimeEarnings,
        totalFunding: totalFunding,
      },
      netInvestment: netInvestment,
      loanDetails: {
        principal: totalLoan,
        interestRate: interestRate,
        totalRepayment: totalLoanRepayment,
        monthlyPayment: monthlyPayment,
        repaymentYears: loanYears,
      },
      comparison: {
        homeCountryDegreeCost: homeCountryDegreeCost || 0,
        premiumForInternational: netInvestment - (homeCountryDegreeCost || 0),
      },
      ...aiAnalysis,
    }

    console.log(`✅ Study abroad ROI calculated. Verdict: ${aiAnalysis.recommendation?.verdict}`)

    return NextResponse.json(
      {
        roiCalculation,
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
    console.error('❌ ROI calculation failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Calculation failed',
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
