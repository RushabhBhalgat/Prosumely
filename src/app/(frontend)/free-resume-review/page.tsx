'use client'
import { useState, useEffect } from 'react'
import {
  CheckCircle,
  Target,
  Search,
  Eye,
  FileText,
  Zap,
  MessageCircle,
  Upload,
  BarChart3,
  Award,
  Rocket,
  Star,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react'
import MyFormComponent from '@/components/MyFormComponent'

export default function FreeResumeReviewPage() {
  const formId = '685e6a9e262e346a3ebce6d6'
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const qualityChecks = [
    { icon: Target, title: 'ATS Compatibility', desc: 'Optimized for tracking systems' },
    { icon: BarChart3, title: 'Quantified Impact', desc: 'Data-driven achievements' },
    { icon: Search, title: 'Keywords', desc: 'Industry-relevant terms' },
    { icon: Eye, title: 'Visually Appealing Design', desc: 'Professional aesthetics' },
    { icon: FileText, title: 'Active Voice Formatting', desc: 'Engaging language style' },
    { icon: Award, title: 'EES Formatting', desc: 'Structured presentation' },
    { icon: CheckCircle, title: 'Grammar Review', desc: 'Error-free content' },
    { icon: Shield, title: 'Structure & Consistency', desc: 'Logical flow' },
    { icon: TrendingUp, title: 'Strengthening Content', desc: 'Impact enhancement' },
    { icon: Zap, title: 'Action Verbs', desc: 'Dynamic language' },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description: "Simply upload your CV to our platform. It's quick, easy, and secure.",
      icon: Upload,
    },
    {
      number: '02',
      title: 'Expert Analysis',
      description:
        "Our team of seasoned industry professionals meticulously reviews your resume. With years of experience and insight into what employers are looking for, they're perfectly equipped to elevate your CV.",
      icon: Search,
    },
    {
      number: '03',
      title: 'Tailored Feedback',
      description:
        "You'll receive personalized feedback that goes beyond basic templates or automated responses. Our experts provide specific, actionable advice to enhance your resume's content, layout, and ATS compatibility.",
      icon: FileText,
    },
    {
      number: '04',
      title: 'Empower Your Job Search',
      description:
        'Implement our suggestions and see the difference it makes in your job applications. A resume that resonates with recruiters can open doors to new career opportunities.',
      icon: Rocket,
    },
  ]

  const benefits = [
    {
      icon: Target,
      title: 'Industry-Specific Insights',
      description:
        'Our experts specialize in various fields, ensuring your resume is reviewed by someone who understands your industry.',
    },
    {
      icon: Eye,
      title: 'Manual Review Process',
      description:
        'Each CV is carefully examined by a human eye, ensuring detailed and relevant feedback.',
    },
    {
      icon: Shield,
      title: 'ATS-Friendly Recommendations',
      description:
        'We help optimize your resume for Applicant Tracking Systems, increasing your chances of getting noticed.',
    },
    {
      icon: Star,
      title: 'No Cost, High Value',
      description:
        'This service is completely free, offering you professional advice without any hidden charges.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gray-50">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-48 h-48 bg-blue-50/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-blue-50/25 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-medium text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Professional Resume Review
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span>Get Your Resume Reviewed</span>
                  <br />
                  <span className="text-4xl lg:text-5xl text-gray-900 font-extrabold">
                    for{' '}
                    <span className="text-white bg-blue-600 px-3 py-1 rounded-lg shadow-sm">
                      FREE
                    </span>
                  </span>
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed">
                  Our team of HR professionals, Industry Experts and Resume designers will review
                  your CV/Resume
                </p>

                <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-xl hover:shadow-md transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-lg">Quick WhatsApp Review</p>
                      <p className="text-gray-700 mt-2">
                        OR You can WhatsApp your CV/Resume on{' '}
                        <a
                          href="https://wa.me/917559112241"
                          className="font-bold text-blue-600 hover:text-blue-700 transition-colors underline decoration-2 underline-offset-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          +91 7559112241
                        </a>{' '}
                        for a free review
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle, text: 'Expert Analysis' },
                  { icon: Clock, text: 'Quick Turnaround' },
                  { icon: FileText, text: 'Detailed Feedback' },
                  { icon: Star, text: '100% Free' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">
                <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Free Resume Review</h2>
                    <p className="text-blue-100 leading-relaxed">
                      Submit your resume for a free professional review. Our experts will provide
                      personalized feedback to help improve your chances of landing interviews.
                    </p>
                  </div>
                </header>

                <div className="p-0">
                  <MyFormComponent formId={formId} hideFormHeader={true} preventRedirect={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Checks Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We Review Resume against{' '}
              <span className="text-blue-600 font-extrabold">50+ Quality Checks</span>
            </h2>
            <p className="text-2xl text-gray-600 font-medium">Here are the Top 10</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {qualityChecks.map((check, index) => {
              const IconComponent = check.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none',
                  }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2 leading-tight">
                      {check.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{check.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Make Your Job Application{' '}
              <span className="text-blue-600 font-extrabold">Stand Out?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Prosumely, we understand the power of a well-crafted resume. That's why we offer an
              exclusive,{' '}
              <strong className="text-blue-600 font-semibold">
                completely free resume review service
              </strong>
              . Here's how it works:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div
                  key={index}
                  className="flex items-start space-x-6 p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our{' '}
              <span className="text-blue-600 font-extrabold">Free Resume Review?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
