'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { PageHeading } from '@/components/SEO/PageHeading'

interface CareerTool {
  title: string
  description: string
  url: string
  color: string
  icon: React.ReactNode
}

export function CareerToolsPageContent() {
  const [searchQuery, setSearchQuery] = useState('')

  // Define all 27 career tools
  const allTools: CareerTool[] = [
    {
      title: 'Job Description Keyword Finder',
      description:
        'Extract key action verbs, technical skills, and soft skills from job descriptions. Beat ATS systems and optimize your resume.',
      url: '/career-tools/job-description-keyword-finder',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      title: 'AI Cover Letter Generator',
      description:
        'Generate professional, tailored cover letters in seconds. AI-powered tool that analyzes your resume and job description.',
      url: '/career-tools/cover-letter-generator',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Resume Gap Identifier',
      description:
        'Identify missing skills and qualifications between your resume and target job role. Get actionable improvement suggestions.',
      url: '/career-tools/resume-gap-identifier',
      color: 'green',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      title: 'Global Opportunity Heatmap',
      description:
        'Discover the best countries for your career. Explore job demand, salaries, visa friendliness, and remote work opportunities worldwide.',
      url: '/career-tools/global-opportunity-heatmap',
      color: 'indigo',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Leadership Readiness Score',
      description:
        'Assess your leadership potential with our AI-powered evaluation. Get personalized insights, certification recommendations, and a clear development roadmap.',
      url: '/career-tools/leadership-readiness-score',
      color: 'orange',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Career Strength Index',
      description:
        'Comprehensive 360-degree career assessment across skills, experience, network, brand, and market demand. Get your overall career health score and improvement plan.',
      url: '/career-tools/career-strength-index',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Work-Life Balance Index',
      description:
        'Measure your work-life balance across time, flexibility, stress, and health. Identify burnout risk and get personalized recommendations for improving wellness.',
      url: '/career-tools/work-life-balance-index',
      color: 'green',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Lifetime Earning Potential Calculator',
      description:
        'Project your total career earnings from now to retirement. Model different scenarios to understand how career decisions impact lifetime wealth.',
      url: '/career-tools/lifetime-earning-calculator',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Expected Salary Analyzer',
      description:
        'Get data-driven salary expectations by country, experience, and industry. Compare globally and negotiate with confidence.',
      url: '/career-tools/salary-analyzer',
      color: 'green',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Career Roadmap Generator',
      description:
        'Create your personalized career progression plan with phases, skills, certifications, and actionable timelines to reach your target role.',
      url: '/career-tools/career-roadmap-generator',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: 'Freelance Rate Calculator',
      description:
        'Calculate optimal freelance rates and pricing strategy. Get hourly, project-based, and retainer recommendations with negotiation tips.',
      url: '/career-tools/freelance-rate-calculator',
      color: 'pink',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'LinkedIn Profile Generator',
      description:
        'Transform your resume into compelling LinkedIn content. Generate professional headlines, about sections, and ATS-optimized descriptions instantly.',
      url: '/career-tools/linkedin-profile-generator',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      title: 'Future Skills Identifier',
      description:
        'Discover emerging skills for the next 2-5 years. AI-powered analysis identifies future-proof skills based on your industry and career trajectory.',
      url: '/career-tools/future-skills-identifier',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Cost of Living Calculator',
      description:
        'Compare living expenses across countries and cities. Detailed breakdowns of housing, transportation, food, healthcare, and more for smart relocation decisions.',
      url: '/career-tools/cost-of-living-calculator',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Career Transition Calculator',
      description:
        'Assess career change feasibility with risk analysis, skill transferability evaluation, and detailed transition roadmap. Get objective go/no-go recommendations.',
      url: '/career-tools/career-transition-calculator',
      color: 'indigo',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: 'Certification ROI Calculator',
      description:
        'Calculate return on investment for professional certifications. Analyze costs, salary increases, payback periods, and market demand to make smart learning investments.',
      url: '/career-tools/certification-roi-calculator',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: 'AI Skills Readiness Score',
      description:
        'Evaluate your AI proficiency and get a personalized learning path. Measure literacy, tool proficiency, and adaptability to stay competitive in an AI-augmented workplace.',
      url: '/career-tools/ai-skills-readiness',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: 'Work Abroad Savings Calculator',
      description:
        'Calculate realistic savings potential when working internationally. Analyze salary, expenses, remittances, and wealth accumulation for confident expat financial planning.',
      url: '/career-tools/work-abroad-savings',
      color: 'teal',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Retirement Readiness Index',
      description:
        'Evaluate retirement preparedness based on savings, pension contributions, and country-specific retirement systems. Compare security across countries for expats.',
      url: '/career-tools/retirement-readiness',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Salary Comparison Tool',
      description:
        'Compare salary offers across locations with cost-of-living adjustments, tax calculations, and purchasing power analysis. Make informed relocation decisions.',
      url: '/career-tools/salary-comparison',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Next Job Recommender',
      description:
        'Get AI-powered next career move recommendations based on your skills, experience, and goals. Discover suitable roles with transition strategies and success probabilities.',
      url: '/career-tools/next-job-recommender',
      color: 'green',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Skill Gap Analyzer',
      description:
        'Discover exact skills you need for your target role. Get a personalized learning roadmap with resources, timeline, and portfolio projects.',
      url: '/career-tools/skill-gap-analyzer',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Study Abroad ROI Calculator',
      description:
        'Calculate return on investment for international education. Analyze costs, salary boost, career opportunities, and payback period.',
      url: '/career-tools/study-abroad-roi',
      color: 'teal',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Job Market Competition Index',
      description:
        'Analyze job market competition for your role. Understand demand vs supply, get tailored job search strategies.',
      url: '/career-tools/job-demand-supply',
      color: 'pink',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: 'Work Happiness Index',
      description:
        'Evaluate your overall job satisfaction across 13 key dimensions. Get personalized insights and actionable strategies to improve workplace happiness.',
      url: '/career-tools/work-happiness-index',
      color: 'blue',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Global Relocation Affordability Calculator',
      description:
        'Calculate the true cost of international relocation. Get comprehensive breakdown of one-time and ongoing expenses with affordability score.',
      url: '/career-tools/global-relocation-affordability',
      color: 'teal',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'AI Automation Risk Assessment',
      description:
        "Assess your job's vulnerability to AI automation. Understand which tasks are at risk and get actionable career protection strategies.",
      url: '/career-tools/automation-risk',
      color: 'purple',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
  ]

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return allTools
    }

    const query = searchQuery.toLowerCase()
    return allTools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query),
    )
  }, [searchQuery, allTools])

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { text: string; border: string; bg: string }> = {
      blue: {
        text: 'text-blue-600',
        border: 'border-blue-200 group-hover:border-blue-500',
        bg: 'from-blue-50 to-indigo-50',
      },
      purple: {
        text: 'text-purple-600',
        border: 'border-purple-200 group-hover:border-purple-500',
        bg: 'from-purple-50 to-pink-50',
      },
      green: {
        text: 'text-green-600',
        border: 'border-green-200 group-hover:border-green-500',
        bg: 'from-green-50 to-teal-50',
      },
      indigo: {
        text: 'text-indigo-600',
        border: 'border-indigo-200 group-hover:border-indigo-500',
        bg: 'from-indigo-50 to-cyan-50',
      },
      orange: {
        text: 'text-orange-600',
        border: 'border-orange-200 group-hover:border-orange-500',
        bg: 'from-orange-50 to-amber-50',
      },
      pink: {
        text: 'text-pink-600',
        border: 'border-pink-200 group-hover:border-pink-500',
        bg: 'from-pink-50 to-purple-50',
      },
      teal: {
        text: 'text-teal-600',
        border: 'border-teal-200 group-hover:border-teal-500',
        bg: 'from-teal-50 to-blue-50',
      },
    }

    return (
      colorMap[color] || {
        text: 'text-blue-600',
        border: 'border-blue-200 group-hover:border-blue-500',
        bg: 'from-blue-50 to-indigo-50',
      }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeading as="h1" className="text-4xl font-bold text-center mb-4">
          Free AI-Powered Career Tools
        </PageHeading>
        <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Boost your job search with our free professional tools. Generate AI cover letters,
          LinkedIn profiles, identify resume gaps, explore global opportunities, and more.
        </p>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search career tools... (e.g., salary, resume, LinkedIn)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <Link key={tool.url} href={tool.url} className="group">
                  <div
                    className={`bg-gradient-to-br ${colors.bg} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border ${colors.border} h-full flex flex-col`}
                  >
                    <div className={`${colors.text} mb-4`}>{tool.icon}</div>
                    <h3
                      className={`text-xl font-bold mb-3 ${colors.text} group-hover:translate-x-1 transition-transform duration-200`}
                    >
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                    <div
                      className={`flex items-center ${colors.text} font-medium group-hover:translate-x-1 transition-transform`}
                    >
                      Try Free Tool
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No tools found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Professional Help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            While our free tools are great for self-service optimization, sometimes you need expert
            guidance. Our professional resume writers create compelling, ATS-optimized resumes that
            get results.
          </p>
          <Link
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View Professional Services
          </Link>
        </div>
      </div>
    </div>
  )
}
