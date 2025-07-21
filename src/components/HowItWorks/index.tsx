'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FileText, Users, Sparkles, CheckCircle, Clock } from 'lucide-react'

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      number: 1,
      title: 'Share Your Story',
      subtitle: 'Tell us about your goal',
      description:
        'Send us your current resume along with your career goal and target location—lets get started!',
      icon: FileText,
      color: 'from-cyan-400 to-blue-500',
      highlights: ['Current Resume', 'Career Goal', 'Target Location'],
      time: '2 minutes',
    },
    {
      number: 2,
      title: 'Our Experts Take Over',
      subtitle: 'Professional crafting begins',
      description:
        'Get your first draft in 2 days—crafted by experts for your target role and industry.',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      highlights: ['Expert Writers', 'Industry Standards', 'First Draft'],
      time: '2-3 days',
    },
    {
      number: 3,
      title: 'We Perfect It Together',
      subtitle: 'Collaborative refinement',
      description:
        "Unlimited revisions until you're 100% satisfied—your feedback shapes the final draft.",
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      highlights: ['Unlimited Revisions', 'Your Feedback', '100% Satisfaction'],
      time: '24-48 hours',
    },
    {
      number: 4,
      title: 'Get Your Final Resume',
      subtitle: 'Ready to impress employers',
      description: 'Get your final resume in Word and PDF—ATS-ready and employer-approved.',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      highlights: ['Word & PDF Format', 'ATS Optimized', 'Employer Ready'],
      time: 'Instant delivery',
    },
  ]

  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-10 w-32 h-32 bg-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 w-28 h-28 bg-indigo-300 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simple & Effective Process</span>
          </div>
          <h2 className="  text-gray-900 mb-4">
            <span className="text-4xl md:text-5xl text-blue-600 font-bold">How It Works</span>
            <span className="text-xl block text-gray-800">
              Resume Writing Made Simple in 4 Steps
            </span>
          </h2>
        </div>

        {/* Desktop Steps - Interactive Timeline */}
        <div className="hidden lg:block mb-16">
          <div className="relative max-w-6xl mx-auto">
            {/* Progress Line */}
            <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 via-indigo-200 to-purple-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(activeStep / 4) * 100}%` }}
              ></div>
            </div>

            {/* Step Cards */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step) => {
                const IconComponent = step.icon
                const isActive = activeStep >= step.number

                return (
                  <div
                    key={step.number}
                    className={`relative cursor-pointer transition-all duration-500 ${
                      isActive ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onMouseEnter={() => setActiveStep(step.number)}
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                        isActive
                          ? `bg-gradient-to-r ${step.color} text-white shadow-xl`
                          : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}
                    >
                      <span className="font-bold text-lg">{step.number}</span>
                      {/* Pulse Effect */}
                      {isActive && (
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} animate-ping opacity-20`}
                        ></div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div
                      className={`bg-white/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                        isActive ? 'border-blue-200 shadow-xl' : 'border-gray-100'
                      }`}
                    >
                      {/* Title */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-3 text-center">
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                        {step.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2">
                        {step.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <div
                              className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-400' : 'bg-gray-300'}`}
                            ></div>
                            <span
                              className={isActive ? 'text-blue-700 font-medium' : 'text-gray-500'}
                            >
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Steps - Vertical Layout */}
        <div className="lg:hidden mb-16">
          <div className="max-w-2xl mx-auto space-y-8">
            {steps.map((step, index) => {
              return (
                <div key={step.number} className="relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-12 w-0.5 h-12 bg-gradient-to-b from-blue-200 to-transparent"></div>
                  )}

                  <div className="flex gap-4">
                    {/* Step Number in Icon Design */}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-r ${step.color} text-white font-bold text-base`}
                    >
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-4 shadow-lg">
                      {/* Title & Subtitle */}
                      <div className="mb-2">
                        <h3 className="font-bold text-base text-gray-900 mb-0.5">{step.title}</h3>
                        <p className="text-xs text-blue-600 font-medium">{step.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{step.time}</span>
                      </div>

                      <p className="text-gray-600 text-xs leading-relaxed mb-2">
                        {step.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {step.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-200 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands who've landed their dream jobs with our expert resume writing service
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
    </section>
  )
}
