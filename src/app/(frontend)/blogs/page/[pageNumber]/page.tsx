import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import PageClient from '../../page.client'

interface Params {
  pageNumber: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pageNumber } = await params

  return {
    title: `Blogs - Page ${pageNumber} | Prosumely`,
    description: `Blog posts page ${pageNumber}`,
  }
}

export default async function BlogsPageNumber({ params }: { params: Promise<Params> }) {
  const { pageNumber } = await params
  const currentPage = parseInt(pageNumber, 10)

  if (isNaN(currentPage) || currentPage < 1) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: currentPage,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: {
        title: true,
        description: true,
        image: true,
      },
      heroImage: true,
    },
  })

  if (currentPage > posts.totalPages) {
    notFound()
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blogs</h1>
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