import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const metadata = {
  title: 'Newsroom | Interview Insights & Thought Leadership by Prosumely',
  description:
    'Explore expert interview tips, career advice, and thought leadership articles from Prosumely. Stay ahead in your job search with actionable insights and inspiring stories.',
  keywords: [
    'interview tips',
    'career advice',
    'thought leadership',
    'resume writing',
    'job search',
    'career growth',
    'prosumely newsroom',
    'professional development',
  ],
  openGraph: {
    title: 'Newsroom | Interview Insights & Thought Leadership by Prosumely',
    description:
      'Explore expert interview tips, career advice, and thought leadership articles from Prosumely. Stay ahead in your job search with actionable insights and inspiring stories.',
    url: 'https://prosumely.com/newsroom',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Prosumely Newsroom Hero',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsroom | Interview Insights & Thought Leadership by Prosumely',
    description:
      'Explore expert interview tips, career advice, and thought leadership articles from Prosumely. Stay ahead in your job search with actionable insights and inspiring stories.',
  },
}
const newsroomBlogs = [
  {
    id: 1,
    slug: 'strategic-resume-vp-career-growth',
    title: 'From Manager to VP: Strategic Resume Transformation for Career Growth',
    excerpt:
      'Discover how a mid-level manager leveraged a strategic resume rewrite to land VP interviews and transform her career trajectory. Learn the power of metrics, storytelling, and professional branding.',
    category: 'Interview Blogs',
    readTime: '7 min read',
    image: '/newsroom-images/vp-career-growth.jpg',
    author: 'Aarti Mehta',
    date: 'July 2025',
  },
  {
    id: 2,
    slug: 'breaking-into-tech-product-management',
    title: 'Breaking into Tech: A Non-Tech Professional’s Journey to Product Management',
    excerpt:
      'Read how a retail operations expert pivoted to tech product management with a resume makeover focused on transferable skills, storytelling, and career transition strategy.',
    category: 'Interview Blogs',
    readTime: '6 min read',
    image: '/newsroom-images/tech-product-management.jpg',
    author: 'Rohit Khurana',
    date: 'July 2025',
  },
  {
    id: 3,
    slug: 'career-comeback-after-break',
    title: 'Career Comeback: Returning to Work After a Break with Confidence',
    excerpt:
      'Explore the inspiring journey of a professional who re-entered the workforce after a career break, using resume strategy and personal storytelling to rebuild confidence and credibility.',
    category: 'Interview Blogs',
    readTime: '7 min read',
    image: '/newsroom-images/career-comeback.jpg',
    author: 'Nisha Kapoor',
    date: 'July 2025',
  },
  {
    id: 4,
    slug: 'why-resume-not-getting-interviews',
    title: 'Why Your Resume Isn’t Getting Interviews – And How to Fix It',
    excerpt:
      'Uncover the common reasons resumes fail to get noticed and learn actionable strategies to optimize your resume for today’s competitive job market.',
    category: 'Thought Leadership',
    readTime: '5 min read',
    image: '/newsroom-images/resume-review.jpg',
    author: 'Prosumely Team',
    date: 'July 2025',
  },
  {
    id: 5,
    slug: 'future-job-search-personal-branding',
    title: 'The Future of Job Search: Personal Branding Beyond the Resume',
    excerpt:
      'Learn why personal branding is now essential for job seekers and how to build a cohesive professional identity across your resume, LinkedIn, and online presence.',
    category: 'Thought Leadership',
    readTime: '6 min read',
    image: '/newsroom-images/personal-branding.jpg',
    author: 'Prosumely Team',
    date: 'July 2025',
  },
  {
    id: 6,
    slug: 'mid-career-reinvention-resume',
    title: 'Mid-Career Reinvention: Using Your Resume as a Tool for Clarity',
    excerpt:
      'Find out how mid-career professionals can use resume strategy to reposition themselves, highlight transferable skills, and regain career momentum.',
    category: 'Thought Leadership',
    readTime: '6 min read',
    image: '/newsroom-images/mid-career-reinvention.jpg',
    author: 'Prosumely Team',
    date: 'July 2025',
  },
  {
    id: 7,
    slug: 'ats-optimization-resume-tips',
    title: 'ATS Optimization: The Secret to Getting Your Resume Seen',
    excerpt:
      'Discover how Applicant Tracking Systems (ATS) work and how to optimize your resume for both machines and humans to maximize interview opportunities.',
    category: 'Thought Leadership',
    readTime: '5 min read',
    image: '/newsroom-images/ats-optimization.jpg',
    author: 'Prosumely Team',
    date: 'July 2025',
  },
  {
    id: 8,
    slug: 'resume-rejection-to-success',
    title: 'From Rejection to Results: How a Great Resume Changes Everything',
    excerpt:
      'See how a professionally crafted resume can turn job search rejection into interview success, with real stories and proven strategies from Prosumely experts.',
    category: 'Thought Leadership',
    readTime: '5 min read',
    image: '/newsroom-images/resume-success.jpg',
    author: 'Prosumely Team',
    date: 'July 2025',
  },
]

// Extract unique categories from newsroomBlogs
const categories = Array.from(new Set(newsroomBlogs.map((blog) => blog.category)))

export default function NewsroomPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-5 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
              Newsroom & Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
              Interview Insights &
              <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Thought Leadership
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Actionable advice, inspiring stories, and expert tips for ambitious professionals.
              Stay ahead in your job search with Prosumely.
            </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Interview Blogs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Thought Leadership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">90%</div>
                <div className="text-sm text-gray-600">Career Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2 Weeks</div>
                <div className="text-sm text-gray-600">Avg. Time to Interview</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 text-sm font-medium rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsroomBlogs.map((blog) => (
              <Link key={blog.id} href={`/newsroom/${blog.slug}`}>
                <article className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-600">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-xs">
                            {blog.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">{blog.author}</div>
                          <div className="text-xs">{blog.date}</div>
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">{blog.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Career?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who transformed their careers with Prosumely’s expert
            resume writing and career services.
          </p>
          <Link href="/services" className="inline-block">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
