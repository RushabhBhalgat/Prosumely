'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { ServicesDropdown } from '@/components/ServicesDropdown'
import { ResourcesDropdown } from '@/components/ResourcesDropdown'
import { PricingDropdown } from '@/components/PricingDropdown'
import { CareerToolsDropdown } from '@/components/CareerToolsDropdown'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import type { Header as HeaderType } from '@/payload-types'

export const HeaderClient: React.FC<{
  data: HeaderType
  servicesMode?: 'full' | 'limited'
}> = ({ data, servicesMode = 'full' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileCareerToolsOpen, setMobileCareerToolsOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const { navItems } = data || {}
  const { setHeaderTheme } = useHeaderTheme()

  // Set the header theme to light
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Close all mobile dropdowns when main menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setMobileServicesOpen(false)
      setMobileCareerToolsOpen(false)
      setMobileResourcesOpen(false)
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white text-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/prosumely-logo-lg.png"
            alt="Prosumely Logo"
            width={150}
            height={40}
            sizes="150px"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Pricing dropdown */}
          <PricingDropdown />

          {/* Services dropdown */}
          <ServicesDropdown servicesMode={servicesMode} />

          {/* Career Tools dropdown */}
          <CareerToolsDropdown />

          {/* Resources dropdown */}
          <ResourcesDropdown />

          {/* About Us link */}
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            About Us
          </Link>

          {/* Regular nav items from CMS */}
          {navItems?.map(({ link }, i) => (
            <CMSLink key={i} {...link} />
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 fixed inset-x-0 top-[73px] bottom-0 z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex flex-col space-y-4 pb-20">
              {/* Added bottom padding for safe scrolling */}

              {/* Pricing Link for mobile */}
              <div className="py-1">
                <Link
                  href="/pricing"
                  className="block w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>

              {/* Services Dropdown for mobile */}
              <div className="py-1 border-b border-gray-100">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                >
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pb-2 space-y-1">
                    {servicesMode === 'limited' ? (
                      // Limited services for mobile
                      <div className="space-y-1">
                        <Link
                          href="/services/jobseeker-cv-combo"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Jobseeker's CV Combo
                        </Link>
                        <Link
                          href="/services/jobseeker-personal-website"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Jobseeker's Personal Website
                        </Link>
                        <Link
                          href="/free-resume-review"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200 bg-blue-50 rounded-md px-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Free Resume Review
                        </Link>
                        <Link
                          href="/services/cv-personal-website-combo"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          CV + Personal Website Combo
                        </Link>
                      </div>
                    ) : (
                      // Full services for mobile
                      <>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-[#2563eb] mb-2">
                            Resume Services
                          </h4>
                          <div className="space-y-1">
                            <Link
                              href="/ats-resume-writing-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              ATS Resume Writing
                            </Link>
                            <Link
                              href="/executive-resume-writing-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Executive Resume Writing
                            </Link>
                            <Link
                              href="/academic-cv-writing-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Academic CV Writing
                            </Link>
                            <Link
                              href="/project-portfolio"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Project Portfolio
                            </Link>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-[#2563eb] mb-2">
                            Career Advancement
                          </h4>
                          <div className="space-y-1">
                            <Link
                              href="/linkedin-profile-makeover"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              LinkedIn Profile Makeover
                            </Link>
                            <Link
                              href="/jobseekers-combo-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Jobseeker's Combo
                            </Link>
                            <Link
                              href="/cover-letter-writing-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Cover Letter Writing
                            </Link>
                            <Link
                              href="/career-roadmap-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Career Roadmap
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#2563eb] mb-2">
                            Additional Services
                          </h4>
                          <div className="space-y-1">
                            <Link
                              href="/interview-coaching-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Interview Coaching
                            </Link>
                            <Link
                              href="/sop-writing-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              SOP Writing
                            </Link>
                            <Link
                              href="/membership-application-service"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Membership Application
                            </Link>
                            <Link
                              href="/free-resume-review"
                              className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Free Resume Review
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Career Tools Dropdown for mobile */}
              <div className="py-1 border-b border-gray-100">
                <button
                  onClick={() => setMobileCareerToolsOpen(!mobileCareerToolsOpen)}
                  className="flex items-center justify-between w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                >
                  Career Tools
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${mobileCareerToolsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileCareerToolsOpen && (
                  <div className="pl-4 pb-2 space-y-1">
                    <div className="space-y-1">
                      <Link
                        href="/career-tools/job-description-keyword-finder"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Keyword Finder
                      </Link>
                      <Link
                        href="/career-tools/cover-letter-generator"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Cover Letter Generator
                      </Link>
                      <Link
                        href="/career-tools/resume-gap-identifier"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Resume Gap Identifier
                      </Link>
                      <Link
                        href="/career-tools/global-opportunity-heatmap"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Global Opportunity Heatmap
                      </Link>
                      <Link
                        href="/career-tools/leadership-readiness-score"
                        className="block py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Leadership Readiness Score
                      </Link>
                      <Link
                        href="/career-tools/salary-analyzer"
                        className="block py-2 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Salary Analyzer
                      </Link>
                      <Link
                        href="/career-tools/career-roadmap-generator"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Career Roadmap Generator
                      </Link>
                      <Link
                        href="/career-tools/freelance-rate-calculator"
                        className="block py-2 text-sm text-gray-700 hover:text-pink-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Freelance Rate Calculator
                      </Link>
                      <Link
                        href="/career-tools/linkedin-profile-generator"
                        className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        LinkedIn Profile Generator
                      </Link>
                      <Link
                        href="/career-tools/future-skills-identifier"
                        className="block py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Future Skills Identifier
                      </Link>
                      <Link
                        href="/career-tools/cost-of-living-calculator"
                        className="block py-2 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Cost of Living Calculator
                      </Link>
                      <Link
                        href="/career-tools/career-transition-calculator"
                        className="block py-2 text-sm text-gray-700 hover:text-cyan-600 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Career Transition Calculator
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown for mobile */}
              <div className="py-1 border-b border-gray-100">
                <button
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="flex items-center justify-between w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                >
                  Resources
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="pl-4 pb-2 space-y-1">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-[#2563eb] mb-2">Learn & Grow</h4>
                      <div className="space-y-1">
                        <Link
                          href="/impact-stories"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Impact Stories
                        </Link>
                        <Link
                          href="/posts"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Blog
                        </Link>
                        <Link
                          href="/ebooks"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Ebooks
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2563eb] mb-2">Stay Updated</h4>
                      <div className="space-y-1">
                        <Link
                          href="/newsroom"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Newsroom
                        </Link>
                        <Link
                          href="/events"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Events
                        </Link>
                        <Link
                          href="/testimonials"
                          className="block py-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Testimonials
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Link for mobile */}
              <div className="py-1">
                <Link
                  href="/about"
                  className="block w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>

              {/* Regular nav items from CMS */}
              {navItems?.map(({ link }, i) => (
                <div key={i} className="py-1">
                  <div onClick={() => setIsMenuOpen(false)}>
                    <CMSLink
                      {...link}
                      className="block w-full py-3 font-medium text-gray-800 hover:text-[#2563eb] transition-colors duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
