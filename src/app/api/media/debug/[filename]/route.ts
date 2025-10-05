import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest, props: { params: Promise<{ filename: string }> }) {
  try {
    const params = await props.params
    const filename = decodeURIComponent(params.filename)

    console.log(`[MediaDebug] Debugging file: ${filename}`)

    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

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

    const mediaDoc = mediaResult.docs[0]

    // Get all blobs from Vercel Blob storage
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN })

    // Find potential matches
    const potentialMatches = blobs.filter((blob) => {
      const blobFilename = decodeURIComponent(blob.pathname)
      const basename = blobFilename.split('/').pop() || blobFilename
      return (
        basename.includes(filename.replace(/%20/g, ' ')) ||
        filename.includes(basename) ||
        blobFilename.includes(filename)
      )
    })

    return NextResponse.json({
      requestedFile: filename,
      mediaDocument: mediaDoc
        ? {
            id: mediaDoc.id,
            filename: mediaDoc.filename,
            url: mediaDoc.url,
            mimeType: mediaDoc.mimeType,
            createdAt: mediaDoc.createdAt,
            updatedAt: mediaDoc.updatedAt,
          }
        : null,
      totalBlobs: blobs.length,
      potentialMatches: potentialMatches.map((blob) => ({
        pathname: blob.pathname,
        decodedPathname: decodeURIComponent(blob.pathname),
        basename: decodeURIComponent(blob.pathname).split('/').pop(),
        url: blob.url,
        uploadedAt: blob.uploadedAt,
      })),
      allBlobs: blobs.slice(0, 20).map((blob) => ({
        pathname: blob.pathname,
        decodedPathname: decodeURIComponent(blob.pathname),
        basename: decodeURIComponent(blob.pathname).split('/').pop(),
      })),
    })
  } catch (error) {
    console.error('[MediaDebug] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
