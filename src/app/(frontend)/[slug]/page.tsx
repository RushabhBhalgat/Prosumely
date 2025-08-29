import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug} | Prosumely`,
    description: `Page for ${slug}`,
  }
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug: _slug } = await params

  // For now, return not found for dynamic slug pages
  // This can be implemented later with proper content management
  notFound()
}