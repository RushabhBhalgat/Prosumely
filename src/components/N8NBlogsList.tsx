'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  // If it's a slug, convert to full name
  if (CATEGORY_MAP[category]) {
    return CATEGORY_MAP[category]
  }
  // If it's already a full name, return it
  return category
}

interface N8NBlogsResponse {
  docs: N8NBlog[]
  totalDocs: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function N8NBlogsList() {
  const [blogs, setBlogs] = useState<N8NBlog[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBlogs = async (pageNum: number, append = false) => {
    setLoading(true)
    setError(null)

    try {
      console.log('Loading N8N blogs from API...', { pageNum, append })
      const response = await fetch(`/api/n8n-blogs?page=${pageNum}&limit=9`)
      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }

      const data: N8NBlogsResponse = await response.json()
      console.log('N8N blogs API response:', data)

      if (append) {
        setBlogs((prev) => [...prev, ...data.docs])
      } else {
        setBlogs(data.docs)
      }

      setHasMore(data.hasNextPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs(1)
  }, [])

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadBlogs(nextPage, true)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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

  if (blogs.length === 0 && !loading) {
    console.log('No N8N blogs found or none are published')
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

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-base font-semibold rounded-lg text-blue-600 bg-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading More...
              </>
            ) : (
              <>
                Load More Articles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
