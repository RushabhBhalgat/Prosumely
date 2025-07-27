import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

// --- SEO Metadata ---
export const metadata = {
  title: 'Impact Stories | Real Success Stories from Prosumely Clients',
  description:
    'Read inspiring career transformation stories from Prosumely clients who landed their dream jobs with our professional resume writing services. Real results, real success stories.',
  keywords: [
    'impact stories',
    'success stories',
    'career transformation',
    'resume writing success',
    'job search success',
    'client testimonials',
    'prosumely success',
    'career change stories',
  ],
  openGraph: {
    title: 'Impact Stories | Real Success Stories from Prosumely Clients',
    description:
      'Read inspiring career transformation stories from Prosumely clients who landed their dream jobs with our professional resume writing services. Real results, real success stories.',
    url: 'https://www.prosumely.com/impact-stories',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Impact Stories and Success Stories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Stories | Real Success Stories from Prosumely Clients',
    description:
      'Read inspiring career transformation stories from Prosumely clients who landed their dream jobs with our professional resume writing services. Real results, real success stories.',
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/impact-stories',
  },
}
// --- End SEO Metadata ---

const impactStories = [
  {
    id: 1,
    title: 'Building a Future: UAE Construction Breakthrough',
    excerpt:
      'How a Resume Overhaul Helped a Mid-Level Professional Break into the UAE Construction Sector with significant career advancement.',
    category: 'Construction Industry',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&crop=center',
    slug: 'building-a-future',
    author: 'Ahmed M.',
    date: 'December 15, 2024',
  },
  {
    id: 2,
    title: 'From Cairo to Career Growth',
    excerpt:
      "Fatima's inspiring journey from Egypt to landing her dream role as a senior data analyst in a multinational corporation.",
    category: 'International Career',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
    slug: 'from-cairo-to-career-growth',
    author: 'Fatima A.',
    date: 'December 10, 2024',
  },
  {
    id: 3,
    title:
      'From Delay to Dream Interview: How a Qatar Project Manager Landed a Career Breakthrough with Prosumely',
    excerpt:
      'A senior project manager in Qatar transformed missed opportunities into career success with a strategically rewritten resume that landed multiple interviews.',
    category: 'Project Management',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center',
    slug: 'from-delay-to-dream-interview',
    author: 'Rashid K.',
    date: 'December 8, 2024',
  },
  {
    id: 4,
    title:
      "From Generic to Global: How a Resume Revamp Opened Doors in Saudi Arabia's Oil & Gas Sector",
    excerpt:
      "An experienced engineer overcame career stagnation and landed a senior role in Saudi Arabia's competitive oil & gas industry through strategic resume optimization.",
    category: 'Oil & Gas',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop&crop=center',
    slug: 'from-generic-to-global',
    author: 'Omar S.',
    date: 'December 5, 2024',
  },
  {
    id: 5,
    title:
      'From Overlooked to Interviewed: How a UK Finance Resume Got Executive-Ready and Delivered Results',
    excerpt:
      'A seasoned finance leader in the UK transformed 12 years of experience into interview-winning results with professional resume rewriting services.',
    category: 'UK Finance',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop&crop=center',
    slug: 'from-overlooked-to-interviewed',
    author: 'James R.',
    date: 'December 3, 2024',
  },
  {
    id: 6,
    title: 'From Singaporean Hustle to Dream Role: A Resume Rewrite That Changed Everything',
    excerpt:
      "A technology professional in Singapore's competitive market transformed years of rejections into career success with strategic resume optimization.",
    category: 'Singapore Technology',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=center',
    slug: 'from-singaporean-hustle-to-dream-role',
    author: 'Deepak L.',
    date: 'December 1, 2024',
  },
  {
    id: 7,
    title: 'From Local Job Hunt to UAE Dream Role: A Resume Rewrite That Opened New Doors',
    excerpt:
      'An Indian professional with domestic success transformed his career prospects by localizing his resume for the UAE job market.',
    category: 'Global Career Moves',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&crop=center',
    slug: 'from-local-job-hunt-to-uae-dream-role',
    author: 'Arjun P.',
    date: 'November 28, 2024',
  },
  {
    id: 8,
    title:
      'From Dubai Silence to Shortlist Success: How a UAE Resume Makeover Delivered Interview Calls in Just a Week',
    excerpt:
      'A project management professional based in Dubai transformed daily applications with no response into interview calls within a week.',
    category: 'UAE Careers',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&h=400&fit=crop&crop=center',
    slug: 'from-dubai-silence-to-shortlist-success',
    author: 'Rakesh M.',
    date: 'November 25, 2024',
  },
  {
    id: 9,
    title:
      "Breaking Through Barriers: How One Resume Helped Land Opportunities in Toronto's Tough Job Market",
    excerpt:
      'A skilled professional aiming to transition into corporate roles in Toronto broke through the competitive Canadian job market with expert resume help.',
    category: 'Canada Careers',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&h=400&fit=crop&crop=center',
    slug: 'breaking-through-barriers',
    author: 'Aman S.',
    date: 'November 22, 2024',
  },
]

const categories = [
  'All Stories',
  'Construction Industry',
  'International Career',
  'Project Management',
  'Oil & Gas',
  'UK Finance',
  'Singapore Technology',
  'Global Career Moves',
  'UAE Careers',
  'Canada Careers',
]

export default function ImpactStoriesPage() {
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
              Real Success Stories
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
              Career Transformations
              <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                That Inspire
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how professionals from all backgrounds transformed their careers with
              Prosumely's expert resume writing and career services
            </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Got Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50%</div>
                <div className="text-sm text-gray-600">Salary Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2 Weeks</div>
                <div className="text-sm text-gray-600">Average Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
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

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStories.map((story) => (
              <Link key={story.id} href={`/impact-stories/${story.slug}`}>
                <article className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-600">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-xs">
                            {story.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">{story.author}</div>
                          <div className="text-xs">{story.date}</div>
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">{story.readTime}</span>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join these professionals and thousands of others who transformed their careers with
            Prosumely's expert services.
          </p>
          <Link href="/services" className="inline-block">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Your Transformation
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
