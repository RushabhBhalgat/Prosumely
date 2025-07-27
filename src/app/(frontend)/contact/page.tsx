import MyFormComponent from '@/components/MyFormComponent'
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react'

export const metadata = {
  title: 'Contact Us | Professional Resume Writing Services | Prosumely',
  description:
    'Get in touch with Prosumely for professional resume writing, CV services, and career consulting. Contact our expert team for personalized career assistance and support.',
  keywords: [
    'contact prosumely',
    'resume writing contact',
    'career services contact',
    'professional CV writers',
    'resume consultation',
    'career coaching contact',
    'job search assistance',
    'resume help',
  ],
  openGraph: {
    title: 'Contact Us | Professional Resume Writing Services | Prosumely',
    description:
      'Get in touch with Prosumely for professional resume writing, CV services, and career consulting. Contact our expert team for personalized career assistance.',
    url: 'https://www.prosumely.com/contact',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Prosumely',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Professional Resume Writing Services | Prosumely',
    description:
      'Get in touch with Prosumely for professional resume writing, CV services, and career consulting. Contact our expert team for personalized career assistance.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/contact',
  },
}

export default function ContactPage() {
  // Use the known form ID directly
  const formId = '68309c9ddb87b9482d0315bc'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#2563eb] mb-12 text-center">Get In Touch</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="mr-3 text-[#2563eb]" size={24} />
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <Globe
                      className="mr-4 text-[#2563eb] group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Website</p>
                      <a
                        href="https://www.prosumely.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563eb] hover:text-blue-700 font-semibold"
                      >
                        www.prosumely.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <Mail
                      className="mr-4 text-[#2563eb] group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email</p>
                      <a
                        href="mailto:contact@prosumely.com"
                        className="text-[#2563eb] hover:text-blue-700 font-semibold"
                      >
                        contact@prosumely.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                    <Phone
                      className="mr-4 text-[#2563eb] group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Phone</p>
                      <a
                        href="tel:+917559112241"
                        className="text-[#2563eb] hover:text-blue-700 font-semibold"
                      >
                        +91 7559112241
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h2>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.facebook.com/prosumely.cv.5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://x.com/prosumely"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/prosumely/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://www.youtube.com/@prosumely8704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Youtube size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>

                <p className="text-gray-600 mt-4 text-sm">
                  Follow us on social media for updates and insights
                </p>
              </div>

              {/* Quick Response Info */}
              <div className="bg-gradient-to-r from-[#2563eb] to-blue-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3">Quick Response Guarantee</h3>
                <p className="text-blue-100 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online now</span>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#2563eb] to-blue-600 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-blue-100">
                    We'd love to hear from you. Fill out the form below and we'll get back to you
                    soon.
                  </p>
                </div>
                <div className="p-0">
                  <MyFormComponent formId={formId} hideFormHeader={true} preventRedirect={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Strip */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Mail className="text-[#2563eb]" size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm">
                  Get comprehensive answers to your questions via email
                </p>
              </div>

              <div className="group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Phone className="text-[#2563eb]" size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm">
                  Speak directly with our team for immediate assistance
                </p>
              </div>

              <div className="group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Globe className="text-[#2563eb]" size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Online Resources</h3>
                <p className="text-gray-600 text-sm">
                  Explore our website for detailed information and resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
