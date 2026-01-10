import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { N8NBlog } from '../../../payload-types'

export const revalidateN8NBlog: CollectionAfterChangeHook<N8NBlog> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.status === 'published') {
      const blogPath = `/blogs/${doc.slug}`
      const categoryPath = `/blogs/categories/${doc.category}`

      payload.logger.info(`Revalidating N8N blog at path: ${blogPath}`)

      revalidatePath(blogPath)
      revalidatePath('/blogs')
      revalidatePath(categoryPath)
      revalidateTag('blogs-sitemap')
      revalidateTag('n8n-blogs')
    }

    // If the blog was previously published, we need to revalidate the old paths
    if (previousDoc?.status === 'published' && doc.status !== 'published') {
      const oldBlogPath = `/blogs/${previousDoc.slug}`
      const oldCategoryPath = `/blogs/categories/${previousDoc.category}`

      payload.logger.info(`Revalidating old N8N blog at path: ${oldBlogPath}`)

      revalidatePath(oldBlogPath)
      revalidatePath('/blogs')
      revalidatePath(oldCategoryPath)
      revalidateTag('blogs-sitemap')
      revalidateTag('n8n-blogs')
    }

    // If category changed, revalidate both old and new category pages
    if (
      previousDoc?.category &&
      doc.category !== previousDoc.category &&
      doc.status === 'published'
    ) {
      const newCategoryPath = `/blogs/categories/${doc.category}`
      const oldCategoryPath = `/blogs/categories/${previousDoc.category}`

      payload.logger.info(
        `Revalidating category change from ${oldCategoryPath} to ${newCategoryPath}`,
      )

      revalidatePath(newCategoryPath)
      revalidatePath(oldCategoryPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<N8NBlog> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const blogPath = `/blogs/${doc?.slug}`
    const categoryPath = `/blogs/categories/${doc?.category}`

    revalidatePath(blogPath)
    revalidatePath('/blogs')
    revalidatePath(categoryPath)
    revalidateTag('blogs-sitemap')
    revalidateTag('n8n-blogs')
  }

  return doc
}
