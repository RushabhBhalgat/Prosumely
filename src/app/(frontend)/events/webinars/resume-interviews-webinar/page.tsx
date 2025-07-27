import Link from 'next/link'
import React from 'react'
import { ArrowLeft, Calendar, Clock, Users, Play } from 'lucide-react'

export const metadata = {
  title: 'Resume to Interview Success Webinar | Master Your Job Application Strategy | Prosumely',
  description:
    'Join our live webinar to learn why resumes get rejected and discover proven strategies to land more interviews. Expert insights on ATS optimization, formatting, and results-driven content.',
  keywords: [
    'resume not getting interviews',
    'resume optimization',
    'ATS resume',
    'job application tips',
    'resume writing tips',
    'interview callbacks',
    'resume black hole',
    'prosumely webinar',
  ],
  openGraph: {
    title: 'Resume to Interview Success Webinar | Master Your Job Application Strategy',
    description:
      'Join our live webinar to learn why resumes get rejected and discover proven strategies to land more interviews. Expert insights on ATS optimization, formatting, and results-driven content.',
    url: 'https://www.prosumely.com/events/webinars/resume-interviews-webinar',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://www.prosumely.com/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Resume Interview Tips Webinar by Prosumely',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume to Interview Success Webinar | Master Your Job Application Strategy',
    description:
      'Join our live webinar to learn why resumes get rejected and discover proven strategies to land more interviews. Expert insights on ATS optimization, formatting, and results-driven content.',
    images: ['https://www.prosumely.com/prosumely-ats-resume-writing-opengraph.jpg'],
  },
}

export default function ResumeInterviewsWebinarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Featured Webinar
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Why Your Resume Isn't Getting You Interviews — And What to Do About It
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the brutal truth about why your resume gets ignored and learn proven
              strategies to fix it
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center bg-blue-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2" />
              <span>January 15, 2025</span>
            </div>
            <div className="flex items-center bg-blue-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>60 minutes</span>
            </div>
            <div className="flex items-center bg-blue-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              <span>2,500+ views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Webinar Highlights</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">The Resume Black Hole</h3>
                <p>
                  Every job opening receives an average of 250 applications, but only 4-6 candidates
                  get called for an interview. Learn why you're competing with hundreds of people
                  and how recruiters actually scan resumes in just 6-8 seconds.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  What Hiring Managers Really Want
                </h3>
                <p>
                  Discover the secret: hiring managers aren't just looking at what you've
                  done—they're hunting for proof of performance. Learn how to showcase impact,
                  problem-solving abilities, and measurable results that catch their attention.
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-orange-900 mb-2">The ATS Keyword Disconnect</h3>
                <p>
                  Your resume might say "digital marketing experience," but if the job description
                  asks for "SEO" and "campaign management," you'll be filtered out by the Applicant
                  Tracking System before any human sees your application.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Format That Works</h3>
                <p>
                  Outdated resumes scream "I'm not keeping up." Learn the modern formatting
                  techniques that work for both ATS systems and human eyes—clean layouts, strategic
                  white space, and professional visual hierarchy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Takeaways</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Before the Fix:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Managed social media accounts"
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Generic responsibilities listed
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No measurable results
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">After the Fix:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Grew Instagram engagement by 230%"
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Led 5 cross-platform campaigns"
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    "Boosted lead generation by 45%"
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Story</h2>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <blockquote className="text-gray-700 italic mb-4">
                "One of our clients was a mid-level operations manager applying for senior roles.
                His original resume listed 10+ responsibilities per job. We transformed it into a
                results-driven document."
              </blockquote>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-900 mb-2">Transformation Example:</p>
                <p className="text-red-600 mb-2">❌ Before: "Responsible for inventory control"</p>
                <p className="text-green-600">
                  ✅ After: "Reduced inventory errors by 37% through process redesign, saving the
                  company $1.2M in six months"
                </p>
              </div>

              <p className="font-semibold text-blue-700">
                Result: He landed three interviews in a week—after months of silence.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Q&A Highlights</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: What if I'm switching industries?
                </h3>
                <p className="text-gray-700">
                  A: Great question. If you're transitioning, your resume needs to emphasize
                  transferable skills and results. We reframe your experience to show how it applies
                  in the new context. It's not about changing your past—it's about how you position
                  it.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: Should I use a template from Canva or online tools?
                </h3>
                <p className="text-gray-700">
                  A: Use with caution. Many look great but are not ATS-friendly. Avoid columns, text
                  boxes, or graphics that ATS can't read. Keep it simple and structured.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Resume?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              If your resume isn't getting interviews, don't assume it's you. It could just be the
              way your value is being presented.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ats-resume-writing-service"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Get Professional Resume Help
              </Link>
              <Link
                href="/free-resume-review"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Free Resume Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Webinars</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/events/webinars/ats-optimization-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Master the art of getting past automated screening systems
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>

            <Link
              href="/events/webinars/personal-branding-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                The Future of Job Search: Why Personal Branding is the New Resume
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Learn how to build a powerful personal brand that attracts opportunities
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
