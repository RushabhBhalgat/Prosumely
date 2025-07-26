import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const mediaPath = path.join(process.cwd(), 'public', 'media')

    // Read the media directory
    const files = await fs.readdir(mediaPath)

    // Filter PDF files
    const pdfFiles = files.filter((file) => file.toLowerCase().endsWith('.pdf'))

    // Create ebook objects with metadata
    const ebooks = await Promise.all(
      pdfFiles.map(async (fileName, index) => {
        const filePath = `/media/${fileName}`
        const fullPath = path.join(mediaPath, fileName)

        // Get file stats
        const stats = await fs.stat(fullPath)

        // Generate thumbnail path (you might want to implement actual PDF thumbnail generation)
        const thumbnailPath = `/media/${fileName.replace('.pdf', '-600x338.png')}`

        // Extract title from filename
        const title = fileName.replace('.pdf', '').replace(/[-_]/g, ' ')

        return {
          id: (index + 1).toString(),
          title: title,
          description: `Professional ${title.toLowerCase()} guide to help accelerate your career.`,
          fileName: fileName,
          filePath: filePath,
          thumbnailPath: thumbnailPath,
          category: determineCategory(fileName),
          author: 'Prosumely Team',
          publishDate: stats.mtime.toISOString().split('T')[0],
          downloadCount: Math.floor(Math.random() * 1000) + 100, // Simulated
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          tags: generateTags(fileName),
          featured: index < 2, // First 2 are featured
          fileSize: Math.round(stats.size / 1024), // Size in KB
        }
      }),
    )

    return NextResponse.json({ ebooks })
  } catch (error) {
    console.error('Error fetching ebooks:', error)
    return NextResponse.json({ error: 'Failed to fetch ebooks' }, { status: 500 })
  }
}

function determineCategory(fileName: string): string {
  const lowerFileName = fileName.toLowerCase()

  if (lowerFileName.includes('resume')) {
    return 'Resume Writing'
  } else if (lowerFileName.includes('cv')) {
    return 'CV Templates'
  } else if (lowerFileName.includes('review')) {
    return 'Resume Optimization'
  } else if (lowerFileName.includes('interview')) {
    return 'Interview Prep'
  } else {
    return 'Career Guides'
  }
}

function generateTags(fileName: string): string[] {
  const lowerFileName = fileName.toLowerCase()
  const tags: string[] = []

  if (lowerFileName.includes('resume')) tags.push('Resume')
  if (lowerFileName.includes('cv')) tags.push('CV')
  if (lowerFileName.includes('2025')) tags.push('2025', 'Modern')
  if (lowerFileName.includes('review')) tags.push('Review', 'Optimization')
  if (lowerFileName.includes('guide')) tags.push('Guide')
  if (lowerFileName.includes('template')) tags.push('Template')
  if (lowerFileName.includes('professional')) tags.push('Professional')

  // Add some default tags
  tags.push('Career Tips', 'Free Download')

  return [...new Set(tags)] // Remove duplicates
}
