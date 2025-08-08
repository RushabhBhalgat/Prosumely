import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage } = post

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative max-w-4xl mx-auto">
        {heroImage && typeof heroImage !== 'string' && (
          <div className="relative h-[50vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
            <Media
              fill
              priority
              imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
              resource={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  )
}
