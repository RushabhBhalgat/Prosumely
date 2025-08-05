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
        className={`absolute right-0 mt-1 w-[90vw] max-w-[900px] rounded-xl shadow-2xl bg-white border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Gradient header */}
        <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Column 1 */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Resume Tools
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
              href="/tools/resume-analyzer"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Resume Analyzer
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Get instant feedback on your resume
                </span>
              </div>
            </Link>

            <Link
              href="/tools/resume-templates"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Resume Templates
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Download free professional templates
                </span>
              </div>
            </Link>
          </div>

          {/* Content Column 2 */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Interview Prep
            </h3>

            <Link
              href="/tools/interview-simulator"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Interview Simulator
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Practice with AI-powered interviews
                </span>
              </div>
            </Link>

            <Link
              href="/tools/question-library"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Question Library
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Common interview questions by industry
                </span>
              </div>
            </Link>
          </div>

          {/* Content Column 3 */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Career Development
            </h3>

            <Link
              href="/tools/salary-calculator"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Salary Calculator
                </span>
                <span className="text-xs text-gray-500 mt-1">Compare salaries in your field</span>
              </div>
            </Link>

            <Link
              href="/tools/career-path-planner"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Career Path Planner
                </span>
                <span className="text-xs text-gray-500 mt-1">Map your professional journey</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
