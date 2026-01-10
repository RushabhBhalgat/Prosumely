import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const db = payload.db.connection.db

    if (!db) {
      throw new Error('Database connection not available')
    }

    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Get all published blogs with their categories
    const blogs = await n8nBlogsCollection
      .find({ status: 'published' })
      .project({ title: 1, category: 1, slug: 1, _id: 0 })
      .limit(100)
      .toArray()

    // Group by category
    const categoryGroups: { [key: string]: any[] } = {}
    blogs.forEach((blog: any) => {
      const cat = blog.category || 'NO_CATEGORY'
      if (!categoryGroups[cat]) {
        categoryGroups[cat] = []
      }
      categoryGroups[cat].push(blog)
    })

    // Get counts using the same aggregation as the API
    const categoryCounts = await n8nBlogsCollection
      .aggregate([
        { $match: { status: 'published' } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    const totalPublished = await n8nBlogsCollection.countDocuments({ status: 'published' })

    return NextResponse.json({
      totalPublished,
      categoryGroups: Object.keys(categoryGroups).map((cat) => ({
        category: cat,
        count: categoryGroups[cat]?.length || 0,
        sampleBlogs: categoryGroups[cat]?.slice(0, 3).map((b) => b.title) || [],
      })),
      aggregationResults: categoryCounts,
      sampleBlogs: blogs.slice(0, 10),
    })
  } catch (error) {
    console.error('Error checking categories:', error)
    return NextResponse.json({ error: 'Failed to check categories' }, { status: 500 })
  }
}
