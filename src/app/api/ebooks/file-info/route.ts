import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('file')

    if (!fileName) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 })
    }

    const mediaPath = path.join(process.cwd(), 'public', 'media')
    const filePath = path.join(mediaPath, fileName)

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Get file stats
    const stats = await fs.stat(filePath)

    // Try to find corresponding thumbnail
    const baseFileName = fileName.replace('.pdf', '')
    const possibleThumbnails = [
      `${baseFileName}-600x338.png`,
      `${baseFileName}-500x500.png`,
      `${baseFileName}-300x169.png`,
    ]

    let thumbnailPath = '/hero-section-banner.png' // fallback

    for (const thumbnail of possibleThumbnails) {
      try {
        await fs.access(path.join(mediaPath, thumbnail))
        thumbnailPath = `/media/${thumbnail}`
        break
      } catch {
        // Continue to next thumbnail option
      }
    }

    const fileInfo = {
      fileName,
      filePath: `/media/${fileName}`,
      thumbnailPath,
      fileSize: Math.round(stats.size / 1024), // Size in KB
      lastModified: stats.mtime.toISOString(),
    }

    return NextResponse.json(fileInfo)
  } catch (error) {
    console.error('Error getting file info:', error)
    return NextResponse.json({ error: 'Failed to get file info' }, { status: 500 })
  }
}
