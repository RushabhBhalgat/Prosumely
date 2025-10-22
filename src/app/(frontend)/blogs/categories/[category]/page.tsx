import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Helper function to ensure Cloudinary URLs use HTTPS
const ensureHttpsUrl = (url: string): string => {
  if (!url) return url
  if (url.startsWith('http://res.cloudinary.com')) {
    return url.replace('http://', 'https://')
  }
  return url
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

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Check if category is valid
  if (!CATEGORY_MAP[category]) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  // Use MongoDB directly to query n8n-blogs
  const db = payload.db.connection.db
  if (!db) {
    throw new Error('Database connection not available')
  }

  const n8nBlogsCollection = db.collection('n8n-blogs')

  const categoryFullName = CATEGORY_MAP[category]

  // Get published blogs for this category
  // Search for both slug and full name to handle legacy data
  const blogs = await n8nBlogsCollection
    .find({
      status: 'published',
      $or: [{ category: category }, { category: categoryFullName }],
    })
    .sort({ createdAt: -1 })
    .toArray()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mb-16">
        <nav className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Blogs
          </Link>
        </nav>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {CATEGORY_MAP[category]}
          </h1>
          <p className="text-lg text-gray-600">
            {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} in this category
          </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="container">
          <div className="text-center py-16 px-4 bg-gray-50 border border-gray-200 rounded-xl max-w-2xl mx-auto">
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
            <p className="text-gray-600 text-lg font-medium">
              No articles found in this category yet
            </p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new content</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any) => (
              <article
                key={blog._id.toString()}
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
                          .map((keyword: string, index: number) => (
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
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const { category } = params
  const categoryName = CATEGORY_MAP[category] || 'Blog Category'

  return {
    title: `${categoryName} | Prosumely Career Blogs`,
    description: `Browse articles about ${categoryName.toLowerCase()} on Prosumely`,
  }
}
