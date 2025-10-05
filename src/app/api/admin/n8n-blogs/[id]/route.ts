import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ObjectId } from 'mongodb'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Check if user is authenticated
    const { user } = await payload.auth({ headers: request.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status } = body

    console.log('Updating blog with ID:', id, 'to status:', status)

    if (!status || !['draft', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "draft" or "published"' },
        { status: 400 },
      )
    }

    // Connect to MongoDB directly to update the n8n-blogs collection
    const db = payload.db.connection.db
    if (!db) {
      throw new Error('Database connection not available')
    }
    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Convert string ID to ObjectId format
    let blogId: any
    try {
      blogId = new ObjectId(id)
      console.log('Converted ID to ObjectId:', blogId)
    } catch (error) {
      console.error('Error converting ID to ObjectId:', error)
      return NextResponse.json({ error: 'Invalid blog ID format' }, { status: 400 })
    }

    // First, find the existing blog
    const existingBlog = await n8nBlogsCollection.findOne({ _id: blogId })
    console.log('Found existing blog:', existingBlog ? 'Yes' : 'No')

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date(),
    }

    // Set or clear datePublished based on status
    if (status === 'published') {
      // Only set datePublished if it wasn't already set
      if (!existingBlog.datePublished) {
        updateData.datePublished = new Date()
      }
    } else {
      updateData.datePublished = null
    }

    console.log('Update data:', updateData)

    // Update the blog
    const result = await n8nBlogsCollection.updateOne({ _id: blogId }, { $set: updateData })
    console.log('Update result:', result)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Blog status updated to ${status}`,
    })
  } catch (error) {
    console.error('Error updating N8N blog status:', error)
    return NextResponse.json({ error: 'Failed to update blog status' }, { status: 500 })
  }
}
