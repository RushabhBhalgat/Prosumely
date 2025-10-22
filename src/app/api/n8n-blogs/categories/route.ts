import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Map from full names to slugs (for backward compatibility)
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

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Use MongoDB directly to query n8n-blogs
    const db = payload.db.connection.db
    if (!db) {
      throw new Error('Database connection not available')
    }

    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Get counts for each category
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

    // Convert to a more usable format, normalizing category names to slugs
    const counts: { [key: string]: number } = {}
    categoryCounts.forEach((item: any) => {
      const categoryValue = item._id
      // If it's already a slug, use it; if it's a full name, convert it
      const slug = CATEGORY_NAME_TO_SLUG[categoryValue] || categoryValue
      counts[slug] = (counts[slug] || 0) + item.count
    })

    console.log('Category counts:', counts)

    return NextResponse.json(counts)
  } catch (error) {
    console.error('Error fetching category counts:', error)
    return NextResponse.json({ error: 'Failed to fetch category counts' }, { status: 500 })
  }
}
