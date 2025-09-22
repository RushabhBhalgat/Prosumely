import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

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

    // Find the media document by filename
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
      return new NextResponse('File not found or access denied', { status: 404 })
    }

    const mediaDoc = mediaResult.docs[0]

    if (!mediaDoc) {
      return new NextResponse('Media document not found', { status: 404 })
    }

    // Debug: Log the media document structure
    console.log('Media document:', {
      id: mediaDoc.id,
      filename: mediaDoc.filename,
      url: mediaDoc.url,
      mimeType: mediaDoc.mimeType,
      sizes: mediaDoc.sizes ? Object.keys(mediaDoc.sizes) : 'none',
    })

    // Debug: Log actual size URLs to understand the structure
    if (mediaDoc.sizes) {
      console.log('Size variants:')
      for (const [sizeName, sizeData] of Object.entries(mediaDoc.sizes)) {
        console.log(`  ${sizeName}:`, sizeData)
      }
    }

    // Debug: Log all fields to find where Vercel Blob URL might be stored
    console.log('All media document fields:', Object.keys(mediaDoc))
    const docAny = mediaDoc as any
    if (docAny.file) {
      console.log('File field:', docAny.file)
    }
    if (docAny.fileURL) {
      console.log('FileURL field:', docAny.fileURL)
    }
    if (docAny.storage) {
      console.log('Storage field:', docAny.storage)
    }

    // For Vercel Blob storage, we need to access the file directly from Blob
    // The mediaDoc should have file information we can use
    let fileUrl = mediaDoc.url

    // If the URL is relative, access the file through Payload's internal API
    if (fileUrl && fileUrl.startsWith('/')) {
      // IMPORTANT: Check if the URL points to our own route to prevent infinite loops
      if (fileUrl.includes('/api/media/file/')) {
        console.log('Detected potential infinite loop - URL points to our own route:', fileUrl)

        // Use Vercel Blob list to find the actual file
        try {
          console.log('Querying Vercel Blob storage for file:', filename)

          // Import Vercel Blob list function to find the actual blob URL
          const { list } = await import('@vercel/blob')

          const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN })

          // Find the blob that matches our filename
          const matchingBlob = blobs.find((blob) => {
            const blobFilename = decodeURIComponent(blob.pathname)
            const targetFilename = decodeURIComponent(filename)
            console.log('Comparing blob:', blobFilename, 'with target:', targetFilename)
            return blobFilename === targetFilename
          })

          if (matchingBlob) {
            console.log('Found matching blob URL:', matchingBlob.url)

            // Fetch the file directly from Vercel Blob storage
            const blobResponse = await fetch(matchingBlob.url)

            if (!blobResponse.ok) {
              console.error(
                'Failed to fetch file from blob URL:',
                matchingBlob.url,
                blobResponse.status,
              )
              throw new Error(`Blob fetch failed with status ${blobResponse.status}`)
            }

            // Get the file content as array buffer
            const fileArrayBuffer = await blobResponse.arrayBuffer()

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
          } else {
            console.error('No matching blob found for filename:', filename)
            console.log(
              'Available blobs (first 10):',
              blobs.slice(0, 10).map((b) => decodeURIComponent(b.pathname)),
            )
            throw new Error('File not found in blob storage')
          }
        } catch (blobError) {
          console.error('Error accessing Vercel Blob storage:', blobError)

          // If blob access fails, return error
          return new NextResponse(
            'File not accessible from storage. This may indicate a configuration issue.',
            {
              status: 503,
              headers: {
                'Content-Type': 'text/plain',
              },
            },
          )
        }
      }
    }

    // If we have a full URL (Vercel Blob URL), fetch it directly
    if (fileUrl && !fileUrl.startsWith('/')) {
      const fileResponse = await fetch(fileUrl)

      if (!fileResponse.ok) {
        console.error('Failed to fetch file from URL:', fileUrl, fileResponse.status)
        return new NextResponse('File not accessible from storage', { status: 404 })
      }

      // Get the file content
      const fileBuffer = await fileResponse.arrayBuffer()

      // Return the file with appropriate headers
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': mediaDoc.mimeType || 'application/octet-stream',
          'Content-Disposition': `inline; filename="${filename}"`,
          'Cache-Control': 'private, no-cache',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        },
      })
    }

    // If we don't have a URL at all
    return new NextResponse('File URL not available', { status: 404 })
  } catch (error) {
    console.error('Error serving protected media file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
