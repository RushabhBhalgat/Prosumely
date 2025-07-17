'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  title?: string
  faqs: FAQItem[]
}

const ServiceFAQ: React.FC<ServiceFAQProps> = ({ title = 'Frequently Asked Questions', faqs }) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-blue-100 pt-4">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help! Contact us directly for personalized assistance.
            </p>
            <div className="space-y-3">
              <div className="text-gray-700">
                <span className="font-medium">Phone:</span> +91 7559112241
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Email:</span> contact@prosumely.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceFAQ
