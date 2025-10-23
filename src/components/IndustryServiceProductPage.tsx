'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, FileText, ArrowRight, Mail, MessageCircle } from 'lucide-react'

interface ServiceData {
  service: {
    title: string
    price: string
    currency: string
    tagline: string
    description: string
    detailedDescription: string
  }
  contact: {
    whatsapp: string
    email: string
    note: string
  }
  redirectLink: string
  features: Array<{
    icon: any
    color: string
    text: string
  }>
  deliveryInfo: {
    timeframe: string
    formats: string[]
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

interface IndustryServiceProductPageProps extends ServiceData {
  industry: string
  industryDisplayName: string
}

export default function IndustryServiceProductPage({
  service,
  contact,
  redirectLink,
  features,
  deliveryInfo,
  faqs,
  industry,
  industryDisplayName,
}: IndustryServiceProductPageProps) {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4">
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-600 transition-colors">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${industry}-industry`}
              className="hover:text-blue-600 transition-colors"
            >
              {industryDisplayName}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Industry Badge */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 pt-8">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
          Specialized for {industryDisplayName} Professionals
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Service Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {service.title}
              <span className="block text-2xl md:text-3xl text-blue-600 mt-2 font-semibold">
                for {industryDisplayName}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-medium">{service.tagline}</p>

            <div
              className="prose prose-lg max-w-none text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />

            {/* Price Tag */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Investment</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{service.currency}{service.price}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm font-medium mb-1">Delivery</p>
                  <p className="text-2xl font-bold">{deliveryInfo.timeframe}</p>
                </div>
              </div>
              <p className="text-blue-50 text-sm">One-time payment • No hidden fees</p>
            </div>

            {/* CTA Button */}
            <Link href={redirectLink}>
              <button className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg border-2 border-blue-600">
                Get Started Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>

            <p className="text-center text-gray-500 text-sm mt-4">
              Tailored specifically for construction industry professionals
            </p>
          </div>

          {/* Right Column - Features & Details */}
          <div className="space-y-8">
            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-500" />
                What's Included
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 ${feature.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-700">{feature.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-7 h-7 text-blue-500" />
                Delivery Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Timeline</p>
                  <p className="text-lg text-gray-900">{deliveryInfo.timeframe}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Formats Provided</p>
                  <div className="flex gap-2 flex-wrap">
                    {deliveryInfo.formats.map((format, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Have Questions?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">WhatsApp</p>
                    <p className="text-gray-900">{contact.whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">{contact.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            About This Service
          </h2>
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
          />
        </div>
      </section>

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <span
                      className={`text-blue-600 text-2xl font-bold transform transition-transform ${
                        openFAQ === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-5 text-gray-700 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Advance Your Construction Career?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Get started with our {service.title} designed specifically for {industryDisplayName} professionals
          </p>
          <Link href={redirectLink}>
            <button className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg">
              Start Your Journey Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
