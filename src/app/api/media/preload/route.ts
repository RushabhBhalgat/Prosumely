import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { preloadBlobCache } from '@/lib/blobCache'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get recently uploaded or frequently accessed files
    const recentMedia = await payload.find({
      collection: 'media',
      sort: '-updatedAt',
      limit: 50, // Preload the 50 most recent files
    })

    const filenames = recentMedia.docs
      .map((doc) => doc.filename)
      .filter((filename): filename is string => Boolean(filename))

    console.log(`[CachePreload] Preloading ${filenames.length} files...`)

    await preloadBlobCache(filenames)

    return NextResponse.json({
      success: true,
      message: `Successfully preloaded ${filenames.length} files into cache`,
      files: filenames,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[CachePreload] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
