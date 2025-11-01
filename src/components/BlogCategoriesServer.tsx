import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  Globe,
  Briefcase,
  FileText,
  Linkedin,
  FolderKanban,
  Award,
  ArrowRightLeft,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Resume by Country / Region',
    slug: 'resume-by-country',
    icon: Globe,
    description: 'Country-specific resume formats and guidelines',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    name: 'Resume by Job Profile / Industry / Level',
    slug: 'resume-by-job-profile',
    icon: Briefcase,
    description: 'Tailored resume tips for different careers and levels',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    name: 'Resume and CV Tips / Best Practices',
    slug: 'resume-cv-tips',
    icon: FileText,
    description: 'Expert tips and best practices for crafting resumes',
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    name: 'LinkedIn Profile Tips',
    slug: 'linkedin-tips',
    icon: Linkedin,
    description: 'Optimize your LinkedIn profile for success',
    color: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  {
    name: 'Project Portfolio / Work Samples',
    slug: 'project-portfolio',
    icon: FolderKanban,
    description: 'Showcase your work with effective portfolios',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  {
    name: 'Leadership / Executive Role Resumes',
    slug: 'leadership-executive',
    icon: Award,
    description: 'Executive-level resume strategies and tips',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    name: 'Career Transition / Special Situations',
    slug: 'career-transition',
    icon: ArrowRightLeft,
    description: 'Navigate career changes and unique situations',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
  },
  {
    name: 'Personal Branding & Online Presence',
    slug: 'personal-branding',
    icon: Sparkles,
    description: 'Build and strengthen your personal brand',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    name: 'Job Search & Hiring Trends',
    slug: 'job-search-trends',
    icon: TrendingUp,
    description: 'Latest trends in job search and hiring',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
]

// Map from full names to slugs (for backward compatibility)
const CATEGORY_NAME_TO_SLUG: { [key: string]: string } = {
  'Resume by Country / Region': 'resume-by-country',
  'Resume by Job Profile / Industry / Level': 'resume-by-job-profile',
  'Resume and CV Tips / Best Practices': 'resume-cv-tips',
  'LinkedIn Profile Tips': 'linkedin-tips',
  'Project Portfolio / Work Samples': 'project-portfolio',
  'Leadership / Executive Role Resumes': 'leadership-executive',
  'Career Transition / Special Situations': 'career-transition',
  'Personal Branding & Online Presence': 'personal-branding',
  'Job Search & Hiring Trends': 'job-search-trends',
}

export default async function BlogCategoriesServer() {
  let counts: { [key: string]: number } = {}

  try {
    const payload = await getPayload({ config: configPromise })
    const db = payload.db.connection.db

    if (!db) {
      throw new Error('Database connection not available')
    }

    const n8nBlogsCollection = db.collection('n8n-blogs')

    // Get counts for each category
    const categoryCounts = await n8nBlogsCollection
      .aggregate([
        { $match: { status: 'published' } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    // Convert to a more usable format, normalizing category names to slugs
    const tempCounts: { [key: string]: number } = {}
    categoryCounts.forEach((item: any) => {
      const categoryValue = item._id
      // If it's already a slug, use it; if it's a full name, convert it
      const slug = CATEGORY_NAME_TO_SLUG[categoryValue] || categoryValue
      tempCounts[slug] = (tempCounts[slug] || 0) + item.count
    })
    counts = tempCounts
  } catch (error) {
    console.error('Error fetching category counts:', error)
  }

  return (
    <div className="container mb-16">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
        <p className="text-gray-600 text-base">
          Explore our expert articles organized by topic to find exactly what you need
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const count = counts[category.slug] || 0
          const IconComponent = category.icon

          return (
            <Link
              key={category.slug}
              href={`/blogs/categories/${category.slug}`}
              className={`group relative block p-6 border-2 rounded-xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden ${category.color}`}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-md">
                    {count}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span>View articles</span>
                  <svg
                    className="w-4 h-4 ml-1"
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
          )
        })}
      </div>
    </div>
  )
}
