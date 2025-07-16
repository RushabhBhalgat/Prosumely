import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata = {
  title: 'Career Blog & Resume Writing Tips | Prosumely',
  description:
    'Read expert articles on resume writing, job search strategies, and career growth from Prosumely. Stay ahead in your job hunt with actionable tips and industry insights.',
  keywords: [
    'career blog',
    'resume writing tips',
    'job search advice',
    'career growth',
    'Prosumely',
    'ATS resume',
    'professional resume',
  ],
  openGraph: {
    title: 'Career Blog & Resume Writing Tips | Prosumely',
    description:
      'Read expert articles on resume writing, job search strategies, and career growth from Prosumely. Stay ahead in your job hunt with actionable tips and industry insights.',
    url: 'https://prosumely.com/posts',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Career Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Blog & Resume Writing Tips | Prosumely',
    description:
      'Read expert articles on resume writing, job search strategies, and career growth from Prosumely. Stay ahead in your job hunt with actionable tips and industry insights.',
    images: ['/prosumely-career-blogs.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/posts',
  },
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
