'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  [category: string]: FAQItem[]
}

interface FAQPageContentProps {
  faqs: FAQCategory
}

const FAQPageContent: React.FC<FAQPageContentProps> = ({ faqs }) => {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(faqs)[0] || '')
  const [openItems, setOpenItems] = useState<{ [key: string]: number[] }>({})

  const toggleItem = (category: string, index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(index)
        ? prev[category].filter((i) => i !== index)
        : [...(prev[category] || []), index],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-500/5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to all your questions about our professional resume writing, career
            coaching, and job search services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Topics</h3>
                <div className="space-y-2">
                  {Object.keys(faqs).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white/70 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-blue-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{activeTab}</h2>
                <div className="space-y-4">
                  {faqs[activeTab as keyof typeof faqs]?.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(activeTab, index)}
                        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-xl"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {openItems[activeTab]?.includes(index) ? (
                              <ChevronUp className="w-5 h-5 text-blue-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </button>

                      {openItems[activeTab]?.includes(index) && (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Contact us directly for personalized assistance with your
              career goals.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                <Phone className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">Phone</p>
                  <p className="text-sm text-gray-600">+91 7559112241</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                <Mail className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">contact@prosumely.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default FAQPageContent
