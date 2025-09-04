import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServicesMode } from '@/utilities/getSettings'
import Link from 'next/link'
import React from 'react'
import { Mail, Phone, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const servicesMode = await getServicesMode()

  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

      <div className="container py-12">
        {servicesMode === 'limited' ? (
          /* Limited Mode Layout */
          <>
            {/* First row: Prosumely, Resume Services, Contact Us */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="grid grid-cols-1 gap-y-1">
                  <Link
                    href="/services/jobseeker-cv-combo"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Jobseeker's CV Combo
                  </Link>
                  <Link
                    href="/services/jobseeker-personal-website"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Jobseeker's Personal Website
                  </Link>
                  <Link
                    href="/free-resume-review"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Free Resume Review
                  </Link>
                  <Link
                    href="/services/cv-personal-website-combo"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    CV + Personal Website Combo
                  </Link>
                </div>
              </div>

              {/* Column 3: Contact Us */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Contact Us
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#9adaf3] flex-shrink-0" />
                    <div className="text-gray-400 text-xs">
                      <div className="font-medium text-gray-300 mb-1">Prosumely</div>
                      <a
                        href="tel:+917559112241"
                        className="hover:text-[#9adaf3] transition-colors duration-200 block"
                      >
                        +91 7559112241
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={14} className="text-[#9adaf3] flex-shrink-0 mt-0.5" />
                    <div className="text-gray-400 text-xs">
                      <div className="font-medium text-gray-300 mb-1">Advisor Malcolm Garrington:</div>
                      <div className="space-y-0.5">
                        <a href="tel:+201226955500" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                          Egypt: +20 122 69 555 00
                        </a>
                        <a href="tel:+6281270538590" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                          Indonesia: +62 812 705 3859
                        </a>
                        <a href="tel:+971585648899" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                          UAE: +971 58 564 8899
                        </a>
                      </div>
                    </div>
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

            {/* Second row: Resources & Links and Industries We Serve */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {/* Column: Resources & Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Resources & Links
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Link
                    href="/posts"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/impact-stories"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Impact Stories
                  </Link>
                  <Link
                    href="/testimonials"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/ebooks"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Ebooks
                  </Link>
                  <Link
                    href="/newsroom"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Newsroom
                  </Link>
                  <Link
                    href="/events"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Events
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Contact
                  </Link>
                  {navItems.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                      {...link}
                    />
                  ))}
                </div>
              </div>

              {/* Column: Industries We Serve */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Industries We Serve
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Construction Industry
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Energy - Oil and Gas
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Hospitality & Tourism
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Engineering & Manufacturing
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Logistics & Supply Chain
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Tech & IT
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    BFSI
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Healthcare & Pharma
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Strategy & Consulting
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Sales & Marketing
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Media & Entertainment
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Human Resources
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    FMCG & Retail
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Legal & Compliance
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Public Sector & Government
                  </span>
                  <span className="text-gray-500 text-sm py-1 block cursor-default">
                    Chemicals & Materials
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Full Mode Layout */
          <>
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="space-y-4 mt-8 md:mt-0">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Resume Services
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1">
                  <Link
                    href="/ats-resume-writing-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    ATS Resume
                  </Link>
                  <Link
                    href="/free-resume-review"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Free Resume Review
                  </Link>
                  <Link
                    href="/executive-resume-writing-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Executive Resume
                  </Link>
                  <Link
                    href="/academic-cv-writing-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Academic CV
                  </Link>
                  <Link
                    href="/cover-letter-writing-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Cover Letter
                  </Link>
                  <Link
                    href="/jobseekers-combo-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Jobseeker's Combo
                  </Link>
                </div>
              </div>

              {/* Column 3: Career Services */}
              <div className="space-y-4 mt-8 md:mt-0">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Career Services
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1">
                  <Link
                    href="/linkedin-profile-makeover"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    LinkedIn Profile
                  </Link>
                  <Link
                    href="/project-portfolio"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Project Portfolio
                  </Link>
                  <Link
                    href="/sop-writing-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    SOP Writing
                  </Link>
                  <Link
                    href="/career-roadmap-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Career Roadmap
                  </Link>
                  <Link
                    href="/interview-coaching-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Interview Coaching
                  </Link>
                  <Link
                    href="/membership-application-service"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Membership Application
                  </Link>
                </div>
              </div>

              {/* Column 4: Career Tools */}
              <div className="space-y-4 mt-8 md:mt-0">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Career Tools
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1">
                  <Link
                    href="/career-tools/job-description-keyword-finder"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Keyword Finder
                  </Link>
                </div>
              </div>
            </div>

            {/* Second row: Resources & Links and Industries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {/* Column: Resources & Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Resources & Links
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Link
                    href="/posts"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/impact-stories"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Impact Stories
                  </Link>
                  <Link
                    href="/testimonials"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/ebooks"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Ebooks
                  </Link>
                  <Link
                    href="/newsroom"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Newsroom
                  </Link>
                  <Link
                    href="/events"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Events
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Contact
                  </Link>
                  {navItems.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                      {...link}
                    />
                  ))}
                </div>

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
                      <Phone size={14} className="text-[#9adaf3] flex-shrink-0" />
                      <div className="text-gray-400 text-xs">
                        <div className="font-medium text-gray-300 mb-1">Advisor Malcolm:</div>
                        <div className="space-y-0.5">
                          <a href="tel:+201226955500" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                            Egypt: +20 122 69 555 00
                          </a>
                          <a href="tel:+6281270538590" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                            Indonesia: +62 812 705 3859
                          </a>
                          <a href="tel:+971585648899" className="hover:text-[#9adaf3] transition-colors duration-200 block">
                            UAE: +971 58 564 8899
                          </a>
                        </div>
                      </div>
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

              {/* Column: Industries */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                  Industries We Serve
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Link
                    href="/services?industry=construction-industry"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Construction Industry
                  </Link>
                  <Link
                    href="/services?industry=energy-oil-gas"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Energy - Oil and Gas
                  </Link>
                  <Link
                    href="/services?industry=hospitality-tourism"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Hospitality & Tourism
                  </Link>
                  <Link
                    href="/services?industry=engineering-manufacturing"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Engineering & Manufacturing
                  </Link>
                  <Link
                    href="/services?industry=logistics-supply-chain"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Logistics & Supply Chain
                  </Link>
                  <Link
                    href="/services?industry=tech-it"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Tech & IT
                  </Link>
                  <Link
                    href="/services?industry=banking-financial-services-insurance"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    BFSI
                  </Link>
                  <Link
                    href="/services?industry=healthcare-pharma"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Healthcare & Pharma
                  </Link>
                  <Link
                    href="/services?industry=strategy-consulting"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Strategy & Consulting
                  </Link>
                  <Link
                    href="/services?industry=sales-marketing"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Sales & Marketing
                  </Link>
                  <Link
                    href="/services?industry=media-entertainment"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Media & Entertainment
                  </Link>
                  <Link
                    href="/services?industry=human-resources"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Human Resources
                  </Link>
                  <Link
                    href="/services?industry=fmcg-retail"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    FMCG & Retail
                  </Link>
                  <Link
                    href="/services?industry=legal-compliance"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Legal & Compliance
                  </Link>
                  <Link
                    href="/services?industry=public-sector-government"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Public Sector & Government
                  </Link>
                  <Link
                    href="/services?industry=chemicals-materials"
                    className="text-gray-400 hover:text-[#9adaf3] transition-colors duration-200 text-sm py-1 block"
                  >
                    Chemicals & Materials
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Prosumely. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-4 md:mt-0">
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

            {/* Payment Badge */}
            <a
              href="https://razorpay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4"
            >
              <img
                referrerPolicy="origin"
                src="https://badges.razorpay.com/badge-dark.png"
                style={{ height: '45px', width: '113px' }}
                alt="Razorpay | Payment Gateway | Neobank"
                className="hover:opacity-90 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
