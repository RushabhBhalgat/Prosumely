import React from 'react'
import { PageHeading } from '@/components/SEO/PageHeading'

const CareerTools = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9adbf4]/10 to-white p-4">
      <PageHeading as="h1">Career Tools</PageHeading>
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500">
        <div className="h-2 bg-gradient-to-r from-[#2563eb] to-[#9adbf4]"></div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#2563eb] mb-4 animate-pulse">Career Tools</h2>
          <div className="h-1 w-20 bg-[#9adbf4] mb-6"></div>
          <p className="text-xl font-medium text-gray-700 mb-8">Coming Soon</p>
          <p className="text-gray-600 mb-8">
            We're working on something amazing to help boost your career. Stay tuned for our
            powerful tools and resources.
          </p>

          <div className="mt-10 flex space-x-2 justify-center">
            <div className="w-3 h-3 rounded-full bg-[#2563eb] animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-[#9adbf4] animate-bounce delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-[#2563eb] animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerTools
