import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const payload = await getPayload({ config: configPromise })

    // Connect to MongoDB directly to query the n8n-blogs collection
    const db = payload.db.connection.db
    if (!db) {
      throw new Error('Database connection not available')
    }
    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Find the blog by slug
    const blog = await n8nBlogsCollection.findOne({
      slug,
      status: 'published',
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // Add aggressive caching headers
    // Cache for 1 hour, serve stale content for up to 24 hours while revalidating
    return NextResponse.json(blog, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching N8N blog:', error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}
