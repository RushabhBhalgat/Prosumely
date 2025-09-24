import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getBlobCacheStats, clearBlobCache } from '@/lib/blobCache'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const stats = getBlobCacheStats()

    return NextResponse.json({
      success: true,
      cache: stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[CacheStats] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    clearBlobCache()

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[CacheClear] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
