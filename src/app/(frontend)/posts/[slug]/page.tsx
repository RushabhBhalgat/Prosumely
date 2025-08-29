import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug} | Blog | Prosumely`,
    description: `Blog post: ${slug}`,
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug: _slug } = await params

  // For now, return not found for dynamic post pages
  // This should be implemented with proper CMS integration
  notFound()
}