import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Check if user is authenticated
    const { user } = await payload.auth({ headers: request.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Connect to MongoDB directly to query the n8n-blogs collection
    const db = payload.db.connection.db
    if (!db) {
      throw new Error('Database connection not available')
    }
    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Get all n8n blogs (both published and draft for admin)
    const blogs = await n8nBlogsCollection.find({}).sort({ dateCreated: -1 }).toArray()

    return NextResponse.json({
      docs: blogs,
      totalDocs: blogs.length,
    })
  } catch (error) {
    console.error('Error fetching N8N blogs for admin:', error)
    return NextResponse.json({ error: 'Failed to fetch N8N blogs' }, { status: 500 })
  }
}
