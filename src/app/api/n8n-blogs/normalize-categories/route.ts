import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Map from full names to slugs
const CATEGORY_NAME_TO_SLUG: { [key: string]: string } = {
  'Resume by Country / Region': 'resume-by-country',
  'Resume by Job Profile / Industry / Level': 'resume-by-job-profile',
  'Resume and CV Tips / Best Practices': 'resume-cv-tips',
  'LinkedIn Profile Tips': 'linkedin-tips',
  'Project Portfolio / Work Samples': 'project-portfolio',
  'Leadership / Executive Role Resumes': 'leadership-executive',
  'Career Transition / Special Situations': 'career-transition',
  'Personal Branding & Online Presence': 'personal-branding',
  'Job Search & Hiring Trends': 'job-search-trends',
}

const VALID_SLUGS = Object.values(CATEGORY_NAME_TO_SLUG)

export async function POST() {
  try {
    const payload = await getPayload({ config: configPromise })
    const db = payload.db.connection.db

    if (!db) {
      throw new Error('Database connection not available')
    }

    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Find all blogs that need category normalization
    const blogsToUpdate = await n8nBlogsCollection
      .find({
        $or: [
          // Find blogs with full names instead of slugs
          { category: { $in: Object.keys(CATEGORY_NAME_TO_SLUG) } },
          // Find blogs with no category
          { category: { $exists: false } },
          // Find blogs with null or empty category
          { category: null },
          { category: '' },
        ],
      })
      .toArray()

    console.log(`Found ${blogsToUpdate.length} blogs that need category normalization`)

    const updates: any[] = []

    for (const blog of blogsToUpdate) {
      let newCategory = blog.category

      // If it's a full name, convert to slug
      if (CATEGORY_NAME_TO_SLUG[blog.category]) {
        newCategory = CATEGORY_NAME_TO_SLUG[blog.category]
      }
      // If it's empty or missing, set default
      else if (!blog.category) {
        newCategory = 'resume-cv-tips' // default category
      }
      // If it's already a valid slug, keep it
      else if (VALID_SLUGS.includes(blog.category)) {
        continue // Skip, already correct
      }

      // Update the blog
      const result = await n8nBlogsCollection.updateOne(
        { _id: blog._id },
        { $set: { category: newCategory } },
      )

      updates.push({
        slug: blog.slug,
        oldCategory: blog.category || 'NO_CATEGORY',
        newCategory,
        updated: result.modifiedCount > 0,
      })
    }

    // Get updated counts
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

    return NextResponse.json({
      success: true,
      blogsChecked: blogsToUpdate.length,
      blogsUpdated: updates.filter((u) => u.updated).length,
      updates,
      newCategoryCounts: categoryCounts,
    })
  } catch (error) {
    console.error('Error normalizing categories:', error)
    return NextResponse.json(
      {
        error: 'Failed to normalize categories',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
