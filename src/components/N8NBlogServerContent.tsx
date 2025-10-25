import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

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
  blog: N8NBlog
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function N8NBlogServerContent({ blog }: Props) {
  // Pre-process HTML on the server
  const cleanedContent = cleanHtmlContent(blog.content)

  return (
    <>
      {/* Blog Content with Sticky Sidebar */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="flex gap-8">
          {/* Main Article Content */}
          <article className="flex-1 max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
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
              <style
                dangerouslySetInnerHTML={{
                  __html: `
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
                `,
                }}
              />
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-800 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-gray-700 prose-hr:border-gray-300 n8n-blog-content"
                dangerouslySetInnerHTML={{
                  __html: cleanedContent,
                }}
              />
            </div>
          </article>

          {/* Sticky CTA Sidebar - Only visible on large screens */}
          <aside className="hidden lg:block lg:w-[320px] flex-shrink-0">
            <div className="sticky top-24">
              <Link href="/services" className="block transition-transform hover:scale-105">
                <img
                  src="/Blogs_CTA_Prosumely.png"
                  alt="Prosumely Services CTA"
                  width={320}
                  height={736}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Prosumely Services Section - Full Width */}
      <div className="w-full bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="border-t-2 border-gray-200 pt-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Elevate Your Career with <span className="text-blue-600">Prosumely</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform your career journey with our expert professional services. Whether you're
                starting fresh or advancing to the next level, we've got you covered.
              </p>
            </div>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {/* Service 1: Free Resume Review */}
              <Link
                href="/free-resume-review"
                className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  FREE
                </div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Free Resume Review
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Get expert feedback on your resume at no cost. Discover what's working and what
                  needs improvement.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Get Started
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>

              {/* Service 2: Jobseeker's CV Combo */}
              <Link
                href="/services/jobseeker-cv-combo"
                className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 sm:p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  POPULAR
                </div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Jobseeker's CV Combo
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Complete career package: Executive CV, Cover Letter, LinkedIn Profile & Career
                  Roadmap.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">$130</span>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Service 3: Jobseeker's Personal Website */}
              <Link
                href="/services/jobseeker-personal-website"
                className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Jobseeker's Personal Website
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Stand out with a professional personal website that showcases your portfolio and
                  achievements.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">$300</span>
                  <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Service 4: CV + Personal Website Combo */}
              <Link
                href="/services/cv-personal-website-combo"
                className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  BEST VALUE
                </div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  CV + Personal Website Combo
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Ultimate package: Complete CV services + Professional personal website for maximum
                  impact.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">$400</span>
                  <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>{' '}
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've accelerated their careers with Prosumely's
                expert services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>View All Services</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/free-resume-review"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Start with Free Review</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
