'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ServicesDropdown() {
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
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 font-medium  dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105 "
      >
        <span className="font-medium">Services</span>
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
        className={`absolute left-0 mt-1 w-80 rounded-xl shadow-2xl bg-white border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Gradient header */}
        <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

        <div className="py-2">
          <Link
            href="/ats-resume-writing-service"
            className="group flex items-center px-6 py-3 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-[#9adaf3]/10 hover:to-[#2563eb]/10 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb]"
          >
            <div className="flex flex-col">
              <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                ATS Resume
              </span>
              <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Optimize for applicant tracking systems
              </span>
            </div>
          </Link>

          <Link
            href="/executive-resume-writing-service"
            className="group flex items-center px-6 py-3 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-[#9adaf3]/10 hover:to-[#2563eb]/10 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb]"
          >
            <div className="flex flex-col">
              <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                Executive Resume
              </span>
              <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Professional resumes for leadership roles
              </span>
            </div>
          </Link>

          <Link
            href="/visual-resume-writing-service"
            className="group flex items-center px-6 py-3 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-[#9adaf3]/10 hover:to-[#2563eb]/10 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb]"
          >
            <div className="flex flex-col">
              <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                Visual Resume
              </span>
              <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Eye-catching infographic designs
              </span>
            </div>
          </Link>

          <Link
            href="/linkedin-profile-makeover"
            className="group flex items-center px-6 py-3 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-[#9adaf3]/10 hover:to-[#2563eb]/10 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] rounded-b-xl"
          >
            <div className="flex flex-col">
              <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                LinkedIn Profile Makeover
              </span>
              <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                SEO optimized profile enhancement
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
