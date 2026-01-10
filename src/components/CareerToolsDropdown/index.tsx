'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function CareerToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  // For desktop: handle hover
  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  // For mobile: handle click (navigate to page)
  const handleClick = (e: React.MouseEvent) => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      // On mobile, navigate to career-tools page
      window.location.href = '/career-tools'
    } else {
      // On desktop/tablet, toggle dropdown
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      {/* Mobile: Direct link - no dropdown */}
      <Link
        href="/career-tools"
        className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="font-medium">Career Tools</span>
      </Link>

      {/* Desktop/Tablet: Dropdown */}
      <div
        className="hidden md:block relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
          <span className="font-medium">Career Tools</span>
          <ChevronDown
            className={`h-4 w-4 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown menu */}
        <div
          className={`absolute right-0 mt-1 w-auto md:min-w-[800px] lg:min-w-[1200px] max-w-[95vw] rounded-xl shadow-2xl bg-white border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 ease-out ${
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

              {/* Grid layout - 2 columns on laptop, 3 columns on large screens */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6">
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
                    <span className="text-xs text-gray-500 mt-1">
                      Find missing skills & experience
                    </span>
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
                    <span className="text-xs text-gray-500 mt-1">
                      Assess your leadership potential
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/career-strength-index"
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-blue-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-blue-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Career Strength Index
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      360° career health assessment
                    </span>
                  </div>
                </Link>
                {/* Show only on large screens (monitors) */}
                <Link
                  href="/career-tools/work-life-balance-index"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-green-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-green-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Work-Life Balance Index
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Burnout risk & wellness assessment
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/lifetime-earning-calculator"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Lifetime Earning Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Project total career earnings
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/salary-analyzer"
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 md:flex"
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
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 md:flex"
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
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 md:flex"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Freelance Rate Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Calculate optimal pricing rates
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/linkedin-profile-generator"
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-[#2563eb] pl-3 -ml-3 md:flex"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      LinkedIn Profile Generator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Create compelling LinkedIn content
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/future-skills-identifier"
                  className="group flex items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3 md:flex"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Future Skills Identifier
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Identify emerging skills for 2-5 years
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/cost-of-living-calculator"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-green-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-green-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Cost of Living Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Compare expenses across cities globally
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/career-transition-calculator"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-cyan-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-cyan-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Career Transition Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Assess career change feasibility & risk
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/certification-roi-calculator"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-blue-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-blue-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Certification ROI Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Calculate training investment returns
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/ai-skills-readiness"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      AI Skills Readiness Score
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Assess AI proficiency & get learning path
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/work-abroad-savings"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-teal-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-teal-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Work Abroad Savings
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Calculate expat savings potential
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/retirement-readiness"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-blue-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-blue-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Retirement Readiness
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Global retirement & pension analysis
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/salary-comparison"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Salary Comparison Tool
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Compare offers across locations
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/next-job-recommender"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-green-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-green-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Next Job Recommender
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      AI-powered career move suggestions
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/skill-gap-analyzer"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Skill Gap Analyzer
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Get personalized learning roadmap
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/study-abroad-roi"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-teal-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-teal-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Study Abroad ROI
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Calculate education investment returns
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/job-demand-supply"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-pink-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-pink-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Job Market Competition
                    </span>
                    <span className="text-xs text-gray-500 mt-1">Analyze demand vs supply</span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/work-happiness-index"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-blue-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-blue-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Work Happiness Index
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Assess job satisfaction & get recommendations
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/global-relocation-affordability"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-teal-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-teal-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Global Relocation Calculator
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Calculate international move costs
                    </span>
                  </div>
                </Link>
                <Link
                  href="/career-tools/automation-risk"
                  className="hidden lg:flex group items-center py-3 text-sm text-gray-800 hover:text-purple-600 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-purple-600 pl-3 -ml-3"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                      AI Automation Risk
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Assess job automation risk & adapt
                    </span>
                  </div>
                </Link>
                {/* View All button - only visible on laptop (md to lg), hidden on mobile and large screens */}
                <Link
                  href="/career-tools"
                  className="hidden md:flex lg:hidden group items-center py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] transition-all duration-200 ease-in-out border-l-4 border-transparent pl-3 -ml-3 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-full">
                    <span className="font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      View All Career Tools →
                    </span>
                  </div>
                </Link>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
