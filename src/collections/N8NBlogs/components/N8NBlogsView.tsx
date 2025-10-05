'use client'

import React, { useEffect, useState } from 'react'

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
  status: string
  dateCreated: string
  datePublished: string | null
  author: string
  metaDescription?: string
  meta_description?: string
  featuredImage?: string
  keywords?: string
}

const N8NBlogsView: React.FC = () => {
  const [blogs, setBlogs] = useState<N8NBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/n8n-blogs', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch N8N blogs')
      }

      const data = await response.json()
      setBlogs(data.docs || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateBlogStatus = async (blogId: string, newStatus: string) => {
    try {
      console.log('Updating blog status:', { blogId, newStatus })

      const response = await fetch(`/api/admin/n8n-blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to update blog status')
      }

      // Refresh the list
      fetchBlogs()
    } catch (err) {
      console.error('Error updating blog status:', err)
      alert(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#1f2937',
          minHeight: '100vh',
        }}
      >
        <div style={{ color: '#f9fafb' }}>Loading N8N blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          color: '#fca5a5',
          backgroundColor: '#7f1d1d',
          borderRadius: '8px',
          margin: '20px',
          border: '1px solid #dc2626',
        }}
      >
        Error: {error}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#1f2937', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9fafb', marginBottom: '8px' }}>
          N8N Blogs
        </h1>
        <p style={{ color: '#d1d5db' }}>
          Manage blogs created by N8N automation workflow. You can change the status to publish or
          unpublish blogs.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#374151',
            borderRadius: '12px',
          }}
        >
          <p style={{ color: '#d1d5db', fontSize: '18px', marginBottom: '8px' }}>
            No N8N blogs found
          </p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Blogs will appear here when created by your N8N workflow
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                {/* Main Content */}
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#f9fafb',
                      marginBottom: '12px',
                      lineHeight: '1.3',
                    }}
                  >
                    {blog.title}
                  </h3>

                  {(blog.metaDescription || blog.meta_description) && (
                    <p
                      style={{
                        color: '#d1d5db',
                        marginBottom: '16px',
                        lineHeight: '1.5',
                        fontSize: '16px',
                      }}
                    >
                      {blog.metaDescription || blog.meta_description}
                    </p>
                  )}

                  {/* Keywords display */}
                  {blog.keywords && (
                    <div style={{ marginBottom: '16px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#9ca3af',
                          fontWeight: '500',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Keywords:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {blog.keywords
                          .split(',')
                          .slice(0, 5)
                          .map((keyword, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#1e3a8a',
                                color: '#60a5fa',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500',
                              }}
                            >
                              {keyword.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Image display */}
                  {blog.featuredImage && (
                    <div style={{ marginBottom: '16px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#9ca3af',
                          fontWeight: '500',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Featured Image:
                      </span>
                      <img
                        src={ensureHttpsUrl(blog.featuredImage)}
                        alt={blog.title}
                        style={{
                          width: '100%',
                          maxWidth: '200px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #4b5563',
                        }}
                      />
                    </div>
                  )}

                  <a
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#60a5fa',
                      backgroundColor: '#1e3a8a',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e40af'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e3a8a'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    🔗 /blogs/{blog.slug}
                  </a>
                </div>

                {/* Status and Actions */}
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        borderRadius: '20px',
                        backgroundColor: blog.status === 'published' ? '#d1fae5' : '#fef3c7',
                        color: blog.status === 'published' ? '#065f46' : '#92400e',
                        border: `1px solid ${blog.status === 'published' ? '#a7f3d0' : '#fde68a'}`,
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          marginRight: '8px',
                          backgroundColor: blog.status === 'published' ? '#10b981' : '#f59e0b',
                        }}
                      ></span>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <select
                    value={blog.status}
                    onChange={(e) => updateBlogStatus(blog._id, e.target.value)}
                    style={{
                      width: '140px',
                      border: '1px solid #6b7280',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '14px',
                      backgroundColor: '#4b5563',
                      color: '#f9fafb',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="draft">Save as Draft</option>
                    <option value="published">Publish Now</option>
                  </select>
                </div>
              </div>

              {/* Bottom Meta Information */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid #6b7280',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#d1d5db',
                }}
              >
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    👤{' '}
                    <span style={{ marginLeft: '8px', fontWeight: '500', color: '#f3f4f6' }}>
                      {blog.author}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    ⏰{' '}
                    <span style={{ marginLeft: '8px' }}>
                      Created {formatDate(blog.dateCreated)}
                    </span>
                  </div>
                  {blog.datePublished && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      ✅{' '}
                      <span style={{ marginLeft: '8px' }}>
                        Published {formatDate(blog.datePublished)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #6b7280',
          fontSize: '14px',
          color: '#d1d5db',
        }}
      >
        Total: <span style={{ fontWeight: '600', color: '#f3f4f6' }}>{blogs.length}</span> blog
        {blogs.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default N8NBlogsView
