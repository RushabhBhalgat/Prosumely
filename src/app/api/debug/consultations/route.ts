import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({
      config,
    })

    // Try to get consultations from PayloadCMS
    const result = await payload.find({
      collection: 'consultations',
      limit: 10,
    })

    return NextResponse.json({
      success: true,
      count: result.totalDocs,
      data: result.docs,
      message: `Found ${result.totalDocs} consultations`,
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: 'Failed to fetch consultations',
      },
      { status: 500 },
    )
  }
}
