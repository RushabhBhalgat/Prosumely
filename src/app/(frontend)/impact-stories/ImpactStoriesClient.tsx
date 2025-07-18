'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  TrendingUp,
  Globe,
  Star,
  ArrowRight,
  User,
  Calendar,
  MapPin,
  Award,
  Heart,
  Target,
  Briefcase,
  CheckCircle,
} from 'lucide-react'

const impactStories = [
  {
    id: 1,
    title: 'From Local Job Hunt to UAE Dream Role',
    excerpt:
      "How a tailored resume and LinkedIn optimization helped secure a dream position in Dubai's competitive market.",
    author: 'Sarah Johnson',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Career Transition',
    location: 'UAE',
    successMetric: '300% salary increase',
    image: '/media/resume review.png',
    slug: 'from-local-job-hunt-to-uae-dream-role',
  },
  {
    id: 2,
    title: 'Career Pivot Success in Tech Industry',
    excerpt:
      'A complete career transformation from marketing to software engineering with strategic resume positioning.',
    author: 'Michael Chen',
    date: '2024-03-10',
    readTime: '6 min read',
    category: 'Tech Transition',
    location: 'USA',
    successMetric: 'Tech role secured',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'career-pivot-success-in-tech-industry',
  },
  {
    id: 3,
    title: 'Executive Leadership Role Achievement',
    excerpt: 'Strategic executive resume writing led to C-suite position in Fortune 500 company.',
    author: 'Jennifer Williams',
    date: '2024-03-08',
    readTime: '7 min read',
    category: 'Executive',
    location: 'USA',
    successMetric: 'C-suite position',
    image: '/media/resume review.png',
    slug: 'executive-leadership-role-achievement',
  },
  {
    id: 4,
    title: 'International Student to Dream Job',
    excerpt:
      'How proper resume formatting and ATS optimization helped land the first professional role.',
    author: 'Raj Patel',
    date: '2024-03-05',
    readTime: '4 min read',
    category: 'Entry Level',
    location: 'India',
    successMetric: 'First job secured',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'International-Student-to-Dream-Job',
  },
  {
    id: 5,
    title: 'Senior Manager Promotion Success',
    excerpt: 'Professional resume revamp led to senior management position within 6 months.',
    author: 'Ahmed Al-Rashid',
    date: '2024-03-01',
    readTime: '5 min read',
    category: 'Promotion',
    location: 'KSA',
    successMetric: 'Senior role achieved',
    image: '/media/resume review.png',
    slug: 'Senior-Manager-Promotion-Success',
  },
  {
    id: 6,
    title: 'Healthcare Professional Advancement',
    excerpt:
      'Specialized healthcare resume writing opened doors to leadership positions in medical field.',
    author: 'Dr. Lisa Thompson',
    date: '2024-02-28',
    readTime: '6 min read',
    category: 'Healthcare',
    location: 'USA',
    successMetric: 'Department head role',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'Healthcare-Professional-Advancement',
  },
  {
    id: 7,
    title: 'Finance Sector Career Growth',
    excerpt:
      'Strategic resume positioning helped transition from analyst to finance director role.',
    author: 'David Kumar',
    date: '2024-02-25',
    readTime: '5 min read',
    category: 'Finance',
    location: 'UAE',
    successMetric: 'Director position',
    image: '/media/resume review.png',
    slug: 'Finance-Sector-Career-Growth',
  },
  {
    id: 8,
    title: 'Marketing Professional Remote Success',
    excerpt:
      'How LinkedIn optimization and resume enhancement secured a remote marketing leadership role.',
    author: 'Emily Rodriguez',
    date: '2024-02-22',
    readTime: '4 min read',
    category: 'Remote Work',
    location: 'USA',
    successMetric: 'Remote leadership role',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'Marketing-Professional-Remote-Success',
  },
  {
    id: 9,
    title: 'Engineering Career Breakthrough',
    excerpt:
      'Technical resume optimization led to senior engineering position at leading tech company.',
    author: 'Alex Thompson',
    date: '2024-02-20',
    readTime: '6 min read',
    category: 'Engineering',
    location: 'USA',
    successMetric: 'Senior engineer role',
    image: '/media/resume review.png',
    slug: 'Engineering-Career-Breakthrough',
  },
  {
    id: 10,
    title: 'Consulting Industry Entry Success',
    excerpt: 'Strategic resume and cover letter writing opened doors to top-tier consulting firm.',
    author: 'Priya Sharma',
    date: '2024-02-18',
    readTime: '5 min read',
    category: 'Consulting',
    location: 'India',
    successMetric: 'Top-tier firm offer',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'Consulting-Industry-Entry-Success',
  },
  {
    id: 11,
    title: 'Sales Leadership Transformation',
    excerpt: 'Sales professional resume enhancement led to regional sales director position.',
    author: 'Mark Johnson',
    date: '2024-02-15',
    readTime: '4 min read',
    category: 'Sales',
    location: 'UAE',
    successMetric: 'Regional director role',
    image: '/media/resume review.png',
    slug: 'Sales-Leadership-Transformation',
  },
  {
    id: 12,
    title: 'Academic to Industry Transition',
    excerpt:
      'Successfully transitioned from academic research to industry leadership with strategic positioning.',
    author: 'Dr. Robert Chen',
    date: '2024-02-12',
    readTime: '7 min read',
    category: 'Academic Transition',
    location: 'USA',
    successMetric: 'R&D director role',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'Academic-to-Industry-Transition',
  },
  {
    id: 13,
    title: 'Startup Success Story',
    excerpt:
      'How resume and LinkedIn optimization helped secure key position at fast-growing startup.',
    author: 'Sofia Martinez',
    date: '2024-02-10',
    readTime: '5 min read',
    category: 'Startup',
    location: 'USA',
    successMetric: 'VP role at startup',
    image: '/media/resume review.png',
    slug: 'Startup-Success-Story',
  },
  {
    id: 14,
    title: 'Mid-Career Professional Growth',
    excerpt:
      'Mid-career professional achieved significant role advancement with strategic resume enhancement.',
    author: 'James Wilson',
    date: '2024-02-08',
    readTime: '6 min read',
    category: 'Mid-Career',
    location: 'KSA',
    successMetric: 'Senior manager role',
    image: '/media/How to Make a Resume in 2025.png',
    slug: 'Mid-Career-Professional-Growth',
  },
]

const categories = [
  'All Stories',
  'Career Transition',
  'Tech Transition',
  'Executive',
  'Entry Level',
  'Promotion',
  'Healthcare',
  'Finance',
  'Remote Work',
  'Engineering',
  'Consulting',
  'Sales',
  'Academic Transition',
  'Startup',
  'Mid-Career',
]

export default function ImpactStoriesClient() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStories = impactStories.filter((story) => {
    const matchesCategory =
      selectedCategory === 'All Stories' || story.category === selectedCategory
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-blue-100 text-sm font-medium">Real Success Stories</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Impact{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Stories
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how professionals worldwide transformed their careers with our expert
              services. Real stories, real results, real impact on professional lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-6 text-blue-200">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">1000+ Success Stories</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-1" />
                  <span className="font-semibold">50+ Countries</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-1" />
                  <span className="font-semibold">98% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Careers Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600 font-medium">Salary Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">30 Days</div>
              <div className="text-gray-600 font-medium">Average Job Search</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search stories by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              href={`/impact-stories/${story.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="p-6">
                {/* Category and Location */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {story.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="ml-1">{story.location}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed">{story.excerpt}</p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                  <span>{story.readTime}</span>
                </div>

                {/* Author and Success Metric */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="ml-2 font-medium text-gray-700 text-sm">{story.author}</span>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">{story.successMetric}</div>
                </div>

                {/* Read More */}
                <div className="mt-4 flex items-center text-blue-600 font-semibold">
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who have transformed their careers with our expert
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
