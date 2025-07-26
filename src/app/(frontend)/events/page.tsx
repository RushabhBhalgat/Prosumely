import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Calendar, Clock, Users, ChevronRight, Play } from 'lucide-react'

export const metadata = {
  title: 'Events & Webinars | Professional Development by Prosumely',
  description:
    "Join Prosumely's exclusive webinars and events. Learn from industry experts, improve your resume, and accelerate your career growth with our professional development programs.",
  keywords: [
    'career webinars',
    'professional development events',
    'resume writing workshops',
    'career coaching events',
    'job search webinars',
    'interview coaching',
    'prosumely events',
    'career advancement',
    'professional networking',
  ],
  openGraph: {
    title: 'Events & Webinars | Professional Development by Prosumely',
    description:
      "Join Prosumely's exclusive webinars and events. Learn from industry experts, improve your resume, and accelerate your career growth with our professional development programs.",
    url: 'https://prosumely.com/events',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://prosumely.com/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Events & Webinars',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events & Webinars | Professional Development by Prosumely',
    description:
      "Join Prosumely's exclusive webinars and events. Learn from industry experts, improve your resume, and accelerate your career growth with our professional development programs.",
    images: ['https://prosumely.com/prosumely-career-blogs.jpg'],
  },
}

const upcomingEvents = [
  {
    id: 1,
    title: 'Beyond the Resume: Personal Branding in a Hyper-Competitive Job Market',
    date: '2025-08-15',
    time: '2:00 PM EST',
    duration: '75 minutes',
    attendees: 150,
    type: 'Workshop',
    description:
      'Focus: Digital presence, storytelling, networking. Designed for mid-to-senior level professionals and executives.',
    image:
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'How to Land Interviews in 30 Days: A Proven Resume & Job Search Framework',
    date: '2025-08-28',
    time: '11:00 AM EST',
    duration: '90 minutes',
    attendees: 200,
    type: 'Webinar',
    description:
      'Focus: Resume + outreach + tracking job search pipeline. Perfect for active job seekers looking for structure.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 3,
    title: "Resume Red Flags: What's Holding You Back (And How to Fix It)",
    date: '2025-09-10',
    time: '3:00 PM EST',
    duration: '60 minutes',
    attendees: 175,
    type: 'Interactive Session',
    description:
      'Focus: Audit-style webinar with real-time resume critiques. Broad audience - ideal for interactive Q&A sessions.',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'The Resume Roadmap for 2025: Formats, Keywords, and Strategy That Work',
    date: '2025-09-22',
    time: '1:00 PM EST',
    duration: '85 minutes',
    attendees: 225,
    type: 'Masterclass',
    description:
      'Focus: Trends + actionable advice + 2025 predictions. For professionals preparing ahead or reentering the workforce.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'LinkedIn Profile Optimization: From Invisible to Irresistible',
    date: '2025-10-05',
    time: '2:30 PM EST',
    duration: '80 minutes',
    attendees: 190,
    type: 'Workshop',
    description:
      'Focus: SEO optimization, headline crafting, content strategy. Perfect for professionals looking to enhance their online presence and attract recruiters.',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Interview Mastery: Confidence, Body Language & Storytelling That Wins',
    date: '2025-10-18',
    time: '11:30 AM EST',
    duration: '70 minutes',
    attendees: 165,
    type: 'Interactive Session',
    description:
      'Focus: Interview psychology, STAR method, handling difficult questions. Designed for professionals preparing for high-stakes interviews and career pivots.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
]

const pastWebinars = [
  {
    id: 1,
    title: "Why Your Resume Isn't Getting You Interviews — And What to Do About It",
    date: '2025-01-15',
    views: '2.5K',
    duration: '60 minutes',
    slug: 'resume-interviews-webinar',
  },
  {
    id: 2,
    title: 'The Future of Job Search: Why Personal Branding is the New Resume',
    date: '2025-02-12',
    views: '3.1K',
    duration: '65 minutes',
    slug: 'personal-branding-webinar',
  },
  {
    id: 3,
    title: 'From Mid-Career Crisis to Career Clarity: The Resume as a Reinvention Tool',
    date: '2025-03-08',
    views: '1.8K',
    duration: '70 minutes',
    slug: 'mid-career-reinvention-webinar',
  },
  {
    id: 4,
    title: 'The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon',
    date: '2025-04-05',
    views: '2.2K',
    duration: '55 minutes',
    slug: 'ats-optimization-webinar',
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Events & <span className="text-blue-300">Webinars</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
              Join industry experts and accelerate your career growth through our exclusive
              workshops, webinars, and networking events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#upcoming"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Upcoming Events
              </Link>
              <Link
                href="#past-webinars"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Watch Past Webinars
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">On-Demand Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss out on these exclusive opportunities to learn from industry experts and
              network with professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Free
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.time} • {event.duration}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.attendees} registered</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Webinars Section */}
      <section id="past-webinars" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Past Webinars</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Catch up on our previous sessions and continue your professional development journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastWebinars.map((webinar) => (
              <Link
                key={webinar.id}
                href={`/events/webinars/${webinar.slug}`}
                className="group block"
              >
                <div className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {webinar.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(webinar.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{webinar.duration}</span>
                        <span className="mx-2">•</span>
                        <Play className="w-4 h-4 mr-1" />
                        <span>{webinar.views} views</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium text-sm">Free Access</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've accelerated their careers with our expert
            guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/free-resume-review"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Free Resume Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
