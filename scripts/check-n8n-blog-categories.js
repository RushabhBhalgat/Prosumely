import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function checkCategories() {
  const payload = await getPayload({ config: configPromise })
  const db = payload.db.connection.db

  if (!db) {
    console.error('Database connection not available')
    process.exit(1)
  }

  const n8nBlogsCollection = db.collection('n8n-blogs')

  // Get all published blogs with their categories
  const blogs = await n8nBlogsCollection
    .find({ status: 'published' })
    .project({ title: 1, category: 1, slug: 1 })
    .toArray()

  console.log('\n=== Published N8N Blogs ===')
  console.log(`Total published blogs: ${blogs.length}\n`)

  // Group by category
  const categoryGroups = {}
  blogs.forEach((blog) => {
    const cat = blog.category || 'NO_CATEGORY'
    if (!categoryGroups[cat]) {
      categoryGroups[cat] = []
    }
    categoryGroups[cat].push(blog)
  })

  console.log('=== Blogs by Category ===')
  Object.entries(categoryGroups).forEach(([category, blogsList]) => {
    console.log(`\n${category}: ${blogsList.length} blog(s)`)
    blogsList.slice(0, 3).forEach((blog) => {
      console.log(`  - ${blog.title}`)
    })
    if (blogsList.length > 3) {
      console.log(`  ... and ${blogsList.length - 3} more`)
    }
  })

  // Get counts using the same aggregation as the API
  console.log('\n=== Aggregation Query Results ===')
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

  categoryCounts.forEach((item) => {
    console.log(`${item._id}: ${item.count}`)
  })

  process.exit(0)
}

checkCategories().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
