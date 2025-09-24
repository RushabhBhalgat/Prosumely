import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getCachedBlobUrl } from '@/lib/blobCache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const payload = await getPayload({ config })

    // Await params for Next.js 15 compatibility
    const { filename: rawFilename } = await params

    // Extract cookies for authentication
    const cookieHeader = request.headers.get('cookie') || ''

    let isAuthenticated = false

    try {
      // Create a Headers object for Payload authentication
      const headers = new Headers()
      headers.set('cookie', cookieHeader)

      // Use Payload's built-in authentication
      const authResult = await payload.auth({
        headers,
      })

      isAuthenticated = Boolean(authResult?.user)
    } catch (error) {
      console.log('Authentication failed:', error)
      isAuthenticated = false
    }

    // If not authenticated, return 403
    if (!isAuthenticated) {
      return new NextResponse('Forbidden: Admin authentication required to access this file', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    // Get the filename from the URL
    const filename = decodeURIComponent(rawFilename)

    console.log(`[MediaFile] Serving file: ${filename}`)

    // Find the media document by filename for validation and metadata
    const mediaResult = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
    })

    if (!mediaResult.docs || mediaResult.docs.length === 0) {
      console.log(`[MediaFile] Media document not found: ${filename}`)
      return new NextResponse('File not found or access denied', { status: 404 })
    }

    const mediaDoc = mediaResult.docs[0]

    if (!mediaDoc) {
      console.log(`[MediaFile] Media document not found: ${filename}`)
      return new NextResponse('File not found or access denied', { status: 404 })
    }

    // Try to get the blob URL efficiently using cache
    let blobUrl: string | null = null

    // First, check if Payload has a proper blob URL
    if (
      mediaDoc.url &&
      !mediaDoc.url.startsWith('/') &&
      !mediaDoc.url.includes('/api/media/file/')
    ) {
      blobUrl = mediaDoc.url
      console.log(`[MediaFile] Using Payload URL: ${blobUrl}`)
    } else {
      // Use our efficient cached blob lookup
      blobUrl = await getCachedBlobUrl(filename)
      console.log(`[MediaFile] Using cached blob URL: ${blobUrl}`)
    }

    if (!blobUrl) {
      console.log(`[MediaFile] Blob URL not found for: ${filename}`)
      return new NextResponse('File not found in storage', { status: 404 })
    }

    // Fetch the file from the blob URL
    const fileResponse = await fetch(blobUrl)

    if (!fileResponse.ok) {
      console.error(`[MediaFile] Failed to fetch from blob: ${fileResponse.status}`)
      return new NextResponse('File not accessible from storage', { status: 503 })
    }

    // Get the file content as array buffer
    const fileArrayBuffer = await fileResponse.arrayBuffer()

    console.log(
      `[MediaFile] Successfully served: ${filename} (${fileArrayBuffer.byteLength} bytes)`,
    )

    // Return the file with appropriate headers
    return new NextResponse(fileArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': mediaDoc.mimeType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'private, no-cache',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    })
  } catch (error) {
    console.error('[MediaFile] Error serving file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
