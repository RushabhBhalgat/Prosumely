'use client'

import React, { useEffect, useState } from 'react'
import { Mail, Phone, Check, ChevronRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

const ThankYouPage = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true)

    // Optional: Add confetti effect
    const showConfetti = async () => {
      const { default: confetti } = await import('canvas-confetti')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#9adaf3', '#60a5fa', '#93c5fd'],
      })
    }

    try {
      showConfetti()
    } catch (error) {
      console.log('Confetti animation not loaded')
    }
  }, [])

  return (
    <>
      {/* Add a head element with robots meta tag */}
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
        {/* Rest of your component remains unchanged */}
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-50/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-50/40 rounded-full blur-3xl"></div>
        </div>

        {/* ... rest of your component code ... */}
        <div className="relative max-w-3xl mx-auto">
          {/* Success Icon with animation */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full animate-ping opacity-60"></div>
            </div>
          </div>

          {/* Main card */}
          <div
            className={`bg-white border border-gray-200 rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Thank You for Choosing <span className="text-blue-600">Prosumely</span>!
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full"></div>
            </div>

            {/* Message */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-6">
                We've received your payment and have initiated work on your request. Our team of
                professionals is committed to delivering high-quality results that exceed your
                expectations.
              </p>
              <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full text-sm font-medium text-green-800 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Your order is now being processed
              </div>
            </div>

            {/* Contact information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 text-center mb-6">
                Have questions? We're here to help!
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-4 rounded-lg transition-all duration-200">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/917559112241"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      +91 7559112241
                    </a>
                  </div>
                </div>

                <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-4 rounded-lg transition-all duration-200">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <a
                      href="mailto:contact@prosumely.com"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      contact@prosumely.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 text-center mb-6">What Happens Next?</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Our expert will reach out to you within 24 hours to gather additional
                      information if needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      You'll receive your completed documents for review, with the opportunity for
                      revisions if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-all duration-300 text-center"
              >
                Explore More Services
              </Link>
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>

          {/* Prosumely branding */}
          <div
            className={`mt-8 text-center transition-all duration-1000 delay-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Prosumely. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYouPage
