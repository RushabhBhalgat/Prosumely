'use client'

import React, { useState, useEffect } from 'react'

interface Heading {
  id: string
  text: string
}

interface TableOfContentsProps {
  headings: Heading[]
  mobile?: boolean
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, mobile = false }) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  const baseClasses = mobile 
    ? "bg-white rounded-xl border border-slate-200/60 p-4" 
    : "bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"

  return (
    <nav className={baseClasses}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        <h2 className="text-base font-semibold text-slate-900">Table of Contents</h2>
      </div>
      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  group flex items-center gap-3 text-sm py-2.5 px-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500 font-medium' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
              >
                <span className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-slate-300 group-hover:bg-slate-400'
                  }
                `}></span>
                <span className="line-clamp-2 leading-relaxed">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
      {!mobile && (
        <div className="mt-6 pt-4 border-t border-slate-200/60">
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click to jump to section
          </p>
        </div>
      )}
    </nav>
  )
}