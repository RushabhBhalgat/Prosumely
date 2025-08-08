import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText, { extractH2Headings } from '@/components/RichText'
import Link from 'next/link'
import { ArrowLeft, FileText, ChevronRight } from 'lucide-react'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { formatDateTime } from 'src/utilities/formatDateTime'
import { formatAuthors } from '@/utilities/formatAuthors'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TableOfContents } from '@/components/TableOfContents'
import HeadingAnchors from '@/components/HeadingAnchors'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const tocHeadings = extractH2Headings(post.content)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PageClient />
      <HeadingAnchors />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Modern Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Posts</span>
          </Link>
        </div>
      </div>

      <PostHero post={post} />

      {/* Main Content Layout */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12 relative">
          {/* Desktop TOC - Left Sidebar */}
          {tocHeadings.length > 0 && (
            <div className="hidden lg:block">
              <TableOfContents headings={tocHeadings} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto">
              {/* Post Header */}
              <header className="mb-12 text-center lg:text-left">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {post.categories.map((category, index) => {
                      if (typeof category === 'object' && category !== null) {
                        const { title: categoryTitle } = category
                        const titleToUse = categoryTitle || 'Untitled category'

                        return (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300/30 shadow-sm hover:shadow-md transition-all duration-300"
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animation: 'fadeInUp 0.6s ease-out forwards',
                            }}
                          >
                            {titleToUse}
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-slate-600">
                  {post.populatedAuthors &&
                    post.populatedAuthors.length > 0 &&
                    formatAuthors(post.populatedAuthors) !== '' && (
                      <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {formatAuthors(post.populatedAuthors)?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {formatAuthors(post.populatedAuthors)}
                          </p>
                          <p className="text-sm text-slate-500">Author</p>
                        </div>
                      </div>
                    )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
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
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {formatDateTime(post.publishedAt)}
                        </p>
                        <p className="text-sm text-slate-500">Published</p>
                      </div>
                    </div>
                  )}
                </div>
              </header>

              {/* Article Content */}
              <div
                className="prose prose-lg prose-slate max-w-none
                prose-headings:scroll-mt-28 
                prose-h2:text-3xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mb-6 prose-h2:mt-12 prose-h2:first:mt-0
                prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-800 prose-h3:mb-4 prose-h3:mt-8
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-medium
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl prose-pre:p-6 prose-pre:shadow-xl
                prose-ul:my-6 prose-ul:space-y-2 prose-ol:my-6 prose-ol:space-y-2 
                prose-li:my-2 prose-li:text-slate-700 prose-li:leading-relaxed
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-200"
              >
                <RichText data={post.content} enableGutter={false} />
              </div>

              {/* Related Posts */}
              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div className="mt-20 pt-12 border-t border-slate-200">
                  <RelatedPosts
                    className="space-y-8"
                    docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile TOC */}
        {tocHeadings.length > 0 && (
          <div className="lg:hidden mt-12">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <details className="group">
                <summary className="cursor-pointer select-none px-6 py-4 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200 flex items-center justify-between hover:from-blue-100 hover:to-slate-100 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">Table of Contents</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tocHeadings.map((h, index) => (
                      <li key={h.id}>
                        <Link
                          href={`#${h.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                          <span className="font-medium">{h.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
