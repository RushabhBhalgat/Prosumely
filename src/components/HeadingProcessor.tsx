'use client'

import { useEffect } from 'react'
import { slugify } from '@/utilities/slugify'

export const HeadingProcessor = () => {
  useEffect(() => {
    const processHeadings = () => {
      const headings = document.querySelectorAll('h2')
      headings.forEach((heading) => {
        if (!heading.id && heading.textContent) {
          heading.id = slugify(heading.textContent)
          heading.classList.add('scroll-mt-24')
        }
      })
    }

    processHeadings()
    const timer = setTimeout(processHeadings, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return null
}