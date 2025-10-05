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
      const response = await fetch(`/api/n8n-blogs?page=${pageNum}&limit=10`)
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
    return <div className="text-red-600 text-center py-8">Error loading N8N blogs: {error}</div>
  }

  if (blogs.length === 0 && !loading) {
    console.log('No N8N blogs found or none are published')
    return (
      <div className="container mt-16">
        <div className="prose max-w-none mb-8">
          <h2 className="text-gray-900">Latest Industry Insights</h2>
          <p className="text-gray-700">No published insights available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-16">
      <div className="prose max-w-none mb-8">
        <h2 className="text-gray-900">Latest Industry Insights</h2>
        <p className="text-gray-700">
          Expert insights and industry trends from our automation workflow
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            <Link href={`/blogs/${blog.slug}`} className="block">
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={ensureHttpsUrl(blog.featuredImage)}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
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
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">{blog.author}</span>
                  <span>{formatDate(blog.datePublished || blog.createdAt)}</span>
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
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
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
                Loading...
              </>
            ) : (
              'Load More Articles'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
