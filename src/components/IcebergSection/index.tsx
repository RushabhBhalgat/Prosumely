import React from 'react'

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-colors duration-300">
              Get Started Today
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src="/iceberg-why-choose-us.png"
              alt="Why Choose Us Iceberg"
              className="max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[643px] w-full h-auto rounded-xl shadow-lg object-contain"
              style={{ maxHeight: '700px' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default IcebergSection
