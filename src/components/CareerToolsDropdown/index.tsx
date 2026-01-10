'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function CareerToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  // For desktop: handle hover
  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  // For mobile: handle click
  const handleClick = () => setIsOpen(!isOpen)

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="font-medium">Career Tools</span>
        <ChevronDown
          className={`h-4 w-4 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-1 w-[90vw] max-w-[400px] rounded-xl shadow-2xl bg-white border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Gradient header */}
        <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

        <div className="p-6">
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Career Tools
            </h3>

            <Link
              href="/career-tools/job-description-keyword-finder"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Keyword Finder
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Extract keywords from job descriptions
                </span>
              </div>
            </Link>

            <Link
              href="/career-tools/cover-letter-generator"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Cover Letter Generator
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Create tailored cover letters instantly
                </span>
              </div>
            </Link>

            <Link
              href="/career-tools/resume-gap-identifier"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Resume Gap Identifier
                </span>
                <span className="text-xs text-gray-500 mt-1">Find missing skills & experience</span>
              </div>
            </Link>

            <Link
              href="/career-tools/global-opportunity-heatmap"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Global Opportunity Heatmap
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Find best countries for your skills
                </span>
              </div>
            </Link>

            <Link
              href="/career-tools/leadership-readiness-score"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Leadership Readiness Score
                </span>
                <span className="text-xs text-gray-500 mt-1">Assess your leadership potential</span>
              </div>
            </Link>

            <Link
              href="/career-tools/salary-analyzer"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Salary Analyzer
                </span>
                <span className="text-xs text-gray-500 mt-1">Compare salaries globally</span>
              </div>
            </Link>

            <Link
              href="/career-tools/career-roadmap-generator"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Career Roadmap Generator
                </span>
                <span className="text-xs text-gray-500 mt-1">Plan your career progression</span>
              </div>
            </Link>

            <Link
              href="/career-tools/freelance-rate-calculator"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Freelance Rate Calculator
                </span>
                <span className="text-xs text-gray-500 mt-1">Calculate optimal pricing rates</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
