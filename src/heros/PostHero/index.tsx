import React from 'react'
import Link from 'next/link'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, title, publishedAt, meta } = post

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blog</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-medium line-clamp-1">{title}</span>
          </nav>
          
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6 animate-fade-in-up">
              {title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 animate-fade-in-up animation-delay-200">
              {publishedAt && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={publishedAt}>
                    {formatDateTime(publishedAt)}
                  </time>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>5 min read</span>
              </div>
            </div>
            
            {/* Description */}
            {meta?.description && (
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-6 leading-relaxed animate-fade-in-up animation-delay-400">
                {meta.description}
              </p>
            )}
          </div>
          
          {/* Hero Image */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="relative animate-fade-in-up animation-delay-600">
              <div className="relative h-[60vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 group">
                <Media
                  fill
                  priority
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  resource={heroImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 pointer-events-none" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-15 blur-2xl animate-pulse animation-delay-75" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
