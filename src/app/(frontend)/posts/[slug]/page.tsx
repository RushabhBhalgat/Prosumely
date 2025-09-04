import { redirect } from 'next/navigation'

interface Params {
  slug: string
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  redirect(`/blogs/${slug}`)
}