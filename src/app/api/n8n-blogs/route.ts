import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const payload = await getPayload({ config: configPromise })

    // Connect to MongoDB directly to query the n8n-blogs collection
    const db = payload.db.connection.db
    if (!db) {
      throw new Error('Database connection not available')
    }
    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Calculate skip value for pagination
    const skip = (page - 1) * limit

    // Get published n8n blogs with pagination
    // Use aggregation pipeline to sort by the most recent date from either field
    const blogs = await n8nBlogsCollection
      .aggregate([
        { $match: { status: 'published' } },
        {
          $addFields: {
            sortDate: {
              $cond: {
                if: { $ifNull: ['$createdAt', false] },
                then: '$createdAt',
                else: { $ifNull: ['$datePublished', '1970-01-01'] },
              },
            },
          },
        },
        { $sort: { sortDate: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { sortDate: 0 } }, // Remove the temporary field
      ])
      .toArray()

    // Get total count for pagination info
    const totalDocs = await n8nBlogsCollection.countDocuments({ status: 'published' })

    return NextResponse.json({
      docs: blogs,
      totalDocs,
      page,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage: page < Math.ceil(totalDocs / limit),
      hasPrevPage: page > 1,
    })
  } catch (error) {
    console.error('Error fetching N8N blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch N8N blogs' }, { status: 500 })
  }
}
