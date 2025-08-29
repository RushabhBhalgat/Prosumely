import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check for a secret token to prevent unauthorized revalidation
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.REVALIDATION_TOKEN}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Revalidate settings cache
    revalidateTag('global_settings')
    
    // Revalidate all main pages that use services mode
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/pricing')
    
    // Revalidate all industry service pages
    const industries = [
      'construction-industry',
      'energy-oil-gas-industry', 
      'tech-it-industry',
      'hospitality-tourism-industry',
      'engineering-manufacturing-industry',
      'logistics-supply-chain-industry',
      'banking-financial-services-insurance-industry',
      'healthcare-pharma-industry',
      'strategy-consulting-industry',
      'sales-marketing-industry',
      'media-entertainment-industry',
      'human-resources-industry',
      'fmcg-retail-industry',
      'legal-compliance-industry',
      'public-sector-government-industry',
      'chemicals-materials-industry'
    ]
    
    industries.forEach(industry => {
      revalidatePath(`/${industry}/services`)
    })

    return NextResponse.json({ 
      message: 'Settings cache revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating settings cache:', error)
    return NextResponse.json(
      { message: 'Error revalidating cache' }, 
      { status: 500 }
    )
  }
}