import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import ClientReviews from '@/components/ClientReviews'
import HowItWorksSection from '@/components/HowItWorks'
import ServicesSection from '@/components/ServicesSection'
import IndustryLinksSection from '@/components/IndustryLinksSection'

// --- SEO Metadata ---
export const metadata = {
  title: 'Prosumely | ATS-friendly resume wrting services',
  description:
    "Boost your job search with Prosumely's expert resume writing service. ATS-optimized, keyword-rich, high-impact resumes that help you land your dream job faster.",
  keywords: [
    'resume writing services',
    'professional resume writers',
    'ATS resume',
    'CV writing',
    'cover letter',
    'LinkedIn profile',
    'job search',
    'career services',
  ],
  openGraph: {
    title: 'Prosumely | Professional Resume Writing Services | ATS Resume Experts',
    description:
      "Boost your job search with Prosumely's expert resume writing service. ATS-optimized, keyword-rich, high-impact resumes that help you land your dream job faster.",
    url: 'https://prosumely.com/', // Replace with your actual domain
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg', // Replace with your Open Graph image path
        width: 1200,
        height: 630,
        alt: 'Prosumely Resume writing services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prosumely | Resume wrting services',
    description:
      "Boost your job search with Prosumely's expert resume writing service. ATS-optimized, keyword-rich, high-impact resumes that help you land your dream job faster.",
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'], // Replace with your Open Graph image path
    site: '@prosumely', // Replace with your Twitter handle
  },
  alternates: {
    canonical: 'https://prosumely.com/', // Replace with your actual domain
  },
}
// --- End SEO Metadata ---

export default function LandingPage() {
  return (
    <main>
      <div className="relative h-[55vh] lg:h-[85vh] flex items-center overflow-hidden">
        {/* Background SVG Image - Full Coverage - Hidden on mobile/tablet */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/hero-section-banner2.svg"
            alt="Mountains Background"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-start justify-center lg:items-center lg:justify-start h-full pt-4 pb-4 lg:pt-0 lg:pb-0 w-full">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-800 leading-tight mb-6 tracking-normal">
                Build your Resume from our experts and land your
                <span className="text-blue-600 font-bold"> dream job!</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed font-normal max-w-xl">
                Our team of professional resume designers, domain experts, HRs and industry veterans
                collaborate together to build a professional Resume for you.
              </p>
              <Link href="/services">
                <button className="group relative inline-flex items-center justify-center px-3 py-1.5 lg:px-4 lg:py-2 text-base lg:text-lg font-semibold text-slate-800 bg-gradient-to-br from-cyan-300 via-sky-200 to-blue-300 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-300/60 border-2 border-cyan-400/40 backdrop-blur-sm hover:from-cyan-400 hover:via-sky-300 hover:to-blue-400">
                  {/* Crystalline shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                  {/* Ice crystal facet effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/60 via-transparent via-40% to-blue-400/30 opacity-70"></div>

                  {/* Frosted ice texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>

                  <span className="relative z-10 flex items-center drop-shadow-sm">
                    Get Started Now
                    <svg
                      className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300 text-slate-700"
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
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ServicesSection />
      <IndustryLinksSection />
      {/* <IcebergSection /> */}
      <HowItWorksSection />
      <ClientReviews />
    </main>
  )
}
