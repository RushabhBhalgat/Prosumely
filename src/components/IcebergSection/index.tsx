import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const IcebergSection = () => {
  return (
    <section className="bg-white py-12 lg:py-24 mt-10">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-6 lg:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h1>
            <p className="text-lg md:text-xl lg:text-3xl text-gray-600 mb-8 leading-relaxed">
              Because more than your resume template, your professionally written resume content is
              important!
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
                  Get Started Today
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

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Image
              src="/iceberg-why-choose-us.png"
              alt="Why Choose Us Iceberg"
              width={643}
              height={700}
              sizes="(max-width: 640px) 340px, (max-width: 768px) 400px, (max-width: 1024px) 480px, (max-width: 1280px) 520px, (max-width: 1536px) 600px, 643px"
              className="max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[643px] w-full h-auto rounded-xl shadow-lg object-contain"
              style={{ maxHeight: '700px' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default IcebergSection
