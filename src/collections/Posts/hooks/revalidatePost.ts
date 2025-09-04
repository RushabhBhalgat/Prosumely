import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const blogPath = `/blogs/${doc.slug}`
      const postPath = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at paths: ${blogPath} and ${postPath}`)

      revalidatePath(blogPath)
      revalidatePath(postPath)
      revalidatePath('/blogs')
      revalidatePath('/posts')
      revalidateTag('posts-sitemap')
      revalidateTag('blogs-sitemap')
      revalidateTag('industry-sitemap')
    }

    // If the post was previously published, we need to revalidate the old paths
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldBlogPath = `/blogs/${previousDoc.slug}`
      const oldPostPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at paths: ${oldBlogPath} and ${oldPostPath}`)

      revalidatePath(oldBlogPath)
      revalidatePath(oldPostPath)
      revalidatePath('/blogs')
      revalidatePath('/posts')
      revalidateTag('posts-sitemap')
      revalidateTag('blogs-sitemap')
      revalidateTag('industry-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const blogPath = `/blogs/${doc?.slug}`
    const postPath = `/posts/${doc?.slug}`

    revalidatePath(blogPath)
    revalidatePath(postPath)
    revalidatePath('/blogs')
    revalidatePath('/posts')
    revalidateTag('posts-sitemap')
    revalidateTag('blogs-sitemap')
  }

  return doc
}
