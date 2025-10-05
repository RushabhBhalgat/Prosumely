'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

// Helper function to ensure Cloudinary URLs use HTTPS
const ensureHttpsUrl = (url: string): string => {
  if (!url) return url
  if (url.startsWith('http://res.cloudinary.com')) {
    return url.replace('http://', 'https://')
  }
  return url
}

// Helper function to clean HTML content and remove dark theme styling
const cleanHtmlContent = (html: string): string => {
  if (!html) return html

  // Remove embedded style tags completely
  let cleanedHtml = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')

  // Remove or replace problematic inline styles
  cleanedHtml = cleanedHtml
    .replace(/style="[^"]*background:#000000[^"]*"/g, '') // Remove dark background
    .replace(/style="[^"]*color:#ffffff[^"]*"/g, '') // Remove white text
    .replace(/style="[^"]*color:\s*#ffffff[^"]*"/g, '') // Remove white text with spaces
    .replace(/background:#000000/g, 'background:transparent') // Replace any remaining dark backgrounds
    .replace(/color:#ffffff/g, 'color:inherit') // Replace white text with inherited color
    .replace(/color:\s*#ffffff/g, 'color:inherit') // Replace white text with spaces
    .replace(/padding:24px/g, 'padding:0') // Remove extra padding from container
    .replace(/margin:36px auto/g, 'margin:0') // Remove auto margins
    .replace(/max-width:900px/g, 'max-width:100%') // Make responsive
    // Keep the blue accent color for headings and links but make it more suitable
    .replace(/color:#00c2ff/g, 'color:#0ea5e9')
    .replace(/color:\s*#00c2ff/g, 'color:#0ea5e9')
    // Remove any remaining white color references
    .replace(/#ffffff/g, 'inherit')
    .replace(/white/g, 'inherit')

  return cleanedHtml
}

interface N8NBlog {
  _id: string
  title: string
  slug: string
  content: string
  metaDescription?: string
  featuredImage?: string
  keywords?: string
  meta_title?: string
  meta_description?: string
  status: string
  datePublished?: string
  createdAt: string
  author: string
}

interface Props {
  slug: string
}

export default function N8NBlogContent({ slug }: Props) {
  const [blog, setBlog] = useState<N8NBlog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/n8n-blogs/${slug}`)

        if (response.status === 404) {
          notFound()
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }

        const data = await response.json()
        setBlog(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
        <p className="text-gray-600">
          {error || 'The blog post you are looking for does not exist.'}
        </p>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src={ensureHttpsUrl(blog.featuredImage)}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="p-4 sm:p-8 lg:p-12 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {blog.author}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={blog.datePublished || blog.createdAt}>
                {formatDate(blog.datePublished || blog.createdAt)}
              </time>
            </span>
          </div>
          {blog.keywords && (
            <div className="flex flex-wrap gap-2">
              {blog.keywords
                .split(',')
                .slice(0, 3)
                .map((keyword, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {keyword.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>
        {(blog.metaDescription || blog.meta_description) && (
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed bg-white/50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500">
            {blog.metaDescription || blog.meta_description}
          </p>
        )}
      </header>

      {/* Article Content */}
      <div className="p-4 sm:p-8 lg:p-12">
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-800 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-gray-700 prose-hr:border-gray-300 n8n-blog-content"
          dangerouslySetInnerHTML={{
            __html: cleanHtmlContent(blog.content), // Clean the content before rendering
          }}
        />
        <style jsx global>{`
          /* Override inline styles from n8n content */
          .n8n-blog-content,
          .n8n-blog-content * {
            color: #374151 !important;
          }

          .n8n-blog-content div[style*='background:#000000'],
          .n8n-blog-content div[style*='background: #000000'] {
            background: transparent !important;
          }

          .n8n-blog-content *[style*='color:#ffffff'],
          .n8n-blog-content *[style*='color: #ffffff'] {
            color: #374151 !important;
          }

          .n8n-blog-content h1,
          .n8n-blog-content h2,
          .n8n-blog-content h3,
          .n8n-blog-content h4,
          .n8n-blog-content h5,
          .n8n-blog-content h6 {
            color: #111827 !important;
          }

          .n8n-blog-content a {
            color: #0ea5e9 !important;
            text-decoration: underline;
          }

          .n8n-blog-content a:hover {
            color: #0284c7 !important;
          }

          .n8n-blog-content p,
          .n8n-blog-content li,
          .n8n-blog-content blockquote,
          .n8n-blog-content small,
          .n8n-blog-content code,
          .n8n-blog-content pre,
          .n8n-blog-content figcaption {
            color: #374151 !important;
          }

          .n8n-blog-content strong {
            color: #111827 !important;
            font-weight: 700;
          }

          .n8n-blog-content em {
            color: #374151 !important;
            font-style: italic;
          }

          .n8n-blog-content ul,
          .n8n-blog-content ol {
            color: #374151 !important;
          }

          .n8n-blog-content blockquote {
            border-left: 4px solid #0ea5e9;
            padding-left: 14px;
            margin: 18px 0;
            font-style: italic;
            background: #f8fafc;
            padding: 12px 18px;
            border-radius: 8px;
          }

          /* Remove problematic container styling */
          .n8n-blog-content > div:first-child {
            background: transparent !important;
            color: inherit !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            font-family: inherit !important;
          }

          /* Responsive heading sizes for mobile */
          @media (max-width: 640px) {
            .n8n-blog-content h1 {
              font-size: 1.5rem !important;
              line-height: 1.4 !important;
            }
            .n8n-blog-content h2 {
              font-size: 1.25rem !important;
              line-height: 1.4 !important;
            }
            .n8n-blog-content h3 {
              font-size: 1.125rem !important;
              line-height: 1.4 !important;
            }
            .n8n-blog-content p,
            .n8n-blog-content li {
              font-size: 0.9rem !important;
              line-height: 1.6 !important;
            }
          }
        `}</style>
      </div>
    </article>
  )
}
