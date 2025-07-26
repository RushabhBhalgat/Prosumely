import Link from 'next/link'
import React from 'react'
import { ArrowLeft, Calendar, Clock, Users, Play, TrendingUp } from 'lucide-react'

export const metadata = {
  title:
    'From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool | Prosumely Webinar',
  description:
    'Navigate mid-career transitions with confidence. Learn how to reinvent your career and position yourself for new opportunities with strategic resume writing.',
  keywords: [
    'mid career transition',
    'career change',
    'career reinvention',
    'resume for career change',
    'professional pivot',
    'mid career crisis',
    'career clarity',
    'prosumely webinar',
  ],
  openGraph: {
    title: 'From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool',
    description:
      'Navigate mid-career transitions with confidence. Learn how to reinvent your career and position yourself for new opportunities with strategic resume writing.',
    url: 'https://prosumely.com/events/webinars/mid-career-reinvention-webinar',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://prosumely.com/prosumely-execuitve-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Mid-Career Reinvention Webinar by Prosumely',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool',
    description:
      'Navigate mid-career transitions with confidence. Learn how to reinvent your career and position yourself for new opportunities with strategic resume writing.',
    images: ['https://prosumely.com/prosumely-execuitve-resume-writing-opengraph.jpg'],
  },
}

export default function MidCareerReinventionWebinarPage() {
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
      <section className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Career Transformation
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform career uncertainty into purposeful direction with strategic resume
              positioning
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center bg-green-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2" />
              <span>March 8, 2025</span>
            </div>
            <div className="flex items-center bg-green-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>70 minutes</span>
            </div>
            <div className="flex items-center bg-green-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              <span>1,800+ views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Mid-Career Gets Hard</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-orange-900 mb-2">The Identity Question</h3>
                <p>
                  When you're early in your career, everything is about growth. But mid-career?
                  That's where identity questions creep in. Have I done enough? Am I in the right
                  place? What's next?
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">The Experience Trap</h3>
                <p>
                  You're too experienced for junior roles, but not quite hitting that VP track.
                  Maybe you want to shift industries, go freelance, or try leadership. But your
                  resume? It's still telling your old story.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">The Resume as a Mirror</h3>
                <p>
                  Your resume reflects how you see yourself. When it's outdated or unfocused, it
                  reinforces doubt. But when it's clear, purposeful, and future-aligned, it builds
                  clarity and momentum.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reinvention Starts with Reframing
            </h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                You don't need to erase your past—you need to reframe it. Transform tasks into
                outcomes and experience into value.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-red-900 mb-4">❌ Before Reframing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>"15 years in operations"</li>
                    <li>"Managed projects"</li>
                    <li>"Responsible for team coordination"</li>
                    <li>"Handled client communications"</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-4">✅ After Reframing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      "Proven leader in optimizing cross-functional teams to drive scalable growth"
                    </li>
                    <li>"Delivered $10M in projects with 98% on-time delivery"</li>
                    <li>"Led 25+ person teams across 3 departments"</li>
                    <li>"Maintained 95% client satisfaction across 50+ accounts"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cut the Clutter</h2>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  The Mid-Career Excess Problem
                </h3>
                <p>
                  Mid-career resumes often suffer from excess. Old roles, early jobs, outdated
                  tools. It's time to trim. Focus on the last 10–15 years. Highlight leadership,
                  strategy, and results. Keep only what supports your next move.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">10-15</div>
                  <div className="text-sm text-gray-600">Years of Experience to Include</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">3-5</div>
                  <div className="text-sm text-gray-600">Key Achievements per Role</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">2 Pages</div>
                  <div className="text-sm text-gray-600">Maximum Length</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Vision Statement</h2>

            <div className="space-y-6">
              <p className="text-gray-700">
                Don't just open with a generic summary. Use a personal statement that says where
                you're going.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-3">Example Vision Statement:</h3>
                <blockquote className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4">
                  "Senior business strategist with 18 years' experience driving turnaround growth.
                  Now seeking to lead transformation in sustainability-driven companies."
                </blockquote>
                <p className="text-blue-800 mt-3 font-medium">It's bold. It signals clarity.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Success Story: HR to DEI Leadership
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">The Challenge</h3>
                  <p className="text-gray-700 mb-4">
                    One of our clients—an HR generalist—wanted to pivot into DEI leadership. Her
                    original resume just listed duties with no clear direction.
                  </p>

                  <h3 className="font-semibold text-green-900 mb-3">The Solution</h3>
                  <p className="text-gray-700">
                    We helped her spotlight her relevant experience and reframe her background for
                    DEI roles.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-teal-900 mb-3">Key Highlights We Added</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Inclusion initiatives she led
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      Diversity metrics she improved
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      ERGs (Employee Resource Groups) she launched
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="font-semibold text-green-700">
                      Result: She landed a DEI manager role within two months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">From Doubt to Direction</h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">The Missing Narrative</h3>
                <p>
                  What holds most people back at mid-career is not a lack of skills—it's a lack of
                  narrative. You need to connect the dots between your past and your desired future.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  The Power of a Strategic Resume
                </h3>
                <p>
                  A powerful resume gives you a platform to reintroduce yourself. It's not just a
                  document—it's a confidence builder and a conversation starter.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Q&A Highlights</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: What if I want to try a totally new field?
                </h3>
                <p className="text-gray-700">
                  A: Transferable skills matter. Project management, leadership, communication, tech
                  fluency—these cut across industries. We help you reframe those for the new
                  context.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: I haven't updated my resume in 8 years. Where do I begin?
                </h3>
                <p className="text-gray-700">
                  A: Start by identifying your top 3–5 achievements. Then let us help you structure
                  them into a compelling story aligned with your goals.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for Your Career Reinvention?</h2>
            <p className="text-green-100 mb-6 text-lg">
              Mid-career is not a crisis—it's a crossroads. And your resume is the vehicle that can
              take you to your next destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/executive-resume-writing-service"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                Executive Resume Writing
              </Link>
              <Link
                href="/career-roadmap-service"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Career Roadmap Service
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
              href="/events/webinars/personal-branding-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                The Future of Job Search: Why Personal Branding is the New Resume
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Build a powerful personal brand that supports your career reinvention
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>

            <Link
              href="/events/webinars/ats-optimization-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Ensure your reinvented resume gets past modern screening systems
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
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
