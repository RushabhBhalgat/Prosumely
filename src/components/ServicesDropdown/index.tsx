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
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
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

      {/* Redesigned Dropdown menu - positioning adjusted to prevent overflow */}
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
          {/* Resume Services Column */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Resume Services
            </h3>

            <Link
              href="/ats-resume-writing-service"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  ATS Resume
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Optimize for applicant tracking systems
                </span>
              </div>
            </Link>

            <Link
              href="/executive-resume-writing-service"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Executive Resume
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Professional resumes for leadership roles
                </span>
              </div>
            </Link>

            <Link
              href="/visual-resume-writing-service"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Visual Resume
                </span>
                <span className="text-xs text-gray-500 mt-1">Eye-catching infographic designs</span>
              </div>
            </Link>
          </div>

          {/* Career Advancement Column */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Career Advancement
            </h3>

            <Link
              href="/linkedin-profile-makeover"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  LinkedIn Profile Makeover
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  SEO optimized profile enhancement
                </span>
              </div>
            </Link>

            <Link
              href="/project-portfolio"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Career Portfolio
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  A visual journey through your projects
                </span>
              </div>
            </Link>

            <Link
              href="/jobseekers-combo-service"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Jobseeker's Combo
                </span>
                <span className="text-xs text-gray-500 mt-1">Everything you need to succeed</span>
              </div>
            </Link>

            <Link
              href="/cover-letter-writing-service"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Cover Letter
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Compelling letters that open doors
                </span>
              </div>
            </Link>
          </div>

          {/* Special Services Column */}
          <div>
            <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
              Special Services
            </h3>

            <Link
              href="/free-resume-review"
              className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 bg-blue-50 rounded-md"
            >
              <div className="flex flex-col">
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                  Free Resume Review
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                    FREE
                  </span>
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Professional feedback on your current resume
                </span>
              </div>
            </Link>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Not sure what you need?</h4>
              <p className="text-xs text-gray-600 mb-3">
                We can help you choose the right service for your career stage and goals.
              </p>
              <Link
                href="/services"
                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All Services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
