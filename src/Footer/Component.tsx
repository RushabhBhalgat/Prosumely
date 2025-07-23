import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Mail, Phone, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react'

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
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              Prosumely empowers professionals with expertly crafted resumes, executive CVs, cover
              letters, LinkedIn profile enhancements, and impactful project portfolios. Our team of
              resume specialists, HR professionals, and industry experts collaborates to create
              tailored personal branding solutions that help you stand out and advance your career.
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

          {/* Column 2: Resume Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
              Resume Services
            </h3>
            <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
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
                  href="/free-resume-review"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Free Resume Review
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
                  href="/academic-cv-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Academic CV
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
                  href="/jobseekers-combo-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Jobseeker's Combo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Career Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
              Career Services
            </h3>
            <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
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
                  href="/project-portfolio"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/sop-writing-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  SOP Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/career-roadmap-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Career Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/interview-coaching-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Interview Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/membership-application-service"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Membership Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
              Resources & Links
            </h3>
            <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              <li>
                <Link
                  href="/posts"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/impact-stories"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                >
                  Pricing
                </Link>
              </li>
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
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm"
                    {...link}
                  />
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-white mb-3">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#9adaf3] flex-shrink-0" />
                  <a
                    href="tel:+917559112241"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-xs"
                  >
                    +91 7559112241
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#9adaf3] flex-shrink-0" />
                  <a
                    href="mailto:contact@prosumely.com"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-xs"
                  >
                    contact@prosumely.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Prosumely. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="hover:text-[#9adaf3] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-[#9adaf3] transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/cancellation-and-refund"
              className="hover:text-[#9adaf3] transition-colors duration-200"
            >
              Cancellation & Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
