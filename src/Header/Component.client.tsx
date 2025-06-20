'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { ServicesDropdown } from '@/components/ServicesDropdown'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import type { Header as HeaderType } from '@/payload-types'

export const HeaderClient: React.FC<{
  data: HeaderType
}> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navItems } = data || {}
  const { setHeaderTheme } = useHeaderTheme()

  // Set the header theme to light
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

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
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Add the Services dropdown here */}
          <ServicesDropdown />

          {/* Regular nav items from CMS */}
          {navItems?.map(({ link }, i) => <CMSLink key={i} {...link} />)}
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
        <div className="md:hidden bg-white p-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            {/* Services Dropdown for mobile */}
            <div className="py-1">
              <button
                onClick={() => {}}
                className="flex items-center justify-between w-full py-2 font-medium text-gray-800"
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
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="pl-4 flex flex-col space-y-2 mt-2">
                <Link href="/ats-resume-writing-service" className="py-1 text-gray-700">
                  ATS Resume
                </Link>
                <Link href="/executive-resume-writing-service" className="py-1 text-gray-700">
                  Executive Resume
                </Link>
                <Link href="/visual-resume-writing-service" className="py-1 text-gray-700">
                  Visual Resume
                </Link>
                <Link href="/linkedin-profile-makeover" className="py-1 text-gray-700">
                  LinkedIn Profile Makeover
                </Link>
              </div>
            </div>

            {/* Regular nav items from CMS */}
            {navItems?.map(({ link }, i) => (
              <div key={i} className="py-1">
                <CMSLink {...link} />
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
