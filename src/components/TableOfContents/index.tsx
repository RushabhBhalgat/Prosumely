'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'

export type TocHeading = {
  id: string
  text: string
}

type Props = {
  headings: TocHeading[]
  title?: string
}

export function TableOfContents({ headings, title = 'Table of Contents' }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible
        let mostVisible = entries[0]
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry
          }
        })

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveId(mostVisible.target.id)
        }
      },
      {
        rootMargin: '-10% 0% -70% 0%',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      },
    )

    // Wait a bit for the DOM to be ready
    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        } else {
          console.warn(`Element with id "${id}" not found`)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [headings])

  // Debug effect to log when activeId changes
  useEffect(() => {
    console.log('Active ID changed to:', activeId)
  }, [activeId])

  // Calculate progress
  const currentIndex = headings.findIndex((h) => h.id === activeId)
  const progressIndex = currentIndex >= 0 ? currentIndex + 1 : 1
  const progressPercentage = (progressIndex / headings.length) * 100

  if (!headings?.length) return null

  return (
    <aside className="w-80 shrink-0 toc-sticky">
      <div className="max-h-[calc(100vh-7rem)] overflow-hidden">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 p-6 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Table of contents"
            className="overflow-y-auto max-h-[calc(100vh-20rem)] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
          >
            <ul className="space-y-1">
              {headings.map((h, index) => (
                <li key={h.id} className="group">
                  <Link
                    href={`#${h.id}`}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300 ease-out
                      ${
                        activeId === h.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform translate-x-1'
                          : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:translate-x-1'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideInLeft 0.6s ease-out forwards',
                    }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeId === h.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`}
                    />
                    <span className="line-clamp-2 leading-snug">{h.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Reading progress</span>
              <span>
                {progressIndex} of {headings.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(5, progressPercentage)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
