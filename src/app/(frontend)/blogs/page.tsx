import type { Metadata } from 'next/types'

import BlogCategoriesServer from '@/components/BlogCategoriesServer'
import N8NBlogsLoadMore from '@/components/N8NBlogsLoadMore'
import React from 'react'
import PageClient from './page.client'
import { draftMode } from 'next/headers'

// ISR with 30-minute revalidation for optimal performance
export const revalidate = 1800 // 30 minutes

async function getInitialBlogs() {
  const { isEnabled: isDraftMode } = await draftMode()
  const protocol = process.env.NEXT_PUBLIC_SERVER_URL?.startsWith('https') ? 'https' : 'http'
  const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'localhost:3000'
  const baseUrl = `${protocol}://${domain.replace(/^https?:\/\//, '')}`

  const response = await fetch(`${baseUrl}/api/n8n-blogs?page=1&limit=9`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: isDraftMode ? { revalidate: 0 } : { revalidate: 1800 },
  })

  if (!response.ok) {
    console.error('Failed to fetch initial blogs:', response.statusText)
    return { docs: [], hasNextPage: false }
  }

  return response.json()
}

export default async function Page() {
  const { docs: initialBlogs, hasNextPage } = await getInitialBlogs()

  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-gray-50 to-white">
      <PageClient />
      <div className="container mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <span className="text-blue-700 text-sm font-semibold">Expert Career Guidance</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Resume Tips, Career Advice &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Job Search Strategies
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover actionable strategies, industry best practices, and proven techniques to
            elevate your resume, optimize your LinkedIn profile, and land your dream job
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Expert-Written</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Industry-Specific</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Regularly Updated</span>
            </div>
          </div>
        </div>
      </div>

      <BlogCategoriesServer />

      <div className="container">
        <N8NBlogsLoadMore
          initialBlogs={initialBlogs}
          initialPage={1}
          initialHasMore={hasNextPage}
        />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Prosumely Career Blogs`,
  }
}
