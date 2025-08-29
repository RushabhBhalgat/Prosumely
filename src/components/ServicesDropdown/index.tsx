'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ServicesDropdown({ servicesMode = 'full' }: { servicesMode?: 'full' | 'limited' }) {
  const [isOpen, setIsOpen] = useState(false)

  // For desktop: handle hover
  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  // For mobile: handle click
  const handleClick = () => setIsOpen(!isOpen)

  // Limited services for dropdown
  const limitedServices = [
    {
      name: "Jobseeker's CV Combo",
      path: '/services/jobseeker-cv-combo',
      description: 'Complete career branding kit',
    },
    {
      name: "Jobseeker's Personal Website",
      path: '/services/jobseeker-personal-website',
      description: 'Your digital brand hub',
    },
    {
      name: 'CV + Personal Website Combo',
      path: '/services/cv-personal-website-combo',
      description: 'CV + Website for maximum impact',
    },
    {
      name: 'Free Resume Review',
      path: '/free-resume-review',
      description: 'Professional feedback on your current resume',
      free: true,
    },
  ]

  // servicesMode is now passed as a prop for reliable SSR/client-side rendering

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

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-1 w-[90vw] ${
          servicesMode === 'full' ? 'max-w-[800px]' : 'max-w-[500px]'
        } rounded-xl shadow-2xl bg-white border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Gradient header */}
        <div className="h-1 bg-gradient-to-r from-[#9adaf3] to-[#2563eb]"></div>

        <div className={`p-6 grid grid-cols-1 ${
          servicesMode === 'full' ? 'md:grid-cols-3' : 'md:grid-cols-2'
        } gap-4`}>
          {servicesMode === 'limited' ? (
            limitedServices.map((service) => (
              <Link
                key={service.path}
                href={service.path}
                className={`group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 ${service.free ? 'bg-blue-50 rounded-md' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex flex-col">
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                    {service.name}
                    {service.free && (
                      <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{service.description}</span>
                </div>
              </Link>
            ))
          ) : (
            // Full services mode
            <>
              {/* Resume Services Column */}
              <div>
                <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  Resume Services
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/ats-resume-writing-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        ATS Resume Writing
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Optimized for applicant tracking systems</span>
                    </div>
                  </Link>
                  <Link
                    href="/executive-resume-writing-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Executive Resume Writing
                      </span>
                      <span className="text-xs text-gray-500 mt-1">For senior leadership positions</span>
                    </div>
                  </Link>
                  <Link
                    href="/academic-cv-writing-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Academic CV Writing
                      </span>
                      <span className="text-xs text-gray-500 mt-1">For academic and research positions</span>
                    </div>
                  </Link>
                  <Link
                    href="/free-resume-review"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 bg-blue-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                        Free Resume Review
                        <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                          FREE
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Professional feedback on your current resume</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Career Advancement Column */}
              <div>
                <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  Career Advancement
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/linkedin-profile-makeover"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        LinkedIn Profile Makeover
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Optimize your professional presence</span>
                    </div>
                  </Link>
                  <Link
                    href="/jobseekers-combo-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Jobseeker's Combo
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Complete career branding package</span>
                    </div>
                  </Link>
                  <Link
                    href="/cover-letter-writing-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Cover Letter Writing
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Compelling cover letters that get noticed</span>
                    </div>
                  </Link>
                  <Link
                    href="/project-portfolio"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Project Portfolio
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Showcase your work professionally</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Additional Services Column */}
              <div>
                <h3 className="font-bold text-[#2563eb] mb-3 text-sm uppercase tracking-wider border-b pb-2">
                  Additional Services
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/interview-coaching-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Interview Coaching
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Ace your interviews with confidence</span>
                    </div>
                  </Link>
                  <Link
                    href="/sop-writing-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        SOP Writing
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Statement of purpose for applications</span>
                    </div>
                  </Link>
                  <Link
                    href="/career-roadmap-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Career Roadmap
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Strategic career planning guidance</span>
                    </div>
                  </Link>
                  <Link
                    href="/membership-application-service"
                    className="group flex items-center py-2 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        Membership Application
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Professional association applications</span>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
