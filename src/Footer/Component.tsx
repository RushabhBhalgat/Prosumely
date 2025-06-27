import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

      <div className="container py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link className="inline-block mb-4" href="/">
              <span className="text-white text-2xl font-bold">Prosumely</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              We help professionals stand out with expert resume writing services and career
              advancement solutions.
            </p>
            <div className="flex space-x-3 pt-4">
              {/* Social Media Links */}
              <a
                href="https://www.facebook.com/prosumely.cv.5/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://x.com/prosumely"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors duration-300"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/prosumely/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.youtube.com/@prosumely8704"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors duration-300"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ats-resume-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  ATS Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-resume-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Executive Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/visual-resume-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Visual Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/linkedin-profile-makeover"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  LinkedIn Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/cover-letter-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Cover Letter
                </Link>
              </li>
              <li>
                <Link
                  href="/career-portfolio"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Career Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/sop"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  SOP
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Services
                </Link>
              </li>
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                    {...link}
                  />
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#9adaf3] flex-shrink-0" />
                <a
                  href="tel:+917559112241"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  +91 7559112241
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#9adaf3] flex-shrink-0" />
                <a
                  href="mailto:contact@prosumely.com"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  contact@prosumely.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Prosumely. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-[#9adaf3] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#9adaf3] transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link href="/refund" className="hover:text-[#9adaf3] transition-colors duration-200">
              Cancellation & Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
