import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Helper function to ensure Cloudinary URLs use HTTPS
const ensureHttpsUrl = (url: string): string => {
  if (!url) return url
  if (url.startsWith('http://res.cloudinary.com')) {
    return url.replace('http://', 'https://')
  }
  return url
}

interface N8NBlog {
  _id: string
  title: string
  slug: string
  metaDescription?: string
  meta_description?: string
  featuredImage?: string
  keywords?: string
  datePublished?: string
  createdAt: string
  author: string
  category?: string
}

const CATEGORY_MAP: { [key: string]: string } = {
  'resume-by-country': 'Resume by Country / Region',
  'resume-by-job-profile': 'Resume by Job Profile / Industry / Level',
  'resume-cv-tips': 'Resume and CV Tips / Best Practices',
  'linkedin-tips': 'LinkedIn Profile Tips',
  'project-portfolio': 'Project Portfolio / Work Samples',
  'leadership-executive': 'Leadership / Executive Role Resumes',
  'career-transition': 'Career Transition / Special Situations',
  'personal-branding': 'Personal Branding & Online Presence',
  'job-search-trends': 'Job Search & Hiring Trends',
}

// Helper function to get category display name
const getCategoryDisplayName = (category: string): string => {
  if (CATEGORY_MAP[category]) {
    return CATEGORY_MAP[category]
  }
  return category
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function N8NBlogsListServer() {
  let blogs: N8NBlog[] = []
  let error: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const db = payload.db.connection.db

    if (!db) {
      throw new Error('Database connection not available')
    }

    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Fetch published blogs sorted by sortDate descending
    const blogDocs = await n8nBlogsCollection
      .find({ status: 'published' })
      .sort({ sortDate: -1 })
      .limit(9)
      .toArray()

    blogs = blogDocs as unknown as N8NBlog[]
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred'
    console.error('Error fetching N8N blogs server-side:', error)
  }

  if (error) {
    return (
      <div className="container mt-20">
        <div className="text-center py-12 px-4 bg-red-50 border border-red-200 rounded-xl">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800 font-semibold">Error loading articles</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="container mt-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
          <p className="text-gray-600 text-base">
            Stay updated with expert insights and industry trends
          </p>
        </div>
        <div className="text-center py-16 px-4 bg-gray-50 border border-gray-200 rounded-xl">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600 text-lg font-medium">No articles available yet</p>
          <p className="text-gray-500 text-sm mt-2">Check back soon for new content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-20">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
        <p className="text-gray-600 text-base">
          Stay updated with expert insights and industry trends
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-gray-300 transition-all duration-300 bg-white"
          >
            <Link href={`/blogs/${blog.slug}`} className="block">
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={ensureHttpsUrl(blog.featuredImage)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {blog.title}
                </h3>

                {/* Category Badge */}
                {blog.category && (
                  <div className="mb-3">
                    <span className="inline-block bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                      {getCategoryDisplayName(blog.category)}
                    </span>
                  </div>
                )}

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                  {blog.metaDescription ||
                    blog.meta_description ||
                    `${blog.title.slice(0, 120)}...`}
                </p>

                {/* Keywords */}
                {blog.keywords && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.keywords
                      .split(',')
                      .slice(0, 3)
                      .map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-100"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span className="font-medium text-gray-700">{blog.author}</span>
                  <span className="text-xs">
                    {formatDate(blog.datePublished || blog.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Note: Load more functionality would need to be implemented as a separate client component 
          or use pagination with server-side rendering */}
    </div>
  )
}
