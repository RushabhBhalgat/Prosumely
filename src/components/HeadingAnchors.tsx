'use client'
import { useEffect } from 'react'
import { slugify } from '@/utilities/slugify'

export default function HeadingAnchors() {
  useEffect(() => {
    const container = document.querySelector('.payload-richtext')
    if (!container) return
    const headings = Array.from(container.querySelectorAll('h2')) as HTMLHeadingElement[]
    headings.forEach((h) => {
      const text = h.textContent?.trim() || ''
      if (!text) return
      if (!h.id) h.id = slugify(text)
      // ensure proper scroll margin for sticky header (5rem = 80px for the navigation)
      h.style.scrollMarginTop = '5rem'
      if (!h.classList.contains('scroll-mt-20')) h.classList.add('scroll-mt-20')
    })
  }, [])

  return null
}
