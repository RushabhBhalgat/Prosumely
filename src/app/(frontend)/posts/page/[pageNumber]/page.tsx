import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Params {
  pageNumber: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pageNumber } = await params

  return {
    title: `Blog - Page ${pageNumber} | Prosumely`,
    description: `Blog posts page ${pageNumber}`,
  }
}

export default async function PostsPageNumber({ params }: { params: Promise<Params> }) {
  const { pageNumber: _pageNumber } = await params

  // For now, return not found for paginated post pages
  // This should be implemented with proper CMS integration
  notFound()
}