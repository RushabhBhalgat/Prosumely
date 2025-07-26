'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import {
  Search,
  Download,
  BookOpen,
  FileText,
  Filter,
  Calendar,
  User,
  Star,
  Eye,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Award,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { PDFPreview } from '@/components/PDFPreview'
import { PDFThumbnail } from '@/components/PDFThumbnail'

interface Ebook {
  id: string
  title: string
  description: string
  fileName: string
  filePath: string
  category: string
  author: string
  publishDate: string
  downloadCount: number
  rating: number | string
  tags: string[]
  featured: boolean
}

const categories = [
  'All',
  'Interview Preparation',
  'BIM & Construction',
  'Engineering',
  'Healthcare',
  'Management',
  'Technology',
]

// Static ebooks data based on available PDFs
const staticEbooks: Ebook[] = [
  {
    id: '1',
    title: '50 Interview Questions for BIM Professionals',
    description:
      'Comprehensive guide with 50 essential interview questions for Building Information Modeling (BIM) professionals. Perfect for architects, engineers, and construction professionals.',
    fileName: '50-Interview-Questions-for-BIM-Professionals.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-BIM-Professionals.pdf',
    category: 'BIM & Construction',
    author: 'Prosumely Team',
    publishDate: '2024-12-15',
    downloadCount: 1450,
    rating: 4.9,
    tags: ['BIM', 'Construction', 'Architecture', 'Interview Prep'],
    featured: true,
  },
  {
    id: '2',
    title: '50 Interview Questions for Structural Engineers',
    description:
      'Essential interview questions and answers for structural engineering positions. Covers design principles, building codes, and technical expertise.',
    fileName: '50-Interview-Questions-for-Structural-Engineers.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Structural-Engineers.pdf',

    category: 'Engineering',
    author: 'Engineering Experts',
    publishDate: '2024-12-10',
    downloadCount: 1320,
    rating: 4.8,
    tags: ['Structural Engineering', 'Civil Engineering', 'Design', 'Interview'],
    featured: true,
  },
  {
    id: '3',
    title: '50 Interview Questions for Civil Engineers',
    description:
      'Complete interview preparation guide for civil engineering professionals. Includes project management, design, and construction-related questions.',
    fileName: '50-Interview-Questions-for-Civil-Engineer.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Civil-Engineer.pdf',

    category: 'Engineering',
    author: 'Civil Engineering Team',
    publishDate: '2024-12-05',
    downloadCount: 1680,
    rating: 4.7,
    tags: ['Civil Engineering', 'Infrastructure', 'Project Management', 'Construction'],
    featured: true,
  },
  {
    id: '4',
    title: '50 Interview Questions for Bullet Train Engineers',
    description:
      'Specialized interview guide for high-speed rail and bullet train engineering positions. Covers advanced transportation technology and safety protocols.',
    fileName: '50-Interview-Questions-for-Bullet-Train-Engineer.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Bullet-Train-Engineer.pdf',

    category: 'Engineering',
    author: 'Transportation Experts',
    publishDate: '2024-11-28',
    downloadCount: 890,
    rating: 4.8,
    tags: ['Transportation', 'High-Speed Rail', 'Engineering', 'Technology'],
    featured: false,
  },
  {
    id: '5',
    title: '50 Interview Questions for Healthcare Assistants',
    description:
      'Essential interview preparation for healthcare assistant positions. Covers patient care, medical procedures, and healthcare regulations.',
    fileName: '50-Interview-Questions-for-Healthcare-Assistants.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Healthcare-Assistants.pdf',

    category: 'Healthcare',
    author: 'Healthcare Professionals',
    publishDate: '2024-11-20',
    downloadCount: 2100,
    rating: 4.9,
    tags: ['Healthcare', 'Patient Care', 'Medical', 'Assistant'],
    featured: false,
  },
  {
    id: '6',
    title: '50 Interview Questions for Construction General Manager',
    description:
      'Leadership-focused interview guide for construction general manager roles. Covers project oversight, team management, and strategic planning.',
    fileName: '50-Interview-Questions-for-Construction-General-Manager.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Construction-General-Manager.pdf',

    category: 'Management',
    author: 'Construction Leadership',
    publishDate: '2024-11-15',
    downloadCount: 1150,
    rating: 4.6,
    tags: ['Management', 'Construction', 'Leadership', 'Project Management'],
    featured: false,
  },
  {
    id: '7',
    title: '50 Interview Questions for Construction Site Supervisor',
    description:
      'On-site leadership interview preparation for construction supervisors. Focuses on safety management, team coordination, and quality control.',
    fileName: '50-Interview-Questions-for-Construction-Site-Supervisor.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Construction-Site-Supervisor.pdf',

    category: 'Management',
    author: 'Site Management Team',
    publishDate: '2024-11-10',
    downloadCount: 1420,
    rating: 4.7,
    tags: ['Supervision', 'Construction', 'Safety', 'Quality Control'],
    featured: false,
  },
  {
    id: '8',
    title: '50 Interview Questions for Highway Project Engineer',
    description:
      'Specialized guide for highway and infrastructure project engineering interviews. Covers design, planning, and execution of major road projects.',
    fileName: '50-Interview-Questions-for-Highway-Project-Engineer.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Highway-Project-Engineer.pdf',

    category: 'Engineering',
    author: 'Infrastructure Team',
    publishDate: '2024-11-05',
    downloadCount: 980,
    rating: 4.5,
    tags: ['Highway Engineering', 'Infrastructure', 'Project Engineering', 'Transportation'],
    featured: false,
  },
  {
    id: '9',
    title: '50 Interview Questions for Hotel General Manager',
    description:
      'Hospitality leadership interview guide for hotel general manager positions. Covers operations, guest services, and revenue management.',
    fileName: '50-Interview-Questions-for-Hotel-General-Manager.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Hotel-General-Manager.pdf',

    category: 'Management',
    author: 'Hospitality Experts',
    publishDate: '2024-10-30',
    downloadCount: 1780,
    rating: 4.8,
    tags: ['Hospitality', 'Hotel Management', 'Customer Service', 'Operations'],
    featured: false,
  },
  {
    id: '10',
    title: '50 Interview Questions for Network Engineers',
    description:
      'Technical interview preparation for network engineering roles. Covers networking protocols, security, infrastructure design, and troubleshooting.',
    fileName: '50-Interview-Questions-for-Network-Engineer.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Network-Engineer.pdf',

    category: 'Technology',
    author: 'IT Professionals',
    publishDate: '2024-10-25',
    downloadCount: 2250,
    rating: 4.9,
    tags: ['Network Engineering', 'IT', 'Security', 'Infrastructure'],
    featured: false,
  },
  {
    id: '11',
    title: '50 Interview Questions for Residential Engineers',
    description:
      'Focused interview guide for residential construction and design engineers. Covers home building, codes, and residential project management.',
    fileName: '50-Interview-Questions-for-Residential-Engineer.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Residential-Engineer.pdf',

    category: 'Engineering',
    author: 'Residential Construction',
    publishDate: '2024-10-20',
    downloadCount: 1340,
    rating: 4.6,
    tags: ['Residential Engineering', 'Home Construction', 'Building Codes', 'Design'],
    featured: false,
  },
  {
    id: '12',
    title: '50 Interview Questions for Warehouse Managers',
    description:
      'Logistics and operations interview guide for warehouse management positions. Covers inventory, supply chain, and team leadership.',
    fileName: '50-Interview-Questions-for-Warehouse-Manager.pdf',
    filePath: '/ebooks/50-Interview-Questions-for-Warehouse-Manager.pdf',

    category: 'Management',
    author: 'Supply Chain Experts',
    publishDate: '2024-10-15',
    downloadCount: 1920,
    rating: 4.7,
    tags: ['Warehouse Management', 'Logistics', 'Supply Chain', 'Operations'],
    featured: false,
  },
]

export default function EbooksClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [isVisible, setIsVisible] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [ebooks] = useState<Ebook[]>(staticEbooks)
  const [previewEbook, setPreviewEbook] = useState<Ebook | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredEbooks = useMemo(() => {
    let filtered = ebooks.filter((ebook: Ebook) => {
      const matchesSearch =
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || ebook.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort the filtered results
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort(
          (a: Ebook, b: Ebook) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
        )
        break
      case 'recent':
        filtered = filtered.sort(
          (a: Ebook, b: Ebook) =>
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
        )
        break
      case 'popular':
        filtered = filtered.sort((a: Ebook, b: Ebook) => b.downloadCount - a.downloadCount)
        break
      case 'rating':
        filtered = filtered.sort((a: Ebook, b: Ebook) => Number(b.rating) - Number(a.rating))
        break
      default:
        break
    }

    return filtered
  }, [ebooks, searchTerm, selectedCategory, sortBy])

  const handleDownload = (ebook: Ebook) => {
    // Open PDF in new tab with SEO-friendly URL
    window.open(ebook.filePath, '_blank')
  }

  const handlePreview = (ebook: Ebook) => {
    setPreviewEbook(ebook)
  }

  const closePreview = () => {
    setPreviewEbook(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Free Interview Resources
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Free <span className="text-blue-600">Interview Question</span>
              <br />
              Ebooks & Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Download our comprehensive collection of interview question guides covering
              engineering, construction, healthcare, management, and technology roles. Get
              expert-crafted questions and answers to ace your next interview.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Free Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Trusted by 15K+ Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>50+ Questions Per Guide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search interview guides by profession, industry, or role..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className={`flex flex-wrap gap-3 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
                  {/* Category Filter */}
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Sort Filter */}
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Downloaded</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-gray-600">
              {filteredEbooks.length} {filteredEbooks.length === 1 ? 'guide' : 'guides'} found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
          </div>
        </div>
      </section>

      {/* Ebooks Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredEbooks.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No interview guides found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEbooks.map((ebook: Ebook, index: number) => (
                <div
                  key={ebook.id}
                  className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {/* Featured Badge */}
                  {ebook.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  {/* PDF Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <PDFThumbnail
                      pdfUrl={ebook.filePath}
                      title={ebook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {ebook.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{ebook.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {ebook.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {ebook.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ebook.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{ebook.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>{ebook.downloadCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* View PDF Button */}
                    <button
                      onClick={() => handlePreview(ebook)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <Eye className="w-5 h-5 group-hover/btn:animate-bounce" />
                      View PDF
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div
            className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Your Career to the Next Level?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              While our free interview guides provide excellent preparation, a professionally
              crafted resume and LinkedIn profile can give you the competitive edge you need to land
              your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/free-resume-review"
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 no-underline"
              >
                <Star className="w-5 h-5" />
                Get Free Resume Review
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 no-underline"
              >
                <Briefcase className="w-5 h-5" />
                Explore All Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {previewEbook && (
        <PDFPreview
          isOpen={true}
          onClose={closePreview}
          pdfUrl={previewEbook.filePath}
          title={previewEbook.title}
          onDownload={() => handleDownload(previewEbook)}
        />
      )}
    </div>
  )
}
