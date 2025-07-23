import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { ArrowLeft, Calendar, Clock, Users, Play, Download, Share2 } from 'lucide-react'

export const metadata = {
  title: 'The Future of Job Search: Why Personal Branding is the New Resume | Prosumely Webinar',
  description:
    'Discover why personal branding has become more important than your resume in 2025. Learn how to build a compelling personal brand across LinkedIn, social media, and beyond.',
  keywords: [
    'personal branding',
    'job search trends',
    'linkedin optimization',
    'professional branding',
    'career development',
    'online presence',
    'thought leadership',
    'prosumely webinar',
  ],
  openGraph: {
    title: 'The Future of Job Search: Why Personal Branding is the New Resume',
    description:
      'Discover why personal branding has become more important than your resume in 2025. Learn how to build a compelling personal brand across LinkedIn, social media, and beyond.',
    url: 'https://prosumely.com/events/webinars/personal-branding-webinar',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://prosumely.com/prosumely-linkedin-profile-makeover-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Branding Webinar by Prosumely',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Future of Job Search: Why Personal Branding is the New Resume',
    description:
      'Discover why personal branding has become more important than your resume in 2025. Learn how to build a compelling personal brand across LinkedIn, social media, and beyond.',
    images: ['https://prosumely.com/prosumely-linkedin-profile-makeover-opengraph.jpg'],
  },
}

export default function PersonalBrandingWebinarPage() {
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
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Trending Webinar
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              The Future of Job Search: Why Personal Branding is the New Resume
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              In 2025, it's not just what's on your resume—it's everything about how you show up
              online and offline
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center bg-purple-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2" />
              <span>February 12, 2025</span>
            </div>
            <div className="flex items-center bg-purple-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>65 minutes</span>
            </div>
            <div className="flex items-center bg-purple-600 bg-opacity-50 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              <span>3,100+ views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Evolution of Job Search</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  The Old Way vs. The New Reality
                </h3>
                <p>
                  In the past, your resume was the entire story. You printed it out, submitted it
                  with a cover letter, and waited. Today? Hiring managers Google you. They find your
                  LinkedIn, maybe your Twitter, your blog, your Medium posts. They see how you talk
                  about your work.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">What is Personal Branding?</h3>
                <p>
                  Personal branding is the intentional way you communicate your expertise, values,
                  personality, and career focus. It's what people say about you when you're not in
                  the room. It combines your resume, your LinkedIn, your presence in the industry,
                  your reputation, and your story.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  The 360-Degree Professional Presence
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Resume:</strong> Experience summary
                  </li>
                  <li>
                    <strong>LinkedIn:</strong> Ongoing professional story
                  </li>
                  <li>
                    <strong>Portfolio/Website:</strong> Proof of work
                  </li>
                  <li>
                    <strong>Social Media:</strong> Personality & thought leadership
                  </li>
                </ul>
                <p className="mt-3">
                  Together, they create a complete view of your career persona.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn as Your Career Hub</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Essential Elements:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Headline:</strong> Speaks to your future, not your past
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>About Section:</strong> Tells your story in a conversational tone
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Experience:</strong> Mirrors your resume but adds more depth
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Engagement:</strong> Comment, post, support others in your industry
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Warning Signs</h3>
                <p className="text-yellow-800">
                  If recruiters land on your LinkedIn profile and see a ghost town, that's a red
                  flag. Recruiters live on LinkedIn—they expect to see activity and engagement.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Thought Leadership</h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-3">
                  The Power of Consistent Content
                </h3>
                <p className="text-gray-700 mb-4">
                  Posting regularly—even once a week—builds visibility. Share an insight from your
                  industry. Comment on trends. Offer lessons from your own career. This positions
                  you not just as a job seeker, but as someone worth following.
                </p>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Success Story:</h4>
                  <p className="text-gray-700">
                    One of our clients—a teacher moving into corporate learning—started writing
                    weekly posts on leadership development. Within 3 months, she got two interview
                    calls based entirely on her content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual & Verbal Consistency</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visual Identity</h3>
                <p className="text-gray-600 text-sm">
                  Use a consistent headshot across all platforms
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Content Alignment</h3>
                <p className="text-gray-600 text-sm">
                  Keep titles and keywords aligned across platforms
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Voice & Tone</h3>
                <p className="text-gray-600 text-sm">
                  Maintain the same voice in emails, bios, and interviews
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-center">
                <strong>Think of it as creating a personal brand style guide.</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Q&A Highlights</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: I'm a bit shy about posting online. Do I have to?
                </h3>
                <p className="text-gray-700">
                  A: You don't have to be a loud voice—but you should be a visible one. Start small.
                  Share articles. Comment on peers' updates. It all builds trust and visibility over
                  time.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Q: I have multiple career interests. How do I brand myself?
                </h3>
                <p className="text-gray-700">
                  A: Choose a primary path for now, and build your content around that. You can have
                  a layered identity, but you need clarity in your messaging.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Build Your Personal Brand with Prosumely</h2>
            <p className="text-purple-100 mb-6 text-lg">
              Your personal brand is more powerful than your resume alone. It's what turns cold
              applications into warm leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/linkedin-profile-makeover"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                LinkedIn Profile Makeover
              </Link>
              <Link
                href="/jobseekers-combo-service"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Complete Branding Package
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
              href="/events/webinars/resume-interviews-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                Why Your Resume Isn't Getting You Interviews — And What to Do About It
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Learn the secrets to creating resumes that actually get responses
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <Play className="w-4 h-4 mr-1" />
                Watch Now
              </div>
            </Link>

            <Link
              href="/events/webinars/mid-career-reinvention-webinar"
              className="group block bg-gray-50 rounded-xl p-6 hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Navigate career transitions with confidence and clarity
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
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
