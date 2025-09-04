import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText, { extractH2Headings } from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { TableOfContents } from '@/components/TableOfContents'
import { HeadingProcessor } from '@/components/HeadingProcessor'

interface Params {
  slug: string
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return posts.docs?.map(({ slug }) => ({ slug })) || []
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const post = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      meta: true,
    },
  })

  const postDoc = post.docs?.[0]

  return generateMeta({
    doc: postDoc || null,
  })
}

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const post = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const postDoc = post.docs?.[0]

  if (!postDoc) {
    notFound()
  }

  // Extract headings for table of contents
  const headings = extractH2Headings(postDoc.content)

  return (
    <>
      <PostHero post={postDoc} />
      <div className="bg-gradient-to-b from-slate-50/50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8">
            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
            
            {/* Main Content */}
            <article className={`${headings.length > 0 ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                {/* Mobile TOC */}
                {headings.length > 0 && (
                  <div className="lg:hidden border-b border-slate-200/60 bg-slate-50/50">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-100/50 transition-colors">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          Table of Contents
                        </h2>
                        <svg className="w-5 h-5 text-slate-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <TableOfContents headings={headings} mobile />
                      </div>
                    </details>
                  </div>
                )}
                
                {/* Article Content */}
                <div className="p-6 sm:p-8 lg:p-12">
                  <HeadingProcessor />
                  <div className="prose prose-lg max-w-none prose-slate prose-headings:scroll-mt-24">
                    <RichText data={postDoc.content} enableGutter={false} />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}