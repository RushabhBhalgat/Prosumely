import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
  fallbackSrc?: string
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  sizes,
  fallbackSrc = '/website-template-OG.webp',
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
      onError?.()
    }
  }

  const imageProps = {
    src: imgSrc,
    alt,
    onError: handleError,
    className,
    priority,
    sizes:
      sizes ||
      '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, 40vw',
    ...props,
  }

  if (fill) {
    return <Image {...imageProps} fill />
  }

  return <Image {...imageProps} width={width || 400} height={height || 300} />
}

// Utility to validate image URLs
export function validateImageUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Component for handling broken image links in content
export function ContentImage({
  src,
  alt,
  ...props
}: {
  src: string
  alt: string
  [key: string]: any
}) {
  if (!src || !validateImageUrl(src)) {
    return (
      <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p>Image not available</p>
        {alt && <p className="text-sm mt-2">{alt}</p>}
      </div>
    )
  }

  return <OptimizedImage src={src} alt={alt} {...props} />
}
