'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Industry data with both URL formats
const industries = [
  {
    name: 'Construction Industry',
    fullUrl: '/construction-industry/services',
    queryUrl: '/services?industry=construction-industry',
  },
  {
    name: 'Energy - Oil and Gas',
    fullUrl: '/energy-oil-gas-industry/services',
    queryUrl: '/services?industry=energy-oil-gas',
  },
  {
    name: 'Hospitality & Tourism',
    fullUrl: '/hospitality-tourism-industry/services',
    queryUrl: '/services?industry=hospitality-tourism',
  },
  {
    name: 'Engineering & Manufacturing',
    fullUrl: '/engineering-manufacturing-industry/services',
    queryUrl: '/services?industry=engineering-manufacturing',
  },
  {
    name: 'Logistics & Supply Chain',
    fullUrl: '/logistics-supply-chain-industry/services',
    queryUrl: '/services?industry=logistics-supply-chain',
  },
  {
    name: 'Tech & IT',
    fullUrl: '/tech-it-industry/services',
    queryUrl: '/services?industry=tech-it',
  },
  {
    name: 'BFSI',
    fullUrl: '/banking-financial-services-insurance-industry/services',
    queryUrl: '/services?industry=banking-financial-services-insurance',
  },
  {
    name: 'Healthcare & Pharma',
    fullUrl: '/healthcare-pharma-industry/services',
    queryUrl: '/services?industry=healthcare-pharma',
  },
  {
    name: 'Strategy & Consulting',
    fullUrl: '/strategy-consulting-industry/services',
    queryUrl: '/services?industry=strategy-consulting',
  },
  {
    name: 'Sales & Marketing',
    fullUrl: '/sales-marketing-industry/services',
    queryUrl: '/services?industry=sales-marketing',
  },
  {
    name: 'Media & Entertainment',
    fullUrl: '/media-entertainment-industry/services',
    queryUrl: '/services?industry=media-entertainment',
  },
  {
    name: 'Human Resources',
    fullUrl: '/human-resources-industry/services',
    queryUrl: '/services?industry=human-resources',
  },
  {
    name: 'FMCG & Retail',
    fullUrl: '/fmcg-retail-industry/services',
    queryUrl: '/services?industry=fmcg-retail',
  },
  {
    name: 'Legal & Compliance',
    fullUrl: '/legal-compliance-industry/services',
    queryUrl: '/services?industry=legal-compliance',
  },
  {
    name: 'Public Sector & Government',
    fullUrl: '/public-sector-government-industry/services',
    queryUrl: '/services?industry=public-sector-government',
  },
  {
    name: 'Chemicals & Materials',
    fullUrl: '/chemicals-materials-industry/services',
    queryUrl: '/services?industry=chemicals-materials',
  },
]

interface IndustryLinksSectionProps {
  servicesMode?: 'full' | 'limited'
}

const IndustryLinksSection = ({ servicesMode = 'full' }: IndustryLinksSectionProps) => {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_25%,rgba(59,130,246,0.02)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.02)_75%)] bg-[length:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Resumes That Work for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Your Industry
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We create professional resumes with precision tailored to your industry and career path.
          </p>
        </motion.div>

        {/* Industry Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          {industries.map((industry, index) => {
            const isClickable = servicesMode === 'full'

            const cardContent = (
              <>
                {/* Gradient overlay on hover - only for clickable items */}
                {isClickable && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                {/* Shimmer effect - only for clickable items */}
                {isClickable && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                )}

                <div className="relative z-10 flex items-center justify-center">
                  <span className={`text-sm md:text-base font-semibold leading-tight text-center ${
                    isClickable 
                      ? 'text-gray-800 group-hover:text-blue-700 transition-colors duration-300' 
                      : 'text-gray-800'
                  }`}>
                    {industry.name}
                  </span>
                </div>

                {/* Bottom accent line - only for clickable items */}
                {isClickable && (
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-500 ease-out"></div>
                )}
              </>
            )

            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={isClickable ? { y: -5 } : {}}
                className="group"
              >
                {isClickable ? (
                  <Link
                    href={industry.queryUrl}
                    className={`block relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden hover:shadow-2xl hover:bg-white hover:border-blue-200/50 cursor-pointer transition-all duration-300`}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    className={`block relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden cursor-default`}
                  >
                    {cardContent}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Don't see your industry? We work with professionals across all sectors.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Services
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default IndustryLinksSection
