import React from 'react'

const IcebergSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24 h-screen mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h1>
            <p className="text-5xl text-gray-600 mb-8 leading-relaxed">
              Because more then your resume template your professional written resume content is
              important!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300">
              Get Started Today
            </button>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-200 rounded-xl h-96 lg:h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-4"></div>
                <img src="/iceberg-why-choose-us.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IcebergSection
