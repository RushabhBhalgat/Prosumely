'use client'
import React, { useState } from 'react'
import { FileText, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

const ResumeReviewCTA: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)
    // Add your actual click handler here
    console.log('Free resume review clicked!')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="relative">
        {/* Animated background glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>

        {/* Main CTA Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-blue-100">
          {/* Header with icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-blue-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Title and subtitle */}
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Get Your FREE Resume Review
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Professional feedback from industry experts to boost your job prospects
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-3 mb-8">
            {[
              'Expert analysis in 24 hours',
              'Personalized improvement suggestions',
              'ATS optimization tips',
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative w-full bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 
              text-white font-semibold py-4 px-8 rounded-xl
              shadow-lg hover:shadow-xl
              transform transition-all duration-300 ease-out
              ${isHovered ? 'scale-105 -translate-y-1' : 'scale-100'}
              ${isClicked ? 'scale-95' : ''}
              focus:outline-none focus:ring-4 focus:ring-blue-300
              group overflow-hidden
            `}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button content */}
            <div className="relative flex items-center justify-center space-x-3">
              <span className="text-lg sm:text-xl font-bold">Start Free Review</span>
              <ArrowRight
                className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>No Spam</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full animate-bounce opacity-60"></div>
        <div
          className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-300 rounded-full animate-bounce opacity-60"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    </div>
  )
}

export default ResumeReviewCTA
