import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    enableLink,
    linkType,
    customUrl,
    internalLink,
    newTab,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  // Generate the link URL
  let linkUrl = ''
  if (enableLink) {
    if (linkType === 'custom' && customUrl) {
      linkUrl = customUrl
    } else if (linkType === 'internal' && internalLink && typeof internalLink === 'object') {
      // Handle internal links to pages or posts
      const collection = internalLink.relationTo || 'pages'
      const slug =
        typeof internalLink.value === 'object' ? internalLink.value.slug : internalLink.value
      linkUrl = collection === 'posts' ? `/posts/${slug}` : `/${slug}`
    }
  }

  const mediaElement = (
    <Media
      imgClassName={cn(
        'border border-border rounded-[0.8rem] transition-all duration-300',
        {
          'hover:shadow-lg hover:scale-[1.02] cursor-pointer': enableLink && linkUrl,
        },
        imgClassName,
      )}
      resource={media}
      src={staticImage}
      priority
    />
  )

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <>
          {enableLink && linkUrl ? (
            linkType === 'custom' ? (
              <a
                href={linkUrl}
                target={newTab ? '_blank' : '_self'}
                rel={newTab ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {mediaElement}
              </a>
            ) : (
              <Link href={linkUrl} className="block">
                {mediaElement}
              </Link>
            )
          ) : (
            mediaElement
          )}
        </>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
