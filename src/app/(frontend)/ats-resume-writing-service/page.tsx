import React from 'react'
import { CheckCircle, Clock, FileText, MessageCircle, Mail, Phone } from 'lucide-react'

export default function ATSResumeProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Product Description - Order 2 on mobile */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ATS Resume
              </h1>

              <div className="bg-white/70 backdrop-blur-sm border border-blue-100 p-6 rounded-2xl shadow-sm">
                <p className="text-lg leading-relaxed text-gray-700">
                  <strong className="text-blue-600">
                    Tired of silent job applications? Let us help with our ATS Resume Writing
                    service! 💪
                  </strong>
                  <br />
                  <br />
                  Our experienced writers optimize your resume for Applicant Tracking Systems,
                  ensuring it gets noticed. 🤖👀 Invest in your future with our fast turnaround
                  times and personalized service.
                </p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-sm border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                ATS Resume is a new trend in the recruitment industry wherein your CV is screened on
                the basis of keywords, target titles, skills, experience and overall CV Formatting.
                Large organizations and MNC's receive hundreds of CV's every week and it is
                impossible to shortlist candidates from a pile of hundreds of CV's.
              </p>

              <p className="text-gray-700 leading-relaxed text-base lg:text-lg mt-4">
                Hence Recruiter uses ATS Software or Artificial Intelligence (AI) based screening
                techniques which are system based. We at Prosumely do the exact detailing by{' '}
                <strong className="text-blue-600">re-organizing</strong>,{' '}
                <strong className="text-blue-600">re-formatting</strong>,{' '}
                <strong className="text-blue-600">re-structuring</strong> & develop best quality
                output. We intend to make the CV consistent and clean.
              </p>
            </div>
          </div>

          {/* Right Column - Service Details & Payment - Order 1 on mobile */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-blue-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">ATS Resume</h2>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  $ 20
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">A dedicated professional to your CV</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">ATS optimized</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professionally structured & designed</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">48hrs delivery promise after payment</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Delivered in both PDF & Word format</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700">
                  <strong>Please note:</strong> International payments can be made through
                  Debit/Credit card, offering a convenient option for those without an Indian bank
                  account.
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg mb-6">
                Develop ATS Resume
              </button>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-800 text-center mb-4">
                  Got more queries? Contact us now!
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">WhatsApp</p>
                      <p className="text-sm text-gray-600">+91 7559112241</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email</p>
                      <p className="text-sm text-gray-600">contact@prosumely.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
